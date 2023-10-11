import React from 'react'
import { IoClose } from 'react-icons/io5';
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';
import { DateTimeComponent, InputEditComponent } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { useCalendarContext } from '../../../contexts/calendarContext/CalendarContext';
import { MdCheckCircleOutline } from 'react-icons/md';
import { CalendarColors } from '../../../utils/colorRandom/ColorArrayRandom';

export const DetailEventModal = () => {
    
    const {createOrEditState, setColor, color, handleCreateOrEditState, eventClick, cancelCreateOrEdit, sendEventUpdate, handleEditInitDate} = useCalendarContext();

    const handleCancel = () => {
        eventClick(null);
        cancelCreateOrEdit();
        setColor(9);
    }

    return (
        <div className='modal-content'>
            <div className="modal-header">
                <h5>Detalle del Evento</h5>
                <button className='modal-btn-close' onClick={handleCancel}>
                    <IoClose/>
                </button>
            </div>
            <div className="divider"></div>
            <div className="modal-body">
                <div className="createNewEventModalContainer">
                    {
                        false
                        ?   <LoadingComponent/>
                        :   <>
                                <InputEditComponent id={'event-title'} placeholder={'Titulo'} value={createOrEditState.Titulo!} label={'Titulo del Evento'} name={'Titulo'} inputType={'text'} editActive={true} key={'event-title'} onChange={handleCreateOrEditState}/>
                                <div className="textAreaDescripcionts">
                                    <label htmlFor="eventDescr">Descripcion</label>
                                    <textarea name="" id="eventDescr" cols={1} placeholder='Descripcion' value={createOrEditState.Descripcion!} onChange={(e) => handleCreateOrEditState('Descripcion', e.target.value)}></textarea>
                                </div>
                                <DateTimeComponent id={'timerStart'} label={'Fecha y hora del Inicio'} name={'Fecha_Inicio'} date={createOrEditState.Fecha_Inicio!} onChange={handleEditInitDate}/>
                                <DateTimeComponent id={'timerEnd'} label={'Fecha y hora del Final (?)'} name={'Fecha_Fin'} date={createOrEditState.Fecha_Fin!} onChange={handleCreateOrEditState}/>
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
                <button onClick={() => {
                    sendEventUpdate()
                }}>Confirmar</button>
                <button onClick={handleCancel}>Cancelar</button>
            </div>
        </div>
    )
}
