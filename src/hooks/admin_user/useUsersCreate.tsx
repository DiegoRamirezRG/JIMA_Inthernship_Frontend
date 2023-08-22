import React, { useState, useEffect } from 'react'
import { UserModelPersonCreate, roles } from '../../models/authModels/UserModel'
import { AddressModelCreate } from '../../models/addressModels/AddressModel';
import { AlergiesModel, AlergiesModelCreate } from '../../models/alergiesModel/AlergiesModel';
import { administrativeCrate, parentCreate, studentCreate, teacherCreate } from '../../models/userTypesModels/UserTypesModel';

export const useUsersCreate = () => {

    const [newUserState, setNewUserState] = useState<UserModelPersonCreate>({
        Nombre: '',
        Apellido_Paterno: '',
        Apellido_Materno: '',
        CURP: '',
        Genero: '',
        Fecha_De_Nacimiento: '',
        Tipo_De_Sagre: '',
        Numero_De_Emergencia: '',
        Numero_De_Telefono: '',
        Nacionalidad: '',
        Correo_Electronico: '',
        Rol: 'Administrativo',
        Active: true,
        Imagen: '',
        Contraseña: '',
    });

    const [newAddressModel, setNewAddressModel] = useState<AddressModelCreate>({
        Ciudad: '',
        Estado: '',
        Pais: '',
        Codigo_Postal: '',
        Numero_Interior: '',
        Numero_Exterior: '',
        Calle: '',
    })

    const [AlergiesModel, setAlergiesModel] = useState<AlergiesModelCreate[] | null>([
    ])

    const [selectedRolInfo, setSelectedRolInfo] = useState<administrativeCrate | teacherCreate | studentCreate | parentCreate[] | any>(getInitialDataOfRol(newUserState.Rol));

    const handleChangeUser = (name: keyof UserModelPersonCreate, value: any) => {
        setNewUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangeAddress = (name: keyof AddressModelCreate, value: any) => {
        setNewAddressModel((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAlergies = (newAlergie: AlergiesModelCreate) => {
        setAlergiesModel(prevState => [...prevState!, newAlergie]);
    }

    const deleteAlergie = (searchedTitle: string) => {
        setAlergiesModel((prevAlergiesModel) => {
            const updatedAlergiesModel = prevAlergiesModel!.filter(
                (item) => item.Nombre !== searchedTitle
            );
            return updatedAlergiesModel;
        });
    }

    const handleTypeInfo = (name: keyof administrativeCrate | keyof teacherCreate | keyof studentCreate | keyof parentCreate, value: string) => {
        if(name === 'FK_Hijo'){
            setSelectedRolInfo((prevState: any) => [ ...prevState, name]);
        }else{
            setSelectedRolInfo((prevState: any) => ({
                ...prevState,
                [name]: value,
            }))
        }
    }

    useEffect(() => {
        setSelectedRolInfo(getInitialDataOfRol(newUserState.Rol));
    }, [newUserState.Rol]);
    

    return {
        newUserState,
        newAddressModel,
        handleChangeUser,
        handleChangeAddress,
        AlergiesModel,
        handleAlergies,
        deleteAlergie,
        selectedRolInfo,
        handleTypeInfo
    }

}

const getInitialDataOfRol = (rol: roles) => {
    switch(rol){
        case 'Administrativo':
            return {
                Codigo_De_Administrativo: '',
                NSS: '',
                Fecha_De_Contratacion: '',
                URL: '',
            };
        case 'Profesor':
            return {
                Codigo_De_Profesor: '',
                NSS: '',
                Fecha_De_Contratacion: '',
                URL: '',
            };
        case 'Estudiante':
            return {
                Matricula: '',
                URL: '',
                Titulado: '',
            };
        case 'Padre': 
            return {};
        default:
            return {};
    }
}