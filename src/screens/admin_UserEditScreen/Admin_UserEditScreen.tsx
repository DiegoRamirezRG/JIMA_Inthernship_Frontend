import React, { useEffect, useState } from 'react'
import './Admin_UserEditScreen.scss'
import { useParams } from 'react-router-dom';
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent';
import { ScrollHelperComponent } from '../../components/admin_UsersComponents/scrollHelperComponent/ScrollHelperComponent';
import { UserAddressEdit, UserCredentialsEdit, UserInformationEdit, UserMedicEdit, UserProfile, UserTypeRenderEdit } from '../../components/admin_UsersComponents/userEditComponents/usserEditCards/UserEditCards';
import { useUsersEdit } from '../../hooks/admin_user/useUsersEdit';
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent';
import { ModalComponent } from '../../components/generalComponents/modalComponent/ModalComponent';

export const Admin_UserEditScreen = () => {

    const { userId } = useParams();
    const { 
        isGettingInfoLoading,
        
        addressState, alergiesState, credentialsState, userState, selectedRolInfo,
        
        getEditableUser, 

        handleEditAddress,handleEditCredentials,handleEditUser,

        isAddressEdited, isAlergiesEdited, isCredentialsEdited, isUserInfoEdited, isImageEdited

    } = useUsersEdit();

    const [userImageModal, setUserImageModal] = useState(false);

    const handleModalState = () => {
        setUserImageModal(!userImageModal);
    }

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
                        <div><ScrollHelperComponent isSelected={true} text='Información'/></div>
                        <div><ScrollHelperComponent isSelected={false} text='Credenciales'/></div>
                        <div><ScrollHelperComponent isSelected={false} text='Dirección'/></div>
                        <div><ScrollHelperComponent isSelected={false} text='Inf. Medica'/></div>
                        <div><ScrollHelperComponent isSelected={false} text='Tipo de perfil'/></div>
                    </div>
                    <div className="mainContentArticle">
                        {
                            isGettingInfoLoading
                            ? <LoadingComponent/>
                            : <>
                                <UserProfile user={userState!} address={addressState!}/>
                                <UserInformationEdit user={userState!}/>
                                <UserCredentialsEdit cred={credentialsState!}/>
                                <UserAddressEdit address={addressState!}/>
                                <UserMedicEdit user={userState!} alergies={alergiesState!}/>
                                <UserTypeRenderEdit rol={selectedRolInfo!} user={userState!}/>
                            </>
                        }
                    </div>
                </div>
            </div>
            <ModalComponent handleModalState={handleModalState} modalState={userImageModal}>

            </ModalComponent>
        </NavigationComponent>
    )
}
