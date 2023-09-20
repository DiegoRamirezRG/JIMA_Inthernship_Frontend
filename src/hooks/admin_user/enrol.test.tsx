import React, { useEffect, useState } from 'react'
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';
import { Student, createStudentToBe, customStudentToBe, studentToBe } from '../../models/enrollModels/EnrollModels';

export const useEnrollStudent = () => {

    //Loaders
    const [generalLoaderInfo, setgeneralLoader] = useState(false);
    const [isGettingInfoLoading, setIsGettingInfoLoading] = useState(true);
    
    //Observers
    const [isEnrollEdited, setIsEnrollEdited] = useState(false);

    //Data
    const [studentData, setstudentData] = useState<studentToBe | Student>();
    const [enrollState, setEnrollState] = useState<customStudentToBe | createStudentToBe >({
        ID_Career: '',
        ID_Student: '',
        ID_Grado: '',
        ID_Grupo: '',
        ID_Turno: ''
    });

    const getInitialStudentData = async (user_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/students/getUserData/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            setstudentData(response.data.data);
            setIsGettingInfoLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsGettingInfoLoading(false);
        }
    }
    
    const handleEnrollEdit = (name: keyof createStudentToBe, value: string) => {
        setIsEnrollEdited(true);
        setEnrollState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const sendRegisterStudentToBe = (user_id: String) => {
        try {
            setgeneralLoader(true);

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setgeneralLoader(false);
        }
    }

    
    const sendRegisterStudentCustom = async (student_id: string) => {
        try {
            
            setgeneralLoader(true);
            handleEnrollEdit('ID_Student', student_id);
            
            const response = await serverRestApi.post<Response>('/api/students/enroll/custom', {
                ...enrollState
            },{ headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-center', text: response.data.message});
                setgeneralLoader(false);
            }else{
                throw new Error(response.data.error);
            }

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setgeneralLoader(false);
        }
    }


    return {
        //loaders
        isGettingInfoLoading,

        //Oberserver
        isEnrollEdited,

        //Data Getters
        getInitialStudentData,

        //Data
        studentData,
        enrollState,

        //Data Handler
        handleEnrollEdit,

        //Senders
        sendRegisterStudentCustom,

        //loader
        generalLoaderInfo
    }

}
