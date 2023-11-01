import React from 'react'
import './MakeSchedule.scss'
import { useLoadScheduleContext } from '../../../../../contexts/loadScheduleContext/LoadScheduleContext';
import moment from 'moment';

export const MakeSchedule = () => {

    const { subjectsPerGroup, groups, handleScheduleModal } = useLoadScheduleContext();


    return (
        <div className='makeScheduleContainer' style={{ whiteSpace: 'pre-wrap' }}>
            <div className="makeScheuleMaxContainer">
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
            </div>
        </div>
    )
}
