import React, { useContext, useEffect, useState } from 'react'
import './SchedulesScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { FaFileExport } from 'react-icons/fa'
import FullCalendar from '@fullcalendar/react'
import esLocale from '@fullcalendar/core/locales/es'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useTeacherContext } from '../../../contexts/teacherContext/TeacherContext'
import AuthContext from '../../../contexts/authContext/AuthContext'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import { EventContentArg, EventInput } from '@fullcalendar/core'
import { teacherScheduleObj } from '../../../models/groupsModels/GroupsModels'
import { daysOfTheWeekAccent } from '../../../utils/calendarHelpers/DaysOfTheWeek'
import moment from 'moment'
import { DarkColorsForWhite } from '../../../utils/colorRandom/ColorArrayRandom'
import { useNavigate } from 'react-router-dom'

export const SchedulesScreen = () => {

    const { state } = useContext(AuthContext);
    const { teacherSchedule, isTeacherScheduleLoading, getTeacherSchedule } = useTeacherContext();

    const navigate = useNavigate();

    const [events, setEvents] = useState<EventInput[]>([]);

    const fechaActual = moment();
    const diaDeLaSemana = fechaActual.day();
    const diasParaRetroceder = (diaDeLaSemana === 0) ? 7 : diaDeLaSemana;
    const fechaDomingoPasado = fechaActual.clone().subtract(diasParaRetroceder, 'days');

    const helperCount = (schedule: teacherScheduleObj[]): string[] => {
        const norepeatedNames: string[] = [];
        schedule.map((obj) => {
            if(!(norepeatedNames.includes(obj.Nombre))){
                norepeatedNames.push(obj.Nombre)
            }
        })
        return norepeatedNames;
    }

    const formatEvents = (schedule: teacherScheduleObj[]) => {        
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

    useEffect(() => {
        if(state.loggedUser?.ID_Persona){
            const awaitFc = async () => {
                await getTeacherSchedule(state.loggedUser!.ID_Persona);
            }
            awaitFc();
        }
    }, [state.loggedUser]);

    useEffect(() => {
        if(teacherSchedule.length > 0){
            formatEvents(teacherSchedule);
        }
    }, [teacherSchedule])

    return (
        <NavigationComponent>
            <div className="maxScheduleTeacherContainer">
                {
                    isTeacherScheduleLoading
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="scheduleHeader">
                                <h2>Horario</h2>
                                <div className="acctionsContainer">
                                    <button>
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
                                        navigate(`/teacher/classes/${event.event.extendedProps.ID_Clase}`)
                                    }}
                                />
                            </div>
                        </>
                }
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