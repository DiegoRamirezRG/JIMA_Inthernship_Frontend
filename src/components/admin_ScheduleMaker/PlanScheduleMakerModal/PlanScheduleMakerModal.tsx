import React, { useEffect, useRef, useState } from 'react'
import './PlanScheduleMakerModal.scss'
import { IoClose, IoReloadCircle, IoSaveSharp } from 'react-icons/io5'
import { DropDayContainer } from '../dropDayContainer/DropDayContainer'
import { useLoadScheduleContext } from '../../../contexts/loadScheduleContext/LoadScheduleContext'
import moment from 'moment'
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext'
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent'
import { DraggableSubject } from '../dragableSubject/DraggableSubject'
import { InputEditComponent } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { ModalComponent } from '../../generalComponents/modalComponent/ModalComponent'
import { DropWizardModal } from '../dropWizardModal/DropWizardModal'
import { getLeftClassAvailavleHours } from '../dropWizardModal/helpers/DataFunctions'
import { ConfirmModal } from '../confirmModal/ConfirmModal'
import { AsignClasses, ClassTeacher } from '../../../models/loadScheduleModels/LoadScheduleModels'

export const PlanScheduleMakerModal = () => {

    const { groupScopeFac, subjectsPerGroup, wizardModal, resetScheduleMaker, dummyRender, handleScheduleModal, scheduleMakerModal, handleScheudleDoneModal } = useLoadScheduleContext();
    const { subjectsData, getSubjectsData, isSubjectsLoading } = useSubjectsContext();

    const [searched, setSearched] = useState('');
    const [confirmSaveModal, setConfirmSaveModal] = useState(false);
    const [allHoursUsed, setAllHoursUsed] = useState(false);
    const [innerLoading, setInnerLoading] = useState(true);

    const scrollerDayRef = useRef<HTMLDivElement | null>(null);

    const startTime = moment(groupScopeFac?.Hora_Inicio, 'HH:mm:ss');
    const endTime = moment(groupScopeFac?.Hora_Fin, 'HH:mm:ss');

    const totalHours = endTime.diff(startTime, 'minutes') / 60;

    const handleSearch = (name: any, value: any) => {
        setSearched(value);
    }

    const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (scrollerDayRef.current) {
            scrollerDayRef.current.scrollLeft += e.deltaY * 2;
        }
    };

    const validateReset = (materia: AsignClasses) => {
        return (
            materia.id_Grupo === groupScopeFac?.ID_Grupo &&
            materia.id_Career === groupScopeFac.ID_Carrera &&
            materia.id_Turno === groupScopeFac.ID_Turno &&
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

    const validSaveSchedule = subjectsPerGroup.some((materia) => {
        return (
            materia.id_Grupo === groupScopeFac?.ID_Grupo &&
            materia.id_Career === groupScopeFac.ID_Carrera &&
            materia.id_Turno === groupScopeFac.ID_Turno &&
            checkHours(materia.class_teacher)
        );
    });

    useEffect(() => {
        if(subjectsData.length == 0){
            const awaitFunc = async () => {
                await getSubjectsData();
            }

            awaitFunc();
        }
    }, [scheduleMakerModal]);

    useEffect(() => {
        setAllHoursUsed(validSaveSchedule);
        setInnerLoading(false);
    }, [dummyRender, scheduleMakerModal])
    

    return (
        <div className='maxScheduleMakerContainer'>
            {
                isSubjectsLoading || innerLoading
                ?   <LoadingComponent/>
                :   <>
                        <div className="scheduleMakerHeader">
                            <div className="titleSection">
                                <h2>Creacion de horario</h2>
                            </div>
                            <div className="subjectsSection">
                                <div className="subjectsDraggable">
                                {
                                    subjectsPerGroup
                                        .filter((subject) => groupScopeFac?.ID_Carrera === subject.id_Career && subject.id_Grupo === groupScopeFac.ID_Grupo)
                                        .map((subjs, index) => (
                                            <div className="container_subjects" key={index}>
                                            {
                                                subjs.class_teacher.some((subject) => {
                                                    const getSubject = subjectsData.find((item) => item.ID_Materia === subject.FK_Materia);

                                                    if (!getSubject) {
                                                        return false;
                                                    } else {
                                                        const leftHours = getLeftClassAvailavleHours({ group_scope: groupScopeFac!, schedule_obj: subjectsPerGroup, subject: getSubject! });

                                                        return leftHours > 0;
                                                    }
                                                }) ? (
                                                    subjs.class_teacher.map((subject, index) => {
                                                    const getSubject = subjectsData.find((item) => item.ID_Materia === subject.FK_Materia);

                                                    if (!getSubject) {
                                                        return <></>;
                                                    } else {
                                                        const leftHours = getLeftClassAvailavleHours({ group_scope: groupScopeFac!, schedule_obj: subjectsPerGroup, subject: getSubject! });

                                                        if (leftHours > 0) {
                                                            return <DraggableSubject key={index} index={index} subject={getSubject!} asignment={subjs} leftHours={leftHours} />;
                                                        } else {
                                                            return <></>;
                                                        }
                                                    }
                                                    })
                                                ) : (
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
                                        !subjectsPerGroup.some(validateReset)
                                        ?   <div></div>
                                        :   <button className='info-btn' onClick={resetScheduleMaker}>
                                                <IoReloadCircle/>
                                                Reiniciar
                                            </button>
                                    }

                                </div>
                            </div>
                            <div className="closeHelper" onClick={() => {handleScheduleModal(); setInnerLoading(true);}}>
                                <IoClose/>
                            </div>
                        </div>
                        <div className="weeklyOrganize">
                            <div className="hourDisplayer">
                                <div className="hourRealDisplayer">
                                    {
                                        Array.from({length: totalHours}).map((_ , index) => {
                                            const currentHour = startTime.clone().add(index * 60, 'minutes');
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
                                                <p className='hourText'>1:00 pm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dayContentss" ref={scrollerDayRef} onWheel={handleMouseWheel}>
                                {
                                    Array.from({length: 7}).map((_ , index) => (
                                        <DropDayContainer key={index} day={index} date={`197${index}-11-${index + 2}`}/>
                                    ))
                                }
                            </div>
                        </div>
                    </>
            }
            <ModalComponent handleModalState={() => {}} modalState={wizardModal}>
                <DropWizardModal/>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}} modalState={confirmSaveModal}>
                <ConfirmModal>
                    <div className='confirmModal'>
                        <p>¿Desea guardar el horario seleccionado?</p>
                        <div className="innerRow">
                            <button className='cancel-btn' onClick={() => setConfirmSaveModal(false)}>Seguir Editando</button>
                            <button className='save-btn' onClick={() => {
                                handleScheudleDoneModal(groupScopeFac!.ID_Carrera, groupScopeFac!.ID_Grupo, groupScopeFac!.ID_Turno, 1);
                                setConfirmSaveModal(false);
                                setInnerLoading(true);
                            }}>Guardar y Salir</button>
                        </div>
                    </div>
                </ConfirmModal>
            </ModalComponent>
        </div>
    )
}
