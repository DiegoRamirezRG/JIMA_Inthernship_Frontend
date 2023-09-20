import React, { useEffect, useState } from 'react'
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { CareerModel } from '../../models/careersModels/CareersModel';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';

export const useCareers = () => {

    //Loader
    const [isGettingInformationLoading, setIsGettingInformationLoading] = useState(true);
    const [generalLoader, setGeneralLoader] = useState(false);

    const [careerData, setCareerData] = useState<CareerModel[] | null>(null);
    const [careerOptions, setcareerOptions] = useState<optionSelect[]>();


    const getCareers = async () => {
        try {
            setIsGettingInformationLoading(true);
            const response = await serverRestApi.get<Response>('/api/careers/getAllCareers', { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.data.length > 0){
                setCareerData(response.data.data);
                const formatedData = response.data.data.map((carrer: CareerModel) => ({
                    value: carrer.ID_Carrera,
                    label: carrer.Nombre,
                }));

                setcareerOptions(formatedData);
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

    useEffect(() => {
        const awaitFunc = async () => {
            await getCareers();
        }

        awaitFunc();
    }, [])

    return {
        //Loader
        isGettingInformationLoading,

        //Data
        careerData,
        careerOptions,
    }
}
