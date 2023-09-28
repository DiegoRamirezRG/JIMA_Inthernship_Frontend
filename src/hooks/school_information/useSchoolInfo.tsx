import React, { useState } from 'react'
import { Grade, GradeCreateOrEdit, Group, GroupCreateOrEdit, Shift, ShiftCreateOrEdit } from '../../models/schoolInfoModels/schoolInfoModels';
import { showErrorTost, showSuccessToast, showWarningToast } from '../../components/generalComponents/toastComponent/ToastComponent';
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

    const defaultGrade : GradeCreateOrEdit = {
        ID_Grado: null,
        Numero: null,
        Descripcion: null,
        Creado_En: null,
        Actualizado_EN: null,
        Active: true
    }

    const defaultGroup : GroupCreateOrEdit = {
        ID_Grupo: '',
        Indicador: null,
        Creado_En: null,
        Actualizado_EN: null,
        Active: true
    }

    //Data
    const [shiftsState, setShiftsState] = useState<Shift[]>();
    const [gradesState, setGradesState] = useState<Grade[]>();
    const [griupsState, setGriupsState] = useState<Group[]>();

    //Edit Or Create
    const [createOrEditShift, setCreateOrEditShift] = useState<Shift | ShiftCreateOrEdit>(defaultShift);
    const [createOrEditGrade, setCreateOrEditGrade] = useState<Grade | GradeCreateOrEdit>(defaultGrade);
    const [createOrEditGroup, setCreateOrEditGroup] = useState<Group | GroupCreateOrEdit>(defaultGroup);

    //Observers
    const [isShiftEditing, setisShiftEditing] = useState(false);
    const [isGradeEditing, setIsGradeEditing] = useState(false);
    const [isGroupEditing, setIsGroupEditing] = useState(false);

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

    //Handle Grades
    const handleLoadGradeForEdit = (grade: Grade) => {
        setIsGradeEditing(true);
        setCreateOrEditGrade(grade);
    }

    const hanldeCancelGradeEditing = () => {
        setIsGradeEditing(false);
        setCreateOrEditGrade(defaultGrade);
    }

    const handleEditGrade = (name: keyof Grade, value: any) => {
        if (!isNaN(value)) {
            const numericValue = Number(value);
            if(numericValue == 0){
                setCreateOrEditGrade((prevState) => ({
                    ...prevState,
                    [name]: null
                }));
                return;
            }
            if (numericValue === Math.round(numericValue)) {
                setCreateOrEditGrade((prevState) => ({
                    ...prevState,
                    [name]: numericValue
                }));
            }else{
                showWarningToast({position: 'top-right', text: 'Tiene que ser un numero entero'})
            }
        }else{
            showWarningToast({position: 'top-right', text: 'Tiene que ser un numero'})
        }
    }

    //Handle Groups
    const handleLoadGroupToEdit = (group: Group) => {
        setIsGroupEditing(true);
        setCreateOrEditGroup(group);
    }

    const handleCancelGroupEditing = () => {
        setIsGroupEditing(false);
        setCreateOrEditGroup(defaultGroup);
    }

    const handleGroupEditing = (name: keyof Group, value: any) => {
        setCreateOrEditGroup((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    //Data Senders

    //Shift
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

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setGeneralLoader(false);
        }
    }

    //Grade

    const createNewGrade = async () => {
        try {
            setGeneralLoader(true);

            const response = await serverRestApi.post<Response>('/api/school/info/grades/createGrade', {
                Numero: createOrEditGrade.Numero
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                const resGrades = await serverRestApi.get<Response>('/api/school/info/grades/getGrades', {headers: { Authorization: localStorage.getItem('token') }});
                setGradesState(resGrades.data.data);

                const formatedGrade = resGrades.data.data.map((grado: Grade) => ({
                    value: grado.ID_Grado,
                    label: grado.Numero + '°',
                }));

                setSelectGradesData(formatedGrade);
            }
            showSuccessToast({position: 'top-right', text: response.data.message});
            showWarningToast({position: 'top-right', text: 'Por favor recarga para notar los cambios'});
            hanldeCancelGradeEditing();
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

    const sendUpdateGrade = async () => {
        try {
            setGeneralLoader(true);

            const response = await serverRestApi.put<Response>('/api/school/info/grades/updateGrade', {
                Numero: createOrEditGrade.Numero,
                ID_Grado: createOrEditGrade.ID_Grado
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                const resGrades = await serverRestApi.get<Response>('/api/school/info/grades/getGrades', {headers: { Authorization: localStorage.getItem('token') }});
                setGradesState(resGrades.data.data);

                const formatedGrade = resGrades.data.data.map((grado: Grade) => ({
                    value: grado.ID_Grado,
                    label: grado.Numero + '°',
                }));

                setSelectGradesData(formatedGrade);
            }

            showSuccessToast({position: 'top-right', text: response.data.message});
            showWarningToast({position: 'top-right', text: 'Por favor recarga para notar los cambios'});
            hanldeCancelGradeEditing();
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

    //Group
    const sendCreateGroupe = async () => {
        try {
            setGeneralLoader(true);

            if(!createOrEditGroup.Indicador || createOrEditGroup.Indicador === '' || createOrEditGroup.Indicador === null){
                showErrorTost({position: 'top-right', text: 'El Indicador no puede ser vacio'});
                setGeneralLoader(false);
                return;
            }

            const response = await serverRestApi.post<Response>('/api/school/info/groups/createGroup', {
                Indicador: createOrEditGroup.Indicador
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                const resGroups = await serverRestApi.get<Response>('/api/school/info/groups/getGroups', {headers: { Authorization: localStorage.getItem('token') }});
                setGriupsState(resGroups.data.data);

                const formatedGroup = resGroups.data.data.map((grupo: Group) => ({
                    value: grupo.ID_Grupo,
                    label: grupo.Indicador,
                }));
                setSelectGroupsData(formatedGroup);
            }
            showSuccessToast({position: 'top-right', text: response.data.message});
            showWarningToast({position: 'top-right', text: 'Por favor recarga para notar los cambios'});
            handleCancelGroupEditing();
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

    const sendGroupUpdate = async () => {
        try {
            
            setGeneralLoader(true);
            
            if(!createOrEditGroup.Indicador || createOrEditGroup.Indicador === '' || createOrEditGroup.Indicador === null || !createOrEditGroup.ID_Grupo || createOrEditGroup.ID_Grupo === '' || createOrEditGroup.ID_Grupo === null ){
                showErrorTost({position: 'top-right', text: 'No puede haber campos vacios'});
                setGeneralLoader(false);
                return;
            }

            const response = await serverRestApi.put<Response>('/api/school/info/groups/updateGroup',{
                ID_Grupo: createOrEditGroup.ID_Grupo,
                Indicador: createOrEditGroup.Indicador
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                const resGroups = await serverRestApi.get<Response>('/api/school/info/groups/getGroups', {headers: { Authorization: localStorage.getItem('token') }});
                setGriupsState(resGroups.data.data);
                const formatedGroup = resGroups.data.data.map((grupo: Group) => ({
                    value: grupo.ID_Grupo,
                    label: grupo.Indicador,
                }));
                setSelectGroupsData(formatedGroup);
            }
            showSuccessToast({position: 'top-right', text: response.data.message});
            showWarningToast({position: 'top-right', text: 'Por favor recarga para notar los cambios'});
            handleCancelGroupEditing();
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
        handleLoadGradeForEdit,
        handleLoadGroupToEdit,

        //HandleChangeInfo
        handleEditShifting,
        handleEditGrade,
        handleGroupEditing,

        //Cancel Editing
        handleCancelShiftEditing,
        hanldeCancelGradeEditing,
        handleCancelGroupEditing,

        //Observers
        isShiftEditing,
        isGradeEditing,
        isGroupEditing,

        //Data Senders
        sendCreationShift,
        sendUpdateShift,
        createNewGrade,
        sendUpdateGrade,
        sendCreateGroupe,
        sendGroupUpdate
    }
}
