import React, { createContext, useContext, useState } from 'react'
import { ReinsInscrContextInterface, ReinsInscrProviderInterface } from '../../models/reins_inscrModels/ReinsInscriptModels';
import { GroupModelMaker, defaultGroupModelMaker } from '../../models/reins_inscrModels/InscriptionModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';

const ReinsInscrContext = createContext<ReinsInscrContextInterface | undefined>(undefined);

export const ReinsInscrContextProvider = ({ children }: ReinsInscrProviderInterface) => {


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

    //Return Values
    const contextVal: ReinsInscrContextInterface = {
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
        triggerGetAgain: triggerGetPlans
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

