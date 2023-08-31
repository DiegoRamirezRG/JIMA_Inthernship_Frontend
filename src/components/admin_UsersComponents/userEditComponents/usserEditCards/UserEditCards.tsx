import React, { useEffect, useState } from 'react'
import { DefaultCard, EditBtn } from '../../userDescriptionCards/defaultUI/DefaultUI'
import defaultImg from '../../../../assets/img/default.jpg'
import './UserEditCards.scss'
import { IoCloudUpload, IoSave } from 'react-icons/io5'
import { InputEditComponent, SelectedEditComponent } from '../inputEditComponent/InputEditComponent'
import { AddressInformation, CredentialsInformation, MedicInformation, RolesInformation, UserInformation, UserProfileCard } from '../interfaces/UserEditInterface'
import { blootTypes, genderOpt } from '../../userDescriptionCards/helpers/static_objects/static_objects'
import { useUniversalApi } from '../../../../hooks/useUniversalApi/useUniversalApi'
import { AddNewOneBtn, AlergieInputs, AlergieInputsAdd, AlergiesComponent, NoAlergies } from '../../userDescriptionCards/alergiesComponent/AlergiesComponent'
import { AlergiesModel } from '../../../../models/alergiesModel/AlergiesModel'
import { roles } from '../../../../models/authModels/UserModel'

