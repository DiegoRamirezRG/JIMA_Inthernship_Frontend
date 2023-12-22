import React, { useEffect, useState } from 'react'
import './ScheduleComponentView.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import { useGroupsContext } from '../../../../contexts/groupsContext/GroupsContext'
import { ScheduleObj } from '../../../../models/groupsModels/GroupsModels'
import { EventContentArg, EventInput } from '@fullcalendar/core'
import moment from 'moment'
import { daysOfTheWeekAccent } from '../../../../utils/calendarHelpers/DaysOfTheWeek'
import { useSubjectsContext } from '../../../../contexts/subjectContext/SubjectsContext'
import { DarkColorsForWhite } from '../../../../utils/colorRandom/ColorArrayRandom'

export const ScheduleComponentView = () => {

    const { groupSchedule } = useGroupsContext();
    const { subjectsData } = useSubjectsContext();
    const [events, setEvents] = useState<EventInput[]>([]);

    const fechaActual = moment();
    const diaDeLaSemana = fechaActual.day();
    const diasParaRetroceder = (diaDeLaSemana === 0) ? 7 : diaDeLaSemana;
    const fechaDomingoPasado = fechaActual.clone().subtract(diasParaRetroceder, 'days');


    const formatTheEvents = (schedule: ScheduleObj[]) => {
        const formated = schedule.map((item) : EventInput => {
            let dayIndex = daysOfTheWeekAccent.indexOf(item.Dia);
            let fechaOfEvent = fechaDomingoPasado.clone().add(dayIndex, 'days');
            return ({
                start: fechaOfEvent.clone().set({hours: parseInt(item.Hora_Inicio.split(':')[0]), minutes: parseInt(item.Hora_Inicio.split(':')[1])}).format('YYYY-MM-DD HH:mm'),
                end: fechaOfEvent.clone().set({hours: parseInt(item.Hora_Fin.split(':')[0]), minutes: parseInt(item.Hora_Fin.split(':')[1])}).format('YYYY-MM-DD HH:mm'),
                backgroundColor: '#6941C6',
                borderColor: '#6941C6'
            })
        })
        setEvents(formated)
        console.log(JSON.stringify(formated, null, 4))
    }

    useEffect(() => {
        if(groupSchedule){
            formatTheEvents(groupSchedule);
        }
    }, [groupSchedule])
    

    return (
        <div className='ScheduleContainer'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                slotDuration="00:30:00"
                allDaySlot={false}
                editable={false}
                selectable={false}
                expandRows={true}
                headerToolbar={{}}
                slotMinTime="07:00"
                slotMaxTime="13:00"
                eventOverlap={false}
                locales={[esLocale]}
                firstDay={0}
                dayHeaderFormat={{ weekday: 'long'}}
                events={events}
                eventContent={eventRender}
            />
        </div>
    )
}


export const eventRender = (eventContent: EventContentArg) => {
    return (
        <div style={{ width: '100%', height: '100%', border: 'none', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p style={{margin: '0px', padding: '0px', fontSize: '20px'}}>{moment(eventContent.event.start).format('HH:mm')} a {moment(eventContent.event.end).format('HH:mm')}</p>
        </div>
    )
}
