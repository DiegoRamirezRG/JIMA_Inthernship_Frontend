import React, { ReactNode } from 'react'
import './ConfirmModal.scss'
import { IoClose } from 'react-icons/io5'

export const ConfirmModal = ({children}: {children: JSX.Element}) => {
    return (
        <div className='modal-content'>
            <div className="modal-body">
                {children}
            </div>
        </div>
    )
}
