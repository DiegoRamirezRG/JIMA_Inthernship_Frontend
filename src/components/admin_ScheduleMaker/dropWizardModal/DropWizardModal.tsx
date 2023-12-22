import React, { useEffect, useState } from 'react'
import './DropWizardModal.scss'
import { IoClose } from 'react-icons/io5'
import { useLoadScheduleContext } from '../../../contexts/loadScheduleContext/LoadScheduleContext';
import { daysOfTheWeek } from '../../../utils/calendarHelpers/DaysOfTheWeek';
import { SelectedEditComponent, SelectedEditComponentWithIDS } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { optionSelect } from '../../../models/universalApiModels/UniversalApiModel';
import { calculateAvailableHours, formatSelectOpt, getLeftClassAvailavleHours, getLeftScheduleHoursByDay } from './helpers/DataFunctions';
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';
import moment from 'moment';
import { useTeacherContext } from '../../../contexts/teacherContext/TeacherContext';

export const DropWizardModal = () => {

    const { groupScopeFac, subjectsPerGroup, handleWizardModal, wizardModal, workingSubject, workingDay, addTeacherClass, addScheduleClass } = useLoadScheduleContext();
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
        handleWizardModal();
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
        if(groupScopeFac && workingSubject){

            const matchingClass = subjectsPerGroup
                .filter((classe) => classe.id_Career === groupScopeFac.ID_Carrera)
                .filter((teach_class) => teach_class.class_teacher)[0];

                const teacherId = matchingClass?.class_teacher.find((classe) => classe.FK_Materia === workingSubject.ID_Materia)?.FK_Profesor;

                const addSchedule = () => {
                    addScheduleClass(
                        workingSubject.ID_Materia,
                        teacher_select,
                        groupScopeFac.ID_Grupo,
                        groupScopeFac.ID_Carrera,
                        groupScopeFac.ID_Turno,
                        workingDay!,
                        initHour,
                        endHour
                    );
                };

                if (!teacherId) {
                    addTeacherClass(
                        workingSubject!.ID_Materia,
                        teacher_select,
                        groupScopeFac.ID_Grupo,
                        groupScopeFac.ID_Carrera,
                        groupScopeFac.ID_Turno
                    );
                    addSchedule();
                } else {
                    addSchedule();
                }
            cancelWizard();
        }
    }

    useEffect(() => {
        if(wizardModal && groupScopeFac && workingSubject){ //TRUE ONLY --> Data Exists
            //format available minutes and minutes
                setAvailableHours(calculateAvailableHours({init_time: groupScopeFac.Hora_Inicio, end_time: groupScopeFac.Hora_Fin}));
                setDisponibleDayHours(getLeftScheduleHoursByDay({ group_scope: groupScopeFac, schedule_obj: subjectsPerGroup, day: workingDay! }));
                setPrivateClassLeftHours(getLeftClassAvailavleHours({ group_scope: groupScopeFac, schedule_obj: subjectsPerGroup, subject: workingSubject }));

                const helper = Object.values(subjectsPerGroup
                    .filter((classe) => classe.id_Career === groupScopeFac.ID_Carrera)
                    .filter((teach_class) => teach_class.class_teacher)
                )[0].class_teacher.find((classe) => classe.FK_Materia === workingSubject.ID_Materia);

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

    }, [wizardModal])

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
                                    <p>Estas a punto de agregar <b>{workingSubject?.Nombre}</b> al dia <b>{daysOfTheWeek[workingDay!]}</b> con <b>{privateClassLeftHours} horas restantes</b></p>
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
                                                    groupScopeFac && workingSubject
                                                    ?   Object.values(subjectsPerGroup
                                                            .filter((classe) => classe.id_Career === groupScopeFac.ID_Carrera)
                                                            .filter((teach_class) => teach_class.class_teacher)
                                                        )[0].class_teacher.find((classe) => classe.FK_Materia === workingSubject.ID_Materia)?.FK_Profesor
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
