import React from 'react'
import './CalendarWeekCounter.scss'
import { CalendarInfo } from '../../../models/calendarModels/CalendarModels';
import moment from 'moment';
import { formatMonthDate } from '../../../utils/dateSpanishFormater/dateSpanishFormater';
import { Tooltip } from 'react-tooltip';

interface innerProps {
    calendarInfo: CalendarInfo | null;
}

export const CalendarWeekCounter = ({ calendarInfo }: innerProps) => {
    return (
        <div className="weekCounterContainer">
            <div className="innerRow">
                <p className='cardHeader'>Calendario</p>
                <p className='cardHeader'>18 Sem</p>
            </div>
            <div className="innerRow">
                <p className='weeksDis'>{moment(calendarInfo?.Inicio).format('DD/')}{formatMonthDate(moment(calendarInfo?.Inicio).format('MM')).slice(0, 3)}</p>
                <p className='weeksDis'>{moment(calendarInfo?.Fin).format('DD/')}{formatMonthDate(moment(calendarInfo?.Fin).format('MM')).slice(0, 3)}</p>
            </div>
            <div className="displayers">
                <div className="noColoredBar"></div>
                <div className="weekIndicatorBar" 
                data-tooltip-id="weekerSlideToolTip"
                data-tooltip-content={`Semana ${moment().diff(moment(calendarInfo?.Inicio), 'weeks')}`}
                data-tooltip-place="top-end"
                style={{ width: `${100 / moment(calendarInfo?.Fin).diff(moment(calendarInfo?.Inicio), 'weeks') * moment().diff(moment(calendarInfo?.Inicio), 'weeks')}%`, }}></div>
            </div>
            <Tooltip id="weekerSlideToolTip" className='weekerTooltip'/>
        </div>
    )
}
