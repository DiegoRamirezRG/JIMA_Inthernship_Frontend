import React, { useEffect, useState } from 'react'
import './DayCalendarComponent.scss'
import moment from "moment";
import { useCalendarContext } from '../../../../../contexts/calendarContext/CalendarContext';
import { CalendarEvent, MontlyEvents } from '../../../../../models/calendarModels/CalendarModels';
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';

interface DayCalendarProps{
    day: number;
    dayText: string;
    year: number;
    month: number;
}

export const DayCalendarComponent = ({ day, dayText, month, year }: DayCalendarProps) => {

    const { monthEvents, changeDetailedModalState } = useCalendarContext();
    const helper = monthEvents?.filter(event => event.day === day) || [];
    const today = moment().format('YYYY-MM-D');    

    return (
        <div className={`CalendarDay ${day == 0 ? 'no-active' : `active`}`} onClick={() => changeDetailedModalState(day, month, year)}>
            <div className="numberDate">
                {day != 0 ? day : ''}
            </div>
            {
                day === parseInt(today.split('-')[2]) && month === parseInt(today.split('-')[1]) && year === parseInt(today.split('-')[0])
                ?   <div className='today'></div>
                :   <></>
            }
            <div className="eventsContainer">
                {
                    helper?.slice(0, 3).map((event, index) => (
                        <div className='eventIndividual' key={index}>
                            <div className="eventIndicator" style={{backgroundColor: `${event.event.Color}`}}></div>
                            <p>{event.event.Titulo}</p>
                        </div>
                    ))
                }
                {
                    helper && helper.length > 3 && (
                        <div className="eventIndividual extraChildrens">
                            <p>{`+ ${helper.length - 3} evento`}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
