import React from 'react'
import { AttendanceData } from '../../../../../../models/groupsModels/GroupsModels';
import './StudentRender.scss'
import { API_ADDR, APT_PORT } from '../../../../../../utils/env/config';
import def from '../../../../../../assets/img/default.jpg';
import { TbDotsVertical } from "react-icons/tb";

interface studentProps{
    student: AttendanceData;
    indexing: number;
    maxIndex: number;
}

export const StudentRender = ({ student, indexing, maxIndex } : studentProps) => {
    return (
        <div className='studentRenderContainer'>
            <div className="divider" style={{ backgroundColor: indexing != 0 ? '#6941C6' : 'transparent'}}></div>
            <div className="stdnt-content">
                <div className="studentInformation">
                    <img src={student.Imagen ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${student.ID_Persona}/${student.Imagen}` : def} alt="ISR-IMG" />
                    <div className="dataSet">
                        <p className='stnd-name'>{student.Nombre} {student.Apellido_Paterno} {student.Apellido_Materno ?? student.Apellido_Materno}</p>
                        <p>Matricula: <i>{student.Matricula}</i></p>
                    </div>
                </div>
                <div className="optionsContainer">
                    <TbDotsVertical/>
                </div>
            </div>
            <div className="divider" style={{backgroundColor: 'transparent'}}></div>
        </div>
    )
}
