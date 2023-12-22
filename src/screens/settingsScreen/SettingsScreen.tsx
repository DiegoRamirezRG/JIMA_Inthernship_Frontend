import React, { useContext, useEffect, useRef, useState } from 'react'
import './SettingsScreen.scss'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import { TbCameraFilled, TbTrashFilled } from "react-icons/tb";
import { IoCloudUpload, IoReturnUpBack, IoTrash } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';
import AuthContext from '../../contexts/authContext/AuthContext';
import { API_ADDR, APT_PORT } from '../../utils/env/config';
import prof from '../../assets/img/default.jpg';
import wlld from '../../assets/img/default_wallpaper.jpg';
import { AddressEditComponent } from '../../components/admin_UsersComponents/userEditComponents/addressEditComponent/AddressEditComponent';
import { AlergiesEditComponent } from '../../components/admin_UsersComponents/userEditComponents/alergiesEditComponent/AlergiesEditComponent';
import { useUsersEdit } from '../../hooks/admin_user/useUsersEdit';
import { ConfirmModal } from '../../components/generalComponents/confirmModal/ConfirmModal';
import { ModalComponent } from '../../components/generalComponents/modalComponent/ModalComponent';
import { ScrollHelperComponent } from '../../components/admin_UsersComponents/scrollHelperComponent/ScrollHelperComponent';
import { ImageShowModal } from '../../components/generalComponents/imageShowModal/ImageShowModal';
import { CropImageModal } from '../../components/admin_UsersComponents/userEditComponents/cropImageModal/CropImageModal';
import { IoMdSave } from 'react-icons/io';
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent';
import { showWarningToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { useUserSettings } from '../../hooks/settings_user/useUserSettings';
import { UserEditComponent } from '../../components/admin_UsersComponents/userEditComponents/userEditComponent/UserEditComponent';

export const SettingsScreen = () => {

    const { state } = useContext(AuthContext);

    const CardInfoRef = useRef<HTMLDivElement>(null);
    const CardDomiRef = useRef<HTMLDivElement | null>(null);
    const CardMediRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileWallRef = useRef<HTMLInputElement | null>(null);
    const wallImafeRed = useRef<HTMLImageElement | null>(null);

    const [indexSelected, setIndexSelected] = useState<number>(0);
    const [showImageModal, setShowImageModal] = useState<boolean>(false);
    const [imageToShow, setImageToShow] = useState<string | null>(null);
    const [showSavingThings, setShowSavingThings] = useState(false);
    const [settingLoading, setSettingLoading] = useState(true);
    const [isDeletingActivate, setIsDeletingActivate] = useState(false);
    const [isDefaultErroWallpActive, setIsDefaultErroWallpActive] = useState(false);
    const [handleDeleteWallpaper, sethandleDeleteWallpaper] = useState(false);

    const { getEditableUser, addressState, userState, handleActivateAddressEditing, isAddressEditing, handleEditAddress, cancelAddressEditing, handleSureModalActive,
        handleActivateAlergiesEditing, isAlergiesEditing, handleEditUser, alergiesState, handleEditAlergies, deleteGlobalAlergie, cancelAlergiesEditing,
        sendAddressUpdate, sendAlergiesUpdate, generalLoader, sureModalState,
        cropModalState, handleCropModalActive, onSelectFile, imageSource, imageCropperSaveLocal, imageCropped, isGettisImageProfileEditing, handleCancelImageUpdate, sendUserImageUpdate, deleteUserImage,
        isUserEditing, handleActivateUserEditing, cancelUserEditing } = useUsersEdit();

    const { onSelectWallpaperFile, wallpaperSource, cancelWallpaperChange, wallpaperObserver, sendWallpaperUpload, wallpaperLoader, deleteWallpaper, userUpdateInfoModal, handleInfoUpdateModal } = useUserSettings();

    const confirmModals = new Map<string, JSX.Element>([
        ['userImageUpdate', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => {await sendUserImageUpdate(state.loggedUser?.ID_Persona!).then(( ) => showWarningToast({position: 'top-center', text: 'Por favor recarga la pagina para notar cambios'}))}} loader={generalLoader} />],
        ['deleteProfileImage', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await deleteUserImage(state.loggedUser?.ID_Persona!).then(() => { showWarningToast({position: 'top-center', text: 'Por favor recarga la pagina para notar cambios'}); setIsDeletingActivate(false); })} loader={generalLoader}/>],
        ['addressUpdate', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await sendAddressUpdate(state.loggedUser?.ID_Persona!)} loader={generalLoader}/>],
        ['alergiesUpdate', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await sendAlergiesUpdate(state.loggedUser?.ID_Persona!)} loader={generalLoader}/>],
        ['wallpaperUpdate', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await sendWallpaperUpload(state.loggedUser?.ID_Persona!, handleSureModalActive)} loader={wallpaperLoader}/>],
        ['deleteWallpapaer', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await deleteWallpaper(state.loggedUser?.ID_Persona!, handleSureModalActive)} loader={wallpaperLoader}/>]
    ]);


    const scrollToDiv = (ref: React.RefObject<HTMLDivElement>, index: number) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
        setIndexSelected(index);
    };

    const handlePickImageProfile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handlePickImageWallpaper = () => {
        if (fileWallRef.current) {
            fileWallRef.current.click();
        }
    };
    
    const loadImageAndShowModal = (imgUrl?: string | null) => {
        if(imgUrl){
            setImageToShow(imgUrl);
        }else{
            setImageToShow(null);
        }
        setShowImageModal(!showImageModal);
    }

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = wlld;
        setIsDefaultErroWallpActive(true);
    };

    useEffect(() => {
        if(state.loggedUser?.ID_Persona != null){
            const awaitFunction = async () => {
                await getEditableUser(state.loggedUser?.ID_Persona!);
            }
            awaitFunction();
        }
    }, [state.loggedUser?.ID_Persona])

    useEffect(() => {
        if(state.loggedUser?.ID_Persona != null){
            setSettingLoading(false);
        }
    }, [state.loggedUser?.ID_Persona]);


    return (
        <NavigationComponent>
            <div className="maxSettingContainer">
                {
                    settingLoading
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="wallCoverImageContainer">
                                <img ref={wallImafeRed} src={wallpaperSource != null ? wallpaperSource : `http://${API_ADDR}:${APT_PORT}/images/user_wallpaper/${state.loggedUser!.ID_Persona}/wallpaper_profile.jpg`} alt={''} onError={handleImageError} 
                                    onClick={() => loadImageAndShowModal(wallpaperSource != null ? wallpaperSource : `http://${API_ADDR}:${APT_PORT}/images/user_wallpaper/${state.loggedUser!.ID_Persona}/wallpaper_profile.jpg`)}
                                />
                                <div className="actionButtonage">
                                    <div className="actionInner">
                                        {
                                            wallpaperSource == null
                                            ?   <>
                                                    <button onClick={handlePickImageWallpaper}>
                                                        <IoCloudUpload size={20}/>
                                                        Cambiar la imagen
                                                    </button>
                                                    {
                                                        isDefaultErroWallpActive
                                                        ?   <></>
                                                        :   <button onClick={() => {
                                                            sethandleDeleteWallpaper(true);
                                                            handleSureModalActive();
                                                        }}>
                                                                <IoTrash size={20}/>
                                                                Eliminar imagen
                                                            </button>
                                                    }
                                                </>
                                            :   <></>
                                        }
                                        {
                                            wallpaperSource != null
                                            ?   <>
                                                    <button className='saveWallpaperImg' onClick={() => {
                                                        handleSureModalActive();
                                                    }}>
                                                        <IoMdSave size={20}/>
                                                        Guardar
                                                    </button>
                                                    <button className='deleteWallpaperImg' onClick={cancelWallpaperChange}>
                                                        <IoTrash size={20}/>
                                                        Cancelar
                                                    </button>
                                                </>
                                            :   <></>
                                        }
                                        <input
                                            type="file"
                                            ref={fileWallRef}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={onSelectWallpaperFile}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="prinicpalInformationContainer">
                                <div className="userProfileImg">
                                    <div className="imageProfile">
                                        <div className="shadowHelper" onClick={() => loadImageAndShowModal(state.loggedUser?.Imagen != null ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${state.loggedUser!.ID_Persona}/${state.loggedUser!.Imagen}` : null)}/>
                                        <img src={ imageCropped != '' ? imageCropped : state.loggedUser?.Imagen != null ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${state.loggedUser.ID_Persona}/${state.loggedUser.Imagen}` : prof } alt="IMG" />
                                    </div>
                                    <div className="changeProfileHelper" onClick={handlePickImageProfile}>
                                        <TbCameraFilled/>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={onSelectFile}
                                        />
                                    </div>
                                    <div className="deleteProfilePhtBtn" style={{display: (!isGettisImageProfileEditing || imageCropped == '') && state.loggedUser?.Imagen != null ? 'flex' : 'none'}} onClick={() => {
                                        setIsDeletingActivate(true);
                                        handleSureModalActive();
                                    }}>
                                        <IoTrash/>
                                    </div>
                                    <div className="saveChangesProfileHelper" style={{display: !isGettisImageProfileEditing || imageCropped == '' || showSavingThings ? 'none' : 'flex'}} onClick={() => setShowSavingThings(true)}>
                                        <IoMdSave/>
                                    </div>
                                    <div className="optionsOfSaving" style={{display: showSavingThings ? 'flex' : 'none'}}>
                                        <div className="saveChangesBtn" onClick={() => {
                                            handleSureModalActive();
                                            setShowSavingThings(false);
                                        }}>
                                            <IoMdSave/>
                                        </div>
                                        <div className="innerRow">
                                            <div className="discardChangesBtn" onClick={() => {
                                                handleCancelImageUpdate();
                                                setShowSavingThings(false);
                                            }}>
                                                <IoTrash/>
                                            </div>
                                            <div className="hideOptions" onClick={() => setShowSavingThings(false)}>
                                                <IoReturnUpBack/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="userProfileInfo">
                                    <div className="profileInformation">
                                        <p>{state.loggedUser?.Nombre} {state.loggedUser?.Apellido_Paterno} {state.loggedUser?.Apellido_Materno != null && state.loggedUser.Apellido_Materno}</p>
                                        <p>{state.loggedUser?.Rol}</p>
                                    </div>
                                    <div className="profileActions">
                                    </div>
                                </div>
                            </div>
                            <div className="userSettings">
                                <div className="navigatorHelper">
                                    <div onClick={() => scrollToDiv(CardInfoRef, 0)}> <ScrollHelperComponent isSelected={indexSelected === 0} text='Dirección'/> </div>
                                    <div onClick={() => scrollToDiv(CardDomiRef, 1)}> <ScrollHelperComponent isSelected={indexSelected === 1} text='Dirección'/> </div>
                                    <div onClick={() => scrollToDiv(CardMediRef, 2)}> <ScrollHelperComponent isSelected={indexSelected === 2} text='Inf. Medica'/> </div>
                                </div>
                                <div className="innerContainer">
                                    <div ref={CardInfoRef}> <UserEditComponent user={userState} user_id={state.loggedUser?.ID_Persona!} editActive={isUserEditing} handleActiveEdit={handleActivateUserEditing} handleUserChange={handleEditUser} cancelUserEdit={cancelUserEditing} activeSureModal={handleSureModalActive}/> </div>
                                    <div ref={CardDomiRef}> <AddressEditComponent address={addressState} handleActivateEdit={handleActivateAddressEditing} editActive={isAddressEditing} handleAddressEdit={handleEditAddress} cancelAddressEdit={cancelAddressEditing} activeSureModal={handleSureModalActive}/> </div>
                                    <div ref={CardMediRef}> <AlergiesEditComponent user={userState} user_id={state.loggedUser?.ID_Persona!} handleActiveEdit={handleActivateAlergiesEditing} isEditing={isAlergiesEditing} handleUserEdit={handleEditUser} alergies={alergiesState} addNewAlergieGlobal={handleEditAlergies} deleteAlergieGlobal={deleteGlobalAlergie}  cancelAlergiesEdit={cancelAlergiesEditing} activeSureModal={handleSureModalActive}/> </div>
                                </div>
                            </div>
                        </>
                }
                <ModalComponent modalState={sureModalState} handleModalState={handleSureModalActive}>
                    {
                        isGettisImageProfileEditing
                        ? ( confirmModals.get('userImageUpdate') )
                        :   isAddressEditing
                            ?   (confirmModals.get('addressUpdate'))
                            : isAlergiesEditing
                                ? (confirmModals.get('alergiesUpdate'))
                                : wallpaperObserver
                                    ?   (confirmModals.get('wallpaperUpdate'))
                                    :   isDeletingActivate
                                        ?   (confirmModals.get('deleteProfileImage')) 
                                        :   handleDeleteWallpaper
                                            ?   (confirmModals.get('deleteWallpapaer'))
                                            :   <></>
                    }
                </ModalComponent>
                <ImageShowModal modalState={showImageModal} handleModalState={loadImageAndShowModal}>
                    <img src={imageToShow ? imageToShow : prof} alt="IMG_TO_SHOW" onError={handleImageError}/>
                </ImageShowModal>
                <ModalComponent modalState={cropModalState} handleModalState={handleCropModalActive} modalSize='modal-lg'>
                    <CropImageModal handleModalClose={handleCropModalActive} imageSrc={imageSource} handleCropedImage={imageCropperSaveLocal}/>
                </ModalComponent>
            </div>
        </NavigationComponent>
    )
}
