import React from 'react'
import './FooterStatsComponent.scss'
import { CalendarComponent } from '../calendarComponent/CalendarComponent'
import { GenderStatsComponetn } from '../genderStatsComponent/GenderStatsComponetn'
import { GenderStats } from '../../../../models/stadisticsModels/stadisticsModels'

interface props {
    genders: GenderStats[];
}

export const FooterStatsComponent = ({ genders }: props) => {
    return (
        <div className="footerStats">
            <div className="container1"></div>
            <GenderStatsComponetn data={genders}/>
            <CalendarComponent/>
        </div>
    )
}
