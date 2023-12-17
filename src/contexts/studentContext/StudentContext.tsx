import React, { ReactNode, createContext, useContext, useState } from 'react'
import { LastYeatStudentsObj, StudentAcademicInfo, StudentObj, StudentToBe, TodoAssigment } from '../../models/studentModels/StudentModel';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { Legend } from 'recharts';
import { ConfirmModal } from '../../components/generalComponents/confirmModal/ConfirmModal';
import { studentScheduleObj } from '../../models/groupsModels/GroupsModels';
import { ClassByTeacher } from '../../models/teachersModels/TeacherModels';

interface StudentContextInterface{
    loader: boolean;
    confirmModalState: boolean;
    studentAcademicInfo: StudentAcademicInfo | null;
    getAcademicInfo: (id_student: string) => Promise<void>;
    handleConfrimModalState: () => void;

    //Last Year Student
    lastYearLoader: boolean;
    lastYearStudents: LastYeatStudentsObj[];
    getLastYearStudents: () => Promise<void>;

    //Students To Be
    isStudentsToBeLoading: boolean;
    studentsToBe: StudentToBe[] | null;
    getStudentsToBe: () => Promise<void>;

    //Student Schedule
    studentSchedule: studentScheduleObj[];
    studentScheduleLoading: boolean;
    getStudentSchedule: (person_id: string) => Promise<void>;

    //Get Student Clases
    studentClasses: ClassByTeacher[];
    studentClassesLoading: boolean;
    getStudentClasses: (person_id: string) => Promise<void>;

    //Get Studend Todo
    getTodoLoader: boolean;
    todoStudent: TodoAssigment[];
    getTodo: (person_id: string) => Promise<void>;

    //Get All Students
    allStudents: StudentObj[];
    getAllStudents: () => Promise<void>;
}

interface StudentProviderProps{
    children: ReactNode;
}

const StudentContext = createContext<StudentContextInterface | undefined>(undefined);

export const StudentContextProvider = ({ children }: StudentProviderProps) => {

    //Student Data
    const [studentAcademicState, setStudentAcademicState] = useState<StudentAcademicInfo | null>(null);

    //Loader
    const [studentGeneralLoader, setStudentGeneralLoader] = useState<boolean>(false);

    //Modal States
    const [confirmModal, setConfirmModal] = useState<boolean>(false);


    //Get inital data
    const getAcademicInfo = async (id_student: string) => {
        try {
            setStudentGeneralLoader(true);

            const response = await serverRestApi.get<Response>(`/api/students/getActiveEnroll/${id_student}`, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success && response.data.data){
                if(!response.data.data){
                    console.log('Simon perro no hay na');
                }else{
                    setStudentAcademicState(response.data.data);
                    setStudentGeneralLoader(false);
                }
            }else{
                throw new Error('Ocurrio un error obteniendo la data Academica')
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setStudentGeneralLoader(false);
        }
    }

    //Modal Handlers

    const handleConfirmModalState = () => {
        setConfirmModal(!confirmModal)
    }

    //Get Students
    const [isGettingLastYearStudentLoading, setIsGettingLastYearStudentLoading] = useState(true);
    const [lastYearStudent, setLastYearStudent] = useState<LastYeatStudentsObj[]>([]);

    const getLastYearStudents = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/students/getLastYearStudents', { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setLastYearStudent(response.data.data);
            }

            setIsGettingLastYearStudentLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsGettingLastYearStudentLoading(false);
        }
    }

    //Get Aspirantes
    const [isGettingAspLoading, setIsGettingAspLoading] = useState(true);
    const [studentToBeData, setStudentToBeData] = useState<StudentToBe[] | null>(null);

    const getStudentToBe = async () => {
        try {
            
            const response = await serverRestApi.get<Response>('/api/students/toBe/getStudentsToBe', { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setStudentToBeData(response.data.data);
            }

            setIsGettingAspLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsGettingAspLoading(false);
        }
    }

    //GetStudentSchedule
    const [studenSchedule, setStudenSchedule] = useState<studentScheduleObj[]>([]);
    const [studentScheduleLoading, setStudentScheduleLoading] = useState(true);

    const getStudentSchedule = async (person_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/schedule/getStudentSchedule/${person_id}`, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setStudenSchedule(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }finally{
            setStudentScheduleLoading(false);
        }
    }

    //Get Student Clases
    const [studentClasses, setstudentClasses] = useState<ClassByTeacher[]>([]);
    const [getClassesLoading, setGetClassesLoading] = useState<boolean>(true);

    const getStudentClasses = async (person_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/students/getClasses/${person_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response){
                setstudentClasses(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }finally{
            setGetClassesLoading(false);
        }
    }

    //Get Studend Todo
    const [isGettingTodoLoading, setIsGettingTodoLoading] = useState(true);
    const [studentTodo, setStudentTodo] = useState<TodoAssigment[]>([]);

    const getStudentTodo = async (person_id: string) => {
        try {
            const response = await serverRestApi.get<Response>(`/api/students/getToDoAssigns/${person_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setStudentTodo(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        } finally {
            setIsGettingTodoLoading(false);
        }
    }

    //Get All Students
    const [allStudents, setAllStudents] = useState<StudentObj[]>([]);

    const getAllStudents = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/students/getAllStudents', { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setAllStudents(response.data.data);
            }
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    const contextValue : StudentContextInterface = {
        loader: studentGeneralLoader,
        confirmModalState: confirmModal,
        studentAcademicInfo: studentAcademicState,
        getAcademicInfo: getAcademicInfo,
        handleConfrimModalState: handleConfirmModalState,

        //Last Year Student
        lastYearLoader: isGettingLastYearStudentLoading,
        lastYearStudents: lastYearStudent,
        getLastYearStudents: getLastYearStudents,

        //Students To Be
        isStudentsToBeLoading: isGettingAspLoading,
        studentsToBe: studentToBeData,
        getStudentsToBe: getStudentToBe,

        //Student Schedule
        studentSchedule: studenSchedule,
        studentScheduleLoading: studentScheduleLoading,
        getStudentSchedule: getStudentSchedule,

        //Get Student Clases
        studentClasses: studentClasses,
        studentClassesLoading: getClassesLoading,
        getStudentClasses: getStudentClasses,

        //Get Studend Todo
        getTodoLoader: isGettingTodoLoading,
        todoStudent: studentTodo,
        getTodo: getStudentTodo,

        //Get All Students
        allStudents: allStudents,
        getAllStudents: getAllStudents,
    };

    return (
        <StudentContext.Provider value={contextValue}>
            {children}
        </StudentContext.Provider>
    )

}

export const useStudentContext = (): StudentContextInterface => {
    const context = useContext(StudentContext);
    if(context === undefined){
        throw new Error('useStudentContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}
