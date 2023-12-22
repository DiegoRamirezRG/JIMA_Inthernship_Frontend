import React from 'react'
import './CustomConfirmModalComponent.scss'
import { LoadingComponent } from '../../loadingComponent/LoadingComponent'
import { IoClose } from 'react-icons/io5'
import { useConfrimCustomModalContext } from '../../../../contexts/modals_states/confirmCustomEnrollModal/confirmCustomEnrollModal'

interface customConfirmModal{
    text: any;
    confirmAction: any;
    cancelAction: () => void;
    user_id: string;
}

export const CustomConfirmModalComponent = ({ text, cancelAction, confirmAction, user_id }: customConfirmModal) => {

    return (
        <>
            {
                false
                ?   <LoadingComponent/>
                :   <div className='modal-content'>
                        <div className="modal-header">
                            <h5>Confirmacion requerida</h5>
                            <button className='modal-btn-close' onClick={cancelAction}>
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
                            <button onClick={() => confirmAction()}>Si</button>
                            <button onClick={cancelAction}>No</button>
                        </div>
                    </div>
            }
        </>
    )
}
