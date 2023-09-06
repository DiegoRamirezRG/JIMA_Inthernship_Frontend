import React from 'react'
import './ConfirmModal.scss'
import { IoClose } from 'react-icons/io5'
import { LoadingComponent } from '../loadingComponent/LoadingComponent';

interface ConfirmModalProp {
    handleModalClose: () => void;
    updateFunction: any;
    loader: boolean;
}

export const ConfirmModal = ({ handleModalClose, updateFunction, loader }: ConfirmModalProp) => {
    return (
        <>
            {
                !loader 
                ? (
                    <div className='modal-content'>
                        <div className="modal-header">
                            <h5>Confirmacion requerida</h5>
                            <button className='modal-btn-close' onClick={handleModalClose}>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-body">
                            <div className="confirmText">
                                <p>Se ha detectado una modificación en tus datos locales de usuario.</p>
                                <p>Por favor, ten en cuenta que cualquier actualización será permanente y afectará el perfil. Si estás seguro de que los cambios son correctos y deseados, puedes proceder con la actualización. Si necesitas revisar los cambios o hacer ajustes adicionales, tómate un momento para asegurarte de que todo esté como deseas.</p>
                                <p>¿Deseas actualizar estos cambios?</p>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-footer">
                            <button onClick={updateFunction}>Guardar</button>
                            <button onClick={handleModalClose}>Cancelar</button>
                        </div>
                    </div>
                )
                : <LoadingComponent/>
            }
        </>
    )
}
