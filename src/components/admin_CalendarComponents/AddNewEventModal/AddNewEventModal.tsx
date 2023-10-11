import React, { useState } from 'react'
import './AddNewEventModal.scss'
import { IoClose } from 'react-icons/io5'
import { useCalendarContext } from '../../../contexts/calendarContext/CalendarContext'
import { DateTimeComponent, InputEditComponent, TimeEditComponent } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import moment from 'moment'
import { CalendarColors } from '../../../utils/colorRandom/ColorArrayRandom'
import { MdCheckCircleOutline } from 'react-icons/md'
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent'

export const AddNewEventModal = () => {

    const { handleCreateEventModal, createOrEditState, cancelCreateOrEdit, handleCreateOrEditState, sendCreateOrEdit, isCreateOrEditLoading, color, setColor } = useCalendarContext();

    const handleCloseModal = () => {
        handleCreateEventModal();
        cancelCreateOrEdit();
        setColor(9);
    }

    return (
        <div className='modal-content'>
            <div className="modal-header">
                <h5>Crear nuevo evento</h5>
                <button className='modal-btn-close' onClick={handleCloseModal}>
                    <IoClose/>
                </button>
            </div>
            <div className="divider"></div>
            <div className="modal-body">
                <div className="createNewEventModalContainer">
                    {
                        isCreateOrEditLoading
                        ?   <LoadingComponent/>
                        :   <>
                                <InputEditComponent id={'event-title'} placeholder={'Titulo'} value={createOrEditState.Titulo!} label={'Titulo del Evento'} name={'Titulo'} inputType={'text'} editActive={true} key={'event-title'} onChange={handleCreateOrEditState}/>
                                <div className="textAreaDescripcionts">
                                    <label htmlFor="eventDescr">Descripcion</label>
                                    <textarea name="" id="eventDescr" cols={1} placeholder='Descripcion' value={createOrEditState.Descripcion!} onChange={(e) => handleCreateOrEditState('Descripcion', e.target.value)}></textarea>
                                </div>
                                <TimeEditComponent id={'timerInit'} label={'Tiempo de Inicio'} key={'timerInit'} onChange={handleCreateOrEditState} time={moment(createOrEditState.Fecha_Inicio!).format('HH:mm')} name='Fecha_Inicio' format='h:m a'/>
                                <DateTimeComponent id={'timerEnd'} label={'Fecha y hora del Final (?)'} name={'Fecha_Fin'} date={createOrEditState.Fecha_Fin!} onChange={handleCreateOrEditState} />
                                <div className="colorPicker">
                                    <label htmlFor="eventDescr">Selecciona un color</label>
                                    <div className="colorPickerInnerContainer">
                                        {
                                            CalendarColors.map((colorIt: string, index) => (
                                                <div className='colorContainer' key={index} style={{backgroundColor: colorIt}} onClick={() => {
                                                    setColor(index);
                                                    handleCreateOrEditState('Color', CalendarColors[index]);
                                                }}>
                                                    {
                                                        index === color
                                                        ?   <MdCheckCircleOutline className='checked'/>
                                                        :   <></>
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
            <div className="divider"></div>
            <div className="modal-footer">
                <button onClick={sendCreateOrEdit}>Guardar</button>
                <button onClick={handleCloseModal}>Cerrar</button>
            </div>
        </div>
    )
}
