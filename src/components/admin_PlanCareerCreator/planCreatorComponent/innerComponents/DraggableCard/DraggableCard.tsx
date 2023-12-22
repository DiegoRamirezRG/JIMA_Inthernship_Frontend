import React from 'react'
import './DraggableCard.scss'
import { useDrag } from 'react-dnd'
import { SubjectModel } from '../../../../../models/subjectsModels/SubjectModels';

interface DraggableCardInterface{
    subject: SubjectModel;
}

export const DraggableCard = ({ subject }: DraggableCardInterface) => {

    const [ { isDragging }, drag] = useDrag({
        type: 'SubjectContainer',
        item: subject,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    })

    return (
        <div className={`draggableContainer ${isDragging ? 'dragging' : 'no-dragging'}`} ref={drag}>
            <div className="dragglableHeader">
                <p>{subject.Nombre}</p>
            </div>
            <div className="draggableContainerContent">
                <div className="innerRow">
                    <p><b>Creditos:</b> {subject.Creditos}</p>
                    <p><b>Horas/Semanal:</b> {subject.Horas_De_Clase}</p>
                </div>
            </div>
        </div>
    )
}
