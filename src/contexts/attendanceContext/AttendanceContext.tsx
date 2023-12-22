import React, { createContext, useContext, useState } from 'react'
import { attendanceContextModel, attendanceProviderModal } from '../../models/attendanceModels/AttendanceContextModels';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { AttendanceDBModel, attendanceStatus, tempAttendanceObj } from '../../models/attendanceModels/AttendanceModels';

const AttendanceContext = createContext<attendanceContextModel | undefined>(undefined);

export const AttendanceContextProvider = ({ children }: attendanceProviderModal) => {

    //Attendance Modal
    const [attendanceModalState, setAttendanceModalState] = useState(false);
    const handleAttendanceModalState = () => {
        if(attendanceModalState){
            setTodayAttendance([]);
            setAttendanceTempObj([]);
            setAttendanceModalState(false);
        }else{
            setAttendanceModalState(true);
        }
    };

    //Get Today Attendace
    const [todayAttendance, setTodayAttendance] = useState<AttendanceDBModel[]>([]);

    const getTodayAttendace = async (class_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/attendance/getTodayAttendance/${class_id}`, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setTodayAttendance(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    //Take Attendance
    const [attendanceTempObj, setAttendanceTempObj] = useState<tempAttendanceObj[]>([]);

    const addToTempAttendance = (student: string, class_id: string, status: attendanceStatus) => {
        const tempObj: tempAttendanceObj = {
            Estado: status,
            ID_Clase: class_id,
            ID_Estudiante: student
        }

        if(attendanceTempObj.length > 0){
            const indexOfLooking = attendanceTempObj.findIndex((atte) => atte.ID_Clase == tempObj.ID_Clase && atte.ID_Estudiante == tempObj.ID_Estudiante);

            if(indexOfLooking !== -1){
                setAttendanceTempObj(prevState => {
                    const newState = [...prevState];
                    newState[indexOfLooking].Estado = status;
                    return newState;
                });
            }else{
                setAttendanceTempObj((prev) => ([
                    ...prev,
                    tempObj
                ]))
            }
        }else{
            setAttendanceTempObj([tempObj]);
        }
    }

    //Send Attendance
    const [isAttendanceTakingLoading, setIsAttendanceTakingLoading] = useState(false);

    const sendAttendance = async () => {
        try {
            setIsAttendanceTakingLoading(true);

            const response = await serverRestApi.post<Response>('/api/attendance/takeClassAttendance', {
                attendance: attendanceTempObj
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                getTodayAttendace(attendanceTempObj[0].ID_Clase);
                setAttendanceTempObj([]);
            }

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        } finally {
            setIsAttendanceTakingLoading(false);
        }
    }

    const values: attendanceContextModel = {
        //Attendance Modal
        attendanceModal: attendanceModalState,
        handleAttendanceModal: handleAttendanceModalState,
        
        //Get Today Attendace
        todayAttendance: todayAttendance,
        getTodayAttendance: getTodayAttendace,

        //Take Attendance
        attendanceObj: attendanceTempObj,
        addAttendance: addToTempAttendance,

        //Send Attendance
        sendAttendanceLoader: isAttendanceTakingLoading,
        sendAttendance: sendAttendance,
    }

    return (
        <AttendanceContext.Provider value={values}>
            { children }
        </AttendanceContext.Provider>
    )

}

export const useAttendanceContext = (): attendanceContextModel => {
    const context = useContext(AttendanceContext);
    if(context === undefined){
        throw new Error('useCalendarContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
