import React, { createContext, useContext, useState } from 'react'
import { CareerPlanContextInterface, CareerPlanProviderInterface } from '../../models/careersModels/CareerPlansContextModels';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { CareerPlansActives, ValidCareersPlan } from '../../models/careerPlansModels/CareerPlansModels';

const CareersPlansContext = createContext<CareerPlanContextInterface | undefined>(undefined);

export const CareersPlansContextProvider = ({ children } : CareerPlanProviderInterface) => {

    //Initial data
    const [careerPlanState, setCareerPlanState] = useState<ValidCareersPlan>(false);
    const [getInitialLoading, setGetInitialLoading] = useState(true);

    const getPlansInitialState = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/plans/validCareerPlans', { headers: { Authorization : localStorage.getItem('token') } });
            if(response.data.success){
                if(response.data.data.lenght > 0){
                    setCareerPlanState(Object.values(response.data.data)[0]!.Valid!);
                }

            }
            setGetInitialLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setGetInitialLoading(false);
        }
    }

    //Modal Create
    const [createPlanModal, setCreatePlanModal] = useState<boolean>(false);
    const [createPlamCareerId, setCreatePlamCareerId] = useState<string | null>(null);

    const handleModalOpen = (careerId? : string) => {
        if(careerId){
            setCreatePlamCareerId(careerId);
            setCreatePlanModal(true);
        }else{
            setCreatePlamCareerId(null);
            setCreatePlanModal(false);
        }
    }

    //Get Plans
    const [isGettingPlansLoading, setIsGettingPlansLoading] = useState(true);
    const [activesPlans, setActivesPlans] = useState<{ [key: string]: CareerPlansActives } | null>(null);

    const getPlansActives = async() =>{
        try {
            const response = await serverRestApi.get<Response>('/api/plans/getPlans', { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setActivesPlans(response.data.data);
            }

            setIsGettingPlansLoading(false);
        } catch (error: any) {
            setIsGettingPlansLoading(false);
        }
    }

    const contextVal : CareerPlanContextInterface = {
        //Initial data
        plansStatus:        careerPlanState,
        plansStatusLoading: getInitialLoading,
        getPlansStatus:     getPlansInitialState,

        //Modal Create
        createModalState: createPlanModal,
        handleCreateModalState: handleModalOpen,
        planCareerId: createPlamCareerId,

        //Get Active Plans
        gettingActivePlansLoading: isGettingPlansLoading,
        activePlans: activesPlans,
        getActivePlans: getPlansActives,
    }

    return (
        <CareersPlansContext.Provider value={contextVal}>
            { children }
        </CareersPlansContext.Provider>
    )
}

export const useCareersPlansContext = (): CareerPlanContextInterface => {
    const context = useContext(CareersPlansContext);
    if(context === undefined){
        throw new Error('useCareersPlansContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
