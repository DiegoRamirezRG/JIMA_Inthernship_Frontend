import React, { useEffect, useRef, useState } from 'react'
import { daysOfTheWeek } from '../../../../utils/calendarHelpers/DaysOfTheWeek';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { handleCustomEventRender } from '../../../admin_ScheduleMaker/dropDayContainer/helper/EventRenders';
import { useDrop } from 'react-dnd';
import { SubjectModel } from '../../../../models/subjectsModels/SubjectModels';
import { useReinsInscrContext } from '../../../../contexts/reins_inscrContext/ReinsInscrContext';
import { useLoadReinsScheduleContext } from '../../../../contexts/loadScheduleContext/loadReinsScheduleContext';
import { useSubjectsContext } from '../../../../contexts/subjectContext/SubjectsContext';
import { useTeacherContext } from '../../../../contexts/teacherContext/TeacherContext';
import { EventInput } from '@fullcalendar/core';
import moment from 'moment';
import { DarkColorsForWhite } from '../../../../utils/colorRandom/ColorArrayRandom';

interface dropDayInterface{
    day: number;
    date: string;
}

export const DropDayReinsContainer = ({ date, day }: dropDayInterface) => {

    const calendarRef = useRef<FullCalendar>(null);
    const { handlerWizardReinsModal, workingObj, dummyRednerHelper, merguedData, wizardReinsConfirmModal, onResizeReinsc, onMoveReincs } = useLoadReinsScheduleContext();
    const { subjectsData } = useSubjectsContext();
    const { teachers } = useTeacherContext();
    const [scheduleEvents, setScheduleEvents] = useState<EventInput[]>([]);

    const [{ isOver }, drop] = useDrop({
        accept: 'scheduleReinsSubContainer',
        drop: (item: SubjectModel) => {
            handlerWizardReinsModal(item, day);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const filterByDay = () => {
        const grupoOjb = merguedData.find((gro) => gro.id_Career === workingObj!.id_Career && gro.id_Grupo === workingObj!.id_Grupo && gro.id_Turno === workingObj!.id_Turno);

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
        if(workingObj && merguedData){
            filterByDay();
        }

        if (calendarRef.current) {
            calendarRef.current.getApi().refetchEvents();
        }
    }, [dummyRednerHelper, wizardReinsConfirmModal])

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
                    eventResize={onResizeReinsc}
                    eventDrop={onMoveReincs}
                    dayHeaderContent={() => <div style={{ display: 'none' }} />}
                    slotLabelContent={() => <div style={{ display: 'none' }} />}
                />
            </div>
        </div>
    )
}
