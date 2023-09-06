import React, { useState } from 'react'
import { AddressModel } from '../../models/addressModels/AddressModel';
import { SingleUser } from '../../models/authModels/UserModel';
import { Credentials } from '../../models/credentialsModels/CredentialsModels';
import { AlergiesModel } from '../../models/alergiesModel/AlergiesModel';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { administrative, student, teacher } from '../../models/userTypesModels/UserTypesModel';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';

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

    const [alergiesState, setAlergiesState] = useState<AlergiesModel[]>([]);

    const [selectedRolInfo, setSelectedRolInfo] = useState<administrative | teacher | student | any>();

    const [imageSource, setImageSource] = useState('');
    const [imageHelper, setImageHelper] = useState('');

    const [isUserInfoEdited, setIsUserInfoEdited] = useState(false);
    const [isCredentialsEdited, setIsCredentialsEdited] = useState(false);
    const [isAddressEdited, setIsAddressEdited] = useState(false);
    const [isAlergiesEdited, setIsAlergiesEdited] = useState(false);
    const [isImageEdited, setIsImageEdited] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    //Loaders
    const [isGettingInfoLoading, setIsGettingInfoLoading] = useState(true);
    const [isImageUpdateLoading, setIsImageUpdateLoading] = useState(false);


    const getEditableUser = async (user_id: string) => {
        const resUser = serverRestApi.get<Response>(`/api/user/getUserById/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });
        const resCred = serverRestApi.get<Response>(`/api/credentials/getCredentials/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });
        const resAddr = serverRestApi.get<Response>(`/api/address/getAddress/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });
        const resAler = serverRestApi.get<Response>(`/api/alergies/getAlergies/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });
        const restRol = serverRestApi.get<Response>(`/api/roles/getInfo/${user_id}`, {headers: { Authorization: localStorage.getItem('token') } });

        const response = await Promise.all([
            resUser,
            resCred,
            resAddr,
            resAler,
            restRol
        ]);

        setUserState(response[0].data.data);
        setCredentialsState(response[1].data.data);
        setAddressState(response[2].data.data);
        setAlergiesState(response[3].data.data);
        setSelectedRolInfo(response[4].data.data);

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

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImageSource(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
            setIsImageEdited(true);
            setModalShow(true);
        }
    }

    const imagehHelperSetting = (image: string) => {
        setImageHelper(image);
    }

    const handleCloseImageModal = (isSuccess? :boolean) => {
        if(isSuccess){
            setModalShow(false);
        }else{
            setIsImageEdited(false);
            setImageSource('');
        }
    }

    const handleCancelImageUpdate = () => {
        setIsImageEdited(false);
        setImageSource('');
        setImageHelper('');
    }

    const sendUserImageUpdate = async (id_user: string) => {

        setIsImageUpdateLoading(true);

        if(imageHelper != ''){
            const formData = new FormData();
            
            const file = dataURLtoFile(imageHelper, 'image.jpg');
            formData.append('file', file);

            await serverRestApi.post<Response>(`/api/users/profile/upload/${id_user}`, formData, { headers: { Authorization: localStorage.getItem('token') } })
            .then((response) => {
                if(response.data.success){
                    handleCancelImageUpdate();
                    showSuccessToast({position: 'top-center', text: response.data.message});

                    setUserState((prevState) => ({
                        ...prevState,
                        Imagen: response.data.data
                    }));
                    
                    setIsImageUpdateLoading(false);
                }
            })
            .catch((err) => {
                setIsImageUpdateLoading(false);
                handleCancelImageUpdate();

                if(err.response){
                    showErrorTost({position: 'top-center', text: err.response.data.message})
                }else{
                    showErrorTost({position: 'top-center', text: err.message})
                }
            })

        }
    }

    function dataURLtoFile(dataURL: string, filename: string): File {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    return {
        //GET STATES
        getEditableUser,
        isImageUpdateLoading,

        //EDIT STATE
        handleEditUser, 
        handleEditCredentials, 
        handleEditAddress,
        handleCloseImageModal,
        onSelectFile,
        imagehHelperSetting,
        handleCancelImageUpdate,

        //STATES
        userState,
        credentialsState,
        addressState,
        alergiesState,
        selectedRolInfo,
        imageSource,
        imageHelper,
        modalShow,


        //LOADER
        isGettingInfoLoading,

        //IS EDITED
        isUserInfoEdited, 
        isCredentialsEdited, 
        isAddressEdited, 
        isAlergiesEdited,
        isImageEdited,

        //SEND UPDATES
        sendUserImageUpdate,
    }
}
