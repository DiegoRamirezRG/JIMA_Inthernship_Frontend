import React, { createContext, useContext, useState } from 'react'
import { TeacherContextModel, TeacherProvider } from '../../models/teachersModels/TeacherContextModels';
import { ClassByTeacher, TeacherForPick } from '../../models/teachersModels/TeacherModels';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { teacherScheduleObj } from '../../models/groupsModels/GroupsModels';

const TeacherContext = createContext<TeacherContextModel | undefined>(undefined);

export const TeacherContextProvider = ({ children }: TeacherProvider) => {

    //GetActiveTeachers
    const [teacherForPick, setTeacherForPick] = useState<TeacherForPick[] | null>(null);

    const getTeachers = async() => {
        try {
            
            const response = await serverRestApi.get<Response>('/api/teachers/getActiveTeachers', { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setTeacherForPick(response.data.data);
            }

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    //All teachers
    const [allTeachersObj, setAllTeachersObj] = useState<TeacherForPick[] | null>(null);
    const [gettingTeachersLoading, setGettingTeachersLoading] = useState(false);

    const getAllTeachers = async () => {
        try {
            setGettingTeachersLoading(true);
            
            const response = await serverRestApi.get<Response>('/api/teachers/getAllTeachers', { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setAllTeachersObj(response.data.data);
            }

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }finally{
            setGettingTeachersLoading(false);
        }
    }

    //Get Classes By Teacher
    const [getClassesLoading, setGetClassesLoading] = useState<boolean>(true);
    const [classes, setClasses] = useState<ClassByTeacher[]>([]);

    const getClases = async (teacher_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/teachers/getClasses/${teacher_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setClasses(response.data.data);
            }
            setGetClassesLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setGetClassesLoading(false);
        }
    }

    //Get Teacher Schedule
    const [teacherSchedule, setTeacherSchedule] = useState<teacherScheduleObj[]>([]);
    const [getTeacherScheduleLoading, setGetTeacherScheduleLoading] = useState(true);

    const getTeacherSchedule = async (person_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/schedule/getTeacherSchedule/${person_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setTeacherSchedule(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }finally{
            setGetTeacherScheduleLoading(false);
        }
    }

    //Context values - return
    const contextVal: TeacherContextModel =  {
        //Teachers
        teachers: teacherForPick,
        getTeachers: getTeachers,

        //Teacher-Classes
        teachClassLoading: getClassesLoading,
        classes: classes,
        getClasses: getClases,

        //Get all teachers
        teachersObj: allTeachersObj,
        teachersObjLoader: gettingTeachersLoading,
        getAllTeachers: getAllTeachers,

        //Get Teacher Schedule
        teacherSchedule: teacherSchedule,
        isTeacherScheduleLoading: getTeacherScheduleLoading,
        getTeacherSchedule: getTeacherSchedule,
    }

    return (
        <TeacherContext.Provider value={contextVal}>
            { children }
        </TeacherContext.Provider>
    )

}


export const useTeacherContext = (): TeacherContextModel => {
    const context = useContext(TeacherContext);
    if(context === undefined){
        throw new Error('useTeacherContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
