import React, { createContext, useContext, useState } from 'react'
import { GroupSchedule, LoadReinsScheduleContextModel, LoadReinsScheduleProviderModel, ShiftData } from '../../models/loadScheduleModels/LoadReinsScheduleModels';
import { confirmedInsGroup, confirmedInsGroupWithSubjects } from '../../models/reins_inscrModels/InscriptionModels';
import { ClassTeacher, doneHelper } from '../../models/loadScheduleModels/LoadScheduleModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { SubjectModel } from '../../models/subjectsModels/SubjectModels';
import { daysOfTheWeek } from '../../utils/calendarHelpers/DaysOfTheWeek';
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import moment from 'moment';
import { getLeftClassAvailavleHoursReins } from '../../components/admin_ScheduleMaker/dropWizardModal/helpers/DataFunctions';
import { EventDropArg } from '@fullcalendar/core';

const LoadReinsScheduleContext = createContext<LoadReinsScheduleContextModel | undefined>(undefined);

export const LoadReinsScheduleContextProvider = ({ children }: LoadReinsScheduleProviderModel) => {

    //Format and merge group - subjects data
    const [groupSchedule, setGroupSchedule] = useState<GroupSchedule[]>([]);
    const formatTheConfirmedGroups = (groups: confirmedInsGroup[], loadedSubjects: confirmedInsGroupWithSubjects[]) => {
        const temp: GroupSchedule[] = groups.map((obj) :GroupSchedule => {

            const subjects = loadedSubjects.find((groupSub) => (
                groupSub.id_carrera == obj.carrera &&
                groupSub.id_grupo === obj.grupo &&
                groupSub.id_turno === obj.turno
            ));

            return ({
                gradeNumber: obj.nextGrade,
                id_Grupo: obj.grupo,
                id_Career: obj.carrera,
                id_Turno: obj.turno,
                students_ids: obj.idsEstudiantes,
                class_teacher: subjects ? subjects.next_subjects.map((sub): ClassTeacher => ({
                    FK_Materia: sub.ID_Materia
                }))
                :   [{ FK_Materia: '' }]
            })
        });

        setGroupSchedule(temp);
    }

    //Schedule Modal Handler
    const [scheduleMakerModal, setScheduleMakerModal] = useState(false);
    const [workingGroup, setWorkingGroup] = useState<GroupSchedule | null>(null);

    const handleScheduleMakerModal = (workingObj?: GroupSchedule) => {
        if(workingObj){
            setWorkingGroup(workingObj);
            setScheduleMakerModal(true);
        }else{
            setWorkingGroup(null);
            setScheduleMakerModal(false);
        }
    }

    //Shifts Getter
    const [shiftInfo, setShiftInfo] = useState<ShiftData | null>(null);
    const getShiffInfo = async (shift_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/schedule/getShiftDetail/${shift_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setShiftInfo(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Confirm Modal Handler
    const [wizardModalState, setWizardModalState] = useState<boolean>(false);
    const [wokringSubject, setWokringSubject] = useState<SubjectModel | null>(null);
    const [workingDay, setWorkingDay] = useState<number | null>(null);

    const handleWizarsSetup = (subject?: SubjectModel, day?: number) => {
        if(subject && day != null){
            setWizardModalState(true);
            setWokringSubject(subject);
            setWorkingDay(day);
        }else{
            setWizardModalState(false);
            setWokringSubject(null);
            setWorkingDay(null);
        }
    }

    //Dummy Render
    const [dummyStateRender, setDummyStateRender] = useState<boolean>(false);

    const handleDummyRender = () => {
        setDummyStateRender(prev => !prev);
    }

    //Add teacher to a subject
    const addTeacherToSubject = (fk_materia: string, new_teacher: string, id_grupo: string, id_career: string, id_turno: string) => {
        const updateSubjects = groupSchedule.map(asigClass => {
            const updateClassTeacher = asigClass.class_teacher
            .find(
                ct => 
                    ct.FK_Materia === fk_materia
                    && asigClass.id_Career === id_career
                    && asigClass.id_Grupo === id_grupo
                    && asigClass.id_Turno === id_turno
            );

            if(updateClassTeacher){
                updateClassTeacher.FK_Profesor = new_teacher;
            }

            handleDummyRender();
            //Añade al global
            return asigClass;
        });
    }

    //Handler Schedule Builder Add
    const addScheduleToSubject = (fk_materia: string, new_teacher: string, id_grupo: string, id_career: string, id_turno: string, dia: number, init: string, end: string) => {
        const updateShedule = groupSchedule.map(asignClass => {
            const updateClassTeacherSch = asignClass.class_teacher
                .find(
                    ct => 
                    ct.FK_Materia === fk_materia
                    && asignClass.id_Career === id_career
                    && asignClass.id_Grupo === id_grupo
                    && asignClass.id_Turno === id_turno
                );

            if (updateClassTeacherSch === undefined) {
                return asignClass;
            }

            if (updateClassTeacherSch!.schedule == undefined || updateClassTeacherSch!.schedule.length === 0) {
                updateClassTeacherSch!.schedule = [{
                    Dia: daysOfTheWeek[dia] as 'Domingo' | 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado',
                    Hora_Inicio: init,
                    Hora_Fin: end
                }]
            }else{
                updateClassTeacherSch!.schedule.push({
                    Dia: daysOfTheWeek[dia] as 'Domingo' | 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado',
                    Hora_Inicio: init,
                    Hora_Fin: end
                })
            }
            handleDummyRender();
            //Añade al global
            return asignClass;
        })
    }

    //Handle Update
    const updateScheduleOnData = (subjectUpd: string, dayUpt: number, initUp: Date, endUpd: Date) => {
        if(workingGroup){
            const tempData = [...groupSchedule];
    
            const targetGroupIndex = tempData.findIndex(
                (group) =>
                    group.id_Grupo === workingGroup.id_Grupo &&
                    group.id_Career === workingGroup.id_Career &&
                    group.id_Turno === workingGroup.id_Turno
            );

            if(targetGroupIndex !== -1){
                const targetSubjectIndex = tempData[targetGroupIndex].class_teacher.findIndex(
                    (subject) => subject.FK_Materia === subjectUpd
                );

                if (targetSubjectIndex !== -1) {
                    const targetDayIndex = tempData[targetGroupIndex].class_teacher[targetSubjectIndex].schedule!.findIndex(
                        (schedule) => schedule.Dia === daysOfTheWeek[dayUpt] as 'Domingo' | 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado'
                    );

                    if (targetDayIndex !== -1) {
                        tempData[targetGroupIndex].class_teacher[targetSubjectIndex].schedule![targetDayIndex] = {
                            Dia: daysOfTheWeek[dayUpt] as 'Domingo' | 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado',
                            Hora_Inicio: moment(initUp).format('HH:mm'),
                            Hora_Fin: moment(endUpd).format('HH:mm')
                        };

                        setGroupSchedule(tempData);
                    }else{
                        showErrorTost({ position: 'top-center', text: 'No se ha encontrado el Horario' })
                    }
                }else{
                    showErrorTost({ position: 'top-center', text: 'No se ha encontrado la Materia' })
                }
            }else{
                showErrorTost({ position: 'top-center', text: 'No se ha encontrado el Grupo' })
            }

            handleDummyRender();
        }
    }

    //Handle Claendar Class
    const resize  = (eventArg: EventResizeDoneArg) => {
        const resizedDuration = moment(eventArg.event.end).diff(moment(eventArg.event.start), 'minutes') / 60;
        const previousDuration = moment(eventArg.oldEvent.end).diff(moment(eventArg.oldEvent.start), 'minutes') / 60;
        const limitHours = getLeftClassAvailavleHoursReins({ group_scope: workingGroup!, schedule_obj: groupSchedule, subject: eventArg.event.extendedProps.subject })

        if((resizedDuration - previousDuration) > limitHours){
            eventArg.revert();
        }else{
            updateScheduleOnData(eventArg.event.extendedProps.FK_Materia, eventArg.event.extendedProps.day, eventArg.event.start!, eventArg.event.end!);
        }
    }

    const moveEvent = (eventArg: EventDropArg) => {
        updateScheduleOnData(eventArg.event.extendedProps.FK_Materia, eventArg.event.extendedProps.day, eventArg.event.start!, eventArg.event.end!);
    }

    //Reset Schedule Building
    const resetScheduleMaker = () => {
        if(workingGroup){
            const tempData = [...groupSchedule];

            const targetGroupIndex = tempData.findIndex((group) =>
                group.id_Grupo === workingGroup.id_Grupo &&
                group.id_Career === workingGroup.id_Career &&
                group.id_Turno === workingGroup.id_Turno
            );

            if(targetGroupIndex !== -1){
                const updatedClassTeacher = tempData[targetGroupIndex].class_teacher.map((subject) => {
                    const { FK_Profesor, schedule, ...rest } = subject;
                    return rest;
                });

                tempData[targetGroupIndex].class_teacher = updatedClassTeacher;
                setGroupSchedule(tempData);
                handleDummyRender();
            }
        }
    }

    // Done Helper
    const [scheduleDone, setScheduleDone] = useState<doneHelper[] | null>(null);

    //Handle Save this Schedule
    const handleFinishedScheduleMaker = (carrera: string, grupo: string, turno: string, grado: number) => {
        setWorkingGroup(null);

        let helper: doneHelper[] = scheduleDone != null ? [...scheduleDone] : [];
        helper.push({
            id_Career: carrera,
            id_Grupo: grupo,
            id_Turno: turno,
            grado: grado
        })
        setScheduleDone(helper);
    }

    const cancelTheDoneThing = (carrera: string, grupo: string, turno: string, grado: number) => {

        const tempData = [...groupSchedule];

        const targetGroupIndex = tempData.findIndex((group) =>
            group.id_Grupo === grupo &&
            group.id_Career === carrera &&
            group.id_Turno === turno
        );

        if(targetGroupIndex !== -1){
            const updatedClassTeacher = tempData[targetGroupIndex].class_teacher.map((subject) => {
                const { FK_Profesor, schedule, ...rest } = subject;
                return rest;
            });

            tempData[targetGroupIndex].class_teacher = updatedClassTeacher;
            setGroupSchedule(tempData);
            handleDummyRender();
        }

        setScheduleDone(prev => {
            const indexToRemove = prev?.findIndex(
                item =>
                    item.id_Career === carrera &&
                    item.id_Grupo === grupo &&
                    item.id_Turno === turno &&
                    item.grado === grado
            );

            if (indexToRemove !== undefined && indexToRemove !== -1) {
                const updatedHelpers = [...(prev || [])];
                updatedHelpers.splice(indexToRemove, 1);
                return updatedHelpers;
            }

            return [];
        })
    }

    //Data sender

    const sendReinsSchedules = async () => {
        try {
            const response = await serverRestApi.post<Response>('/api/schedule/reinscription/createSchedules', {
                data: [...groupSchedule]
            },{ headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-center', text:response.data.data});
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Returnings
    const context_value : LoadReinsScheduleContextModel = {
        //Format and merge group - subjects data
        merguedData: groupSchedule,
        formatGroupsAnsSubjetcs: formatTheConfirmedGroups,

        //Schedule Modal Handler
        reinsScheduleMakerModal: scheduleMakerModal,
        workingObj: workingGroup,
        handleReinsScheduleMakerModal: handleScheduleMakerModal,

        //Shifts Getter
        shiftData: shiftInfo,
        getShiftData: getShiffInfo,

        //Confirm Modal Handler
        wizardReinsConfirmModal: wizardModalState,
        workingReinsWizardSubject: wokringSubject,
        workingReinsWizardDay: workingDay,
        handlerWizardReinsModal: handleWizarsSetup,

        //Dummy render
        dummyRednerHelper: dummyStateRender,
        
        //Schedule Builder
        addTeacherToSubjectReinsc: addTeacherToSubject,
        addScheduleToSubjectReinsc: addScheduleToSubject,
        
        //eventHandler
        onResizeReinsc: resize,
        onMoveReincs: moveEvent,
        
        // Done Helper
        reinscDoneHelper: scheduleDone,
        resetDoneGroup: cancelTheDoneThing,
        resetScheduleReincsBuilder: resetScheduleMaker,
        
        //Handle Save this Schedule
        handleSaveScheduleDone: handleFinishedScheduleMaker,

        //Send reinsc schedule
        sendReinsSchedule: sendReinsSchedules,
    }

    return (
        <LoadReinsScheduleContext.Provider value={context_value}>
            { children }
        </LoadReinsScheduleContext.Provider>
    )
}

export const useLoadReinsScheduleContext = () => {
    const context = useContext(LoadReinsScheduleContext);
    if(context === undefined){
        throw new Error('useLoadReinsScheduleContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
