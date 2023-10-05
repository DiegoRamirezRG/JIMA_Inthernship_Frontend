import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './CalendarComponent.scss'
import { useSpring, animated } from 'react-spring';
import { formatDayDate, formatMonthDate } from '../../../../utils/dateSpanishFormater/dateSpanishFormater';
import { calendarData, calendarEmpty } from '../../../../screens/admin_School_Cycle/temp.data.test';
import { FaRegCalendarTimes } from 'react-icons/fa'

export const CalendarComponent = () => {

    const [showNoEvents, setShowNoEvents] = useState(false);
    const [showNoEventsHelper, setShowNoEventsHelper] = useState(true);

    const fadeInOut = useSpring({
        opacity: showNoEvents ? 1 : 0,
    });

    const fadeInOutReverse = useSpring({
        opacity: showNoEventsHelper ? 1 : 0,
    })
    
    const fechaActual = moment();
    const day = fechaActual.format('ddd');
    const dayNumber = fechaActual.format('DD');
    const monthNumber = fechaActual.format('MM');

    useEffect(() => {
        if(calendarData.length === 0) {
            const timer = setTimeout(() => {
                setShowNoEvents((prev) => !prev);
                setShowNoEventsHelper((prev) => !prev);
            }, 6000);
    
            return () => {
                clearTimeout(timer);
            };
        }
    }, [showNoEvents]);

    return (
        <div className="calendarContainer">
            <div className="headerDectoration">
                {
                    calendarData.length > 0
                    ?   <>
                            <p>{dayNumber}</p>
                            <p>/</p>
                            <p>{formatMonthDate(monthNumber)}</p>
                        </>
                    :   <>
                            <p>{formatDayDate(day)}</p>
                        </>
                }
            </div>
            <div className="calendarBody">
                {
                    calendarData.length > 0
                    ?   <div className='calendar-events'>
                            <>
                                <div className="calendarAction indexinCalendar">
                                    <p className='event-title'>Ver Calendario</p>
                                </div>
                                {
                                    calendarData.map((item, index) => {
                                        const eventDate = moment(item.date);
                                        const day = eventDate.format('DD');
                                        const month = eventDate.format('MM');

                                        const parsedTime = moment(item.time, "HH:mm");
                                        const fomatedTime = parsedTime.format('h:mm A');

                                        const hasPassed = eventDate.isBefore(fechaActual) || (eventDate.isSame(fechaActual, 'day') && moment(item.time, "HH:mm").isBefore(fechaActual));

                                        return !hasPassed 
                                        ?   <div className="calendarAction" key={index}>
                                                <p className='event-title' key={index}>{item.title}</p>
                                                <div className="row" key={index}>
                                                    <p>{day}/{formatMonthDate(month).slice(0,3)}</p>
                                                    <p>{fomatedTime}</p>
                                                </div>
                                            </div>
                                        : <></>
                                    })
                                }
                            </>
                        </div>
                    :   !showNoEvents
                        ?   <animated.div className={'no-calendar-events'} style={fadeInOutReverse}>
                                <FaRegCalendarTimes />
                                <p>No tienes eventos</p>
                            </animated.div>
                        :   <animated.div className={'no-calendar'} style={fadeInOut}>
                                <p>{dayNumber}</p>
                                <p>{formatMonthDate(monthNumber)}</p>
                            </animated.div>
                }
            </div>
        </div>
    )
}
