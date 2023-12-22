import React, { useState, useEffect } from 'react'
import { UserModelPersonCreate, roles } from '../../models/authModels/UserModel'
import { AddressModelCreate } from '../../models/addressModels/AddressModel';
import { AlergiesModel, AlergiesModelCreate } from '../../models/alergiesModel/AlergiesModel';
import { administrativeCrate, parentCreate, studentCreate, teacherCreate } from '../../models/userTypesModels/UserTypesModel';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { validate_adress, validate_alergies, validate_user, validate_userType } from './helpers/informationValidator';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';

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

    const handle_validate = async () => {    
        return new Promise(async (resolve, reject) => {
            try {
                await validate_user(newUserState);
                await validate_adress(newAddressModel);

                if(AlergiesModel!.length > 0){
                    await validate_alergies(AlergiesModel!);
                }

                await validate_userType({user: newUserState, userType: selectedRolInfo});
                
                resolve(true);
            } catch (error: any) {
                reject(new Error(error.message));
            }
        })
    }

    const handleRegister = async (confirmPassword: string) => {
        return new Promise(async (resolve, reject) => {
            if(confirmPassword === newUserState.Contraseña){
                const response = await serverRestApi.post<Response>('/api/users/create', {
                    "user": {
                        ...newUserState
                    },
                    "address": {
                        ...newAddressModel
                    },
                    "alergies": AlergiesModel,
                    "type": {
                        ...selectedRolInfo
                    }
                }, {
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                });
                resolve(response.data);
            }else{
                reject(new Error('Las contraseñas no coinciden'));
            }
        })
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
        handleTypeInfo,
        handle_validate,
        handleRegister
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