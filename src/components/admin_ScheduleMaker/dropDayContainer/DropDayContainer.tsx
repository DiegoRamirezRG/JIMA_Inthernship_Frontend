import React, { useEffect, useRef, useState } from 'react'
import './DropDayContainer.scss'
import { daysOfTheWeek } from '../../../utils/calendarHelpers/DaysOfTheWeek';
import {Panes, ResizablePanes} from 'resizable-panes-react';
import { useDrop } from 'react-dnd';
import { useLoadScheduleContext } from '../../../contexts/loadScheduleContext/LoadScheduleContext';
import moment from 'moment';
import { SubjectModel } from '../../../models/subjectsModels/SubjectModels';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DateSelectArg, EventInput } from '@fullcalendar/core';
import { handleCustomEventRender } from './helper/EventRenders';
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext';
import { useTeacherContext } from '../../../contexts/teacherContext/TeacherContext';
import { DarkColorsForWhite } from '../../../utils/colorRandom/ColorArrayRandom';
import { renderOpts } from '../../admin_UsersComponents/userDescriptionCards/helpers/static_objects/static_objects';

interface dropDayInterface{
    day: number;
    date: string;
}

export const DropDayContainer = ({ day, date }: dropDayInterface) => {

    const { groupScopeFac, subjectsPerGroup, handleWizardModal, dummyRender, onRezise , onMove, scheduleMakerModal } = useLoadScheduleContext();
    const { subjectsData } = useSubjectsContext();
    const { teachers } = useTeacherContext();
    const [scheduleEvents, setScheduleEvents] = useState<EventInput[]>([]);

    //testing
    const [render, setRender] = useState(0)

    const calendarRef = useRef<FullCalendar>(null)
    
    const [{ isOver }, drop] = useDrop({
        accept: 'scheduleSubContainer',
        drop: (item: SubjectModel) => {
            handleWizardModal(item, day);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const filterByDay = () => {
        const grupoOjb = subjectsPerGroup.find((gro) => gro.id_Career === groupScopeFac!.ID_Carrera && gro.id_Grupo === groupScopeFac!.ID_Grupo && gro.id_Turno === gro.id_Turno);

        if (!grupoOjb) {
            setScheduleEvents([]);
            return;
        }

        const helper: EventInput[] = [];

        grupoOjb?.class_teacher.forEach((ct, index) => {
            if (ct.schedule) {
                const subjectsDay = ct.schedule
                .filter((s) => s.Dia === daysOfTheWeek[day])
                .map((s) => ({
                    start: moment(date).set({hour: parseInt(s.Hora_Inicio.split(':')[0]), minute: parseInt(s.Hora_Inicio.split(':')[1])}).format(),
                    end: moment(date).set({hour: parseInt(s.Hora_Fin.split(':')[0]), minute: parseInt(s.Hora_Fin.split(':')[1])}).format(),
                    backgroundColor: DarkColorsForWhite[index],
                    borderColor: DarkColorsForWhite[index],
                    extendedProps: {
                        FK_Materia: ct.FK_Materia,
                        FK_Profesor: ct.FK_Profesor,
                        subject: subjectsData.find((subject) => subject.ID_Materia === ct.FK_Materia),
                        teacher: teachers ? teachers.find((teacher) => teacher.ID_Profesor === ct.FK_Profesor) : [],
                        day: day
                    },
                }));
                helper.push(...subjectsDay)
            }
        })

        setScheduleEvents(helper);
    }

    useEffect(() => {
        if(groupScopeFac && subjectsPerGroup){
            filterByDay();
        }

        if (calendarRef.current) {
            calendarRef.current.getApi().refetchEvents();
        }
    }, [dummyRender, scheduleMakerModal])

    return (
        <div className='dropDayContainer'>
            <div className="dayHeader">
                <p>{daysOfTheWeek[day]}</p>
            </div>
            <div className="dropableArea" ref={drop}>
                <FullCalendar
                    key={JSON.stringify(scheduleEvents)}
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{}}
                    initialView="timeGridDay"
                    slotDuration="00:30:00"
                    initialDate={new Date(date)}
                    firstDay={1}
                    slotMinTime="07:00"
                    slotMaxTime="13:00"
                    allDaySlot={false}
                    expandRows={true}
                    editable={true}
                    selectable={false}
                    selectMirror={true}
                    dayMaxEvents={true}
                    eventOverlap={false}
                    events={scheduleEvents}
                    eventContent={handleCustomEventRender}
                    eventResize={onRezise}
                    eventDrop={onMove}
                    dayHeaderContent={() => <div style={{ display: 'none' }} />}
                    slotLabelContent={() => <div style={{ display: 'none' }} />}
                />
            </div>
        </div>
    )
}
