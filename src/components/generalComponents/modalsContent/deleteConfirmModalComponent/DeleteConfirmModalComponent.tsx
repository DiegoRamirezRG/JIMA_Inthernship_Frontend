import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useDeleteConfirmModalContext } from '../../../../contexts/modals_states/deleteConfimModal/deleteConfirmMContext'
import { LoadingComponent } from '../../loadingComponent/LoadingComponent';

interface deleteProps{
    deleteFuncion: any;
    text: any;
    loader: boolean;
}

export const DeleteConfirmModalComponent = ({ deleteFuncion, text, loader }: deleteProps) => {

    const { changeDeleteConfirmModalState } = useDeleteConfirmModalContext();

    return (
        <>
            {
                loader
                ?   <LoadingComponent/>
                :   <div className='modal-content'>
                        <div className="modal-header">
                            <h5>Confirmacion requerida</h5>
                            <button className='modal-btn-close' onClick={changeDeleteConfirmModalState}>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-body">
                            <div className="confirmText">
                                {text}
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-footer">
                            <button onClick={deleteFuncion}>Si</button>
                            <button onClick={changeDeleteConfirmModalState}>No</button>
                        </div>
                    </div>
            }
        </>
    )
}
