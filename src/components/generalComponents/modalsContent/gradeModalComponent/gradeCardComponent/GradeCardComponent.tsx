import React from 'react'
import './GradeCardComponent.scss'
import { Grade } from '../../../../../models/schoolInfoModels/schoolInfoModels'
import { IoSettingsSharp } from 'react-icons/io5';

interface gradeCardProps{
    grade: Grade;
    isAlreadyEditing: boolean;
    loadData: (grade: Grade) => void;
}

export const GradeCardComponent = ({ grade, isAlreadyEditing, loadData } : gradeCardProps) => {
    return (
        <div className='GradeCardComponent'>
            <p>{grade.Numero}</p>
            <div className={`edit ${isAlreadyEditing ? 'disable' : ''}`} onClick={() => loadData(grade)}>
                <IoSettingsSharp/>
            </div>
        </div>  
    )
}
