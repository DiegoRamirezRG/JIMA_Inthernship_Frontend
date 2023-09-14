import React, { useEffect, useState } from 'react'
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { ColorArray } from '../../utils/colorRandom/ColorArrayRandom';
import { GenderStats, stadisticState } from '../../models/stadisticsModels/stadisticsModels';



export const useAdminCycleStats = () => {
    //Data States
    const [userStadistics, setUserStadistics] = useState<stadisticState[]>();
    const [genderStadistics, setGenderStadistics] = useState<GenderStats[]>();

    //LoadersState
    const [isGettingInitialDataLoading, setIsGettingInitialDataLoading] = useState<boolean>(true);
    const [generalLoader, setGeneralLoader] = useState<boolean>(false);

    const getInitialData = async () => {
        try {
            
            const resTotal = serverRestApi.get<Response>('/api/stadistics/users/getTotalUser', { headers: { Authorization: localStorage.getItem('token') }});
            const resAspir = serverRestApi.get<Response>('/api/stadistics/users/getStudentsToBe', { headers: { Authorization: localStorage.getItem('token') }});
            const resEstud = serverRestApi.get<Response>('/api/stadistics/users/getStudents', { headers: { Authorization: localStorage.getItem('token') }});
            const resProfe = serverRestApi.get<Response>('/api/stadistics/users/getTotalTeachers', { headers: { Authorization: localStorage.getItem('token') }});
            const resAdmin = serverRestApi.get<Response>('/api/stadistics/users/getTotalAdmins', { headers: { Authorization: localStorage.getItem('token') }});
            const restGenders = serverRestApi.get<Response>('/api/stadistics/gender/students', { headers: { Authorization: localStorage.getItem('token') }});

            const response = await Promise.all([
                resTotal,
                resAspir,
                resEstud,
                resProfe,
                resAdmin,
                restGenders
            ]);

            setUserStadistics([
                {index: 'total',    data: response[0].data.data     , color: ColorArray[0]},
                {index: 'aspirantes',  data: response[1].data.data  , color: ColorArray[1]},
                {index: 'estudiantes',  data: response[2].data.data , color: ColorArray[2]},
                {index: 'profesores',  data: response[3].data.data  , color: ColorArray[3]},
                {index: 'admins',    data: response[4].data.data    , color: ColorArray[4]}
            ]);

            setGenderStadistics(response[5].data.data);

            setIsGettingInitialDataLoading(false);

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    //Trigger first data
    useEffect(() => {
        const asyncFunc = async () => {
            await getInitialData();
        }
        asyncFunc();
    }, [])

    return {
        //Data
        userStadistics,
        genderStadistics,

        //Loader
        isGettingInitialDataLoading
    }
}
