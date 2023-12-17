import React from 'react'
import { SubjectModel } from '../../../../models/subjectsModels/SubjectModels';
import { DarkColorsForWhite } from '../../../../utils/colorRandom/ColorArrayRandom';
import { useDrag } from 'react-dnd';

interface subjectInterface{
    subject: SubjectModel;
    index: number;
    leftHours: number;
}

export const DraggableReinsSubject = ({ subject, index, leftHours } : subjectInterface) => {

    const [ { isDragging }, drag] = useDrag({
        type: 'scheduleReinsSubContainer',
        item: subject,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    })

    return (
        <div className='draggableSubjectContainer' style={{ backgroundColor: DarkColorsForWhite[index] }} ref={drag} key={index}>
            <p>{ subject.Nombre }</p>
            <p>{ leftHours } horas</p>
        </div>
    )
}
