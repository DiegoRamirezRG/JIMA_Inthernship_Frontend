import './UserDescriptionCards.scss'
import defaultImg from '../../../assets/img/default.jpg'
import { UserModelPersonCreate } from '../../../models/authModels/UserModel';
import { AddressModelCreate } from '../../../models/addressModels/AddressModel';
import { AlergiesComponent } from './alergiesComponent/AlergiesComponent';
import { domCardInterface, infoCardInterface, medCardInterface, userTypeSelecter } from './helpers/interfaces/userDescriptionInterface';
import { DefaultCard, EditBtn } from './defaultUI/DefaultUI';
import { InputComp, SelectComp } from './inputComponents/InputComponents';
import { blootTypes, genderOpt, renderOpts } from './helpers/static_objects/static_objects';
import { SelecterBtnsComponent } from './selecterBtnsComponent/SelecterBtnsComponent';
import { useState } from 'react';
import { UserTypeRender } from './userTypeComponents/UserTypeComponent';
//UI Builders


//Cards
export const UserDescriptionCards_ProfilePresentation = (person: UserModelPersonCreate, address: AddressModelCreate) => {

    const fullName = `${person.Nombre ? person.Nombre : ''} ${person.Apellido_Paterno ? person.Apellido_Paterno : ''}${person.Apellido_Materno ? ' '+person.Apellido_Materno : ''}`;
    const fullAdd = `${address.Estado ? address.Estado : ''} ${address.Ciudad ? address.Ciudad : ''}`;

    return (
        <DefaultCard hasTitle={true} hasActionBtn={false} titleText='Perfil'>
            <div className="profilePresentationContainer">
                <div className="imageSection">
                    <img src={defaultImg} alt="" />
                </div>
                <div className="infoSection">
                    <p>{fullName.trim.length > 0 ? fullName : 'Nombre del usuario'}</p>
                    <p>{person.Rol ? person.Rol : 'Tipo de usuario'}</p>
                    <p>{fullAdd.trim.length > 0 ? fullAdd : 'Localizacion'}</p>
                </div>
            </div>
        </DefaultCard>
    )
}

