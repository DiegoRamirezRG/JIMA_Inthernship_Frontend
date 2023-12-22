import React from 'react'
import './DropConfirmModalBody.scss'
import { useCalendarContext } from '../../../../../contexts/calendarContext/CalendarContext';
import moment from 'moment';
import { formatDayDate, formatMonthDate } from '../../../../../utils/dateSpanishFormater/dateSpanishFormater';

export const DropConfrimModalBody = () => {

    const { dropHelper } = useCalendarContext();

    return (
        <div className='DropConfrimModalBody'>
            <p>El evento <b>{dropHelper.event.title}</b> 
            <br />
            ha sido modiciado, este iniciando en
            <br />
            <b><i>{formatDayDate(moment(dropHelper.event.start).format('ddd'))}, {moment(dropHelper.event.start).format('DD [de]')} {formatMonthDate(moment(dropHelper.event.start).format('MM'))}</i></b>
            <br />
            {
                dropHelper.event.end != '' && dropHelper.event.end
                    ?   <>
                            y finalizando en
                            <br />
                            <b><i>{formatDayDate(moment(dropHelper.event.end).format('ddd'))}, {moment(dropHelper.event.end).subtract(1, 'days').format(' DD [de]')} {formatMonthDate(moment(dropHelper.event.end).format('MM'))}</i></b>
                            <p>Esto es correcto?</p>
                        </>
                    :   <></>
            }
            </p>
        </div>
    )
}
