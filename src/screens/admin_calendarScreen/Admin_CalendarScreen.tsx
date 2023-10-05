import React, { useEffect, useState } from 'react'
import './Admin_CalendarScreen.scss'
import moment from 'moment';
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import { useCalendarContext } from '../../contexts/calendarContext/CalendarContext'
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent'
import { formatMonthDate } from '../../utils/dateSpanishFormater/dateSpanishFormater';
import { ModalComponent } from '../../components/generalComponents/modalComponent/ModalComponent';
import { CalendarDetailedModalComponent } from '../../components/admin_CalendarComponents/CalendarDetailedModal/CalendarDetailedModalComponent';

export const Admin_CalendarScreen = () => {

    const { calendarView, handleCalendarView, renderOptions, getCalendarDataLoading, formatedData, showDetailedModal, changeDetailedModalState } = useCalendarContext();

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
                                        {formatMonthDate(formatedData!.split(' ')[0].split('-')[1])}, {formatedData!.split(' ')[0].split('-')[0]}
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
            <ModalComponent modalState={showDetailedModal} handleModalState={() => changeDetailedModalState(null, null, null)} modalSize='modal-lg'>
                <CalendarDetailedModalComponent/>
            </ModalComponent>
        </NavigationComponent>
    )
}
