import { ReactNode } from 'react';
import { AttendanceData, GroupClassObject, ScheduleObj } from './GroupsModels';
export interface GroupContextModel{
    //Working Group
    activeGroup: GroupClassObject | null;
    getActiveGroupLoading: boolean;
    getActiveGroupData: (class_id: string) => Promise<void>;

    //Attendance
    groupAttendance: AttendanceData[];

    //Schedule
    groupSchedule: ScheduleObj[];
}

export interface GroupContextProvider{
    children: ReactNode;
}