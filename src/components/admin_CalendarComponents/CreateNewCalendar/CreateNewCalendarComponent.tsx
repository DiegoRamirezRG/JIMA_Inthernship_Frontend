import React from 'react'
import './CreateNewCalendarComponent.scss'
import { useCalendarContext } from '../../../contexts/calendarContext/CalendarContext'

export const CreateNewCalendarComponent = () => {

    const { handleCreateCalendarModal } = useCalendarContext();

    return (
        <div className='createNewCalendarContainer'>
            <div className="createNewCalendarAdvisor">
                <p>No hay Calendario Activo</p>
                <p>El Calendario no esta activo, para continuar por favor realiza un calendario, este necesita ser creado para comenzar el ciclo, para añadir eventos necesarios como reincripciones y mas.</p>
                <p>En caso de haber Calendario Activo y este no este apreciendo, por favor contacta a soporte para solicitar mas informacion.</p>
            </div>
            <button onClick={handleCreateCalendarModal}>Crear Calendario</button>
        </div>
    )
}
