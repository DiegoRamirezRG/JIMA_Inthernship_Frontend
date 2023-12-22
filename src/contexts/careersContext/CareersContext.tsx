import React, { createContext, useContext, useState } from 'react'
import { CareerContextInterface, CareerContextProviderProps } from '../../models/careersModels/CareerContextModels';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { CareerModel, CareerModelCreate } from '../../models/careersModels/CareersModel';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';

const CareerContext = createContext<CareerContextInterface |undefined>(undefined);

export const CareersContextProvider = ({ children }: CareerContextProviderProps) => {

    //Static Obj
    const defaultCareerEdit: CareerModelCreate = {
        ID_Carrera:                 null,
        Nombre:                     null,
        Numero_De_Ciclos:           null,
        Duracion_Mensual_De_Ciclos: null,
        Descripcion:                null
    }

    //Career
    const [isUpdatingLoading, setIsUpdatingLoading] = useState<boolean>(false);
    const [careerModalEditionState, setCareerModalEditionState] = useState<boolean>(false);
    const [editCareer, setEditCareer] = useState<CareerModelCreate>(defaultCareerEdit);
    const [isGettingInformationLoading, setIsGettingInformationLoading] = useState(true);
    const [careerData, setCareerData] = useState<CareerModel[] | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const dataGetters = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/careers/getAllCareers', { headers: { Authorization: localStorage.getItem('token') } });
        
            if(response.data.data.length > 0){
                setCareerData(response.data.data);
            }
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

    const updateCareer = async () => {
        return new Promise<void>(async(resolve, reject) => {
            try {
                setIsUpdatingLoading(true);
                await serverRestApi.put<Response>('/api/careers/updateCareer', {
                    ...editCareer
                }, { headers: { Authorization: localStorage.getItem('token') } });
                
                setIsUpdatingLoading(false);
                handleCareerEditModel();
                dataGetters();
                resolve();
            } catch (error) {
                setIsUpdatingLoading(false);
                console.error(error)
                reject(error);
            }
        })
    }

    const createCareer = async () => {
        try {
            setIsUpdatingLoading(true);
            const response = await serverRestApi.post<Response>('/api/careers/createCareer',{
                Nombre: editCareer.Nombre,
                Numero_De_Ciclos: editCareer.Numero_De_Ciclos,
                Duracion_Mensual_De_Ciclos: editCareer.Duracion_Mensual_De_Ciclos,
                Descripcion: editCareer.Descripcion === '' ? null : editCareer.Descripcion
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-right', text: response.data.message});
                handleCareerEditModel();
                dataGetters();
            }
            setIsUpdatingLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsUpdatingLoading(false);
        }
    }

    //Help Career Edition
    const handleCareerEditModel = (career?: CareerModel) => {
        if(career){
            setEditCareer(career)
            setIsCreating(false);
        }else{
            setEditCareer({
                ID_Carrera:                 '',
                Nombre:                     '',
                Numero_De_Ciclos:           0,
                Duracion_Mensual_De_Ciclos: 0,
                Descripcion:                ''
            });
            setIsCreating(true);
        }
        setCareerModalEditionState(!careerModalEditionState);
    }

    const handleChangeEdit = (name: keyof CareerModelCreate, value: any) => {
        setEditCareer((prevState) => ({
            ...prevState,
            [name] : value
        }));
    }

    //GetCareerInfoByID
    const [selectedCareer, setSelectedCareer] = useState<CareerModel | null>(null);
    const [isGettingCareerLoading, setIsGettingCareerLoading] = useState<boolean>(true);

    const getCareerById = async (careerId: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/careers/getCareer/${careerId}`, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setSelectedCareer(response.data.data);
                setIsGettingCareerLoading(false);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsGettingCareerLoading(false);
        }
    }

    const contextVals: CareerContextInterface = {
        updateLoading: isUpdatingLoading,
        updateFunct: updateCareer,
        editCareer: editCareer,
        handleModalCareers: handleCareerEditModel,
        modalCareers: careerModalEditionState,
        careerOnChange: handleChangeEdit,
        //Getters
        isGettingInformationLoading: isGettingInformationLoading,
        careers: careerData,
        getCareers: dataGetters,
        createCareer: createCareer,
        isCreating: isCreating,
        //GetCareerInfoByID
        getCareerById: getCareerById,
        gettedCareer: selectedCareer,
        gettedCareerLoading: isGettingCareerLoading,
    }

    return (
        <CareerContext.Provider value={contextVals}>
            { children }
        </CareerContext.Provider>
    )
}



export const useCareersContext = (): CareerContextInterface => {
    const context = useContext(CareerContext);
    if(context === undefined){
        throw new Error('useCareersContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
