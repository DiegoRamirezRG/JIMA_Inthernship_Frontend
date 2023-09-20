import React, { useState } from 'react'
import { Grade, Group, Shift } from '../../models/schoolInfoModels/schoolInfoModels';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';

export const useSchoolInfo = () => {

    //Data
    const [shiftsState, setShiftsState] = useState<Shift[]>();
    const [gradesState, setGradesState] = useState<Grade[]>();
    const [griupsState, setGriupsState] = useState<Group[]>();

    //Select Data
    const [selectShiftData, setSelectShiftData] = useState<optionSelect[]>();
    const [selectGradesData, setSelectGradesData] = useState<optionSelect[]>();
    const [selectGroupsData, setSelectGroupsData] = useState<optionSelect[]>();

    //Loaders
    const [generalLoader, setGeneralLoader] = useState<boolean>(false);
    const [isGettingInitDataLoading, setIsGettingInitDataLoading] = useState<boolean>(true);

    //get Intial Data

    const getInitialData = async () => {
        try {
            
            const resShifts = serverRestApi.get<Response>('/api/school/info/shifts/getShifts', {headers: { Authorization: localStorage.getItem('token') }});
            const resGrades = serverRestApi.get<Response>('/api/school/info/grades/getGrades', {headers: { Authorization: localStorage.getItem('token') }});
            const resGroups = serverRestApi.get<Response>('/api/school/info/groups/getGroups', {headers: { Authorization: localStorage.getItem('token') }});

            const response = await Promise.all([
                resShifts,
                resGrades,
                resGroups
            ]);

            setShiftsState(response[0].data.data);
            setGradesState(response[1].data.data);
            setGriupsState(response[2].data.data);

            const formatedShift = response[0].data.data.map((turno: Shift) => ({
                value: turno.ID_Turno,
                label: turno.Nombre,
            }));

            const formatedGrade = response[1].data.data.map((grado: Grade) => ({
                value: grado.ID_Grado,
                label: grado.Numero + '°',
            }));

            const formatedGroup = response[2].data.data.map((grupo: Group) => ({
                value: grupo.ID_Grupo,
                label: grupo.Indicador,
            }));

            setSelectShiftData(formatedShift);
            setSelectGradesData(formatedGrade);
            setSelectGroupsData(formatedGroup);

            setIsGettingInitDataLoading(false);

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsGettingInitDataLoading(false);
        }
    }

    return {
        //Data
        shiftsState,
        gradesState,
        griupsState,

        //Select Data
        selectShiftData,
        selectGradesData,
        selectGroupsData,

        //Loaders
        isGettingInitDataLoading,

        //Get Data
        getInitialData,
    }
}
