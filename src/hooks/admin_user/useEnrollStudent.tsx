import React, { useState } from 'react'
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { Student, createStudentToBe, customStudentToBe, studentToBe } from '../../models/enrollModels/EnrollModels';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';

export const useEnrollStudent = () => {

    //Loaders
    const [isGettingInfoLoading, setIsGettingInfoLoading] = useState(true);
    
    //Modal New Aspirante
    const [createAspiranteModalState, setCreateAspiranteModalState] = useState(false);

    const handleAspiranteModalState = () => {
        setCreateAspiranteModalState(!createAspiranteModalState);
    }

    //Data States
    const [studentData, setstudentData] = useState<studentToBe | Student>();
    const [enrollState, setEnrollState] = useState<customStudentToBe>({
        ID_Career: '',
        ID_Student: '',
        ID_Grado: '',
        ID_Grupo: '',
        ID_Turno: ''
    });

    //Observers
    const [isEnrollEdited, setIsEnrollEdited] = useState(false);

    //Data Chaging Handler
    const handleEnrollEdit = (name: keyof customStudentToBe, value: string) => {
        setIsEnrollEdited(true);
        setEnrollState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    //Data Getters
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

    return {
        //Modal New Aspirante
        createAspiranteModalState,
        handleAspiranteModalState,

        //Data
        studentData,
        enrollState,

        //Get Data Functions
        getInitialStudentData,

        //Loaders
        isGettingInfoLoading,

        //Observers
        isEnrollEdited,

        //Data Changers
        handleEnrollEdit,
    }

}
