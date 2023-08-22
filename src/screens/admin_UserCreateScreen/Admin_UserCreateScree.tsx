import React, { useEffect } from 'react'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import './Admin_UserCreateScreen.scss'
import { ScrollHelperComponent } from '../../components/admin_UsersComponents/scrollHelperComponent/ScrollHelperComponent'
import { UserDescriptionCards_Credenciales, UserDescriptionCards_Dom, UserDescriptionCards_InfMedic, UserDescriptionCards_Information, UserDescriptionCards_ProfilePresentation, UserTypeSelecctions } from '../../components/admin_UsersComponents/userDescriptionCards/UserDescriptionCards'
import { useUniversalApi } from '../../hooks/useUniversalApi/useUniversalApi'
import { useUsersCreate } from '../../hooks/admin_user/useUsersCreate'

export const Admin_UserCreateScree = () => {

    const { countries, cities, getCities, states, getStates } = useUniversalApi();
    const { newUserState, newAddressModel, handleChangeUser, handleChangeAddress, AlergiesModel, handleAlergies, deleteAlergie, selectedRolInfo, handleTypeInfo } = useUsersCreate();

    useEffect(() => {
        if(newAddressModel.Pais != null && newAddressModel.Pais != ''){
            const awaitFunct = async () =>{
                await getStates(newAddressModel.Pais as string);
            }
            awaitFunct();
        }
    }, [newAddressModel.Pais]);

    useEffect(() => {
        if(newAddressModel.Estado != null && newAddressModel.Estado != ''){
            const awaitFunct = async () =>{
                await getCities(newAddressModel.Estado as string);
            }
            awaitFunct();
        }
    }, [newAddressModel.Estado]);
    

    return (
        <NavigationComponent>
            <div className="CreateUserMaxContainer">
                <div className="headerTitle">
                    <h2>Crear usuario</h2>
                </div>
                <div className="contentSection">
                    <div className="scrollHelpers">
                        <ScrollHelperComponent isSelected={true} text='Información'/>
                        <ScrollHelperComponent isSelected={false} text='Credenciales'/>
                        <ScrollHelperComponent isSelected={false} text='Dirección'/>
                        <ScrollHelperComponent isSelected={false} text='Inf. Medica'/>
                        <ScrollHelperComponent isSelected={false} text='Tipo de perfil'/>
                    </div>
                    <div className="mainContentArticle">
                        <UserDescriptionCards_Information person={newUserState} inputHandler={handleChangeUser}/>
                        <UserDescriptionCards_Credenciales person={newUserState} inputHandler={handleChangeUser}/>
                        <UserDescriptionCards_Dom address={newAddressModel} inputHandler={handleChangeAddress} countries={countries!} states={states} cities={cities}/>
                        <UserDescriptionCards_InfMedic alergies={AlergiesModel} handleAlergies={handleAlergies} person={newUserState} inputHandler={handleChangeUser} deleteAlergieHandler={deleteAlergie}/>
                        <UserTypeSelecctions person={newUserState} inputHandler={handleChangeUser} rolInfo={selectedRolInfo} handleRolInfo={handleTypeInfo}/>
                    </div>
                </div>
            </div>
        </NavigationComponent>
    )
}
