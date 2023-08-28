import React from 'react'
import './Admin_UserEditScreen.scss'
import { useParams } from 'react-router-dom';
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent';
import { ScrollHelperComponent } from '../../components/admin_UsersComponents/scrollHelperComponent/ScrollHelperComponent';
import { UserInformationEdit, UserProfile } from '../../components/admin_UsersComponents/userEditComponents/usserEditCards/UserEditCards';

export const Admin_UserEditScreen = () => {

    const { userId } = useParams();

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
                        <UserProfile />
                        <UserInformationEdit/>
                    </div>
                </div>
            </div>
        </NavigationComponent>
    )
}
