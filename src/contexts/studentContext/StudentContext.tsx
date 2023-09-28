import React, { ReactNode, createContext, useContext, useState } from 'react'
import { StudentAcademicInfo } from '../../models/studentModels/StudentModel';
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

    const contextValue : StudentContextInterface = {
        loader: studentGeneralLoader,
        confirmModalState: confirmModal,
        studentAcademicInfo: studentAcademicState,
        getAcademicInfo: getAcademicInfo,
        handleConfrimModalState: handleConfirmModalState
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
