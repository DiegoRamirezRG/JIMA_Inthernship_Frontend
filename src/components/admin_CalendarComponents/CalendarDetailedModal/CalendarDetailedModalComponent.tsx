import React, { ChangeEvent, useEffect, useState } from 'react'
import './CalendarDetailedModalComponent.scss'
import { useCalendarContext } from '../../../contexts/calendarContext/CalendarContext'
import { formatDateFromNumber } from '../../../utils/dateSpanishFormater/dateSpanishFormater';
import { IoAdd } from 'react-icons/io5';
import { CalendarEventComponent } from '../CalendarRender/Calendar_Montly/CalendarEventComponent/CalendarEventComponent';
import { DateTimeComponent, InputEditComponent, TimeEditComponent } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import moment from 'moment';
import { darken } from 'polished';
import { HexColorPicker } from 'react-colorful';
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';
import { MontlyEvents } from '../../../models/calendarModels/CalendarModels';

export const CalendarDetailedModalComponent = () => {

    const { changeDetailedModalState, daySelected, monthEvents, isEditOrCreateEventActive, editOrCreateEvent, cancelEventEdit, handleChangeEventEdit, isCreating, handleActivateCreateEvent, createEventFromADay, isCretingLoading, showDetailedModal, eventsData } = useCalendarContext();
    const [showPicker, setShowPicker] = useState(false);
    const [events, setevents] = useState<MontlyEvents[]>([])

    const handleShowPicker = () => {
        setShowPicker(!showPicker)
    }

    useEffect(() => {
        const eventDay = monthEvents?.filter(event => event.day === daySelected.day);
        setevents(eventDay!);
    }, [eventsData])
    

    return (
        <div className='modal-content'>
            <div className="modal-body">
                <div className="calendarDetailedModalBody">
                    <div className="detailedHeader">
                        <p>{daySelected.day} de {formatDateFromNumber(daySelected.month!)} {daySelected.year}</p>
                        <button onClick={handleActivateCreateEvent}><IoAdd/></button>
                    </div>
                    <div className="eventListAndEditHandler">
                        <div className="eventsContainerBody">
                            {
                                isCretingLoading
                                ?   <LoadingComponent/>
                                :   events?.map((event, index) => (
                                        <CalendarEventComponent event={event} key={index}/>
                                    ))
                            }
                        </div>
                        <div className="eventEdit">
                            {
                                isEditOrCreateEventActive
                                ?   isCretingLoading
                                    ?   <LoadingComponent/>
                                    :   <div className='innerEventEditContainer'>
                                            <h3>{isCreating ? 'Nuevo Evento': 'Editar Evento'}</h3>
                                            <InputEditComponent id={'event-title'} placeholder={'Titulo del Evento'} value={editOrCreateEvent?.Titulo != '' || editOrCreateEvent.Titulo != null ? editOrCreateEvent!.Titulo : ''} label={'Titulo del Evento'} name={'Titulo'} inputType={'text'} editActive={true} key={'event-title'} onChange={handleChangeEventEdit}/>
                                            <div className="textAreaDescripcionts">
                                                <label htmlFor="eventDescr">Descripcion</label>
                                                <textarea name="" id="eventDescr" cols={1} placeholder='Descripcion' value={editOrCreateEvent?.Descripcion != '' || editOrCreateEvent.Descripcion != null ? editOrCreateEvent!.Descripcion! : ''} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeEventEdit('Descripcion', e.target.value)}></textarea>
                                            </div>
                                            <TimeEditComponent id={'timerInit'} label={'Tiempo de Inicio'} key={'timerInit'} onChange={handleChangeEventEdit} time={moment(editOrCreateEvent?.Fecha_Inicio).format('HH:mm')} name='Fecha_Inicio' format='h:m a'/>
                                            <DateTimeComponent id={'timerEnd'} label={'Fecha y hora del Final (?)'} name={'Fecha_Fin'} date={editOrCreateEvent?.Fecha_Fin ? editOrCreateEvent.Fecha_Fin : ''} onChange={handleChangeEventEdit} />
                                            <div className="eventEditActions">
                                                <button className='colorPicker' onClick={handleShowPicker} style={{backgroundColor: editOrCreateEvent?.Color}}>Selecciona un Color</button>
                                                <button className='save' onClick={isCreating ? createEventFromADay : () => {}}>{isCreating ? 'Crear': 'Editar'}</button>
                                                <button className='cancel' onClick={cancelEventEdit}>Cancelar</button>
                                            </div>
                                            {
                                                showPicker
                                                ?   <div className="colorPickerContainer">
                                                        <p>Selecciona el color</p>
                                                        <HexColorPicker color={editOrCreateEvent?.Color != '' ? editOrCreateEvent?.Color : '#000'} onChange={(e) => handleChangeEventEdit('Color', e)} />
                                                        <button onClick={handleShowPicker}>Listo</button>
                                                    </div>
                                                : <></>
                                            }
                                        </div>
                                :   <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="modal-footer">
                <button onClick={() => changeDetailedModalState(null, null, null)}>Cancelar</button>
            </div>
        </div>
    )
}
