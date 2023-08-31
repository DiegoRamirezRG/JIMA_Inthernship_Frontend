import React, { useState } from 'react'
import { AddressModel } from '../../models/addressModels/AddressModel';
import { SingleUser } from '../../models/authModels/UserModel';
import { Credentials } from '../../models/credentialsModels/CredentialsModels';
import { AlergiesModel } from '../../models/alergiesModel/AlergiesModel';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';

export const useUsersEdit = () => {

    const [userState, setUserState] = useState<SingleUser>({
        Nombre: null,
        Apellido_Paterno:   null,
        Apellido_Materno:   null,
        CURP:   null,
        Genero: null,
        Fecha_De_Nacimiento:    null,
        Tipo_De_Sagre:  null,
        Numero_De_Emergencia:   null,
        Numero_De_Telefono: null,
        Nacionalidad:   null,
        Correo_Electronico: null,
        Rol:    null,
        Active: null,
        Imagen: null,
    });

    const [credentialsState, setCredentialsState] = useState<Credentials>({
        Correo: null,
        Contraseña: null,
    });

    const [addressState, setAddressState] = useState<AddressModel>({
        Ciudad: null,
        Estado: null,
        Pais: null,
        Codigo_Postal: null,
        Numero_Interior: null,
        Numero_Exterior: null,
        Calle: null,
    });

    const [alergiesState, setAlergiesState] = useState<AlergiesModel[]>([
        
    ]);

    const [isUserInfoEdited, setIsUserInfoEdited] = useState(false);
    const [isCredentialsEdited, setIsCredentialsEdited] = useState(false);
    const [isAddressEdited, setIsAddressEdited] = useState(false);
    const [isAlergiesEdited, setIsAlergiesEdited] = useState(false);
    const [isImageEdited, setIsImageEdited] = useState(false);

    //Loaders
    const [isGettingInfoLoading, setIsGettingInfoLoading] = useState(true);


    const getEditableUser = async (user_id: string) => {
        const resUser = serverRestApi.get<Response>(`/api/user/getUserById/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });
        const resCred = serverRestApi.get<Response>(`/api/credentials/getCredentials/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });
        const resAddr = serverRestApi.get<Response>(`/api/address/getAddress/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });
        const resAler = serverRestApi.get<Response>(`/api/alergies/getAlergies/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });

        const response = await Promise.all([
            resUser,
            resCred,
            resAddr,
            resAler
        ]);

        setUserState(response[0].data.data);
        setCredentialsState(response[1].data.data);
        setAddressState(response[2].data.data);
        setAlergiesState(response[3].data.data);

        setIsGettingInfoLoading(false);
    }

    const handleEditUser = (name: keyof SingleUser, value: any) => {
        if(name == 'Tipo_De_Sagre' || name == 'Numero_De_Emergencia'){
            setIsAlergiesEdited(true);
        } else if(name == 'Imagen'){
            setIsImageEdited(true);
        }else{
            setIsUserInfoEdited(true);
        }

        setUserState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditCredentials = (name: keyof Credentials, value: any) => {
        setIsCredentialsEdited(true);

        setCredentialsState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleEditAddress = (name: keyof AddressModel, value: any) => {
        setIsAddressEdited(true);

        setAddressState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return {
        //GET STATES
        getEditableUser,

        //EDIT STATE
        handleEditUser, 
        handleEditCredentials, 
        handleEditAddress,

        //STATES
        userState,
        credentialsState,
        addressState,
        alergiesState,

        //LOADER
        isGettingInfoLoading,

        //IS EDITED
        isUserInfoEdited, 
        isCredentialsEdited, 
        isAddressEdited, 
        isAlergiesEdited,
        isImageEdited,
    }
}
