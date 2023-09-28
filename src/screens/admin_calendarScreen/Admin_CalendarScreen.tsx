import React, { useEffect } from 'react'
import './Admin_CalendarScreen.scss'
import moment from 'moment';
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import { useCalendarContext } from '../../contexts/calendarContext/CalendarContext'
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent'
import { formatMonthDate } from '../../utils/dateSpanishFormater/dateSpanishFormater';

export const Admin_CalendarScreen = () => {

    const { calendarView, handleCalendarView, renderOptions, getCalendarData, calendarData, getCalendarDataLoading } = useCalendarContext();
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

    useEffect(() => {
        const awaitFunc = async () => {
            await getCalendarData();
        }

        awaitFunc();
    }, [])
    

    return (
        <NavigationComponent>
            <div className="CalendarMaxContainer">
                {
                    getCalendarDataLoading
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="headerTitle">
                                <h2>Calendario</h2>
                            </div>
                            <div className="calendarContent">
                                <div className="calendarHeaderSection">
                                    <div className="monthData">
                                        {formatMonthDate(currentDate.split(' ')[0].split('-')[1])}, {currentDate.split(' ')[0].split('-')[0]}
                                    </div>
                                    <div className="viewRenderOptions">
                                        <div onClick={() => handleCalendarView(0)} className={`renderOpt`}>Anual</div>
                                        <div onClick={() => handleCalendarView(1)} className={`renderOpt`}>Mensual</div>
                                        <div onClick={() => handleCalendarView(2)} className={`renderOpt`}>Semanal</div>
                                        <div onClick={() => handleCalendarView(3)} className={`renderOpt`}>Diario</div>
                                        <div className="active" style={{ left: `${calendarView * 25}%` }}></div>
                                    </div>
                                    <div className="addEvents">
                                        <button>Añadir Evento</button>
                                    </div>
                                </div>
                                <div className="calendarEventsSection">
                                    {
                                        renderOptions.get(calendarView)
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
        </NavigationComponent>
    )
}
