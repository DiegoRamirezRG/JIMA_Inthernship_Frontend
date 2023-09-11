import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import './CropImageModal.scss'
import { IoAdd, IoClose, IoCrop, IoRemove } from 'react-icons/io5'
import AvatarEditor from 'react-avatar-editor';

interface cropImageProps{
    handleModalClose: (succed?: boolean) => void;
    handleCropedImage: (e: string) => void;
    imageSrc: string;
}

interface EditorRef {
    getImage(): HTMLCanvasElement | null;
    getImageScaledToCanvas(): HTMLCanvasElement | null;
}

export const CropImageModal = ({ handleModalClose, handleCropedImage, imageSrc }: cropImageProps) => {

    const [sliderEscale, setsliderEscale] = useState(1);

    const editor = useRef<EditorRef | null>(null);

    const changeEscale = (e: ChangeEvent<HTMLInputElement>)=> {
        setsliderEscale(parseFloat(e.target.value));
    }

    const setEditorRef = useCallback((node: EditorRef | null) => {
        if (node) {
            editor.current = node;
        }
    }, []);

    const getImageUrl = async () => {
        if (editor.current) {
            const canvas = editor.current.getImage();
            if (canvas) {
                const dataURL = canvas.toDataURL('image/png');
                handleCropedImage(dataURL);
                handleModalClose(true);
            }
        }
    }

    return (
        <div className='modal-content'>
            <div className="modal-header">
                <h5>Recortar imagen</h5>
                <button className='modal-btn-close' onClick={() => handleModalClose()}>
                    <IoClose/>
                </button>
            </div>
            <div className="divider"></div>
            <div className="modal-body">
                <div className="innerContent">
                    {
                        imageSrc && (
                            <div className='image-cropper'>
                                <div className="imageAndOVerlay">
                                    {
                                        imageSrc && (
                                            <AvatarEditor
                                                ref={setEditorRef}
                                                image={imageSrc}
                                                width={360}
                                                height={360}
                                                border={20}
                                                scale={sliderEscale}
                                                color={[255, 255, 255, 0.6]}
                                                borderRadius={500}
                                            />
                                        )
                                    }
                                </div>
                                <div className="sliderToEscale">
                                    <button>
                                        <IoRemove/>
                                    </button>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        step={0.05}
                                        value={sliderEscale}
                                        onChange={(e) => changeEscale(e)}
                                    />
                                    <button>
                                        <IoAdd/>
                                    </button>
                                </div>
                                <div className="action-btns">
                                    <button onClick={getImageUrl}>
                                        <IoCrop/>
                                        <p>Recortar</p>
                                    </button>
                                    <button onClick={() => handleModalClose()}>
                                        <IoClose/>
                                        <p>Cancelar</p>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
