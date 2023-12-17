import React, { useEffect, useState } from 'react'
import './LoadReinsSchedule.scss'
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext';
import { useLoadReinsScheduleContext } from '../../../../../contexts/loadScheduleContext/loadReinsScheduleContext';
import { useStudentContext } from '../../../../../contexts/studentContext/StudentContext';
import { filterData } from '../../helpers/DataFormat';

export const LoadReinsSchedule = () => {

    const { loadedGroups, groupNextSubjects } = useReinsInscrContext();
    const { formatGroupsAnsSubjetcs, merguedData, handleReinsScheduleMakerModal, reinscDoneHelper, resetDoneGroup } = useLoadReinsScheduleContext();
    const { lastYearStudents } = useStudentContext();
    const [lastYearStudentMapped, setLastYearStudentMapped] = useState<ReturnType<typeof filterData> | null>(null);

    useEffect(() => {
        setLastYearStudentMapped(filterData(lastYearStudents));
        formatGroupsAnsSubjetcs(loadedGroups, groupNextSubjects);
    }, [loadedGroups, groupNextSubjects])
    

    return (
        <div className='maxLoadScheduleContainer'>
            <div className="loadScheduleHeader">
                <h2>Cargar horarios sobre los grupos</h2>
            </div>
            <div className="renderNeedOfSchedule">
                <div className="dinamycGridContainer">
                    {
                        lastYearStudentMapped && Object.keys(lastYearStudentMapped).map(carreraId  => (
                            Object.keys(lastYearStudentMapped[carreraId]).map(turnoId => (
                                Object.keys(lastYearStudentMapped[carreraId][turnoId]).map(gradoId => (
                                    Object.keys(lastYearStudentMapped[carreraId][turnoId][gradoId]).map(grupoId => {
                                        const datos = lastYearStudentMapped[carreraId][turnoId][gradoId][grupoId];

                                        const scheduleObj = merguedData.find((sche) => (
                                            sche.gradeNumber == datos.grado + 1 &&
                                            sche.id_Career == datos.id_carrera &&
                                            sche.id_Grupo == datos.id_grupo &&
                                            sche.id_Turno == datos.id_turno
                                        ))

                                        const isDone = reinscDoneHelper?.some((done) => (
                                            done.grado == datos.grado &&
                                            done.id_Career === scheduleObj?.id_Career &&
                                            done.id_Grupo === scheduleObj.id_Grupo &&
                                            done.id_Turno === scheduleObj.id_Turno
                                        ));

                                        return (
                                            <div className="groupLoadScheduleContainer">
                                                <p className='career_name'>{datos.carrera}</p>
                                                <div className="innerRow">
                                                    <p><b>Grado: </b><br />{datos.grado + 1}</p>
                                                    <p><b>Grupo: </b><br />{datos.grupo}</p>
                                                    <p><b>Turno: </b><br />{datos.turno}</p>
                                                </div>
                                                <div className="crearHorario">
                                                    <button className='createScheduleBtn' onClick={() => handleReinsScheduleMakerModal(scheduleObj)}>Crear Horario</button>
                                                </div>
                                                {
                                                    isDone ? <div className="isMadeIt">
                                                        <p className='career_name'>{datos.carrera}</p>
                                                        <p>El horario se creo correctamente</p>
                                                        <button className='cancel-btn' onClick={() => resetDoneGroup( scheduleObj!.id_Career, scheduleObj!.id_Grupo, scheduleObj!.id_Turno, datos.grado )}>Reiniciar el horario</button>
                                                    </div>
                                                    :   <></>
                                                }
                                            </div>
                                        )
                                    })
                                ))
                            ))
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
