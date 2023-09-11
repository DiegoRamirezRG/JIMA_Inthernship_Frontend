import React, { useRef } from 'react'
import './AvatarEditStyle.scss';
import { DefaultCard } from '../../userDescriptionCards/defaultUI/DefaultUI';
import { UserProfileCard } from '../interfaces/UserEditInterface';
import defaultImg from '../../../../assets/img/default.jpg'
import { API_ADDR, APT_PORT } from '../../../../utils/env/config';
import { IoCloudUpload, IoSave, IoTrash } from 'react-icons/io5';

export const AvatarEditComponent = ({user, user_id, address, editActive, handleActiveEdit, onSelectImage, imageCropped, editingObserver, cancelEditing, activeSureModal}: UserProfileCard) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const image = user.Imagen != null && user.Imagen != '' ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${user_id}/${user.Imagen}` : imageCropped;
    
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <DefaultCard hasTitle={true} hasActionBtn={true} titleText='Perfil' btnText='Editar' btnFunc={handleActiveEdit}>
            <div className="profileSection">
                <div className="imageProfile">
                    <img src={ editingObserver ? imageCropped != '' ? imageCropped : defaultImg : image != '' ? image : defaultImg} alt="" />
                </div>
                <div className="infoSection">
                    <p>{user.Nombre} {user.Apellido_Paterno} {user.Apellido_Materno ? user.Apellido_Materno : ''}</p>
                    <p>{user.Rol}</p>
                    <p>{address.Ciudad}, {address.Estado}</p>
                </div>
                {
                    editActive
                    ?   <div className="editBnts">
                            {
                                !editingObserver
                                ?   <>
                                        <button onClick={handleButtonClick}>
                                            <IoCloudUpload/>
                                            Subir Imagen
                                        </button>
                                        {
                                            user.Imagen != null && user.Imagen != ''
                                            ?   <button className='cancelBtn' onClick={activeSureModal}>
                                                    <IoTrash/>
                                                    Borrar Imagen
                                                </button>
                                            : <></>
                                        }
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={onSelectImage}
                                        />
                                    </>    
                                : <></>
                            }
                            {
                                editingObserver
                                ?   <>
                                        <button className='saveBtn' onClick={activeSureModal}>
                                            <IoSave/>
                                            Guardar
                                        </button>
                                        <button className='cancelBtn' onClick={cancelEditing}>
                                            <IoTrash/>
                                            Cancelar
                                        </button>
                                    </>
                                :   <>
                                    </>
                            }
                        </div>
                    : <></>
                }
            </div>
        </DefaultCard>
    )
}
