import React, { createContext, useContext, useState } from 'react'
import { CareerPlanContextInterface, CareerPlanProviderInterface } from '../../models/careersModels/CareerPlansContextModels';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { ValidCareersPlan } from '../../models/careerPlansModels/CareerPlansModels';

const CareersPlansContext = createContext<CareerPlanContextInterface | undefined>(undefined);

export const CareersPlansContextProvider = ({ children } : CareerPlanProviderInterface) => {

    //Initial data
    const [careerPlanState, setCareerPlanState] = useState<ValidCareersPlan>(false);
    const [getInitialLoading, setGetInitialLoading] = useState(true);

    const getPlansInitialState = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/plans/validCareerPlans', { headers: { Authorization : localStorage.getItem('token') } });
            if(response.data.success){
                setCareerPlanState(response.data.data);
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

    //Creating Plan
    

    const contextVal : CareerPlanContextInterface = {
        //Initial data
        plansStatus:        careerPlanState,
        plansStatusLoading: getInitialLoading,
        getPlansStatus:     getPlansInitialState,

        //Modal Create
        createModalState: createPlanModal,
        handleCreateModalState: handleModalOpen,
        planCareerId: createPlamCareerId,
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
