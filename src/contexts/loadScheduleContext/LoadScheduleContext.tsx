import React, { createContext, useContext, useState } from 'react'
import { AsignClasses, GroupNeeded, InnerChildContext, LoadScheduleContext, doneHelper } from '../../models/loadScheduleModels/LoadScheduleModels';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { SubjectModel } from '../../models/subjectsModels/SubjectModels';
import { daysOfTheWeek } from '../../utils/calendarHelpers/DaysOfTheWeek';
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import moment from 'moment';
import { getLeftClassAvailavleHours } from '../../components/admin_ScheduleMaker/dropWizardModal/helpers/DataFunctions';
import { EventDropArg } from '@fullcalendar/core';

const LoadScheduleContext = createContext<LoadScheduleContext |undefined>(undefined);

export const LoadScheduleContextProvider = ({ children } : InnerChildContext) => {

    //Get Groups Needed

    const [groupsForLoad, setGroupsForLoad] = useState<GroupNeeded[] | null>(null);
    const [isGettingLoading, setIsGettingLoading] = useState<boolean>(true);

    const getGroupsForLoad = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/schedule/getGroupToSchedule', { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setGroupsForLoad(response.data.data);
            }
            setIsGettingLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setIsGettingLoading(false);
        }
    }

    //Modals
    const [scheduleMaker, setscheduleMaker] = useState(false);
    const [groupScope, setGroupScope] = useState<GroupNeeded | null>(null);
    const [scheduleDone, setScheduleDone] = useState<doneHelper[] | null>(null);

    const handleSchedule = async (scope?:GroupNeeded) => {
        if(scope){
            setGroupScope(scope);
            setscheduleMaker(true);
        }else{
            setGroupScope(null);
            setscheduleMaker(false);
        }
    }

    const handleFinishedScheduleMaker = (carrera: string, grupo: string, turno: string, grado: number) => {
        setGroupScope(null);
        setscheduleMaker(false);

        let helper: doneHelper[] = scheduleDone != null ? [...scheduleDone] : [];
        helper.push({
            id_Career: carrera,
            id_Grupo: grupo,
            id_Turno: turno,
            grado: grado
        })
        setScheduleDone(helper);
    }

    //Load
    const [groupLoadSchedule, setGroupLoadSchedule] = useState<AsignClasses[]>([]);
    const [loadSubjectLaoding, setLoadSubjectLaoding] = useState(false);
    const [dummyStateRender, setDummyStateRender] = useState<boolean>(false);


    const addTeacherToSubject = (fk_materia: string, new_teacher: string, id_grupo: string, id_career: string, id_turno: string) => {
        const updateSubjects = groupLoadSchedule.map(asigClass => {
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

    const addScheduleToSubject = (fk_materia: string, new_teacher: string, id_grupo: string, id_career: string, id_turno: string, dia: number, init: string, end: string) => {
        const updateShedule = groupLoadSchedule.map(asignClass => {
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

    const updateScheduleOnData = (subjectUpd: string, dayUpt: number, initUp: Date, endUpd: Date) => {
        if(groupScope){
            const tempData = [...groupLoadSchedule];
    
            const targetGroupIndex = tempData.findIndex(
                (group) =>
                    group.id_Grupo === groupScope.ID_Grupo &&
                    group.id_Career === groupScope.ID_Carrera &&
                    group.id_Turno === groupScope.ID_Turno
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

                        setGroupLoadSchedule(tempData);
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

    const resetScheduleMaker = () => {
        if(groupScope){
            const tempData = [...groupLoadSchedule];

            const targetGroupIndex = tempData.findIndex((group) =>
                group.id_Grupo === groupScope.ID_Grupo &&
                group.id_Career === groupScope.ID_Carrera &&
                group.id_Turno === groupScope.ID_Turno
            );

            if(targetGroupIndex !== -1){
                const updatedClassTeacher = tempData[targetGroupIndex].class_teacher.map((subject) => {
                    const { FK_Profesor, schedule, ...rest } = subject;
                    return rest;
                });

                tempData[targetGroupIndex].class_teacher = updatedClassTeacher;
                setGroupLoadSchedule(tempData);
                handleDummyRender();
            }
        }
    }

    const handleDummyRender = () => {
        setDummyStateRender(prev => !prev);
    }

    const loadById = async (group: GroupNeeded[], cicle: number) => {
        try {
            setLoadSubjectLaoding(true);

            let tempHelper: any[] = [];
            for (let i = 0; i < group.length; i++) {

                tempHelper[i] = {};
                tempHelper[i].class_teacher = [];

                tempHelper[i].id_Grupo = group[i].ID_Grupo;
                tempHelper[i].id_Career = group[i].ID_Carrera;
                tempHelper[i].id_Turno = group[i].ID_Turno;
                
                const response = await serverRestApi.get<Response>(`/api/plans/getSubjectsByCicle/${group[i].ID_Carrera}/${cicle}`, { headers: { Authorization: localStorage.getItem('token') } });
                
                for (let j = 0; j < response.data.data.length; j++) {
                    tempHelper[i].class_teacher[j] = {};
                    tempHelper[i].class_teacher[j].FK_Materia = response.data.data[j].ID_Materia;
                }
                
            }

            if(groupLoadSchedule.length == 0){
                setGroupLoadSchedule(tempHelper);
            }else{

            }

            setLoadSubjectLaoding(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setLoadSubjectLaoding(false);
        }
    }

    //Events Data Handler
    const resize  = (eventArg: EventResizeDoneArg) => {
        const resizedDuration = moment(eventArg.event.end).diff(moment(eventArg.event.start), 'minutes') / 60;
        const previousDuration = moment(eventArg.oldEvent.end).diff(moment(eventArg.oldEvent.start), 'minutes') / 60;
        const limitHours = getLeftClassAvailavleHours({ group_scope: groupScope!, schedule_obj: groupLoadSchedule, subject: eventArg.event.extendedProps.subject })

        if((resizedDuration - previousDuration) > limitHours){
            eventArg.revert();
        }else{
            updateScheduleOnData(eventArg.event.extendedProps.FK_Materia, eventArg.event.extendedProps.day, eventArg.event.start!, eventArg.event.end!);
        }
    }

    const moveEvent = (eventArg: EventDropArg) => {
        updateScheduleOnData(eventArg.event.extendedProps.FK_Materia, eventArg.event.extendedProps.day, eventArg.event.start!, eventArg.event.end!);
    }

    //Hnadle schedule
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

    //Send Schedules
    const [isScheduleLoading, setIsScheduleLoading] = useState(false);

    const sendSchedules = async () => {
        try {
            setIsScheduleLoading(true);

            const response = await serverRestApi.post<Response>('/api/schedule/createSchedules', {
                data: [...groupLoadSchedule]
            },{ headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setIsScheduleLoading(false);
                showSuccessToast({position: 'top-center', text:response.data.data});
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setIsScheduleLoading(false);
        }
    }

    const contextValue: LoadScheduleContext = {
        //Get Groups
        groups: groupsForLoad,
        groupdDone: scheduleDone,
        groupsLoading: isGettingLoading,
        getGroupsFunc: getGroupsForLoad,

        //Set Cicle Subjects
        getAndSetSubjects: loadById,
        subjectsPerGroup: groupLoadSchedule,
        subjectsLoader: loadSubjectLaoding,

        //ScheduleMaker
        scheduleMakerModal: scheduleMaker,
        groupScopeFac: groupScope,
        handleScheduleModal: handleSchedule,
        handleScheudleDoneModal: handleFinishedScheduleMaker,

        //WizarsSetupModal
        wizardModal: wizardModalState,
        workingSubject: wokringSubject,
        handleWizardModal: handleWizarsSetup,
        workingDay: workingDay,

        //Add to Local
        addTeacherClass: addTeacherToSubject,
        addScheduleClass: addScheduleToSubject,
        dummyRender: dummyStateRender,

        //Calendar Events
        onRezise: resize,
        onMove: moveEvent,
        resetScheduleMaker: resetScheduleMaker,

        //Send Schedules
        sendScheduleLoader: isScheduleLoading,
        sendSchedule: sendSchedules,
    }
    
    return (
        <LoadScheduleContext.Provider value={contextValue}>
            { children }
        </LoadScheduleContext.Provider>
    )
}

export const useLoadScheduleContext = (): LoadScheduleContext => {
    const context = useContext(LoadScheduleContext);
    if(context === undefined){
        throw new Error('useLoadScheduleContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
