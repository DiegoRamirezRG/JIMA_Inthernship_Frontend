import React from 'react'
import './FooterStatsComponent.scss'
import { CalendarComponent } from '../calendarComponent/CalendarComponent'
import { GenderStatsComponetn } from '../genderStatsComponent/GenderStatsComponetn'

export const FooterStatsComponent = () => {
    return (
        <div className="footerStats">
            <div className="container1"></div>
            <GenderStatsComponetn/>
            <CalendarComponent/>
        </div>
    )
}
