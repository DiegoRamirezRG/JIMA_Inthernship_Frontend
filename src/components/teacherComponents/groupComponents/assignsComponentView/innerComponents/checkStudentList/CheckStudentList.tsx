import React from 'react'
import './CheckStudentList.scss'
import { AttendanceData } from '../../../../../../models/groupsModels/GroupsModels';
import { API_ADDR, APT_PORT } from '../../../../../../utils/env/config';
import def from '../../../../../../assets/img/default.jpg';
import { HiMiniUserGroup } from 'react-icons/hi2';

interface internalProps{
    student: AttendanceData | string;
    checked: boolean;
    addStudents: any;
}

export const CheckStudentList = ({ student, checked, addStudents }: internalProps) => {
    return (
        <div className='studentListCheck' onClick={ addStudents }>
            <input className="inputCheck" type="checkbox" checked={checked} onChange={ () => {} } />
            <div className="studentDetails">
                {
                    typeof(student) == 'string'
                    ?   <div className='renderStudent'>
                            <div className="icon">
                                <HiMiniUserGroup />
                            </div>
                            <p>Render Todos</p>
                        </div>
                    :   <div className="renderStudent">
                            <img src={student.Imagen ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${student.ID_Persona}/${student.Imagen}` : def} alt="ISR-IMG" />
                            <p>{student.Nombre} {student.Apellido_Paterno} {student.Apellido_Materno ?? student.Apellido_Materno}</p>
                        </div>
                }
            </div>
        </div>
    )
}
