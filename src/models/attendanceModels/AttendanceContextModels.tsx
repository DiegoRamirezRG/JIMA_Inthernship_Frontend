import { ReactNode } from "react";
import { AttendanceDBModel, attendanceStatus, tempAttendanceObj } from "./AttendanceModels";

export interface attendanceContextModel{
    //Attendance Modal
    attendanceModal: boolean;
    handleAttendanceModal: () => void;

    //Get Today Attendace
    todayAttendance: AttendanceDBModel[];
    getTodayAttendance: (class_id: string) => Promise<void>;

    //Take Attendance
    attendanceObj: tempAttendanceObj[];
    addAttendance: (student: string, class_id: string, status: attendanceStatus) => void;

    //Send Attendance
    sendAttendanceLoader: boolean;
    sendAttendance: () => Promise<void>;
}

export interface attendanceProviderModal{
    children: ReactNode;
}