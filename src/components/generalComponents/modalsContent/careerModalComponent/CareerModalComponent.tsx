import React, { useState } from 'react'
import './CareerModalComponent.scss';
import { IoClose } from 'react-icons/io5'
import { useCreateCareerModalContext } from '../../../../contexts/modals_states/careerModal/createCareerContext'
import { useCareers } from '../../../../hooks/careers/useCareers';
import { LoadingComponent } from '../../loadingComponent/LoadingComponent';
import { CareerModel, CareerModelCreate } from '../../../../models/careersModels/CareersModel';
import { CareerCardComponent } from './careerCardComponent/CareerCardComponent';
import { InputEditComponent } from '../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';

export const CareerModalComponent = () => {

    const { changeCareerModalState } = useCreateCareerModalContext();

    const { careerData, isGettingInformationLoading, handlerCarreraEdit, editCareer, handleSelectCareerToEdit, observerEdit, observerCreate, handleResetEdit, generalLoader, createCareer, updateCareer } = useCareers();

    return (
        <>
            {
                !isGettingInformationLoading
                ?   (
                    <div className='modal-content'>
                        <div className="modal-header">
                            <h5>Administracion de Carreras</h5>
                            <button className='modal-btn-close' onClick={changeCareerModalState}>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-body">
                            <div className="careerContainer">
                                <div className="creationContainer">
                                    <InputEditComponent editActive={true} id='edit_name' inputType='text' label='Nombre' name='Nombre' placeholder='Nombre carrera' value={ editCareer.Nombre != null ? editCareer.Nombre : '' } onChange={handlerCarreraEdit} key={'edit_name'}/>

                                    <div className="inner-row">
                                        <InputEditComponent editActive={true} id='edit_cicles' inputType='tel' label='Numero de Ciclos' name='Numero_De_Ciclos' placeholder='Ciclos' value={ editCareer.Numero_De_Ciclos != null ? editCareer.Numero_De_Ciclos.toString() : '' } onChange={handlerCarreraEdit} key={'edit_cicles'}/>
                                        <InputEditComponent editActive={true} id='edit_months' inputType='tel' label='Duracion (ciclo) [mes]' name='Duracion_Mensual_De_Ciclos' placeholder='Duracion' value={ editCareer.Duracion_Mensual_De_Ciclos != null ? editCareer.Duracion_Mensual_De_Ciclos.toString() : '' } onChange={handlerCarreraEdit} key={'edit_months'}/>
                                    </div>
                                    <div className="inner-row actionsBtns">
                                        <button onClick={observerEdit ? updateCareer : createCareer}>{observerEdit ? 'Guardar' : 'Crear'}</button>
                                        <button onClick={handleResetEdit} disabled={!observerCreate && !editCareer ? true : false}>Cancelar</button>
                                    </div>
                                </div>
                                <div className="showAndLoadCareerContainer">
                                    {
                                        !generalLoader
                                        ?   careerData?.map((career: CareerModel) => (
                                                <CareerCardComponent career={career} selectCareerToEdit={handleSelectCareerToEdit} key={career.ID_Carrera} editing={observerEdit}/>
                                            ))
                                        :   <></>
                                    }
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="divider"></div>
                        <div className="modal-footer">
                            <button onClick={changeCareerModalState}>Cerrar</button>
                            <button onClick={changeCareerModalState}>Guardar</button>
                        </div>
                    </div>
                    )
                :   <LoadingComponent/>
            }
        </>
    )
}


