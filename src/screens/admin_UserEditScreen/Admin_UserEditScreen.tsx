import { useEffect, useRef, useState } from 'react'
import './Admin_UserEditScreen.scss'
import { useParams } from 'react-router-dom';
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent';
import { ScrollHelperComponent } from '../../components/admin_UsersComponents/scrollHelperComponent/ScrollHelperComponent';
import { useUsersEdit } from '../../hooks/admin_user/useUsersEdit';
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent';

import { AvatarEditComponent } from '../../components/admin_UsersComponents/userEditComponents/avatarEditComponent/AvatarEditComponent';
import { ModalComponent } from '../../components/generalComponents/modalComponent/ModalComponent';
import { CropImageModal } from '../../components/admin_UsersComponents/userEditComponents/cropImageModal/CropImageModal';
import { ConfirmModal } from '../../components/generalComponents/confirmModal/ConfirmModal';
import { UserEditComponent } from '../../components/admin_UsersComponents/userEditComponents/userEditComponent/UserEditComponent';
import { CredentialsEditComponent } from '../../components/admin_UsersComponents/userEditComponents/credentialsEditComponent/CredentialsEditComponent';
import { AddressEditComponent } from '../../components/admin_UsersComponents/userEditComponents/addressEditComponent/AddressEditComponent';
import { AlergiesEditComponent } from '../../components/admin_UsersComponents/userEditComponents/alergiesEditComponent/AlergiesEditComponent';
import { ProfileTypeComponent } from '../../components/admin_UsersComponents/userEditComponents/profileTypeComponent/ProfileTypeComponent';
import { useEnrollStudent } from '../../hooks/admin_user/useEnrollStudent';
import { useCreateCareerModalContext } from '../../contexts/modals_states/careerModal/createCareerContext';
import { CareerModalComponent } from '../../components/generalComponents/modalsContent/careerModalComponent/CareerModalComponent';
import { useDeleteConfirmModalContext } from '../../contexts/modals_states/deleteConfimModal/deleteConfirmMContext';
import { DeleteConfirmModalComponent } from '../../components/generalComponents/modalsContent/deleteConfirmModalComponent/DeleteConfirmModalComponent';
import { useShiftModalContext } from '../../contexts/modals_states/shiftModal/shiftModalContext';
import { ShiftModalComponent } from '../../components/generalComponents/modalsContent/shiftModalComponent/ShiftModalComponent';

