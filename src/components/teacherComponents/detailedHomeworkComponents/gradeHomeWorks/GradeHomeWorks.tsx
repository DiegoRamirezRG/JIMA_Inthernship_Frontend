import React from 'react'
import './GradeHomeWorks.scss'
import { AssigmentGradeComponent } from '../../assigmnetGradeComponent/AssigmentGradeComponent';

interface innerProps{
    homeworkId: string;
}

export const GradeHomeWorks = ({ homeworkId } : innerProps) => {
    return (
        <div className='gradeMaxContainer'>
            <AssigmentGradeComponent/>
        </div>
    )
}
