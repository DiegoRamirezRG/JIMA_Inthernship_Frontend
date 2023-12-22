import React from 'react'
import './EditPaymentModal.scss'
import { IoClose } from 'react-icons/io5'
import { InputEditComponent } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { usePaymentContext } from '../../../contexts/paymentsContext/PaymentContext'
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';

export const EditPaymentModal = () => {

    const { workingPayment, handleEditModal, handleChangePayment, updateLoader, sendUpdate } = usePaymentContext();

    return (
        <div className='modal-content'>
            {
                updateLoader
                ?   <div className="loaderComponent">
                        <LoadingComponent/>
                    </div>
                :   <>
                        <div className="modal-header">
                            <h5>Edicion de Servicio</h5>
                            <button className='modal-btn-close' onClick={ () => handleEditModal() }>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-body">
                            {
                                workingPayment != null
                                ?   <div className="editPaymentContainer">
                                        <InputEditComponent id={''} placeholder={'Concepto'} value={workingPayment.Concepto} label={'Concepto'} name={'Concepto'} inputType={'text'} editActive={!(workingPayment.Concepto == 'REINS' || workingPayment.Concepto == 'INSCR')} onChange={handleChangePayment}/>
                                        <div className="textAreaEditComp">
                                            <label htmlFor="Descripcion">Descripcion</label>
                                            <textarea name='Descripcion' placeholder='Descripcion' value={workingPayment.Descripcion ? workingPayment.Descripcion : ''} onChange={(e) => handleChangePayment('Descripcion', e.target.value)}></textarea>
                                        </div>
                                        <InputEditComponent id={''} placeholder={'Refenrencia Bancaria'} value={workingPayment.Refenrencia_Bancaria ? workingPayment.Refenrencia_Bancaria : ''} label={'Refenrencia Bancaria'} name={'Refenrencia_Bancaria'} inputType={'text'} editActive={true} onChange={handleChangePayment}/>
                                        <div className="innerRow">
                                            <InputEditComponent id={''} placeholder={'Precio'} value={workingPayment.Coste} label={'Precio'} name={'Coste'} inputType={'text'} editActive={true} onChange={handleChangePayment}/>
                                            <InputEditComponent id={''} placeholder={'Vigencia'} value={workingPayment.Vigencia ? workingPayment.Vigencia.toString() : ''} label={'Vigencia (dias)'} name={'Vigencia'} inputType={'text'} editActive={true} onChange={handleChangePayment}/>
                                        </div>
                                        <div className="activeRow">
                                            <input type="checkbox" id="switch" checked={workingPayment.Active} name='Active' disabled={(workingPayment.Concepto == 'REINS' || workingPayment.Concepto == 'INSCR')} onClick={() => handleChangePayment('Active', !workingPayment.Active)}/>
                                            <label htmlFor="switch">Activo</label>
                                            <p>{workingPayment?.Active ? 'Activo' : 'Inactivo'}</p>
                                        </div>
                                    </div>
                                :   <></>
                            }
                        </div>
                        <br />
                        <br />
                        <div className="divider"></div>
                        <div className="modal-footer">
                            <button onClick={ sendUpdate }>Guardar</button>
                            <button onClick={ () => handleEditModal() }>Cerrar</button>
                        </div>
                    </>
            }
        </div>
    )
}
