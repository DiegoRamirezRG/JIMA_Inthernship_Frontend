import React from 'react'
import './CropImageModal.scss'
import { IoClose } from 'react-icons/io5'

interface cropImageProps{
    handleModalClose: () => void;
    imageSrc: string;
}

export const CropImageModal = ({ handleModalClose, imageSrc }: cropImageProps) => {
    return (
        <div className='modal-content'>
            <div className="modal-header">
                <h5>Recortar imagen</h5>
                <button className='modal-btn-close' onClick={handleModalClose}>
                    <IoClose/>
                </button>
            </div>
            <div className="divider"></div>
            <div className="modal-body">
                <div className="innerContent">
                    {
                        imageSrc && (
                            <>Hi image loaded</>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
