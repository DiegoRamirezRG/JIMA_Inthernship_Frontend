import React, { useState } from 'react'
import './CreateNewClaendarModal.scss'
import { IoClose } from 'react-icons/io5';
import { useCalendarContext } from '../../../contexts/calendarContext/CalendarContext';
import { NewCalendarCreation } from '../../../models/calendarModels/CalendarModels';
import { DateTimeComponent, InputEditComponent } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';

export const CreateNewCalendarModal = () => {

    const { handleCreateCalendarModal, createCalendar, createCalendarLoader } = useCalendarContext();

    const defaultCalendar: NewCalendarCreation = {
        Nombre: '',
        Inicio: '',
        Fin: ''
    }

    const [creationCalendar, setCreationCalendar] = useState<NewCalendarCreation>(defaultCalendar);

    const changeCreationCalendarState = (name: keyof NewCalendarCreation, value: any) => {
        setCreationCalendar((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const closeModal = () => {
        handleCreateCalendarModal();
        setCreationCalendar(defaultCalendar);
    }

    const handleSendNewCalendar = async () => {
        await createCalendar(creationCalendar.Nombre, creationCalendar.Inicio, creationCalendar.Fin);
    }

    return (
        <>
            {
                createCalendarLoader
                ?   <LoadingComponent/>
                :   <div className='modal-content'>
                        <div className="modal-header">
                            <div></div>
                            <button className='modal-btn-close' onClick={closeModal}>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="createCalendarModalInnerBody">
                                <div className="autoGridContainer">
                                    <p>Ahora vamos a crear un Calendario, para ello solo es necesario indicar la fecha y hora de Inicio ademas para el Final.</p>
                                    <InputEditComponent id={'calendarName'} placeholder={'Titulo del Calendario'} value={creationCalendar.Nombre} label={'Titulo del Calendario (?)'} name={'Nombre'} inputType={'text'} editActive={true} onChange={changeCreationCalendarState}/>
                                    <DateTimeComponent id={'calendarStart'} label={'Fecha y hora inicial'} name={'Inicio'} date={creationCalendar.Inicio} onChange={changeCreationCalendarState} />
                                    <DateTimeComponent id={'calendarEnd'} label={'Fecha y hora final'} name={'Fin'} date={creationCalendar.Fin} onChange={changeCreationCalendarState} />
                                    <button className='createBtn' onClick={handleSendNewCalendar}>Crear Calendario</button>
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-footer">
                            <button onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
            }
        </>
    )
}
