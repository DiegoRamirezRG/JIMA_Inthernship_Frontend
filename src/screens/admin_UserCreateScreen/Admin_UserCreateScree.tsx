import React, { useEffect, useRef, useState } from 'react'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import './Admin_UserCreateScreen.scss'
import { ScrollHelperComponent } from '../../components/admin_UsersComponents/scrollHelperComponent/ScrollHelperComponent'
import { UserDescriptionCards_Credenciales, UserDescriptionCards_Dom, UserDescriptionCards_InfMedic, UserDescriptionCards_Information, UserDescriptionCards_ProfilePresentation, UserTypeSelecctions } from '../../components/admin_UsersComponents/userDescriptionCards/UserDescriptionCards'
import { useUniversalApi } from '../../hooks/useUniversalApi/useUniversalApi'
import { useUsersCreate } from '../../hooks/admin_user/useUsersCreate'
import { IoPersonAdd } from 'react-icons/io5'
import { ModalComponent } from '../../components/generalComponents/modalComponent/ModalComponent'
import { UserCreationModal } from '../../components/admin_UsersComponents/userCreationModal/UserCreationModal'
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent'

export const Admin_UserCreateScree = () => {

    const { countries, cities, getCities, states, getStates } = useUniversalApi();
    const { newUserState, newAddressModel, handleChangeUser, handleChangeAddress, AlergiesModel, handleAlergies, deleteAlergie, selectedRolInfo, handleTypeInfo, handle_validate, handleRegister} = useUsersCreate();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [indexSelected, setIndexSelected] = useState(0);
    
    const CardInfoRef = useRef<HTMLDivElement>(null);
    const CardCredRef = useRef<HTMLDivElement>(null);
    const CardDomiRef = useRef<HTMLDivElement>(null);
    const CardMediRef = useRef<HTMLDivElement>(null);
    const CardTypeRef = useRef<HTMLDivElement>(null);


    const validateInformation = () => {
        handle_validate()
            .then((result) => {
                setShowModal(true);
            })
            .catch((error: any) => {
                showErrorTost({text: error.message, position: 'top-center'});
            })
    }

    const handleShowModal = () => {
        setShowModal(false);
    }

    const scrollToDiv = (ref: React.RefObject<HTMLDivElement>, index: number) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
        setIndexSelected(index);
    };

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
                        <div onClick={() => scrollToDiv(CardInfoRef, 0)}>
                            <ScrollHelperComponent isSelected={indexSelected === 0} text='Información'/>
                        </div>
                        <div onClick={() => scrollToDiv(CardCredRef, 1)}>
                            <ScrollHelperComponent isSelected={indexSelected === 1} text='Credenciales'/>
                        </div>
                        <div onClick={() => scrollToDiv(CardDomiRef, 2)}>
                            <ScrollHelperComponent isSelected={indexSelected === 2} text='Dirección'/>
                        </div>
                        <div onClick={() => scrollToDiv(CardMediRef, 3)}>
                            <ScrollHelperComponent isSelected={indexSelected === 3} text='Inf. Medica'/>
                        </div>
                        <div onClick={() => scrollToDiv(CardTypeRef, 4)}>
                            <ScrollHelperComponent isSelected={indexSelected === 4} text='Tipo de perfil'/>
                        </div>
                    </div>
                    <div className="mainContentArticle">
                        <div ref={CardInfoRef}>
                            <UserDescriptionCards_Information person={newUserState} inputHandler={handleChangeUser} />
                        </div>
                        <div ref={CardCredRef}>
                            <UserDescriptionCards_Credenciales person={newUserState} inputHandler={handleChangeUser} />
                        </div>
                        <div ref={CardDomiRef}>
                            <UserDescriptionCards_Dom address={newAddressModel} inputHandler={handleChangeAddress} countries={countries!} states={states} cities={cities} />
                        </div>
                        <div ref={CardMediRef}>
                            <UserDescriptionCards_InfMedic alergies={AlergiesModel} handleAlergies={handleAlergies} person={newUserState} inputHandler={handleChangeUser} deleteAlergieHandler={deleteAlergie} />
                        </div>
                        <div ref={CardTypeRef}>
                            <UserTypeSelecctions person={newUserState} inputHandler={handleChangeUser} rolInfo={selectedRolInfo} handleRolInfo={handleTypeInfo} />
                        </div>   
                        
                        <div className="buttonConfimRegister">
                            <button onClick={validateInformation}>
                                <IoPersonAdd/>
                                <p>Añadir usuario</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalComponent modalState={showModal} handleModalState={handleShowModal}>
                <UserCreationModal closeModal={handleShowModal} register={handleRegister}/>
            </ModalComponent>
        </NavigationComponent>
    )
}
