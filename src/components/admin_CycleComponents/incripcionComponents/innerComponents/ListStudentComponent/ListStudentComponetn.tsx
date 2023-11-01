import React from 'react'
import './ListStudentComponetn.scss'
import { StudentToBe } from '../../../../../models/studentModels/StudentModel';
import { IoTrashOutline } from 'react-icons/io5';
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext';

interface UserListProps{
    student: StudentToBe;
    group: number;
}

export const ListStudentComponetn = ({ student, group } : UserListProps) => {

    const { removeStudentOfGroup } = useReinsInscrContext();

    return (
        <div className='studentListContainer'>
            <div className="studentCred">
                <p>{student.Nombre} {student.Apellido_Paterno} {student.Apellido_Materno ? student.Apellido_Materno : ''}</p>
            </div>
            <div className="deleteSection" onClick={() => removeStudentOfGroup(student.ID_Estudiante, group)}>
                <IoTrashOutline/>
            </div>
        </div>
    )
}
