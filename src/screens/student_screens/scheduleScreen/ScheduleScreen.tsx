import React, { useContext, useEffect, useState } from 'react'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { FaFileExport } from 'react-icons/fa'
import './ScheduleScreen.scss'
import FullCalendar from '@fullcalendar/react'
import esLocale from '@fullcalendar/core/locales/es'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useStudentContext } from '../../../contexts/studentContext/StudentContext'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import AuthContext from '../../../contexts/authContext/AuthContext'
import { useNavigate } from 'react-router-dom'
import { EventContentArg, EventInput } from '@fullcalendar/core'
import moment from 'moment'
import { studentScheduleObj } from '../../../models/groupsModels/GroupsModels'
import { daysOfTheWeekAccent } from '../../../utils/calendarHelpers/DaysOfTheWeek'
import { DarkColorsForWhite } from '../../../utils/colorRandom/ColorArrayRandom'
import { showErrorTost } from '../../../components/generalComponents/toastComponent/ToastComponent'
import { ModalComponent } from '../../../components/generalComponents/modalComponent/ModalComponent'
import { API_ADDR, APT_PORT } from '../../../utils/env/config'
import noSchedule from '../../../assets/svg/no_schedule.svg'

export const ScheduleScreen = () => {

    const { state } = useContext(AuthContext);
    const { studentSchedule, studentScheduleLoading, getStudentSchedule } = useStudentContext();

    const navigate = useNavigate();

    const [events, setEvents] = useState<EventInput[]>([]);
    const [isExportingToPdfLoading, setIsExportingToPdfLoading] = useState(false);

    const fechaActual = moment();
    const diaDeLaSemana = fechaActual.day();
    const diasParaRetroceder = (diaDeLaSemana === 0) ? 7 : diaDeLaSemana;
    const fechaDomingoPasado = fechaActual.clone().subtract(diasParaRetroceder, 'days');

    const helperCount = (schedule: studentScheduleObj[]): string[] => {
        const norepeatedNames: string[] = [];
        schedule.map((obj) => {
            if(!(norepeatedNames.includes(obj.Nombre))){
                norepeatedNames.push(obj.Nombre)
            }
        })
        return norepeatedNames;
    }

    const formatEvents = (schedule: studentScheduleObj[]) => {        
        const uniqueNumberNames = helperCount(schedule);

        const formated = schedule.map((obj) : EventInput => {
            let dayIndex = daysOfTheWeekAccent.indexOf(obj.Dia);
            let fechaOfEvent = fechaDomingoPasado.clone().add(dayIndex, 'days');
            return ({
                start: fechaOfEvent.clone().set({hours: parseInt(obj.Hora_Inicio.split(':')[0]), minutes: parseInt(obj.Hora_Inicio.split(':')[1])}).format('YYYY-MM-DD HH:mm'),
                end: fechaOfEvent.clone().set({hours: parseInt(obj.Hora_Fin.split(':')[0]), minutes: parseInt(obj.Hora_Fin.split(':')[1])}).format('YYYY-MM-DD HH:mm'),
                backgroundColor: DarkColorsForWhite[uniqueNumberNames.indexOf(obj.Nombre) + 3],
                borderColor: DarkColorsForWhite[uniqueNumberNames.indexOf(obj.Nombre) + 3],
                title: obj.Nombre,
                extendedProps: {
                    ID_Clase: obj.FK_Clase
                }
            })
        })

        setEvents(formated)
    }

    const handleScheduleMakerPdf = async () => {
        try {
            setIsExportingToPdfLoading(true);
            const pdfUrl = `http://${API_ADDR}:${APT_PORT}/api/student/schedule/generateSchedule/${state.loggedUser?.ID_Persona}`;
            window.open(pdfUrl, '_blank');
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        } finally {
            setIsExportingToPdfLoading(false);
        }
    }

    useEffect(() => {
        if(state.loggedUser?.ID_Persona){
            const awaitFc = async () => {
                await getStudentSchedule(state.loggedUser!.ID_Persona);
            }
            awaitFc();
        }
    }, [state.loggedUser]);

    useEffect(() => {
        if(studentSchedule.length > 0){
            formatEvents(studentSchedule);
        }
    }, [studentSchedule]);

    return (
        <NavigationComponent>
            <div className="maxStudentContainer">
                {
                    studentScheduleLoading
                    ?   <LoadingComponent/>
                    :   studentSchedule.length > 0
                        ?
                            <>
                                <div className="scheduleHeader">
                                    <h2>Horario</h2>
                                    <div className="acctionsContainer">
                                        <button onClick={handleScheduleMakerPdf}>
                                            <FaFileExport />
                                            Exportar a PDF
                                        </button>
                                    </div>
                                </div>
                                <div className="scheduleBody">
                                    <FullCalendar
                                        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                                        locales={[esLocale]}
                                        allDaySlot={false}
                                        editable={false}
                                        selectable={false}
                                        expandRows={true}
                                        headerToolbar={{}}
                                        initialView="timeGridWeek"
                                        slotMinTime="07:00"
                                        slotMaxTime="13:00"
                                        slotDuration="00:30:00"
                                        eventOverlap={false}
                                        firstDay={0}
                                        dayHeaderFormat={{ weekday: 'long'}}
                                        eventContent={eventRender}
                                        events={events}
                                        eventClick={(event) => {
                                            localStorage.setItem('showedPage', '1');
                                            navigate(`/student/classes/${event.event.extendedProps.ID_Clase}`)
                                        }}
                                    />
                                </div>
                            </>
                        :   <div className='no_schedule'>
                                <p>No tienes un horario activo</p>
                                <img src={noSchedule} />
                            </div>
                }
                <ModalComponent modalState={isExportingToPdfLoading} handleModalState={() => {}}>
                    <div className="loadingExportContainer">
                        <LoadingComponent/>
                        <p className='loading_banner'>Exportando tu horario</p>
                    </div>
                </ModalComponent>
            </div>
        </NavigationComponent>
    )
}

const eventRender = (eventContent: EventContentArg) => {
    return (
        <div className="scheduleEventContainer" style={{ backgroundColor: eventContent.backgroundColor, borderColor: eventContent.borderColor }}>
            <p className='event_title_p'>{eventContent.event.title}</p>
            <div className="innerScheduleRow">
                <p>{ moment(eventContent.event.start).format('hh:mm a') }</p>
                -
                <p>{ moment(eventContent.event.end).format('hh:mm a') }</p>
            </div>
        </div>
    )
}