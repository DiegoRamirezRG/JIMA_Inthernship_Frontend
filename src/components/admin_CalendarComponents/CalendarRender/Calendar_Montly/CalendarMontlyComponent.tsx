import React, { useEffect, useState } from 'react'
import './CalendarMontlyComponent.scss'
import moment from 'moment';
import { daysOfTheWeek } from '../../../../utils/calendarHelpers/DaysOfTheWeek';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useCalendarContext } from '../../../../contexts/calendarContext/CalendarContext';
import { DayCalendarComponent } from './DayCalendarComponent/DayCalendarComponent';
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';

export const CalendarMontlyComponent = () => {

    const { nextMonthHandler, passMonthHandler, monthDays, getEventsDataLoading} = useCalendarContext();

    return (
        <div className='montlyContainer'>
            <div className="weekDaysHeader">
                <div className="actions">
                    <button onClick={passMonthHandler}><IoChevronBack/></button>
                    <button onClick={nextMonthHandler}><IoChevronForward/></button>
                </div>
                {
                    daysOfTheWeek.map((day, index) => (
                        <div className="dayHeader" key={index}>{day}</div>
                    ))
                }
            </div>
            <div className="dayWeeksFormer">
                <div>a</div>
                <div className="calendarContent">
                    {
                        getEventsDataLoading
                        ?   <LoadingComponent/>
                        :   <div className='daysOfMonthSection'>
                                {
                                    monthDays.map((item, index) => (
                                        <DayCalendarComponent key={index} day={item.dayNumber} dayText={item.dayText} month={item.month} year={item.year}/>
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
