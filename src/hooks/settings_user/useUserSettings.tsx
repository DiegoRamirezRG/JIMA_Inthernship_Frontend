import React, { useState } from 'react'
import { dataURLtoFile } from '../admin_user/helpers/dataToBlob';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { showErrorTost, showSuccessToast, showWarningToast } from '../../components/generalComponents/toastComponent/ToastComponent';

export const useUserSettings = () => {

    const [wallpaperSource, setWallpaperSource] = useState<string | null>(null);
    const [wallpaperObserver, setWallpaperObserver] = useState<boolean>(false);
    const [wallpaperLoader, setWallpaperLoader] = useState(false);

    //modals
    const [userUpdateInfoModal, setUserUpdateInfoModal] = useState(false);

    const handleInfoUpdateModal = () => {
        setUserUpdateInfoModal(!userUpdateInfoModal);
    }

    const onSelectWallpaperFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setWallpaperObserver(true);
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setWallpaperSource(reader.result?.toString() || '')
            )
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    const cancelWallpaperChange = () => {
        setWallpaperSource(null);
        setWallpaperObserver(false);
    }

    const sendWallpaperUpload = async (user_id: string, hideModal: () => void) => {
        setWallpaperLoader(true);
        if(wallpaperSource != null){
            const formData = new FormData();
            const file = dataURLtoFile(wallpaperSource, 'image.jpg');
            formData.append('file', file);

            await serverRestApi.post<Response>(`/api/users/wallpaper/upload/${user_id}`, formData, { headers: { Authorization: localStorage.getItem('token') } })
            .then((response) => {
                if(response.data.success){
                    cancelWallpaperChange();
                    showSuccessToast({position: 'top-center', text: response.data.message});
                    showWarningToast({position: 'top-center', text: 'Por favor recarga la pagina para notar cambios'});
                    
                    setWallpaperLoader(false);
                    hideModal();
                }
            })
            .catch((err) => {
                cancelWallpaperChange();
                setWallpaperLoader(false);
                hideModal();

                if(err.response){
                    showErrorTost({position: 'top-center', text: err.response.data.message})
                }else{
                    showErrorTost({position: 'top-center', text: err.message})
                }
            })
        }
    }

    const deleteWallpaper = async(user_id: string, hideModal: () => void) => {
        try {
            setWallpaperLoader(true);

            const response = await serverRestApi.delete<Response>(`/api/user/wallpaper/delete/${user_id}`, {
                headers: { Authorization: localStorage.getItem('token') }
            });

            if(response.data.success){
                hideModal();
                showSuccessToast({position: 'top-center', text: response.data.message});
                showWarningToast({position: 'top-center', text: 'Por favor recarga la pagina para notar cambios'});
            }
            setWallpaperLoader(false);
        } catch (error: any) {
            setWallpaperLoader(false);
            hideModal();

            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }


    return {
        onSelectWallpaperFile,
        wallpaperSource,
        cancelWallpaperChange,
        wallpaperObserver,
        wallpaperLoader,
        sendWallpaperUpload,
        deleteWallpaper,
        userUpdateInfoModal,
        handleInfoUpdateModal
    }
}
