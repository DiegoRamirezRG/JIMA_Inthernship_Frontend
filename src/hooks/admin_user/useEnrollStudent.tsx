import React, { useState } from 'react'
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { Student, createStudentToBe, customStudentToBe, studentToBe } from '../../models/enrollModels/EnrollModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';
import { findValueByLabel } from './helpers/findValueByData';
import { useDeleteConfirmModalContext } from '../../contexts/modals_states/deleteConfimModal/deleteConfirmMContext';
import { useConfrimCustomModalContext } from '../../contexts/modals_states/confirmCustomEnrollModal/confirmCustomEnrollModal';



export const useEnrollStudent = () => {

    //Context Helpers
    const { changeDeleteConfirmModalState } = useDeleteConfirmModalContext();
    const { changeConfirmCustomModalState } = useConfrimCustomModalContext();

    //Default Data
    const defaultStatData: customStudentToBe = {
        ID_Career: '',
        ID_Student: '',
        ID_Grado: '',
        ID_Grupo: '',
        ID_Turno: ''
    }

    //Loaders
    const [isGettingInfoLoading, setIsGettingInfoLoading] = useState(true);
    const [makeAspiranteLoader, setMakeAspiranteLoader] = useState(false);
    const [enrollerActionLoader, setEnrollerActionLoader] = useState(false);
    
    //Modal New Aspirante
    const [createAspiranteModalState, setCreateAspiranteModalState] = useState(false);

    const handleAspiranteModalState = () => {
        setCreateAspiranteModalState(!createAspiranteModalState);
    }

    //Data States
    const [studentData, setstudentData] = useState<studentToBe | Student>();
    const [enrollState, setEnrollState] = useState<customStudentToBe>(defaultStatData);

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

    const dataGetter = async (user_id: string) => {
        const response = await serverRestApi.get<Response>(`/api/students/getUserData/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });
        setstudentData(response.data.data);
    }

    //Data Getters
    const getInitialStudentData = async (user_id: string) => {
        try {
            await dataGetter(user_id);
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

    const registerStudentAspirante = async (student_id: string, user_id: string, careers: optionSelect[]) => {
        try {
            setMakeAspiranteLoader(true);
            const careerId = findValueByLabel(careers, enrollState.ID_Career);

            const response = await serverRestApi.post<Response>('/api/students/toBe/registerStudent', {
                ID_Student: student_id,
                ID_Career: careerId
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                await dataGetter(user_id);
                setIsEnrollEdited(false);
                setEnrollState(defaultStatData);
                showSuccessToast({position: 'top-center', text: response.data.message})
            }

            setMakeAspiranteLoader(false);

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setMakeAspiranteLoader(false);
        }
    }

    const cancelAspiranteRegister = async ( user_id: string) => {
        try {
            setEnrollerActionLoader(true);

            const response = await serverRestApi.delete<Response>(`/api/students/toBe/cancelRegister/${user_id}`, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-center', text: response.data.message});
                await dataGetter(user_id);
                setIsEnrollEdited(false);
                setEnrollState(defaultStatData);
            }
            
            changeDeleteConfirmModalState();
            setEnrollerActionLoader(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            changeDeleteConfirmModalState()
            setEnrollerActionLoader(false);
        }
    }

    //temp to checl
    const tryState = () => {
        console.table(studentData);
    }

    //Enroll Custom Student
    const enrollCustomStudent = async (user_id: string) => {
        try {
            setMakeAspiranteLoader(true);

            if(await validateStudentToBe(enrollState)){
                showErrorTost({position: 'top-right', text: 'No puede haber campos vacios'});
                setMakeAspiranteLoader(false);
                return;
            }

            const response = await serverRestApi.post<Response>('/api/students/enroll/custom', {
                ...enrollState
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                await dataGetter(user_id);
                setIsEnrollEdited(false);
                setEnrollState(defaultStatData);
                showSuccessToast({position: 'top-center', text: response.data.message})
            }

            changeConfirmCustomModalState();
            setMakeAspiranteLoader(false);

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setMakeAspiranteLoader(false);
        }
    }

    const validateStudentToBe = async (data: customStudentToBe) => {
        for(const key in Object.keys(data)){
            if(data[key as keyof customStudentToBe] === '' || data[key as keyof customStudentToBe] === null){
                return true;
            }
        }
        return false;
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
        makeAspiranteLoader,
        enrollerActionLoader,

        //Observers
        isEnrollEdited,

        //Data Changers
        handleEnrollEdit,

        //Data senders
        registerStudentAspirante,
        cancelAspiranteRegister,
        enrollCustomStudent,
        tryState,
    }

}
