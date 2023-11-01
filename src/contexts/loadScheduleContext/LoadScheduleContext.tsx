import React, { createContext, useContext, useState } from 'react'
import { AsignClasses, GroupNeeded, InnerChildContext, LoadScheduleContext } from '../../models/loadScheduleModels/LoadScheduleModels';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';

const LoadScheduleContext = createContext<LoadScheduleContext |undefined>(undefined);

export const LoadScheduleContextProvider = ({ children } : InnerChildContext) => {

    //Get Groups Needed

    const [groupsForLoad, setGroupsForLoad] = useState<GroupNeeded[] | null>(null);
    const [isGettingLoading, setIsGettingLoading] = useState<boolean>(true);

    const getGroupsForLoad = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/schedule/getGroupToSchedule', { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setGroupsForLoad(response.data.data);
            }
            setIsGettingLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setIsGettingLoading(false);
        }
    }

    //Modals
    const [scheduleMaker, setscheduleMaker] = useState(false);
    const [groupScope, setGroupScope] = useState<GroupNeeded | null>(null);

    const handleSchedule = async (scope?:GroupNeeded) => {
        if(scope){
            setGroupScope(scope);
            setscheduleMaker(true);
        }else{
            setGroupScope(null);
            setscheduleMaker(false);
        }
    }

    //Load
    const [groupLoadSchedule, setGroupLoadSchedule] = useState<AsignClasses[]>([]);
    const [loadSubjectLaoding, setLoadSubjectLaoding] = useState(false);

    const loadById = async (group: GroupNeeded[], cicle: number) => {
        try {
            setLoadSubjectLaoding(true);

            let tempHelper: any[] = [];
            for (let i = 0; i < group.length; i++) {

                tempHelper[i] = {};
                tempHelper[i].class_teacher = [];

                tempHelper[i].id_Grupo = group[i].ID_Grupo;
                tempHelper[i].id_Career = group[i].ID_Carrera;
                tempHelper[i].id_Turno = group[i].ID_Turno;
                
                const response = await serverRestApi.get<Response>(`/api/plans/getSubjectsByCicle/${group[i].ID_Carrera}/${cicle}`, { headers: { Authorization: localStorage.getItem('token') } });
                
                for (let j = 0; j < response.data.data.length; j++) {
                    tempHelper[i].class_teacher[j] = {};
                    tempHelper[i].class_teacher[j].FK_Materia = response.data.data[j].ID_Materia;
                }
                
            }

            if(groupLoadSchedule.length == 0){
                setGroupLoadSchedule(tempHelper);
            }else{
                
            }

            setLoadSubjectLaoding(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setLoadSubjectLaoding(false);
        }
    }


    const contextValue: LoadScheduleContext = {
        //Get Groups
        groups: groupsForLoad,
        groupsLoading: isGettingLoading,
        getGroupsFunc: getGroupsForLoad,

        //Set Cicle Subjects
        getAndSetSubjects: loadById,
        subjectsPerGroup: groupLoadSchedule,
        subjectsLoader: loadSubjectLaoding,

        //ScheduleMaker
        scheduleMakerModal: scheduleMaker,
        groupScopeFac: groupScope,
        handleScheduleModal: handleSchedule,
    }
    
    return (
        <LoadScheduleContext.Provider value={contextValue}>
            { children }
        </LoadScheduleContext.Provider>
    )
}

export const useLoadScheduleContext = (): LoadScheduleContext => {
    const context = useContext(LoadScheduleContext);
    if(context === undefined){
        throw new Error('useLoadScheduleContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
