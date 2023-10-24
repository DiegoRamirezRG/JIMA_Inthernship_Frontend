import React from 'react'
import './ImageShowModal.scss'
import { IoClose } from 'react-icons/io5';

interface ModalProps{
    modalState: boolean;
    handleModalState: () => void;
    children: any;
}

export const ImageShowModal = ({ children, handleModalState, modalState } : ModalProps) => {

    const handleContentClick = (event: any) => {
        event.stopPropagation();
    };

    return (
        <div className={`generalModalContainer ${modalState ? 'show' : 'hiden'} modal-img-modal`} onClick={handleModalState}>
            <div className="modal-image-content" onClick={(e) => handleContentClick(e)}>
                {children}
                <div className="closeModalBtn" onClick={handleModalState}>
                    <IoClose/>
                </div>
            </div>
        </div>
    )
}
