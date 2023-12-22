import React, { useCallback, useMemo } from 'react'
import './DropzoneComponent.scss'
import { IoClose, IoCloudUpload } from 'react-icons/io5'
import {useDropzone} from 'react-dropzone'
import { useHomeworkContext } from '../../../contexts/homeworkContext/HomeworkContext'
import { baseDropzoneStyle, dropzoneAcceptStyle, dropzoneFocusedStyle, dropzoneRejectStyle } from './helpers/dropzoneStyle';

export const DropzoneComponent = () => {

    const { attachStudentFiles, handleDropzoneAttachModal } = useHomeworkContext();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        attachStudentFiles(acceptedFiles);
    }, []);
    
    const {getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive} = useDropzone({onDrop});

    const propsStyle = useMemo(()=> ({
        ...baseDropzoneStyle,
        ...(isFocused ? dropzoneFocusedStyle : {}),
        ...(isDragAccept ? dropzoneAcceptStyle : {}),
        ...(isDragReject ? dropzoneRejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <div className="dropzoneModalContainer">
            <div className="dropzoneHeader">
                <p>Adjuntar archivos</p>
                <div className="closeSection" onClick={() => handleDropzoneAttachModal()}>
                    <IoClose/>
                </div>
            </div>
            <div className="dropzoneBody">
                <div {...getRootProps()} style={{...propsStyle}}>
                    <input {...getInputProps()} />
                        {
                            isDragActive 
                            ?   <p>Suelta los archivos aquí...</p> 
                            :   <div className="dropzoneill">
                                    <div className="dropzoneIcon">
                                        <IoCloudUpload />
                                    </div>
                                    <div className="dropzoneAction">
                                        <button>Haz click aqui</button>
                                        <p>o tambien puedes arrastrar y soltar para adjuntar archivos</p>
                                    </div>
                                </div>
                        }
                </div>
            </div>
        </div>
    )
}
