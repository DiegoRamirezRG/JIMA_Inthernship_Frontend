import React from 'react'
import './DraggableSubject.scss'
import { SubjectModel } from '../../../models/subjectsModels/SubjectModels';
import { useLoadScheduleContext } from '../../../contexts/loadScheduleContext/LoadScheduleContext';
import { AsignClasses } from '../../../models/loadScheduleModels/LoadScheduleModels';
import { DarkColorsForWhite } from '../../../utils/colorRandom/ColorArrayRandom';
import { useDrag } from 'react-dnd';

interface subjectInterface{
    subject: SubjectModel;
    asignment: AsignClasses;
    index: number;
    leftHours: number;
}

export const DraggableSubject = ({ subject, asignment, index, leftHours } : subjectInterface) => {

    const [ { isDragging }, drag] = useDrag({
        type: 'scheduleSubContainer',
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
