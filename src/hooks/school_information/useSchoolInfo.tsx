import React, { useState } from 'react'
import { Grade, Group, Shift, ShiftCreateOrEdit } from '../../models/schoolInfoModels/schoolInfoModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { optionSelect } from '../../models/universalApiModels/UniversalApiModel';

export const useSchoolInfo = () => {

    //DefaultData
    const defaultShift: ShiftCreateOrEdit = {
        ID_Turno: '',
        Nombre: '',
        Hora_Inicio: '',
        Hora_Fin: '',
        Creado_En: '',
        Actualizado_EN: '',
        Active: true
    }

    //Data
    const [shiftsState, setShiftsState] = useState<Shift[]>();
    const [gradesState, setGradesState] = useState<Grade[]>();
    const [griupsState, setGriupsState] = useState<Group[]>();

    //Edit Or Create
    const [createOrEditShift, setCreateOrEditShift] = useState<Shift | ShiftCreateOrEdit>(defaultShift);
    const [createOrEditGrade, setCreateOrEditGrade] = useState<Grade>();
    const [createOrEditGroup, setCreateOrEditGroup] = useState<Group>();

    //Observers
    const [isShiftEditing, setisShiftEditing] = useState(false);

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

    //Handle Shifts

    const handleLoadShiftForEdit = (shift: Shift) => {
        setisShiftEditing(true);
        setCreateOrEditShift(shift);
    }

    const handleCancelShiftEditing = () => {
        setisShiftEditing(false);
        setCreateOrEditShift(defaultShift);
    }

    const handleEditShifting = (name: keyof Shift, value: any) => {
        setCreateOrEditShift((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    //Data Senders

    const sendCreationShift = async (hora_i: string, hora_f: string, min_i: string, min_f: string) => {
        try {
            setGeneralLoader(true);

            const response = await serverRestApi.post<Response>('/api/school/info/shifts/createShift', {
                Nombre: createOrEditShift.Nombre,
                Hora_Inicio: `${hora_i+':'+min_i}`,
                Hora_Fin: `${hora_f+':'+min_f}`
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                const shifts = await serverRestApi.get<Response>('/api/school/info/shifts/getShifts', {headers: { Authorization: localStorage.getItem('token') }});
                setShiftsState(shifts.data.data);
            }

            showSuccessToast({position: 'top-right', text: response.data.message});
            handleCancelShiftEditing();
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

    const sendUpdateShift = async (hora_i: string, hora_f: string, min_i: string, min_f: string) => {
        try {
            
            setGeneralLoader(true);

            const response = await serverRestApi.put<Response>('/api/school/info/shift/updateShift', {
                ID_Turno: createOrEditShift.ID_Turno,
                Nombre: createOrEditShift.Nombre,
                Hora_Inicio: `${hora_i+':'+min_i}`,
                Hora_Fin: `${hora_f+':'+min_f}`
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                const shifts = await serverRestApi.get<Response>('/api/school/info/shifts/getShifts', {headers: { Authorization: localStorage.getItem('token') }});
                setShiftsState(shifts.data.data);
            }

            showSuccessToast({position: 'top-right', text: response.data.message});
            handleCancelShiftEditing();
            setGeneralLoader(false);

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
        generalLoader,

        //Get Data
        getInitialData,

        //HandleEditOrCreateStates
        createOrEditShift,
        createOrEditGrade,
        createOrEditGroup,

        //HandleEditStateLoad
        handleLoadShiftForEdit,

        //HandleChangeInfo
        handleEditShifting,

        //Cancel Editing
        handleCancelShiftEditing,

        //Observers
        isShiftEditing,

        //Data Senders
        sendCreationShift,
        sendUpdateShift,
    }
}
