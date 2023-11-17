import React from 'react'
import { EventContentArg } from '@fullcalendar/core'
import './EventRenders.scss'
import { useSubjectsContext } from '../../../../contexts/subjectContext/SubjectsContext'

export const handleCustomEventRender = (eventContent: EventContentArg) => {

    return (
        <div className='event-container'>
            <div className="event-info">
                <b>{isNaN(Number(eventContent.timeText)) ? eventContent.timeText : ''}</b>
                <p>{eventContent.event.extendedProps.subject.Nombre}</p>
            </div>
            <div className="teacherInformation">
                <p>{eventContent.event.extendedProps.teacher.Nombre} {eventContent.event.extendedProps.teacher.Apellido_Paterno} {eventContent.event.extendedProps.teacher.Apellido_Materno && eventContent.event.extendedProps.teacher.Apellido_Materno}</p>
            </div>
        </div>
    )
}
