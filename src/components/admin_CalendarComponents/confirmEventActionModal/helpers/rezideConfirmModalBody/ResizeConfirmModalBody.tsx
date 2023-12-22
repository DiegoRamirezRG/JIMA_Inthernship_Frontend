import React from 'react'
import './ReziseConfirmModalBody.scss'
import { useCalendarContext } from '../../../../../contexts/calendarContext/CalendarContext';
import moment from 'moment';
import 'moment/locale/es';
import { formatDayDate, formatMonthDate } from '../../../../../utils/dateSpanishFormater/dateSpanishFormater';

export const ResizeConfirmModalBody = () => {
    const { resizeHelper } = useCalendarContext();

    return (
        <div className='innerReziseConfirmContainer'>
            <p>El evento <b>{resizeHelper.event.title}</b> 
            <br />
            ha sido modiciado, este iniciando en
            <br />
            <b><i>{formatDayDate(moment(resizeHelper.event.start).format('ddd'))}, {moment(resizeHelper.event.start).format('DD [de]')} {formatMonthDate(moment(resizeHelper.event.start).format('MM'))}</i></b>
            <br />
            {
                moment(resizeHelper.event.start).isSameOrBefore(moment(resizeHelper.event.end))
                ?   <></>
                :   <>
                        y finalizando en
                        <br />
                        <b><i>{formatDayDate(moment(resizeHelper.event.end).format('ddd'))}, {moment(resizeHelper.event.end).subtract(1, 'days').format(' DD [de]')} {formatMonthDate(moment(resizeHelper.event.end).format('MM'))}</i></b>
                    </>
            }
            </p>
            <p>Esto es correcto?</p>
        </div>
    )
}
