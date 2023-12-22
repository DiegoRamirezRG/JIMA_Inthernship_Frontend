import React, { useEffect, useState } from 'react'
import './ShiftModalComponent.scss'
import { LoadingComponent } from '../../loadingComponent/LoadingComponent'
import { IoClose } from 'react-icons/io5'
import { useShiftModalContext } from '../../../../contexts/modals_states/shiftModal/shiftModalContext'
import { useSchoolInfo } from '../../../../hooks/school_information/useSchoolInfo'
import { Shift } from '../../../../models/schoolInfoModels/schoolInfoModels'
import { ShiftComponent } from './ShiftComponent/ShiftComponent'
import { HourPickerComponent, InputEditComponent } from '../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { showWarningToast } from '../../toastComponent/ToastComponent'

export const ShiftModalComponent = () => {

    const { changeShiftContextModalState } = useShiftModalContext();
    const [createShift, setCreateShift] = useState(false);

    const [horaInicio, setHoraInicio] = useState('');
    const [minutoInicio, setMinutoInicio] = useState('');

    const [horaFin, setHoraFin] = useState('');
    const [minutoFin, setMinutoFin] = useState('');
    const [isAm, setIsAm] = useState(true);
    const [isAmFin, setIsAmFin] = useState(true);

    const { shiftsState, isGettingInitDataLoading, getInitialData, createOrEditShift, handleLoadShiftForEdit, isShiftEditing, handleEditShifting, handleCancelShiftEditing, sendCreationShift, generalLoader, sendUpdateShift } = useSchoolInfo();

    useEffect(() => {
        const awaitFunc = async () => {
            await getInitialData();
        }
        awaitFunc();
    }, [])
    

    return (
        <>
            {
                true
                ?   <div className='modal-content'>
                        <div className="modal-header">
                            <h5>Administracion de Turnos</h5>
                            <button className='modal-btn-close' onClick={changeShiftContextModalState}>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-body">
                            <div className="shiftModalContainerBody">
                                {
                                    !isGettingInitDataLoading
                                    ?   <div className="availableShifts">
                                            {
                                                generalLoader
                                                ?   <LoadingComponent/>
                                                :   shiftsState?.map((shift: Shift) => (
                                                        <ShiftComponent shift={shift} loadShift={handleLoadShiftForEdit} disable={isShiftEditing} creating={createShift} key={shift.ID_Turno}/>
                                                    ))
                                            }
                                        </div>
                                    :  <LoadingComponent/>
                                }
                                <div className="createNewShift">
                                    {
                                        createShift || isShiftEditing
                                        ?   <div className='createNewShiftInnerContainer'>
                                                <div className="innerBody">
                                                    <div className="createHeader">
                                                        <p>Crear Turno</p>
                                                    </div>
                                                    <div className="nameSection">
                                                        <InputEditComponent editActive={true} id='shiftName' inputType='text' label='Nombre' name='Nombre' placeholder='Nombre' value={createOrEditShift.Nombre!} key={'shiftName'} onChange={handleEditShifting}/>
                                                    </div>
                                                    <div className="startHourSection">
                                                        <HourPickerComponent label='Hora de Inicio' value={isShiftEditing ? createOrEditShift.Hora_Inicio! : ''} key={'initHour'} name='Hora_Inicio' onChange={handleEditShifting} hora={horaInicio} minuto={minutoInicio} setHora={setHoraInicio} setMinuto={setMinutoInicio} isAm={isAm} setIsAm={setIsAm}/>
                                                        <HourPickerComponent label='Hora de Fin' value={isShiftEditing ? createOrEditShift.Hora_Fin! : ''} key={'endHour'} name='Hora_Fin' onChange={handleEditShifting} hora={horaFin} minuto={minutoFin} setHora={setHoraFin} setMinuto={setMinutoFin} isAm={isAmFin} setIsAm={setIsAmFin}/>
                                                    </div>
                                                    <div className="endHourSection"></div>
                                                    <div className="actionsButtonsFooter">
                                                        <button onClick={async () => {
                                                            if(createShift){
                                                                await sendCreationShift(isAm ? horaInicio : (parseInt(horaInicio) + 12).toString(), isAmFin ? horaFin : (parseInt(horaFin) + 12).toString(), minutoInicio != '' ? minutoInicio : '00', minutoFin != '' ? minutoFin : '00');
                                                                setHoraFin('');
                                                                setHoraInicio('');
                                                                setMinutoFin('');
                                                                setMinutoInicio('');
                                                                setCreateShift(false);
                                                                showWarningToast({position: 'top-right', text: 'Por favor recarge para mostrar los cambios realizados en el selector'})
                                                            }else{
                                                                await sendUpdateShift(isAm ? horaInicio : (parseInt(horaInicio) + 12).toString(), isAmFin ? horaFin : (parseInt(horaFin) + 12).toString(), minutoInicio != '' ? minutoInicio : '00', minutoFin != '' ? minutoFin : '00');
                                                                setHoraFin('');
                                                                setHoraInicio('');
                                                                setMinutoFin('');
                                                                setMinutoInicio('');
                                                                setCreateShift(false);
                                                                showWarningToast({position: 'top-right', text: 'Por favor recarge para mostrar los cambios realizados en el selector'})
                                                            }
                                                        }}>Guardar</button>
                                                        <button onClick={() => {
                                                            setHoraFin('');
                                                            setHoraInicio('');
                                                            setMinutoFin('');
                                                            setMinutoInicio('');
                                                            handleCancelShiftEditing();
                                                            setCreateShift(false);
                                                        }}>Cancelar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        :   <div className='createTurnoBtnContainer'>
                                                <button onClick={() => setCreateShift(true)}>Crear un Turno</button>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                :   <LoadingComponent/>
            }
        </>
    )
}
