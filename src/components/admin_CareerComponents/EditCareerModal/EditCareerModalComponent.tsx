import React from 'react'
import './EditCareerModalComponent.scss'
import { CareerModel, CareerModelCreate } from '../../../models/careersModels/CareersModel'
import { IoClose } from 'react-icons/io5';
import { InputEditComponent } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { useCareersContext } from '../../../contexts/careersContext/CareersContext';
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';

interface editProps{
    career: CareerModel | CareerModelCreate | null;
}

export const EditCareerModalComponent = ({ career } : editProps) => {

    const { handleModalCareers } = useCareersContext();
    const { updateFunct, updateLoading, careerOnChange, isCreating, createCareer } = useCareersContext();

    return (
        <div className='modal-content'>
            {
                career?.ID_Carrera != null
                ?   updateLoading
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="modal-header">
                                <h5>Edicion de Carrera</h5>
                                <button className='modal-btn-close' onClick={ () => handleModalCareers() }>
                                    <IoClose/>
                                </button>
                            </div>
                            <div className="divider"></div>
                            <div className="modal-body">
                                <div className="editCareerModalContainer">
                                    <div className="innerGridContainer">
                                        <InputEditComponent id={'career_name'} placeholder={'Nombre'} value={career?.Nombre!} label={'Nombre'} name={'Nombre'} inputType={'text'} editActive={true} key={'career_name'} onChange={careerOnChange}/>
                                        <div className="detailedInputComponent">
                                            <label htmlFor="career_desc">Descripcion</label>
                                            <textarea name="Descripcion" id="career_desc" cols={1} placeholder='Descripcion' onChange={(e) => careerOnChange('Descripcion', e.target.value)} value={career.Descripcion ? career.Descripcion : ''}></textarea>
                                        </div>
                                        <div className="inner-row">
                                            <InputEditComponent editActive={true} id='career_cicles' inputType='tel' label='Numero de Ciclos' name='Numero_De_Ciclos' placeholder='Ciclos' value={ career!.Numero_De_Ciclos!.toString() } key={'edit_cicles'} onChange={careerOnChange}/>
                                            <InputEditComponent editActive={true} id='career_months' inputType='tel' label='Duracion (ciclo) [mes]' name='Duracion_Mensual_De_Ciclos' placeholder='Duracion' value={ career!.Duracion_Mensual_De_Ciclos!.toString() } key={'career_months'} onChange={careerOnChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="divider"></div>
                            <div className="modal-footer">
                                <button onClick={ !isCreating ? () => updateFunct() : () => createCareer() }>{!isCreating ? 'Guardar' : 'Crear'}</button>
                                <button onClick={ () => handleModalCareers() }>Cerrar</button>
                            </div>
                        </>
                :   <></>
            }
        </div>
    )
}
