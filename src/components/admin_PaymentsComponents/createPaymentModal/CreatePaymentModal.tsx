import React from 'react'
import './CreatePaymentModal.scss'
import { IoClose } from 'react-icons/io5'
import { usePaymentContext } from '../../../contexts/paymentsContext/PaymentContext'
import { InputEditComponent } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent'

export const CreatePaymentModal = () => {

    const { handleCreateModalState, createPaymentObj, handleCreateObj, sendCreate, createLoading } = usePaymentContext();

    return (
        <div className='modal-content'>
            {
                createLoading
                ?   <div className="loaderComponent">
                        <LoadingComponent/>
                    </div>
                :   <>
                        <div className="modal-header">
                                <h5>Creacion de Servicio</h5>
                                <button className='modal-btn-close' onClick={ handleCreateModalState }>
                                    <IoClose/>
                                </button>
                            </div>
                            <div className="divider"></div>
                            <div className="modal-body">
                                <div className="editPaymentContainer">
                                    <InputEditComponent id={''} placeholder={'Concepto'} value={createPaymentObj.Concepto} label={'Concepto'} name={'Concepto'} inputType={'text'} editActive={true} onChange={handleCreateObj}/>
                                    <div className="textAreaEditComp">
                                        <label htmlFor="Descripcion">Descripcion</label>
                                        <textarea name='Descripcion' placeholder='Descripcion' value={createPaymentObj.Descripcion} onChange={(e) => handleCreateObj('Descripcion', e.target.value)}></textarea>
                                    </div>
                                    <InputEditComponent id={''} placeholder={'Refenrencia Bancaria'} value={createPaymentObj.Refenrencia_Bancaria} label={'Refenrencia Bancaria'} name={'Refenrencia_Bancaria'} inputType={'text'} editActive={true} onChange={handleCreateObj}/>
                                    <div className="innerRow">
                                        <InputEditComponent id={''} placeholder={'Precio'} value={createPaymentObj.Coste} label={'Precio'} name={'Coste'} inputType={'text'} editActive={true} onChange={handleCreateObj}/>
                                        <InputEditComponent id={''} placeholder={'Vigencia'} value={ createPaymentObj.Vigencia } label={'Vigencia (dias)'} name={'Vigencia'} inputType={'text'} editActive={true} onChange={handleCreateObj}/>
                                    </div>
                                    <div className="activeRow">
                                        <input type="checkbox" id="switch" checked={createPaymentObj.Active} name='Active' onChange={() => handleCreateObj('Active', !createPaymentObj.Active)}/>
                                        <label htmlFor="switch">Activo</label>
                                        <p>{createPaymentObj.Active ? 'Activo' : 'Inactivo'}</p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="divider"></div>
                            <div className="modal-footer">
                                <button onClick={ sendCreate } disabled={ createPaymentObj.Concepto == '' || createPaymentObj.Descripcion == '' || createPaymentObj.Coste == '' }>Crear</button>
                                <button onClick={ handleCreateModalState }>Cerrar</button>
                            </div>
                    </>
            }
        </div>
    )
}