export const UserDescriptionCards_Information = ({inputHandler, person, editable}: infoCardInterface) => {
    return (
        <DefaultCard hasActionBtn={false} hasTitle={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Información</p>
                {
                    editable ? <EditBtn/> : <></>
                }
            </div>
            <div className="internalContentSection">
                <InputComp id='id_name_creation' label='Nombre' name='Nombre' placeholder='Nombre' type='text' value={person.Nombre as string} onChange={inputHandler}/>
                <InputComp id='id_lastname_creation' label='Apellido Paterno' name='Apellido_Paterno' placeholder='Apellido Paterno' type='text' value={person.Apellido_Paterno as string} onChange={inputHandler}/>
                <InputComp id='id_extraname_creation' label='Apellido Materno (?)' name='Apellido_Materno' placeholder='Apellido Materno' type='text' value={person.Apellido_Materno as string} onChange={inputHandler}/>
                <InputComp id='id_curp_creation' label='CURP (?)' name='CURP' placeholder='CURP' type='text' value={person.CURP as string} onChange={inputHandler}/>
                <InputComp id='id_phone_creation' label='Teléfono' name='Numero_De_Telefono' placeholder='Teléfono' type='phone' value={person.Numero_De_Telefono?.toString()} onChange={inputHandler}/>
                <InputComp id='id_bday_creation' label='Fecha de Nacimiento' name='Fecha_De_Nacimiento' placeholder='Fecha de Nacimiento' type='date' value={person.Fecha_De_Nacimiento as string} onChange={inputHandler}/>
                <InputComp id='id_nationality_creation' label='Nacionalidad (?)' name='Nacionalidad' placeholder='Nacionalidad' type='text' value={person.Nacionalidad as string} onChange={inputHandler}/>

                <SelectComp id='id_gender_creation' label='Genero' name='Genero' opts={genderOpt} onChange={inputHandler}/>
            </div>
        </DefaultCard>
    )
}

export const UserDescriptionCards_Credenciales = ({inputHandler, person, editable}: infoCardInterface) => {
    return (
        <DefaultCard hasActionBtn={false} hasTitle={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Credenciales</p>
                {
                    editable ? <EditBtn/> : <></>
                }
            </div>
            <div className="internalContentSection">
                <InputComp id='id_email_creation' label='Correo electronico' name='Correo_Electronico' placeholder='Correo Electronico' type='email' value={person.Correo_Electronico as string} onChange={inputHandler}/>
                <InputComp id='id_password_creation' label='Contraseña' name='Contraseña' placeholder='Contraseña' type='password' value={person.Contraseña as string} onChange={inputHandler}/>
            </div>
        </DefaultCard>
    )
}

export const UserDescriptionCards_Dom = ({ address, inputHandler, countries, cities, states, editable}: domCardInterface) => {
    return (
        <DefaultCard hasActionBtn={false} hasTitle={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Dirección</p>
                {
                    editable ? <EditBtn/> : <></>
                }
            </div>
            <div className="internalContentSection">
                <SelectComp id='id_country_creation' label='País' name='Pais' placeholder='Pais' type='text' onChangeAddress={inputHandler} opts={countries}/>
                <SelectComp id='id_state_creation' label='Estado' name='Estado' placeholder='Estado' type='text' onChangeAddress={inputHandler} opts={states != null ? states : []}/>
                <SelectComp id='id_city_creation' label='Ciudad' name='Ciudad' placeholder='Ciudad' type='text' onChangeAddress={inputHandler} opts={cities != null ? cities : []}/>

                <InputComp id='id_streer_creation' label='Calle' name='Calle' placeholder='Calle' type='text' value={address.Calle as string} onChangeAddress={inputHandler}/>
                <InputComp id='id_extNumb_creation' label='Numero Exterior' name='Numero_Exterior' placeholder='Numero Exterior' type='phone' value={address.Numero_Exterior as string} onChangeAddress={inputHandler}/>
                <InputComp id='id_intNumb_creation' label='Numero Interior (?)' name='Numero_Interior' placeholder='Numero Interior' type='phone' value={address.Numero_Interior as string} onChangeAddress={inputHandler}/>
                <InputComp id='id_postalCode_creation' label='Codigo Postal' name='Codigo_Postal' placeholder='Codigo Postal' type='text' value={address.Codigo_Postal as string} onChangeAddress={inputHandler}/>
            </div>
        </DefaultCard>
    )
}

export const UserDescriptionCards_InfMedic = ({ person, inputHandler, handleAlergies, alergies, deleteAlergieHandler, editable }: medCardInterface) => {
    return (
        <DefaultCard hasActionBtn={false} hasTitle={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Información Medica</p>
                {
                    editable ? <EditBtn/> : <></>
                }
            </div>
            <div className="internalContentSection">
                <SelectComp id='id_bloodType_creation' label='Tipo de Sangre' name='Tipo_De_Sagre' placeholder='Tipo de Sangre' type='text' opts={blootTypes} {...person.Tipo_De_Sagre != null && person.Tipo_De_Sagre != '' ? {value: person.Tipo_De_Sagre} : ''} onChange={inputHandler}/>
                <InputComp id='id_emergencyNumber_creation' label='Numero de Emergencia' name='Numero_De_Emergencia' placeholder='Numero de Emergencia' type='phone' onChange={inputHandler} value={person.Numero_De_Emergencia as string}/>
            </div>
            <AlergiesComponent alergies={alergies} handleAlergies={handleAlergies} deleteAlergie={deleteAlergieHandler}/>
        </DefaultCard>
    )
}

export const UserTypeSelecctions = ({person, inputHandler, rolInfo, handleRolInfo, editable }: userTypeSelecter) => {

    const [indexindRender, setIndexindRender] = useState<number>(0);

    const handleIndexRender = (newIndex: number) => {
        inputHandler('Rol', getRoleIndexBases(newIndex));
        setIndexindRender(newIndex);
    }

    const getRoleIndexBases = (index: number) => {
        switch(index){
            case 0:
                return 'Administrativo';
            case 1:
                return 'Profesor';
            case 2:
                return 'Estudiante';
            case 3: 
                return 'Padre'
            default:
                return 'Administrativo';
        }
    }

    return (
        <DefaultCard hasActionBtn={false} hasTitle={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Tipo de perfil</p>
                {
                    editable ? <EditBtn/> : <></>
                }
            </div>
            <div className="selecterBtns">
                {
                    //Ocultar padres
                    renderOpts.map((option, index) => (
                        <SelecterBtnsComponent title={option} index={index} currentIndex={indexindRender} changeIndex={handleIndexRender} key={index}/>
                    ))
                }
            </div>
            <div className="renderingPage">
                <UserTypeRender render={indexindRender} handleRolInfo={handleRolInfo} rolInfo={rolInfo}/>
            </div>
        </DefaultCard>
    )
}