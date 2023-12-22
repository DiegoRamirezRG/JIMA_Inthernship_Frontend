import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useLoadReinsScheduleContext } from '../../../../contexts/loadScheduleContext/loadReinsScheduleContext'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';
import { optionSelect } from '../../../../models/universalApiModels/UniversalApiModel';
import { useTeacherContext } from '../../../../contexts/teacherContext/TeacherContext';
import { calculateAvailableHours, formatSelectOpt, getLeftClassAvailavleHoursReins, getLeftScheduleHoursByDayReins } from '../../../admin_ScheduleMaker/dropWizardModal/helpers/DataFunctions';
import moment from 'moment';
import { daysOfTheWeek } from '../../../../utils/calendarHelpers/DaysOfTheWeek';
import { SelectedEditComponent, SelectedEditComponentWithIDS } from '../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';

export const ConfirmReinsModal = () => {

    const { handlerWizardReinsModal, wizardReinsConfirmModal, workingObj, workingReinsWizardSubject, shiftData, workingReinsWizardDay, merguedData, addTeacherToSubjectReinsc, addScheduleToSubjectReinsc } =  useLoadReinsScheduleContext();
    const { teachers, getTeachers } = useTeacherContext();

    //Loaders
    const [loadingState, setLoadingState] = useState(true);

    //HourState
    const [initHour, setInitHour] = useState<string>('');
    const [endHour, setEndHour] = useState<string>('');

    //HoursOpts
    const [availableHours, setAvailableHours] = useState<optionSelect[]>([]);
    const [disponibleDayHours, setDisponibleDayHours] = useState<string[]>([]);
    const [privateClassLeftHours, setPrivateClassLeftHours] = useState<number>(0);

    //AvailableTeachers
    const [availableTeachers, setAvailableTeachers] = useState<optionSelect[]>([]);
    const [teacher_select, setTeacher_select] = useState<string>('');

    //Cancel
    const cancelWizard = () => {
        handlerWizardReinsModal();
        setInitHour('');
        setEndHour('');
        setTeacher_select('');
    }

    //HandleHours 
    const handleHoursChange = (name: any, value: any) => {
        if(name === 'initH'){
            setInitHour(value);
        }else{
            setEndHour(value);
        }
    }

    //Handle teacher
    const handleTeacherSelect = (name: any, value: any) => {
        setTeacher_select(value);
    }

    const handlerSave = () => {
        if(workingObj && workingReinsWizardSubject){

            const matchingClass = merguedData
                .filter((classe) => classe.id_Career === workingObj.id_Career)
                .filter((teach_class) => teach_class.class_teacher)[0];

                const teacherId = matchingClass?.class_teacher.find((classe) => classe.FK_Materia === workingReinsWizardSubject.ID_Materia)?.FK_Profesor;

                const addSchedule = () => {
                    addScheduleToSubjectReinsc(
                        workingReinsWizardSubject.ID_Materia,
                        teacher_select,
                        workingObj.id_Grupo,
                        workingObj.id_Career,
                        workingObj.id_Turno,
                        workingReinsWizardDay!,
                        initHour,
                        endHour
                    );
                };

                if (!teacherId) {
                    addTeacherToSubjectReinsc(
                        workingReinsWizardSubject!.ID_Materia,
                        teacher_select,
                        workingObj.id_Grupo,
                        workingObj.id_Career,
                        workingObj.id_Turno
                    );
                    addSchedule();
                } else {
                    addSchedule();
                }
            cancelWizard();
        }
    }

    useEffect(() => {
        if(wizardReinsConfirmModal && workingObj && workingReinsWizardSubject && shiftData){ //TRUE ONLY --> Data Exists
            //format available minutes and minutes
                setAvailableHours(calculateAvailableHours({init_time: shiftData.Hora_Inicio, end_time: shiftData.Hora_Fin}));
                setDisponibleDayHours(getLeftScheduleHoursByDayReins({ group_scope: workingObj, schedule_obj: merguedData, day: workingReinsWizardDay! }));
                setPrivateClassLeftHours(getLeftClassAvailavleHoursReins({ group_scope: workingObj, schedule_obj: merguedData, subject: workingReinsWizardSubject }));

                const helper = Object.values(merguedData
                    .filter((classe) => classe.id_Career === workingObj.id_Career)
                    .filter((teach_class) => teach_class.class_teacher)
                )[0].class_teacher.find((classe) => classe.FK_Materia === workingReinsWizardSubject.ID_Materia);

                if(helper && helper.FK_Profesor){
                    setTeacher_select(helper.FK_Profesor);
                }
        }
        
        const awatF = async () => {
            await getTeachers();

            teachers &&
            setAvailableTeachers(formatSelectOpt(teachers.map((teacher) => {
                return {
                    value: teacher.ID_Profesor,
                    label: `${teacher.Nombre} ${teacher.Apellido_Paterno} ${teacher.Apellido_Materno ?? teacher.Apellido_Materno}`
                }
            })))
            setLoadingState(false);
        }
        awatF();

    }, [wizardReinsConfirmModal])

    useEffect(() => {
        if(initHour != ''){
            if(endHour != ''){
                const initDate = moment(initHour, 'HH:mm');
                const endDate = moment(endHour, 'HH:mm');

                if(initDate.isSame(endDate) || initDate.isAfter(endDate) || endDate.diff(initDate, 'hours') > privateClassLeftHours){
                    setEndHour(moment(initDate, 'HH:mm').add(1, 'hours').format('HH:mm'));
                }
            }
        }
    }, [initHour])

    return (
        <div className='modal-content'>
            <div className="modal-header">
                <h5>Configuracion</h5>
                <button className='modal-btn-close' onClick={ cancelWizard }>
                    <IoClose/>
                </button>
            </div>
            <div className="modal-body">
                <div className="wizardDropModal">
                    {
                        loadingState
                        ?   <LoadingComponent/>
                        :   <>
                                <div className="messageConfirm">
                                    <p>Estas a punto de agregar <b>{workingReinsWizardSubject?.Nombre}</b> al dia <b>{daysOfTheWeek[workingReinsWizardDay!]}</b> con <b>{privateClassLeftHours} horas restantes</b></p>
                                </div>
                                <div className="dataWrapper">
                                    <div className="timers initTimersSection">
                                        <label htmlFor="initSecGrid" className='extLabel'>Hora de Inicio</label>
                                        <div className="timersGridSelec" id='initSecGrid'>
                                            <SelectedEditComponent id={'hour_init'} name={'initH'} editActive={true} label={''} value={initHour} onChange={handleHoursChange}
                                                opts={
                                                    availableHours
                                                        .filter((_, index) => index != availableHours.length - 1)
                                                        .filter((opt) => !disponibleDayHours.includes(opt.value) )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="timers">
                                        <label htmlFor="endSecGrid" className='extLabel'>Hora de Fin</label>
                                        <div className="timersGridSelec" id='endSecGrid'>
                                            <SelectedEditComponent id={'hour_end'} name={'endH'} editActive={initHour != ''} label={''} value={endHour} onChange={handleHoursChange}
                                                opts={
                                                    availableHours
                                                        .filter((opt) => opt.value != initHour)
                                                        .filter((opt) => moment(opt.label, 'HH:mm') >= moment(initHour, 'HH:mm') )
                                                        .filter((opt) => moment(opt.value, 'HH:mm') <= moment(initHour, 'HH:mm').add(privateClassLeftHours, 'hours'))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="timers">
                                        <label htmlFor="pickTeachGrid" className='extLabel'>Selecciona una Profesor</label>
                                        {
                                            !teachers
                                            ?   <p>Cargando profesores</p>
                                            :   <SelectedEditComponentWithIDS id={'pickTeachGrid'} name={'teacher'} label={''} value={teacher_select} opts={availableTeachers} onChange={handleTeacherSelect}
                                                editActive={
                                                    workingObj && workingReinsWizardSubject
                                                    ?   Object.values(merguedData
                                                            .filter((classe) => classe.id_Career === workingObj.id_Career)
                                                            .filter((teach_class) => teach_class.class_teacher)
                                                        )[0].class_teacher.find((classe) => classe.FK_Materia === workingReinsWizardSubject.ID_Materia)?.FK_Profesor
                                                        ?   false
                                                        :   true
                                                    :   true
                                                }/>
                                        }
                                    </div>
                                </div>
                                <div className="actionsFooter">
                                    <button className='cancel-btn' onClick={cancelWizard}>Cancelar</button>
                                    {
                                        initHour === '' || endHour === '' || teacher_select === ''
                                        ?   <></>
                                        :   <button className='save-btn' onClick={handlerSave}>Guardar</button>
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
