import moment from "moment";
import { CalendarEvent, CreateOrEditCalendarEvent } from "../../../models/calendarModels/CalendarModels"

export const validateEvent = (event: CalendarEvent | CreateOrEditCalendarEvent) => {
    return new Promise((resolve, reject) => {
        
        if(event.Titulo.length <= 0 || event.Titulo.length > 50){
            return reject(new Error('El Titulo no cumple los requisitos'));
        }

        if(!moment(event.Fecha_Inicio, 'YYYY-MM-DD HH:mm:ss', true).isValid()){
            return reject(new Error('La Fecha de Inicio no cumple los requisitos'));
        }

        if(event.Fecha_Fin != '' && event.Fecha_Fin != null){
            if(!moment(event.Fecha_Fin, 'YYYY-MM-DD HH:mm:ss', true).isValid()){
                return reject(new Error('La Fecha de Finalizacion no cumple los requisitos'));
            }
        }

        const hexaRegEx = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        if(!hexaRegEx.test(event.Color)){
            return reject(new Error('El color seleccionado no cumple los requisitos'));
        }

        resolve('Informacion valida');
    })
}