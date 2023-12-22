import React, { createContext, useContext, useState } from 'react'
import { ReinsInscrContextInterface, ReinsInscrProviderInterface } from '../../models/reins_inscrModels/ReinsInscriptModels';
import { GroupModelMaker, confirmedInsGroup, confirmedInsGroupWithSubjects, defaultGroupModelMaker, groupForReinscription } from '../../models/reins_inscrModels/InscriptionModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';

const ReinsInscrContext = createContext<ReinsInscrContextInterface | undefined>(undefined);

export const ReinsInscrContextProvider = ({ children }: ReinsInscrProviderInterface) => {

    //INSCRIPCION
    //INSCRIPCION
    //INSCRIPCION
    //Make Group Modal
    const [createGroupModalState, setCreateGroupModalState] = useState<boolean>(false);
    const [careerInfo, setCareerInfo] = useState<string | null>(null);

    const handleModalState = (careerId?: string) => {
        if(careerId){
            setCareerInfo(careerId);
            setCreateGroupModalState(true);
        }else{
            setCareerInfo(null);
            setCreateGroupModalState(false);
        }
    }

    //ShiftMakerModal
    const [shiftModalState, setShiftModalState] = useState(false);
    const [pickShiftState, setPickShiftState] = useState<string[]>([]);
    
    const handleShiftModalState = () => setShiftModalState(true);

    const cancelShiftPickerModal = () => {
        setShiftModalState(false);
        setPickShiftState([]);
    }

    const handlePickShift = (name: any, value: any) => {
        let helper = parseInt(name.split('_')[1]);
        setPickShiftState((prevState) => ({
            ...prevState,
            [helper] : value
        }))
    }

    //Make groups
    const [groupsMaking, setGroupsMaking] = useState<GroupModelMaker[]>([defaultGroupModelMaker]);

    const addNewGroup = () => {
        const newState = [...groupsMaking];
        newState.push({ [newState.length]: [] });
        setGroupsMaking(newState);
    }

    const removeGroup = (groupIndex: number) => {
        setGroupsMaking((prev) => prev.filter((_, i) => i !== groupIndex));
    }

    const addStudentIdToGroup = (studentId: string, groupIndex: number) => {
        setGroupsMaking((prevState) => {
            const updatedGroups = [...prevState];
            const currentGroup = updatedGroups[groupIndex][0];
            
            if (!currentGroup || currentGroup.indexOf(studentId) === -1) {
                updatedGroups[groupIndex][0] = currentGroup ? [...currentGroup, studentId] : [studentId];
            }

            return updatedGroups;
        })
    }

    const removeStudnetOfGroup = (studentId: string, groupIndex: number) => {
        setGroupsMaking((prevState) => {
            const updatedGroups = [...prevState];
            const currentGroup = updatedGroups[groupIndex][0];

            const deleted = currentGroup.filter(listId => listId !== studentId);
            updatedGroups[groupIndex][0] = deleted;
            return updatedGroups;
        })
    }

    const cancelGroupMaking = () => {
        setGroupsMaking([{0: [],}]);
        handleModalState();
    }

    //Data senders
    const [isBuildingGroupLoading, setIsBuildingGroupLoading] = useState(false);
    const [triggerGetPlans, setTriggerGetPlans] = useState(false);

    const buildSendGroups = async () => {
        try {
            setIsBuildingGroupLoading(true);

            const response = await serverRestApi.post<Response>('/api/cycle/inscriptions/createGroups', {
                careerId: careerInfo,
                students: [...groupsMaking],
                shifts: pickShiftState
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                showSuccessToast({position: 'top-center', text: response.data.message});
                cancelShiftPickerModal();
                cancelGroupMaking();
                setTriggerGetPlans(!triggerGetPlans);
            }

            setIsBuildingGroupLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setIsBuildingGroupLoading(false);
        }
    }

    //REINCRIPCION
    //REINCRIPCION
    //REINCRIPCION
    //User List
    const [userListModal, setUserListModal] = useState(false);
    const [workingGroup, setWorkingGroup] = useState<groupForReinscription | null>(null);

    const handleShowUserListModal = (workingGroup?: groupForReinscription) => {
        if(workingGroup){
            setUserListModal(true);
            setWorkingGroup(workingGroup)
        }else{
            setUserListModal(false);
            setWorkingGroup(null);
        }
    }

    //Confirmed Groups
    const [confirmedGroups, setConfirmedGroups] = useState<confirmedInsGroup[]>([])

    const addToConfirmedGroups = (group: groupForReinscription) => {
        const newAdded: confirmedInsGroup  = {
            nextGrade: group.grado + 1,
            grupo: group.id_grupo,
            turno: group.id_turno,
            carrera: group.id_carrera,
            idsEstudiantes: group.idsEstudiantes,
        }

        const tempHelper = [...confirmedGroups];
        tempHelper.push(newAdded);

        setConfirmedGroups(tempHelper);
    }

    const removeAConfirmedGroup = (group: confirmedInsGroup) => {
        const tempHelper = [...confirmedGroups];
        const tempNewObj = tempHelper.filter((item) => !(
            item.nextGrade === group.nextGrade &&
            item.grupo === group.grupo &&
            item.turno === group.turno &&
            item.carrera === group.carrera &&
            JSON.stringify(item.idsEstudiantes) === JSON.stringify(group.idsEstudiantes)
        ))

        setConfirmedGroups(tempNewObj);
    }

    const addAllTheGroups = (data: any) => {
        const tempHelper: confirmedInsGroup[] = [];

        data && Object.keys(data).map(carreraId  => (
            Object.keys(data[carreraId]).map(turnoId => (
                Object.keys(data[carreraId][turnoId]).map(gradoId => (
                    Object.keys(data[carreraId][turnoId][gradoId]).map(grupoId => {
                        const datos = data[carreraId][turnoId][gradoId][grupoId];
                        const filtered: confirmedInsGroup = {
                            nextGrade: datos.grado + 1,
                            grupo: datos.id_grupo,
                            turno: datos.id_turno,
                            carrera: datos.id_carrera,
                            idsEstudiantes: datos.idsEstudiantes,
                        }

                        tempHelper.push(filtered);
                    })
                ))
            ))
        ))

        setConfirmedGroups(tempHelper);
    }

    //Get Next Subjects By Group
    const [confirmedGroupsWithSubjects, setConfirmedGroupsWithSubjects] = useState<confirmedInsGroupWithSubjects[]>([]);
    const getNextSubjectsByGroup = async () => {
        try {
            const response = await serverRestApi.post<Response>('/api/plans/getSubjectsByCicle/reinscriptions', {
                groups: [...confirmedGroups]
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setConfirmedGroupsWithSubjects(response.data.data);
            }

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Load Handler
    const [loadedGroups, setLoadedGroups] = useState<confirmedInsGroup[]>([]);

    const addToLoadedGroups = (group: groupForReinscription) => {
        const newAdded: confirmedInsGroup  = {
            nextGrade: group.grado + 1,
            grupo: group.id_grupo,
            turno: group.id_turno,
            carrera: group.id_carrera,
            idsEstudiantes: group.idsEstudiantes,
        }

        const tempHelper = [...confirmedGroups];
        tempHelper.push(newAdded);

        setLoadedGroups(tempHelper);
    }

    const removeALoadedGroup = (group: confirmedInsGroup) => {
        const tempHelper = [...loadedGroups];
        const tempNewObj = tempHelper.filter((item) => !(
            item.nextGrade === group.nextGrade &&
            item.grupo === group.grupo &&
            item.turno === group.turno &&
            item.carrera === group.carrera &&
            JSON.stringify(item.idsEstudiantes) === JSON.stringify(group.idsEstudiantes)
        ))

        setLoadedGroups(tempNewObj);
    }

    const loadAllTheGroups = (data: any) => {
        const tempHelper: confirmedInsGroup[] = [];

        data && Object.keys(data).map(carreraId  => (
            Object.keys(data[carreraId]).map(turnoId => (
                Object.keys(data[carreraId][turnoId]).map(gradoId => (
                    Object.keys(data[carreraId][turnoId][gradoId]).map(grupoId => {
                        const datos = data[carreraId][turnoId][gradoId][grupoId];
                        const filtered: confirmedInsGroup = {
                            nextGrade: datos.grado + 1,
                            grupo: datos.id_grupo,
                            turno: datos.id_turno,
                            carrera: datos.id_carrera,
                            idsEstudiantes: datos.idsEstudiantes,
                        }

                        tempHelper.push(filtered);
                    })
                ))
            ))
        ))

        setLoadedGroups(tempHelper);
    }

    //See Subjetcs modal
    const [workingObjForSubj, setWorkingObjForSubj] = useState<confirmedInsGroupWithSubjects | null>(null);
    const [showSubModal, setShowSubModal] = useState(false);

    const handleShowSubModal = (group?: confirmedInsGroupWithSubjects) => {
        if(group){
            setWorkingObjForSubj(group);
            setShowSubModal(true);
        }else{
            setWorkingObjForSubj(null);
            setShowSubModal(false);
        }
    }

    //Return Values
    const contextVal: ReinsInscrContextInterface = {

        //INSCRIPCION
        //INSCRIPCION
        //INSCRIPCION
        //Create Group Modal Hanlder
        createGroupModal: createGroupModalState,
        handleGroupModal: handleModalState,
        careerID: careerInfo,

        //Shift Modals
        shiftModal: shiftModalState,
        shiftPicker: pickShiftState,
        handleShiftModal: handleShiftModalState,
        handleShiftPikcer: handlePickShift,
        cancelShiftPicker: cancelShiftPickerModal,

        //Groups Maker
        groups: groupsMaking,
        addGroupFunc: addNewGroup,
        removeGroupFunc: removeGroup,
        addStudentToGroup: addStudentIdToGroup,
        removeStudentOfGroup: removeStudnetOfGroup,
        cancelGroupMaking: cancelGroupMaking,

        //Build Data
        buildingGroupsLoader: isBuildingGroupLoading,
        buildGroupsFunc: buildSendGroups,
        triggerGetAgain: triggerGetPlans,

        //REINCRIPCION
        //REINCRIPCION
        //REINCRIPCION
        //User List
        userListModal: userListModal,
        workingGroup: workingGroup,
        handleUserListModal: handleShowUserListModal,

        //Confirmed Groups
        confirmedGroups: confirmedGroups,
        addToConfirmedGroups: addToConfirmedGroups,
        removeConfirmedGroup: removeAConfirmedGroup,
        addAllConfirmedGroups: addAllTheGroups,

        //Get Next Subjects By Group
        getNextSubjects: getNextSubjectsByGroup,
        groupNextSubjects: confirmedGroupsWithSubjects,

        //Load Handler
        loadedGroups: loadedGroups,
        addToLoadedGroup: addToLoadedGroups,
        removeLoadedGroup: removeALoadedGroup,
        loadAllGroups: loadAllTheGroups,

        //See Subjetcs modal
        workingGroupForSubj: workingObjForSubj,
        showSubjListModal: showSubModal,
        handleShowSubjListModal: handleShowSubModal,
    }

    return (
        <ReinsInscrContext.Provider value={contextVal}>
            {children}
        </ReinsInscrContext.Provider>
    )
}


export const useReinsInscrContext = (): ReinsInscrContextInterface => {
    const context = useContext(ReinsInscrContext);
    if(context === undefined){
        throw new Error('useReinsInscrContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}

