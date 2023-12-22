import React, { useEffect, useState } from 'react'
import { showErrorTost, showSuccessToast, showWarningToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { CareerModel, CareerModelCreate } from '../../models/careersModels/CareersModel';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';

export const useCareers = () => {

    //Object Helper
    const defaultCareerEdit: CareerModelCreate = {
        ID_Carrera:                 null,
        Nombre:                     null,
        Numero_De_Ciclos:           null,
        Duracion_Mensual_De_Ciclos: null,
        Descripcion:                null
    }

    //Loader
    const [isGettingInformationLoading, setIsGettingInformationLoading] = useState(true);
    const [generalLoader, setGeneralLoader] = useState(false);

    const [careerData, setCareerData] = useState<CareerModel[] | null>(null);
    const [careerOptions, setcareerOptions] = useState<optionSelect[]>();

    const [careerDataActive, setCareerDataActive] = useState<CareerModel[] | null>(null);
    const [careerActiveOptions, setcareerActiveOptions] = useState<optionSelect[]>();

    //Observers
    const [observerEdit, setObserverEdit] = useState(false);
    const [observerCreate, setObserverCreate] = useState(false);

    //Data handler
    const [editCareer, setEditCareer] = useState<CareerModelCreate>(defaultCareerEdit);

    const handlerCarreraEdit = (name: keyof CareerModelCreate, value: any) => {
        if(!observerEdit){
            setObserverCreate(true);
        }

        setEditCareer(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSelectCareerToEdit = (career: CareerModel) => {
        setObserverEdit(true);

        setEditCareer(career);
    }

    const handleResetEdit = () => {
        setObserverEdit(false);
        setEditCareer(defaultCareerEdit);
    }

    // Data Getter

    const dataGetters = async () => {
        const response = await serverRestApi.get<Response>('/api/careers/getAllCareers', { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.data.length > 0){
                setCareerData(response.data.data);
                const formatedData = response.data.data.map((carrer: CareerModel) => ({
                    value: carrer.ID_Carrera,
                    label: carrer.Nombre,
                }));

                setcareerOptions(formatedData);
            }
    }

    const dataGetActive = async () => {

        const responseActive = await serverRestApi.get<Response>('/api/careers/getAllCareers/Actives', { headers: { Authorization: localStorage.getItem('token') } });
        if(responseActive.data.data.length > 0){
            setCareerDataActive(responseActive.data.data);
            const formatedActiveData = responseActive.data.data.map((carrer: CareerModel) => ({
                value: carrer.ID_Carrera,
                label: carrer.Nombre,
            }));

            setcareerActiveOptions(formatedActiveData);
        }
    }

    const getCareers = async () => {
        try {
            setIsGettingInformationLoading(true);
            
            await dataGetters();
            await dataGetActive();

            setIsGettingInformationLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsGettingInformationLoading(false);
        }
    }

    //Create Career
    const createCareer = async () => {
        try {
            setGeneralLoader(true);

            const response = await serverRestApi.post<Response>('/api/careers/createCareer',{
                Nombre: editCareer.Nombre,
                Numero_De_Ciclos: editCareer.Numero_De_Ciclos,
                Duracion_Mensual_De_Ciclos: editCareer.Duracion_Mensual_De_Ciclos,
                Descripcion: null
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-right', text: response.data.message});
                handleResetEdit();

                await dataGetters();
                await dataGetActive();
            }
            setGeneralLoader(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setGeneralLoader(false);
        }
    }

    //Update Career
    const updateCareer = async () => {
        try {
            setGeneralLoader(true);

            const response = await serverRestApi.put<Response>('/api/careers/updateCareer', {
                ...editCareer
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-right', text: response.data.message});
                showWarningToast({position: 'top-right', text: 'Por favor recarga para notar las actualizaciones de las carreras'});
                handleResetEdit();

                await dataGetters();
                await dataGetActive();
            }

            setGeneralLoader(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setGeneralLoader(false);
        }
    }

    useEffect(() => {
        const awaitFunc = async () => {
            await getCareers();
        }

        awaitFunc();
    }, [])

    return {
        //Loader
        isGettingInformationLoading,
        generalLoader,

        //Data
        careerData,
        careerOptions,
        careerDataActive, 
        careerActiveOptions,

        //Edit / Add
        editCareer,
        handleSelectCareerToEdit,
        handlerCarreraEdit,
        handleResetEdit,

        //Observers
        observerEdit,
        observerCreate,

        //Data Senders
        createCareer,
        updateCareer,
    }
}
