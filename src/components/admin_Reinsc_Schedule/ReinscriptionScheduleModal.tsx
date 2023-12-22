import React, { useEffect, useRef, useState } from 'react'
import './ReinscriptionScheduleModal.scss'
import { useLoadReinsScheduleContext } from '../../contexts/loadScheduleContext/loadReinsScheduleContext';
import { Moment } from 'moment';
import moment from 'moment';
import { LoadingComponent } from '../generalComponents/loadingComponent/LoadingComponent';
import { IoClose, IoReloadCircle, IoSaveSharp } from 'react-icons/io5';
import { DropDayReinsContainer } from './innerComponents/DropDayReinsContainer/DropDayReinsContainer';
import { useSubjectsContext } from '../../contexts/subjectContext/SubjectsContext';
import { DraggableReinsSubject } from './innerComponents/DraggableReinsSubject/DraggableReinsSubject';
import { ClassTeacher } from '../../models/loadScheduleModels/LoadScheduleModels';
import { getLeftClassAvailavleHoursReins } from '../admin_ScheduleMaker/dropWizardModal/helpers/DataFunctions';
import { GroupSchedule } from '../../models/loadScheduleModels/LoadReinsScheduleModels';
import { ModalComponent } from '../generalComponents/modalComponent/ModalComponent';
import { ConfirmReinsModal } from './innerComponents/ConfirmReinsModal/ConfirmReinsModal';
import { ConfirmModal } from '../admin_ScheduleMaker/confirmModal/ConfirmModal';