export const UserProfile = ({ user, address }: UserProfileCard) => {

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
                    <p>{user.Nombre} {user.Apellido_Paterno} {user.Apellido_Materno ? user.Apellido_Materno : ''}</p>
                    <p>{user.Rol}</p>
                    <p>{address.Ciudad}, {address.Estado}</p>
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



export const UserInformationEdit = ({ user }: UserInformation) => {

    const [isEditableActive, setIsEditableActive] = useState(false);

    const handleEditable = () => {
        setIsEditableActive(!isEditableActive);
    }

    const dateObject = new Date(user.Fecha_De_Nacimiento!);
    const formattedDate = dateObject.toISOString().substring(0, 10);

    return (
        <DefaultCard hasTitle={false} hasActionBtn={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Información</p>
                {
                    !isEditableActive ? <EditBtn funct={handleEditable}/> : <></>
                }
            </div>
            <div className="internalContentSection">
                <InputEditComponent id='user_name' placeholder='Nombre' value={user.Nombre ? user.Nombre : ''} label='Nombre' name='Nombre' inputType='text' key={'user_name'} editActive={isEditableActive}/>
                <InputEditComponent id='user_Lastname' placeholder='Apellido Paterno' value={user.Apellido_Paterno ? user.Apellido_Paterno : ''} label='Apellido Paterno' name='Apellido_Paterno' inputType='text' key={'user_lastname'} editActive={isEditableActive}/>
                <InputEditComponent id='user_Extraname' placeholder='Apellido Materno' value={user.Apellido_Materno ? user.Apellido_Materno : ''} label='Apellido Materno' name='Apellido_Materno' inputType='text' key={'user_extraname'} editActive={isEditableActive}/>
                <InputEditComponent id='user_CURP' placeholder='CURP' value={user.CURP ? user.CURP : ''} label='CURP' name='CURP' inputType='text' key={'user_curp'} editActive={isEditableActive}/>
                <InputEditComponent id='user_Phone' placeholder='Teléfono' value={user.Numero_De_Telefono ? user.Numero_De_Telefono.toString() : ''} label='Teléfono' name='Numero_De_Telefono' inputType='text' key={'user_phone'} editActive={isEditableActive}/>
                <InputEditComponent id='user_Bday' placeholder='Fecha de Nacimiento' value={formattedDate} label='Fecha de Nacimiento' name='Fecha_De_Nacimiento' inputType='date' key={'user_bday'} editActive={isEditableActive}/>
                <InputEditComponent id='user_nationality' placeholder='Nacionalidad' value={user.Nacionalidad ? user.Nacionalidad : ''} label='Nacionalidad' name='Nacionalidad' inputType='text' key={'user_nationality'} editActive={isEditableActive}/>

                <SelectedEditComponent id='user_gender' key={'user_gender'} value={user.Genero ? user.Genero : ''} editActive={isEditableActive} opts={genderOpt} name='Genero' label='Genero'/>
            </div>
        </DefaultCard>
    )
}


export const UserCredentialsEdit = ({ cred }: CredentialsInformation) => {

    const [isEditableActive, setIsEditableActive] = useState(false);

    const handleEditable = () => {
        setIsEditableActive(!isEditableActive);
    }

    return (
        <DefaultCard hasTitle={false} hasActionBtn={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Credenciales</p>
                {
                    !isEditableActive ? <EditBtn funct={handleEditable}/> : <></>
                }
            </div>
            <div className="internalContentSection">
                <InputEditComponent id='credentials_email' placeholder='Correo electrónico' label='Correo electrónico' value={cred.Correo ? cred.Correo : ''} editActive={isEditableActive} inputType='text' name='Correo' key={'credentials_email'}/>
                <InputEditComponent id='credentials_password' placeholder='Contraseña' label='Contraseña' value={cred.Contraseña ? cred.Contraseña.slice(0, 15) : ''} editActive={isEditableActive} inputType='password' name='Contraseña' key={'credentials_password'}/>
            </div>
        </DefaultCard>
    )
}

export const UserAddressEdit = ({ address }: AddressInformation) => {

    const { countries, states, cities, getStates, getCities } = useUniversalApi();

    const [isEditableActive, setIsEditableActive] = useState(false);

    const handleEditable = () => {
        setIsEditableActive(!isEditableActive);
    }

    useEffect(() => {
        const asyncFunc = async() => {
            await getStates(address.Pais!);
        }
        asyncFunc();
    }, [address.Pais]);
    

    useEffect(() => {
        const asyncFunc = async() => {
            await getCities(address.Estado!);
        }
        asyncFunc();
    }, [address.Estado]);

    return (
        <DefaultCard hasTitle={false} hasActionBtn={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Dirección</p>
                {
                    !isEditableActive ? <EditBtn funct={handleEditable}/> : <></>
                }
            </div>
            <div className="internalContentSection">

                <SelectedEditComponent id='address_country' label='País' name='Pais' value={address.Pais ? address.Pais : 'Mexico'} editActive={isEditableActive} key={'address_country'} opts={countries ? countries : [{label: 'Mexico', value: 'Mexico'}]}/>
                <SelectedEditComponent id='address_state' label='Estado' name='Estado' value={address.Estado ? address.Estado : 'Jalisco'} editActive={isEditableActive} key={'address_state'} opts={states ? states : [{label: 'Jalisco', value: 'Jalisco'}]}/>
                <SelectedEditComponent id='address_city' label='Ciudad' name='Ciudad' value={address.Ciudad ? address.Ciudad : 'Arandas'} editActive={isEditableActive} key={'address_city'} opts={cities ? cities : [{label: 'Arandas', value: 'Arandas'}]}/>

                <InputEditComponent id='address_street' inputType='text' placeholder='Calle' label='Calle' name='Calle' value={address.Calle ? address.Calle : ''} editActive={isEditableActive} key={'address_street'}/>
                <InputEditComponent id='address_number_ext' inputType='text' placeholder='Numero Exterior' label='Numero Exterior' name='Numero_Exterior' value={address.Numero_Exterior ? address.Numero_Exterior.toString() : ''} editActive={isEditableActive} key={'address_number_ext'}/>
                <InputEditComponent id='address_number_int' inputType='text' placeholder='Numero Interior' label='Numero Interior (?)' name='Numero_Interior' value={address.Numero_Interior ? address.Numero_Interior.toString() : ''} editActive={isEditableActive} key={'address_number_int'}/>
            </div>
        </DefaultCard>
    )
}

export const UserMedicEdit = ({ user, alergies }: MedicInformation) => {

    const [isEditableActive, setIsEditableActive] = useState(false);
    const [showNewAlergie, setShowNewAlergie] = useState(false);

    const [newAlergieToPush, setNewAlergieToPush] = useState<AlergiesModel>({
        Nombre: '',
        Descripcion: ''
    });

    const handleEditable = () => {
        setIsEditableActive(!isEditableActive);
    }

    const handleNewAlergie = () => {
        setShowNewAlergie(!showNewAlergie);
    }

    return (
        <DefaultCard hasTitle={false} hasActionBtn={false}>
            <div className="internalHeader">
                <p className='internalTitle'>Información Medica</p>
                {
                    !isEditableActive ? <EditBtn funct={handleEditable}/> : <></>
                }
            </div>
            <div className="internalContentSection">

                <SelectedEditComponent id='user_bloodType' label='Tipo de Sangre' name='Tipo_De_Sagre' value={user.Tipo_De_Sagre ? user.Tipo_De_Sagre: ''} editActive={isEditableActive} opts={blootTypes}/>
                <InputEditComponent id='user_emergency_number' label='Numero de Emergencia (?)' name='Numero_De_Emergencia' inputType='tel' placeholder='Numero de Emergencia' value={user.Numero_De_Emergencia ? user.Numero_De_Emergencia.toString() : ''} editActive={isEditableActive} key={'user_emergency_number'}/>

            </div>
            <div className='alergiesContainer'>
                    <div className="headers">
                        <p>Alergias</p>
                    </div>
                    <div className="alergiesPlaceSection">
                        <AddNewOneBtn onClickFunction={handleNewAlergie} isDisabled={isEditableActive}/>
                        {
                            showNewAlergie ? <AlergieInputsAdd  value={{...newAlergieToPush}} onChange={() => {}} addGlobal={() => {}}/> : <></>
                        }
                        {
                            alergies != null && alergies?.length > 0
                            ? alergies.map((item, index) => (
                                <AlergieInputs key={index} des={item.Descripcion ? item.Descripcion : ''} title={item.Nombre} delteAlergie={() => {}} isDisabled={isEditableActive}/>
                            ))
                            : !isEditableActive ? <NoAlergies/>   : <></>
                        }
                    </div>
                </div>
        </DefaultCard>
    )
}


export const UserTypeRenderEdit = ({ rol, user }: RolesInformation) => {

    const renders = new Map<roles, JSX.Element>([
        ['Administrativo', <AdministrativeTypeCard/>],
        ['Profesor', <TeacherTypeCard/>],
        ['Estudiante', <StudentTypeCard/>],
        ['Padre', <ParentTypeCard/>],
    ]);

    return (
        <>
            {renders.get(user.Rol!)}
        </>
    )

}

const AdministrativeTypeCard = () => {
    return (
        <div>Admin</div>
    )
}

const TeacherTypeCard = () => {
    return (
        <div>Teacher</div>
    )
}

const StudentTypeCard = () => {
    return (
        <div>Student</div>
    )
}

const ParentTypeCard = () => {
    return (
        <div>Parent</div>
    )
}