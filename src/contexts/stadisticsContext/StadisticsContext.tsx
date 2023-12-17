import React, { createContext, useContext, useState } from 'react'
import { stadisticsContextModel, stadisticsPrivder } from '../../models/stadisticsModels/stadisticsContextModels';
import { stattsCycleStudent } from '../../models/stadisticsModels/stadisticsModels';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';

const StadisticsContext = createContext<stadisticsContextModel | undefined>(undefined);

export const StadisticsContextProvider = ({ children }: stadisticsPrivder) => {

    //Cycle Student Stadistics
    const [studentsCycleStats, setStudentsCycleStats] = useState<stattsCycleStudent[]>([]);

    const getStudentStats = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/stadistics/cicle/students', { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setStudentsCycleStats(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    //Returnings
    const context: stadisticsContextModel = {
        //Cycle Student Stadistics
        cycleStats: studentsCycleStats,
        getCycleStats: getStudentStats,
    }

    return (
        <StadisticsContext.Provider value={context}>
            { children }
        </StadisticsContext.Provider>
    )
}

export const useStadisticsContext = (): stadisticsContextModel => {
    const context = useContext(StadisticsContext);
    if(context === undefined){
        throw new Error('useStadisticsContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