export const Admin_UserEditScreen = () => {

    const { userId } = useParams();
    const [indexSelected, setIndexSelected] = useState(0);

    const AvatarInfoRef = useRef<HTMLDivElement>(null);
    const CardInfoRef = useRef<HTMLDivElement>(null);
    const CardCredRef = useRef<HTMLDivElement>(null);
    const CardDomiRef = useRef<HTMLDivElement>(null);
    const CardMediRef = useRef<HTMLDivElement>(null);
    const UserTypeRef = useRef<HTMLDivElement>(null);

    const scrollToDiv = (ref: React.RefObject<HTMLDivElement>, index: number) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
        setIndexSelected(index);
    };

    //Use Edit Hook
    const {
        //Mutable Data States
        userState,
        credentialsState,
        addressState,
        alergiesState,
        selectedRolInfo,

        //Loaders
        isGettingInfoLoading,
        generalLoader,

        //Get Initial Data
        getEditableUser,

        //Active Editing
        handleActivateImageEditing, 
        handleActivateUserEditing,
        handleActivateCredentialsEditing,
        handleActivateAddressEditing,
        handleActivateAlergiesEditing,
        handleActivateRolEditing,

        //Editing Obervers
        isGettisImageProfileEditing,
        isGettingUserEditing,
        isGettingCredentialsEditing,
        isGettingRolEditing,

        //Is Active Editing States
        isImageEditing,
        isUserEditing,
        isCredentialsEditing,
        isAddressEditing,
        isAlergiesEditing,
        isRolEditing,

        //Image Update
        onSelectFile,
        imageCropperSaveLocal,
        imageSource,
        imageCropped,
        handleCancelImageUpdate,
        sendUserImageUpdate,
        deleteUserImage,

        //User Update
        handleEditUser,
        cancelUserEditing,
        sendUserInfoCardUpdate,

        //Credetials Update
        handleEditCredentials,
        cancelCredentialsEditing,
        sendCredentialsUpdate,

        //Address Update
        handleEditAddress,
        cancelAddressEditing,
        sendAddressUpdate,

        //Alergies Update
        handleEditAlergies,
        deleteGlobalAlergie,
        cancelAlergiesEditing,
        sendAlergiesUpdate,

        //Rol Update
        handleEdtiRolData,

        //Modal Handler
        sureModalState,
        cropModalState,

        //Handle Modal State
        handleSureModalActive,
        handleCropModalActive

    } = useUsersEdit();

    const { createCareerModalState } = useCreateCareerModalContext();
    const { deleteConfirmModalState, changeDeleteConfirmModalState } = useDeleteConfirmModalContext();
    const { shiftContextModalState } = useShiftModalContext();

    const { cancelAspiranteRegister, enrollerActionLoader } = useEnrollStudent();

    const confirmModals = new Map<string, JSX.Element>([
        ['userImageUpdate', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await sendUserImageUpdate(userId!)} loader={generalLoader} />],
        ['deleteProfileImage', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await deleteUserImage(userId!)} loader={generalLoader}/>],
        ['userUpdate', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await sendUserInfoCardUpdate(userId!)} loader={generalLoader}/>],
        ['credentialUpdate', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await sendCredentialsUpdate(userId!)} loader={generalLoader}/>],
        ['addressUpdate', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await sendAddressUpdate(userId!)} loader={generalLoader}/>],
        ['alergiesUpdate', <ConfirmModal handleModalClose={handleSureModalActive} updateFunction={async () => await sendAlergiesUpdate(userId!)} loader={generalLoader}/>],
    ])

    useEffect(() => {
        const awaitFunction = async () => {
            await getEditableUser(userId!);
        }
        awaitFunction();
    }, [])

    return (
        <NavigationComponent>
            <div className="EditUserMaxContainer">
                <div className="headerTitle">
                    <h2>Perfil de Usuario</h2>
                </div>
                <div className="contentSection">
                    <div className="scrollHelpers">
                        <div onClick={() => scrollToDiv(AvatarInfoRef, 0)}> <ScrollHelperComponent isSelected={indexSelected === 0} text='Perfil'/> </div>
                        <div onClick={() => scrollToDiv(CardInfoRef, 1)}> <ScrollHelperComponent isSelected={indexSelected === 1} text='Información'/> </div>
                        <div onClick={() => scrollToDiv(CardCredRef, 2)}> <ScrollHelperComponent isSelected={indexSelected === 2} text='Credenciales'/> </div>
                        <div onClick={() => scrollToDiv(CardDomiRef, 3)}> <ScrollHelperComponent isSelected={indexSelected === 3} text='Dirección'/> </div>
                        <div onClick={() => scrollToDiv(CardMediRef, 4)}> <ScrollHelperComponent isSelected={indexSelected === 4} text='Inf. Medica'/> </div>
                        <div onClick={() => {scrollToDiv(UserTypeRef, 5)}}> <ScrollHelperComponent isSelected={indexSelected === 5} text='Tipo de perfil'/> </div>
                    </div>
                    <div className="mainContentArticle">
                        {
                            isGettingInfoLoading
                            ? <LoadingComponent/>
                            : <>
                                <div ref={AvatarInfoRef}> <AvatarEditComponent user={userState} user_id={userId!} address={addressState} editActive={isImageEditing} handleActiveEdit={handleActivateImageEditing} onSelectImage={onSelectFile} imageCropped={imageCropped} editingObserver={isGettisImageProfileEditing} cancelEditing={handleCancelImageUpdate} activeSureModal={handleSureModalActive}/> </div>
                                <div ref={CardInfoRef}> <UserEditComponent user={userState} user_id={userId!} editActive={isUserEditing} handleActiveEdit={handleActivateUserEditing} handleUserChange={handleEditUser} cancelUserEdit={cancelUserEditing} activeSureModal={handleSureModalActive}/> </div>
                                <div ref={CardCredRef}> <CredentialsEditComponent credentials={credentialsState} editActive={isCredentialsEditing} handleActiveEdit={handleActivateCredentialsEditing} handleCredentialsEdit={handleEditCredentials} cancelCredentialsEdit={cancelCredentialsEditing} editObserver={isGettingCredentialsEditing} activeSureModal={handleSureModalActive}/> </div>
                                <div ref={CardDomiRef}> <AddressEditComponent address={addressState} handleActivateEdit={handleActivateAddressEditing} editActive={isAddressEditing} handleAddressEdit={handleEditAddress} cancelAddressEdit={cancelAddressEditing} activeSureModal={handleSureModalActive}/> </div>
                                <div ref={CardMediRef}> <AlergiesEditComponent user={userState} user_id={userId!} handleActiveEdit={handleActivateAlergiesEditing} isEditing={isAlergiesEditing} handleUserEdit={handleEditUser} alergies={alergiesState} addNewAlergieGlobal={handleEditAlergies} deleteAlergieGlobal={deleteGlobalAlergie}  cancelAlergiesEdit={cancelAlergiesEditing} activeSureModal={handleSureModalActive}/> </div>
                                <div ref={UserTypeRef}> <ProfileTypeComponent user = {userState} user_id={userId!} RolData={selectedRolInfo} handleActiveEdit={handleActivateRolEditing} isEditing={isRolEditing} editingObserver={isGettingRolEditing} handleRolEdit={handleEdtiRolData}/> </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <ModalComponent modalState={cropModalState} handleModalState={handleCropModalActive} modalSize='modal-lg'>
                <CropImageModal handleModalClose={handleCropModalActive} imageSrc={imageSource} handleCropedImage={imageCropperSaveLocal}/>
            </ModalComponent>
            <ModalComponent modalState={sureModalState} handleModalState={handleSureModalActive}>
                {
                    isGettisImageProfileEditing
                    ? ( confirmModals.get('userImageUpdate') )
                    : isImageEditing
                        ? (confirmModals.get('deleteProfileImage'))
                        : isUserEditing
                            ? (confirmModals.get('userUpdate'))
                            : isCredentialsEditing
                                ?   (confirmModals.get('credentialUpdate'))
                                : isAddressEditing
                                    ?   (confirmModals.get('addressUpdate'))
                                    : isAlergiesEditing
                                        ? (confirmModals.get('alergiesUpdate'))
                                        : <></>
                }
            </ModalComponent>
            <ModalComponent modalState={createCareerModalState} handleModalState={() => {}}>
                <CareerModalComponent/>
            </ModalComponent>
            <ModalComponent modalState={shiftContextModalState} handleModalState={() => {}} modalSize='modal-xl'>
                <ShiftModalComponent/>
            </ModalComponent>
            <ModalComponent modalState={deleteConfirmModalState} handleModalState={changeDeleteConfirmModalState}>
                <DeleteConfirmModalComponent deleteFuncion={ async () => {
                    await cancelAspiranteRegister(userId!);
                    location.reload();
                }} loader={enrollerActionLoader} text={
                    <>
                        <p>Esta usted por eliminar el registro del Aspirante {userState.Nombre}.</p>
                        <p>Esto implica que {userState.Nombre} no este registrado a ninguna carrera y por ende no pueda ingresar al nuevo ciclo escolar en caso de ser aceptad@.</p>
                        <p>¿Esta completamente seguro (a) de los cambios que esta por realizar? ¿Quiere confrimar?</p>
                    </>
                }/>
            </ModalComponent>
            
        </NavigationComponent>
    )
}
