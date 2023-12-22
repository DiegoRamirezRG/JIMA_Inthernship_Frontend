import React, { useContext, useEffect, useState } from 'react'
import './Admin_CalendarScreen.scss'
import { NavigationComponent } from "../../components/generalComponents/navigationComponent/NavigationComponent"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import multiMonthPlugin from '@fullcalendar/multimonth'
import esLocale from '@fullcalendar/core/locales/es'
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent'
import { useCalendarContext } from '../../contexts/calendarContext/CalendarContext'
import { ModalComponent } from '../../components/generalComponents/modalComponent/ModalComponent'
import { AddNewEventModal } from '../../components/admin_CalendarComponents/AddNewEventModal/AddNewEventModal'
import { ConfirmEventActionModal } from '../../components/admin_CalendarComponents/confirmEventActionModal/ConfirmEventActionModal'
import { DetailEventModal } from '../../components/admin_CalendarComponents/DetailEventModal/DetailEventModal'
import { CreateNewCalendarComponent } from '../../components/admin_CalendarComponents/CreateNewCalendar/CreateNewCalendarComponent'
import { CreateNewCalendarModal } from '../../components/admin_CalendarComponents/CreateNewCalendarModal/CreateNewCalendarModal'
import AuthContext from '../../contexts/authContext/AuthContext'

export const Admin_CalendarScreen = () => {

    const { fullCalendarArray, eventLoader, getEventsFunction, eventResize, eventRender, createEventModal, handleCreateEventModal, confirmChangeModal, eventDrop, eventClick, detailEventModal, handleDetailEventModal, isCalendarExist, createCalendarModal, isCalendarExistLoading } = useCalendarContext();
    const { state } = useContext(AuthContext);
    useEffect(() => {
        const asyncHelper = async () => {
            isCalendarExist
            ? await getEventsFunction()
            : () => {}
        }
        asyncHelper();
    }, [isCalendarExist]);

    return (
        <NavigationComponent>
            <div className="CalendarMaxContainer">
                <div className="calendarContent">
                    {
                        eventLoader || isCalendarExistLoading
                        ?   <LoadingComponent/>
                        :   !isCalendarExist   
                            ?   <CreateNewCalendarComponent/>
                            :   <div className="calendarEventsSection">
                                    <div className="calendarContainerFullCalendar">
                                        <FullCalendar
                                            plugins={[ dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin ]}
                                            select={handleCreateEventModal}
                                            initialView='dayGridMonth'
                                            headerToolbar={{
                                                left: 'prev,next today',
                                                center: 'title',
                                                right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay'
                                            }}
                                            locales={[esLocale]}
                                            editable={ state.loggedUser && state.loggedUser.Rol == 'Administrativo' ? true : false }
                                            selectable={ state.loggedUser && state.loggedUser.Rol == 'Administrativo' ? true : false }
                                            selectMirror={ state.loggedUser && state.loggedUser.Rol == 'Administrativo' ? true : false }
                                            dayMaxEvents={true}
                                            eventResize={eventResize}
                                            eventContent={eventRender}
                                            eventDrop={eventDrop}
                                            eventClick={eventClick}
                                            dayHeaderFormat={{ weekday: 'long'}}
                                            events={fullCalendarArray}
                                        />
                                    </div>
                                </div>
                    }
                </div>
            </div>
            <ModalComponent modalState={createEventModal} handleModalState={handleCreateEventModal}>
                <AddNewEventModal/>
            </ModalComponent>
            <ModalComponent modalState={confirmChangeModal} handleModalState={() => {}}>
                <ConfirmEventActionModal/>
            </ModalComponent>
            <ModalComponent modalState={detailEventModal} handleModalState={() => {}}>
                <DetailEventModal/>
            </ModalComponent>
            <ModalComponent modalState={createCalendarModal} handleModalState={() => {}}>
                <CreateNewCalendarModal/>
            </ModalComponent>
        </NavigationComponent>
    )
}
