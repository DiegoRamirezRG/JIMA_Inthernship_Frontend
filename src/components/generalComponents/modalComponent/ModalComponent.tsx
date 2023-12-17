import React from 'react'
import './ModalComponent.scss'

interface ModalProps{
    modalState: boolean;
    handleModalState: () => void;
    modalSize?: 'modal-sm' | 'modal-lg' | 'modal-xl' | 'modal-xxxl' | 'grader';
    children: any;
}

export const ModalComponent = ({handleModalState, modalState, modalSize, children}: ModalProps) => {

    const handleContentClick = (event: any) => {
        event.stopPropagation();
    };

    return (
        <div className={`generalModalContainer ${modalState ? 'show' : 'hiden'}`} onClick={handleModalState}>
            <div className={`modalContainer ${modalSize ? modalSize : ''}`} onClick={(e) => handleContentClick(e)}>
                {children}
            </div>
        </div>
    )
}
