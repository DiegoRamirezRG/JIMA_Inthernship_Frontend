import { useState } from "react";
import { SingleUser } from "../../models/authModels/UserModel";
import { Credentials } from "../../models/credentialsModels/CredentialsModels";
import { AddressModel } from "../../models/addressModels/AddressModel";
import { AlergiesModel, AlergiesModelCreate } from "../../models/alergiesModel/AlergiesModel";
import { administrative, student, teacher } from "../../models/userTypesModels/UserTypesModel";
import { serverRestApi } from "../../utils/apiConfig/apiServerConfig";
import { Response } from "../../models/responsesModels/responseModel";
import { showErrorTost, showSuccessToast } from "../../components/generalComponents/toastComponent/ToastComponent";
import { dataURLtoFile } from "./helpers/dataToBlob";
import { validateMedic, validate_Edit_User_Data, validate_adress, validate_alergies, validate_credentials } from "./helpers/informationValidator";

export const useUsersEdit = () => {

    //Mutable Data States
    //Mutable Data States
    //Mutable Data States
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

    //Original Unmatble States
    //Original Unmatble States
    //Original Unmatble States
    const [originalUserData, setOriginalUserData] = useState<SingleUser>();
    const [originalCredentialData, setOriginalCredentialData] = useState<Credentials>();
    const [originalAdressData, setOriginalAdressData] = useState<AddressModel>();
    const [originalAlergiesData, setOriginalAlergiesData] = useState<AlergiesModel[]>();
    const [originalRolData, setOriginalRolData] = useState<administrative | teacher | student | any>();

    //Image Helpers
    //Image Helpers
    //Image Helpers
    const [imageSource, setImageSource] = useState('');
    const [imageCropped, setImageCropped] = useState('');

    //Loaders
    //Loaders
    //Loaders
    const [isGettingInfoLoading, setIsGettingInfoLoading] = useState(true);
    const [generalLoader, setGeneralLoader] = useState(false);

    //Edit Active Helpers
    //Edit Active Helpers
    //Edit Active Helpers
    const [isImageEditing , setIsImageEditing ] = useState(false);
    const [isUserEditing, setIsUserEditing] = useState(false);
    const [isCredentialsEditing, setIsCredentialsEditing] = useState(false);
    const [isAddressEditing, setIsAddressEditing] = useState(false);
    const [isAlergiesEditing, setIsAlergiesEditing] = useState(false);

    //Edit Observers
    //Edit Observers
    //Edit Observers
    const [isGettisImageProfileEditing, setIsGettisImageProfileEditing] = useState(false);
    const [isGettingUserEditing, setIsGettingUserEditing] = useState(false);
    const [isGettingCredentialsEditing, setIsGettingCredentialsEditing] = useState(false);

    //Modals States
    //Modals States
    //Modals States
    const [sureModalState, setSureModalState] = useState(false);
    const [cropModalState, setCropModalState] = useState(false);

    //Handle Modal States
    //Handle Modal States
    //Handle Modal States
    const handleSureModalActive = () => {
        setSureModalState(!sureModalState);
    }

    const handleCropModalActive = () => {
        setCropModalState(!cropModalState);
    }

    //Get Mutable and Unmutable Data
    //Get Mutable and Unmutable Data
    //Get Mutable and Unmutable Data
    const getEditableUser = async (user_id: string) => {
        try {
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

            setOriginalUserData(response[0].data.data);
            setOriginalCredentialData(response[1].data.data);
            setOriginalAdressData(response[2].data.data);
            setOriginalAlergiesData(response[3].data.data);
            setOriginalRolData(response[4].data.data);

            setIsGettingInfoLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    //Handle Active Editing
    //Handle Active Editing
    //Handle Active Editing

    //---------------------

    //Active Image Editing
    const handleActivateImageEditing = () => {
        if(isImageEditing){
            setIsImageEditing(false);
        }else{
            setIsImageEditing(true);
        }
    }

    //Active User Editing 
    const handleActivateUserEditing = () => {
        if(isUserEditing){
            setIsUserEditing(false);
        }else{
            setIsUserEditing(true);
        }
    }

    //Active Credentials Edit
    const handleActivateCredentialsEditing = () => {
        if(isCredentialsEditing){
            setIsCredentialsEditing(false);
        }else{
            setIsCredentialsEditing(true);
        }
    }

    //Active Address Edit
    const handleActivateAddressEditing = () => {
        if(isAddressEditing){
            setIsAddressEditing(false);
        }else{
            setIsAddressEditing(true);
        }
    }

    const handleActivateAlergiesEditing = () => {
        if(isAlergiesEditing){
            setIsAlergiesEditing(false);
        }else{
            setIsAlergiesEditing(true);
        }
    }

    //Edit Data Handlers
    //Edit Data Handlers
    //Edit Data Handlers

    //--------------------

    //Handle Edit User Data
    //Handle Edit User Data
    //Handle Edit User Data

    //Edit User Data
    const handleEditUser = (name: keyof SingleUser, value: any) => {
        if(name === 'Imagen' || name === 'Numero_De_Emergencia' || name === 'Tipo_De_Sagre' || name === 'Rol'){
            
        }else{
            setIsGettingUserEditing(true);
        }

        setUserState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    //Cancel Edit and Restore Original User Data
    const cancelUserEditing = () => {
        const newUserState = { ...originalUserData };

        delete newUserState.Tipo_De_Sagre;
        delete newUserState.Numero_De_Emergencia;

        setUserState((prevState) => ({
            ...prevState,
            ...newUserState
        }));
        setIsGettingUserEditing(false);
        handleActivateUserEditing();
    }

    //Handle Edit Credentials Data
    //Handle Edit Credentials Data
    //Handle Edit Credentials Data

    //Edit Credentials Data
    const handleEditCredentials = (name: keyof Credentials, value: any) => {
        setIsGettingCredentialsEditing(true);
        setCredentialsState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    //Cancel Edit and Restore Original Credentials Data
    const cancelCredentialsEditing = () => {
        setIsGettingCredentialsEditing(false);
        setCredentialsState(originalCredentialData!);
        handleActivateCredentialsEditing();
    }

    //Handle Edit Address Data
    //Handle Edit Address Data
    //Handle Edit Address Data

    //Edit Address Data
    const handleEditAddress = (name: keyof AddressModel, value: any) => {
        setAddressState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    //Cancel Edit and Restore Original Address Data
    const cancelAddressEditing = () => {
        setAddressState(originalAdressData!);
        handleActivateAddressEditing();
    }

    //Handle Edit Alergies Data
    //Handle Edit Alergies Data
    //Handle Edit Alergies Data

    //Add Alergies Data
    const handleEditAlergies = (newAlergie: AlergiesModelCreate) => {
        setAlergiesState(prevState => [...prevState!, newAlergie]);
    }

    //Remove Alergies Data
    const deleteGlobalAlergie = (searchedTitle: string) => {
        setAlergiesState((prevAlergiesModel) => {
            const updatedAlergiesModel = prevAlergiesModel!.filter(
                (item) => item.Nombre !== searchedTitle
            );
            return updatedAlergiesModel;
        });
    }

    //Cancel Edit and Restore Original Alergies Data
    const cancelAlergiesEditing = () => {
        setUserState((prevState) => ({
            ...prevState,
            Tipo_De_Sagre: originalUserData?.Tipo_De_Sagre!,
            Numero_De_Emergencia: originalUserData?.Numero_De_Emergencia!
        }));

        setAlergiesState(originalAlergiesData!);
        setIsAlergiesEditing(false);
    }

    //Handle Edit Profile Image Data
    //Handle Edit Profile Image Data
    //Handle Edit Profile Image Data

    //Read File and Open the Crop Modal
    const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImageSource(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(event.target.files[0]);
            setIsGettisImageProfileEditing(true);
            setCropModalState(true);
        }
    }

    //Save Local the Cropped Image
    const imageCropperSaveLocal = (image: string) => {
        setImageCropped(image);
    }

    //Cancel Image Editing and Restore Original Data
    const handleCancelImageUpdate = () => {
        setImageSource('');
        setImageCropped('');
        setIsGettisImageProfileEditing(false);
        setIsImageEditing(false);
    }

    //Data Update Senders Functions
    //Data Update Senders Functions
    //Data Update Senders Functions

    //-----------------------------

    //Send Progile Image Update
    //Send Progile Image Update
    //Send Progile Image Update
    const sendUserImageUpdate = async (id_user: string) => {
        setGeneralLoader(true);

        if(imageCropped != ''){
            const formData = new FormData();
            
            const file = dataURLtoFile(imageCropped, 'image.jpg');
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
                    
                    setGeneralLoader(false);
                    handleSureModalActive();
                }
            })
            .catch((err) => {
                handleCancelImageUpdate();
                setGeneralLoader(false);
                handleSureModalActive();

                if(err.response){
                    showErrorTost({position: 'top-center', text: err.response.data.message})
                }else{
                    showErrorTost({position: 'top-center', text: err.message})
                }
            })
        }
    }

    //Send Progile Image Delete
    //Send Progile Image Delete
    //Send Progile Image Delete
    const deleteUserImage = async (user_id: string) => {
        try {
            setGeneralLoader(true);
            const response = await serverRestApi.delete<Response>(`/api/user/profile/delete/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setUserState((prevState) => ({
                    ...prevState,
                    Imagen: null
                }));
                
                showSuccessToast({position: 'top-center', text: response.data.message});
                handleSureModalActive();
                setGeneralLoader(false);
            } else {
                handleSureModalActive();
                setGeneralLoader(false);
                showErrorTost({position: 'top-center', text: response.data.message});
            }

        } catch (error: any) {
            showErrorTost({position: 'top-center', text: error.message});
        }
    }

    //Send User Info Card Update
    //Send User Info Card Update
    //Send User Info Card Update
    const sendUserInfoCardUpdate = async (id_user: string) => {
        try {
            setGeneralLoader(true);
            await validate_Edit_User_Data(userState);
            const attributesToKeep: (keyof SingleUser)[] = [
                "Nombre",
                "Apellido_Paterno",
                "Apellido_Materno",
                "CURP",
                "Genero",
                "Fecha_De_Nacimiento",
                "Numero_De_Telefono",
                "Nacionalidad"
            ];
            
            const temp: { [key: string]: any } = {};

            attributesToKeep.forEach((attribute) => {
                if (userState.hasOwnProperty(attribute)) {
                    temp[attribute] = userState[attribute];
                }
            });

            const response = await serverRestApi.put<Response>(`/api/user/update/${id_user}`, temp, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setGeneralLoader(false);
                setIsGettingUserEditing(false);
                handleSureModalActive();
                handleActivateUserEditing();
                setOriginalUserData(userState);

                showSuccessToast({position: 'top-center', text: response.data.message});
                setOriginalUserData(userState);
            }else{
                throw new Error(response.data.error);
            }

        } catch (error: any) {
            setGeneralLoader(false);
            setIsGettingUserEditing(false);
            handleSureModalActive()
            handleActivateUserEditing();

            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    //Send Credentials Update
    //Send Credentials Update
    //Send Credentials Update
    const sendCredentialsUpdate = async(user_id : string) => {
        try {
            setGeneralLoader(true);
            let body = {};

            if(credentialsState.Contraseña === originalCredentialData?.Contraseña){
                body = {"password": '', "email": `${credentialsState.Correo}`}
            }else{
                body = {"password": `${credentialsState.Contraseña}`, "email": `${credentialsState.Correo}`}
            }
            
            await validate_credentials(credentialsState);

            const response = await serverRestApi.put<Response>(`/api/credentials/update/${user_id}`, body, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){

                setIsGettingCredentialsEditing(false);
                setIsCredentialsEditing(false);
                handleActivateCredentialsEditing();
                setGeneralLoader(false);
                setSureModalState(false);
                setOriginalCredentialData(credentialsState);

                showSuccessToast({position: "top-center", text: response.data.message});
            }else{
                throw new Error(response.data.error);
            }

        } catch (error: any) {
            setIsGettingCredentialsEditing(false);
            setIsCredentialsEditing(false);
            handleActivateCredentialsEditing();
            setGeneralLoader(false);
            setSureModalState(false);

            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    //Send Credentials Update
    //Send Credentials Update
    //Send Credentials Update
    const sendAddressUpdate = async(user_id : string) => {
        try {
            setGeneralLoader(true);
            await validate_adress(addressState);

            const response = await serverRestApi.put<Response>(`/api/address/update/${user_id}`, {...addressState}, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){

                setGeneralLoader(false);
                setOriginalAdressData(addressState);
                handleActivateAddressEditing();
                setSureModalState(false);

                showSuccessToast({position: 'top-center', text: response.data.message});

            }else{
                throw new Error(response.data.error)
            }

        } catch (error: any) {
            setGeneralLoader(false);
            cancelAddressEditing();
            setSureModalState(false);
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    //Send Alergies Update
    //Send Alergies Update
    //Send Alergies Update
    const sendAlergiesUpdate = async (userId: string )=> {
        try {
            setGeneralLoader(true);

            await validate_alergies(alergiesState as AlergiesModelCreate[]);
            await validateMedic(userState.Tipo_De_Sagre!, userState.Numero_De_Emergencia!);

            const attributesToKeep: (keyof SingleUser)[] = [
                "Tipo_De_Sagre",
                "Numero_De_Emergencia"
            ];
            
            const temp: { [key: string]: any } = {};

            attributesToKeep.forEach((attribute) => {
                if (userState.hasOwnProperty(attribute)) {
                    temp[attribute] = userState[attribute];
                }
            });

            const response = await serverRestApi.put<Response>(`/api/alergies/update/${userId}`,{
                userData: {
                    ...temp
                },
                alergiesData: {
                    ...alergiesState
                }
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setGeneralLoader(false);
                setOriginalUserData(userState);
                setOriginalAlergiesData(alergiesState);
                setIsAlergiesEditing(false);
                setSureModalState(false);

                showSuccessToast({position: 'top-center', text: response.data.message});
            }else{
                throw new Error(response.data.error);
            }
        } catch (error: any) {
            setGeneralLoader(false);
            cancelAlergiesEditing();
            setSureModalState(false);

            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    return {
        //Mutable Data States
        userState,
        credentialsState,
        addressState,
        alergiesState,
        selectedRolInfo,

        //Loaders
        isGettingInfoLoading,
        generalLoader,

        //Get Initial Data
        getEditableUser,

        //Active Editing
        handleActivateImageEditing,
        handleActivateUserEditing,
        handleActivateCredentialsEditing,
        handleActivateAddressEditing,
        handleActivateAlergiesEditing,

        //Editing Obervers
        isGettisImageProfileEditing,
        isGettingUserEditing,
        isGettingCredentialsEditing,

        //Is Active Editing States
        isImageEditing,
        isUserEditing,
        isCredentialsEditing,
        isAddressEditing,
        isAlergiesEditing,

        //Image Update
        onSelectFile,
        imageCropperSaveLocal,
        imageSource,
        imageCropped,
        handleCancelImageUpdate,
        sendUserImageUpdate,
        deleteUserImage,

        //User Update
        handleEditUser,
        cancelUserEditing,
        sendUserInfoCardUpdate,

        //Credentials Update
        handleEditCredentials,
        cancelCredentialsEditing,
        sendCredentialsUpdate,

        //Address Update
        handleEditAddress,
        cancelAddressEditing,
        sendAddressUpdate,

        //Alergies Update
        handleEditAlergies,
        deleteGlobalAlergie,
        cancelAlergiesEditing,
        sendAlergiesUpdate,

        //Modal Handler
        sureModalState,
        cropModalState,

        //Handle Modal State
        handleSureModalActive,
        handleCropModalActive
    }
}