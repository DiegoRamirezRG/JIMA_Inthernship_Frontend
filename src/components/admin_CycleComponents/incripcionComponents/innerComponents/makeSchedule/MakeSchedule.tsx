import React from 'react'
import './MakeSchedule.scss'
import { useLoadScheduleContext } from '../../../../../contexts/loadScheduleContext/LoadScheduleContext';
import moment from 'moment';

export const MakeSchedule = () => {

    const { subjectsPerGroup, groups, handleScheduleModal, groupdDone } = useLoadScheduleContext();


    return (
        <div className='makeScheduleContainer' style={{ whiteSpace: 'pre-wrap' }}>
            <div className="makeScheuleMaxContainer">
                {
                    groups && groupdDone && groupdDone.length == groups.length
                    ?   <div className='AllSubjectsSuited'>
                            <p>Los horarios han sido cargados</p>
                            <p>Las horarios han sido cargados en la memoria temporal del sistema, en caso de que quieras cancelar los datos no se veran afectados y podras volver a empezar.</p>
                            <p>Por favor continua con la confirmacion para comenzar el año escolar.</p>
                        </div>
                    :   <>
                            <div className="makeScheudleHeader">
                                <h2>Necesitas cargar horarios para los siguientes grupos de nuevo ingreso</h2>
                            </div>
                            <div className="gridSectionMaxContainer">
                                <div className="dynamicHeighContainer">
                                    {
                                        groups && groups
                                        .filter((item) => {
                                            if(subjectsPerGroup.length > 0){
                                                return true
                                            }else{
                                                return subjectsPerGroup.some((group) => group.id_Career === item.ID_Carrera && group.class_teacher.length === 0)
                                            }
                                        })
                                        .filter((item) => !groupdDone?.some((done) => done.grado == 1 && done.id_Career === item.ID_Carrera && done.id_Grupo === item.ID_Grupo && done.id_Turno === item.ID_Turno))
                                        .map((group, index) => (
                                            <div key={index} className='makeScheuldeCard'onClick={() => handleScheduleModal(group)}>
                                                <p className='title'>{group.Carrera}</p>
                                                <p className='enph'>Grupo <b>{group.Indicador}</b> | Materias <b>{subjectsPerGroup.filter((item) => item.id_Career === group.ID_Carrera).reduce((total, cty) => total + cty.class_teacher.length, 0)}</b></p>
                                                <div className="innerRow">
                                                    <p>{moment(group.Hora_Inicio, "HH:mm:ss").format("hh:mm a")} - {moment(group.Hora_Fin, "HH:mm:ss").format("hh:mm a")}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
