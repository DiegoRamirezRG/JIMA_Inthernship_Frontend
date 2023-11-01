import React, { ReactNode, createContext, useContext, useState } from 'react'
import { StudentAcademicInfo, StudentToBe } from '../../models/studentModels/StudentModel';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { Legend } from 'recharts';
import { ConfirmModal } from '../../components/generalComponents/confirmModal/ConfirmModal';

interface StudentContextInterface{
    loader: boolean;
    confirmModalState: boolean;
    studentAcademicInfo: StudentAcademicInfo | null;
    getAcademicInfo: (id_student: string) => Promise<void>;
    handleConfrimModalState: () => void;

    //Last Year Student
    lastYearLoader: boolean;
    lastYearStudents: any;
    getLastYearStudents: () => Promise<void>;

    //Students To Be
    isStudentsToBeLoading: boolean;
    studentsToBe: StudentToBe[] | null;
    getStudentsToBe: () => Promise<void>;
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
    const [lastYearStudent, setLastYearStudent] = useState([]);

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
