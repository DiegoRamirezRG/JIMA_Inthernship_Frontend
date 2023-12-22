import React, { createContext, useContext, useState } from 'react'
import { GroupContextModel, GroupContextProvider } from '../../models/groupsModels/GroupsContextModels';
import { AttendanceData, GroupClassObject, ScheduleObj } from '../../models/groupsModels/GroupsModels';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';

const GroupsContext = createContext<GroupContextModel |undefined>(undefined);

export const GroupsContextProvider = ({ children }: GroupContextProvider) => {

    //Working Group
    const [groupData, setGroupData] = useState<GroupClassObject | null>(null);
    const [getGroupDataLoading, setGetGroupDataLoading] = useState(true);

    //Attendance
    const [groupAttendance, setGroupAttendance] = useState<AttendanceData[]>([]);

    //Schedule
    const [groupSchedule, setGroupSchedule] = useState<ScheduleObj[]>([]);

    const getGroupData = async (class_id: string) => {
        try {
            
            const groupData = serverRestApi.get<Response>(`/api/groups/getClassInfo/${class_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            const attendanceData = serverRestApi.get<Response>(`/api/groups/getClassAttendance/${class_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            const scheduleData = serverRestApi.get<Response>(`/api/groups/getClassSchedule/${class_id}`, { headers: { Authorization: localStorage.getItem('token') } });

            const response = await Promise.all([
                groupData,
                attendanceData,
                scheduleData,
            ]);

            setGroupData(response[0].data.data);
            setGroupAttendance(response[1].data.data);
            setGroupSchedule(response[2].data.data);

            setGetGroupDataLoading(false);

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setGetGroupDataLoading(false);
        }
    }

    //Returnings
    const value: GroupContextModel = {
        //Working Group
        activeGroup: groupData,
        getActiveGroupLoading: getGroupDataLoading,
        getActiveGroupData: getGroupData,
        
        //Attendance
        groupAttendance: groupAttendance,
        //Schedule
        groupSchedule: groupSchedule,
    }

    return (
        <GroupsContext.Provider value={value}>
            { children }
        </GroupsContext.Provider>
    )

}

export const useGroupsContext = (): GroupContextModel => {
    const context = useContext(GroupsContext);
    if(context === undefined){
        throw new Error('useGroupsContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}

