import React from 'react'
import './CalendarEventComponent.scss'
import { MontlyEvents } from '../../../../../models/calendarModels/CalendarModels';
import moment from 'moment';
import { useCalendarContext } from '../../../../../contexts/calendarContext/CalendarContext';

interface EventComponentInterface{
    event: MontlyEvents;
}

export const CalendarEventComponent = ({ event }: EventComponentInterface) => {

    const { loadEventEdit, isEditOrCreateEventActive } = useCalendarContext();
    const fechaMoment = moment(event.event.Fecha_Inicio);
    const hora24 = fechaMoment.format('hh:mm A');    

    return (
        <div className='calendar-event-component'>  
            <p className='hourHelper'>{hora24}</p>
            <div className={`eventContainer ${isEditOrCreateEventActive ? 'disable' : ''}`} style={{borderColor: event.event.Color}} onClick={isEditOrCreateEventActive ? () => {} : () => loadEventEdit(event)}>
                <div className="event-indicator" style={{backgroundColor: event.event.Color}}></div>
                <div className="event-content">
                    <p>{event.event.Titulo}</p>
                    {
                        event.event.Descripcion != null && event.event.Descripcion != '' ? 
                        <p>{event.event.Descripcion}</p>
                        : <></>
                    }
                </div>
            </div>
        </div>
    )
}
