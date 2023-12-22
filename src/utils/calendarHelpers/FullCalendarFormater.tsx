import moment from "moment";
import { CalendarEvent, FullCalendarEventFormater } from "../../models/calendarModels/CalendarModels";
import { getContrast } from "../colorContrast/colorContrast";
import { EventInput } from "@fullcalendar/core";

export const formatEventForFullCalendar = (rawData: CalendarEvent): EventInput => {
    const today = moment();
    const startDate = moment(rawData.Fecha_Inicio);
    const endDate = moment(rawData.Fecha_Fin);

    const itsOver = endDate ? !endDate.isBefore(today) : true;
    

    const eventFormated : EventInput = {
        id: rawData.ID_Calendario_Eventos!,
        title: rawData.Titulo!,
        start: rawData.Fecha_Inicio!,
        end: rawData.Fecha_Fin != null && rawData.Fecha_Fin != '' ? rawData.Fecha_Fin : '',
        allDay: rawData.Fecha_Fin != null && rawData.Fecha_Fin != '' ? false : true,
        backgroundColor: rawData.Color!,
        borderColor: rawData.Color!,
        textColor: getContrast(rawData.Color!),
        editable: true,
        description: rawData.Descripcion != null ? rawData.Descripcion : '',
    }

    return eventFormated;
}