import React, { useState } from 'react'
import { DefaultCard, EditBtn } from '../../userDescriptionCards/defaultUI/DefaultUI'
import defaultImg from '../../../../assets/img/default.jpg'
import './UserEditCards.scss'
import { IoCloudUpload, IoSave } from 'react-icons/io5'

export const UserProfile = () => {

    const [isEditableActive, setIsEditableActive] = useState(false);

    const handleEditable = () => {
        setIsEditableActive(!isEditableActive);
    }

    return (
        <DefaultCard hasTitle={true} hasActionBtn={true} titleText='Perfil' btnText='Editar' btnFunc={handleEditable}>
            <div className="profileSection">
                <div className="imageProfile">
                    <img src={defaultImg} alt="" />
                </div>
                <div className="infoSection">
                    <p>Angel Adrian Ramirez Reyes</p>
                    <p>Profesor</p>
                    <p>Arandas, Jalisco</p>
                </div>
                {
                    isEditableActive
                    ? <div className="editBnts">
                        <button>
                            <IoCloudUpload/>
                            Subir Imagen
                        </button>
                        <button>
                            <IoSave/>
                            Guardar
                        </button>
                    </div>
                    : <></>
                }
            </div>
        </DefaultCard>
    )
}



export const UserInformationEdit = () => {

    const [isEditableActive, setIsEditableActive] = useState(false);

    const handleEditable = () => {
        setIsEditableActive(!isEditableActive);
    }

    return (
        <DefaultCard hasTitle={false} hasActionBtn={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Información</p>
                {
                    true ? <EditBtn funct={handleEditable}/> : <></>
                }
            </div>
            <div className="internalContentSection">
                
            </div>

        </DefaultCard>
    )
}