export const ReinscriptionScheduleModal = () => {

    const { shiftData, getShiftData, workingObj, merguedData, reinsScheduleMakerModal, wizardReinsConfirmModal, dummyRednerHelper, resetScheduleReincsBuilder, handleSaveScheduleDone, handleReinsScheduleMakerModal } = useLoadReinsScheduleContext();
    const {subjectsData, getSubjectsData} = useSubjectsContext();
    const [loader, setLoader] = useState(true);
    const [initTime, setInitTime] = useState<Moment>(moment());
    const [endTime, setEndTime] = useState<Moment>(moment());
    const [totalHours, setTotalHours] = useState<number>(0);

    const [confirmSaveModal, setConfirmSaveModal] = useState(false);
    const [allHoursUsed, setAllHoursUsed] = useState(false);
    const [innerLoading, setInnerLoading] = useState(true);

    const scrollerDayRef = useRef<HTMLDivElement | null>(null);

    const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (scrollerDayRef.current) {
            scrollerDayRef.current.scrollLeft += e.deltaY * 2;
        }
    };

    const validateReset = (materia: GroupSchedule) => {
        return (
            materia.id_Grupo === workingObj?.id_Grupo &&
            materia.id_Career === workingObj.id_Career &&
            materia.id_Turno === workingObj.id_Turno &&
            materia.class_teacher &&
            materia.class_teacher.length > 0 &&
            materia.class_teacher.some((profesor) => profesor.FK_Profesor && profesor.schedule && profesor.schedule.length > 0)
        );
    };

    const checkHours = (classTeacher: ClassTeacher[]) => {
        return (
            classTeacher &&
            classTeacher.length > 0 &&
            classTeacher.every((profesor) =>
                profesor.schedule &&
                profesor.schedule.length > 0 &&
                profesor.schedule.every((horario) => {
                    const totalHours = profesor.schedule?.reduce((acc, sche) => {
                        const hours = moment(sche.Hora_Fin, 'HH:mm').diff(moment(sche.Hora_Inicio, 'HH:mm'), 'minutes') / 60;
                        return acc + hours;
                    }, 0);

                    const hoursAvailable = subjectsData.find((subj) => subj.ID_Materia == profesor.FK_Materia);
                    return totalHours === hoursAvailable?.Horas_De_Clase;
                })
            )
        );
    }

    const validSaveSchedule = merguedData.some((materia) => {
        return (
            materia.id_Grupo === workingObj?.id_Grupo &&
            materia.id_Career === workingObj.id_Career &&
            materia.id_Turno === workingObj.id_Turno &&
            checkHours(materia.class_teacher)
        );
    });

    useEffect(() => {
        if(workingObj){
            const awaitF = async () => {
                await getSubjectsData();
                await getShiftData(workingObj.id_Turno);
            }
            
            awaitF().then(() => {
                setLoader(false);
            })
        }
    }, [workingObj]);

    useEffect(() => {
        if(shiftData){
            setInitTime(moment(shiftData.Hora_Inicio, 'HH:mm:ss'));
            setEndTime(moment(shiftData.Hora_Fin, 'HH:mm:ss'));

            setTotalHours(moment(shiftData.Hora_Fin, 'HH:mm:ss').diff(moment(shiftData.Hora_Inicio, 'HH:mm:ss'), 'minutes') / 60)
        }
    }, [shiftData])

    useEffect(() => {
        setAllHoursUsed(validSaveSchedule);
        setInnerLoading(false);
    }, [dummyRednerHelper, reinsScheduleMakerModal])

    return (
        <div className='reinscriptionScheduleBuilderModal'>
            {
                loader || innerLoading
                ?   <LoadingComponent/>
                :   <>
                        <div className="scheduleMakerHeader">
                            <div className="titleSection">
                                <h2>Creacion de horario</h2>
                            </div>
                            <div className="subjectsSection">
                                <div className="subjectsDraggable">
                                    {
                                        merguedData
                                        .filter((obj) => workingObj?.id_Career == obj.id_Career && workingObj.id_Grupo == obj.id_Grupo && workingObj.id_Turno == obj.id_Turno)
                                        .map((subjs, indexing) => (
                                            <div className="container_subjects">
                                                {
                                                    subjs.class_teacher.some((subject) => {
                                                        const getSubject = subjectsData.find((item) => item.ID_Materia === subject.FK_Materia);
                                                        if (!getSubject) {
                                                            return false;
                                                        } else {
                                                            const leftHours = getLeftClassAvailavleHoursReins({ group_scope: workingObj!, schedule_obj: merguedData, subject: getSubject});
    
                                                            return leftHours > 0;
                                                        }
                                                    }) 
                                                    ? (
                                                        subjectsData.filter(subject => {
                                                            return workingObj?.class_teacher.some(teacher => teacher.FK_Materia == subject.ID_Materia)
                                                        })
                                                        .map((subject, index) => {
                                                            const leftHours = getLeftClassAvailavleHoursReins({ group_scope: workingObj!, schedule_obj: merguedData, subject: subject! });
                                                            
                                                            if (leftHours > 0) {
                                                                return <DraggableReinsSubject key={subject.ID_Materia} index={index} subject={subject} leftHours={leftHours}/>
                                                            } else {
                                                                return <></>;
                                                            }
                                                        })
                                                    ) 
                                                    : (
                                                        <p className='no-more'>No quedan mas Materias Disponibles.</p>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="optionsSection">
                                    {
                                        !allHoursUsed
                                        ?   <div></div>
                                        :   <button className='save-btn' onClick={() => setConfirmSaveModal(true)}>
                                                <IoSaveSharp/>
                                                Confirmar
                                            </button>
                                    }
                                    {
                                        !merguedData.some(validateReset)
                                        ?   <div></div>
                                        :   <button className='info-btn' onClick={ resetScheduleReincsBuilder }>
                                                <IoReloadCircle/>
                                                Reiniciar
                                            </button>
                                    }
                                </div>
                            </div>
                            <div className="closeHelper" onClick={() => {
                                handleReinsScheduleMakerModal();
                                setInnerLoading(true);
                            }}>
                                <IoClose/>
                            </div>
                        </div>
                        <div className="weeklyOrganize">
                            <div className="hourDisplayer">
                                <div className="hourRealDisplayer">
                                    {
                                        Array.from({length: totalHours}).map((_ , index) => {
                                            const currentHour = initTime.clone().add(index * 60, 'minutes');
                                            const formattedHour = currentHour.format('h:mm a');

                                            return (
                                                <div className='hourRealDisplayer' style={{height: `calc(100% / ${totalHours})`}} key={index}>
                                                    <p className='hourText'>{formattedHour}</p>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='lastEsp' style={{height: `calc(100% / ${totalHours})`}}>
                                        <div className="innerHoldingContainer">
                                            <p className='hourText'>{endTime.format('h:mm a')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dayContentss" ref={scrollerDayRef} onWheel={handleMouseWheel}>
                                {
                                    Array.from({length: 7}).map((_ , index) => (
                                        <DropDayReinsContainer key={index} day={index} date={`197${index}-11-${index + 2}`}/>
                                    ))
                                }
                            </div>
                        </div>
                    </>
            }
            <ModalComponent handleModalState={() => {}} modalState={wizardReinsConfirmModal}>
                <ConfirmReinsModal/>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}} modalState={confirmSaveModal}>
                <ConfirmModal>
                    <div className='confirmModal'>
                        <p>¿Desea guardar el horario seleccionado?</p>
                        <div className="innerRow">
                            <button className='cancel-btn' onClick={() => setConfirmSaveModal(false)}>Seguir Editando</button>
                            <button className='save-btn' onClick={() => {
                                handleSaveScheduleDone(workingObj!.id_Career, workingObj!.id_Grupo, workingObj!.id_Turno, 1);
                                setConfirmSaveModal(false);
                                handleReinsScheduleMakerModal();
                                setInnerLoading(true);
                            }}>Guardar y Salir</button>
                        </div>
                    </div>
                </ConfirmModal>
            </ModalComponent>
        </div>
    )
}
