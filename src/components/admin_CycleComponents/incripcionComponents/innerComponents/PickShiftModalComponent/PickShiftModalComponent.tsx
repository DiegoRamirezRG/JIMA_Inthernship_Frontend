import React, { useEffect, useState } from 'react'
import './PickShiftModalComponent.scss'
import { IoClose } from 'react-icons/io5'
import { useShiftModalContext } from '../../../../../contexts/modals_states/shiftModal/shiftModalContext';
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext';
import { useSchoolInfo } from '../../../../../hooks/school_information/useSchoolInfo';
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';
import { SelectedEditComponent, SelectedEditComponentWithIDS } from '../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';

export const PickShiftModalComponent = () => {

    const { changeShiftContextModalState } = useShiftModalContext();
    const { getInitialData, isGettingInitDataLoading, selectShiftData } = useSchoolInfo();
    const { groups, shiftPicker, handleShiftPikcer, cancelShiftPicker, buildingGroupsLoader,  buildGroupsFunc } = useReinsInscrContext();
    

    useEffect(() => {
        const awaitFunc = async () => {
            await getInitialData();
        }
        awaitFunc();
    }, [])

    return (
        <div className='maxBodyContainer'>
            {
                buildingGroupsLoader
                ?   <LoadingComponent/>
                :   <>
                        <div className="modalPickHeader">
                            <div className="title">
                                <h3>Asignar turno</h3>
                            </div>
                            <div className="closeBtn-cancel" onClick={cancelShiftPicker}>
                                <IoClose/>
                            </div>
                        </div>
                        <div className="modalBody">
                            {
                                isGettingInitDataLoading
                                ?   <LoadingComponent/>
                                :   <>
                                        <div className="administrateShifts">
                                            <button onClick={changeShiftContextModalState}>Administrar Turnos</button>
                                        </div>
                                        <div className="pickerShiftsBody">
                                            {
                                                Array.from({length: Object.values(groups).length}).map((_ , index)  => (
                                                    <SelectedEditComponentWithIDS key={index} id={`group_id_${index}`} name={`Grupo_${index}`} editActive={true} label={`Selecciona un Turno para el grupo ${index + 1}`} value={shiftPicker[index] ? shiftPicker[index] : ''} opts={selectShiftData} onChange={handleShiftPikcer}/>
                                                ))
                                            }
                                        </div>
                                        <div className="actionBtns">
                                            <button className='back' onClick={cancelShiftPicker}>Cancelar</button>
                                            {
                                                Object.values(shiftPicker).length != Object.values(groups).length
                                                ?   <div></div>
                                                :   <button className='next' onClick={buildGroupsFunc}>Crear Grupos</button>
                                            }
                                        </div>
                                    </>
                            }
                        </div>
                    </>
            }
        </div>
    )
}
