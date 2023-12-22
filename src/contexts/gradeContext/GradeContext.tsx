import React, { createContext, useContext, useState } from 'react'
import { gradeContextModel, gradeProvider } from '../../models/gradesModels/GradesContextModels';
import { GraddingObj, GraderTeacherObj } from '../../models/gradesModels/GradesModels';
import { showErrorTost, showSuccessToast } from '../../components/generalComponents/toastComponent/ToastComponent';
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';

const GradeContext = createContext<gradeContextModel | undefined>(undefined);

export const GradeContextProvider = ({ children }: gradeProvider) => {

    //handle assigment id
    const [quickAssignmentIdSaver, setQuickAssignmentIdSaver] = useState('');
    const handleQuickAssigment = (assigmnet_id: string) => {
        setShowDetail(null);
        setGradingAction([]);
        setEntregasSelect([]);
        setQuickAssignmentIdSaver(assigmnet_id);
    };

    //Students Turned In Obj
    const [studentTurnedIn, setStudentTurnedIn] = useState<GraderTeacherObj[]>([]);
    const getTurnedInToGrade = async (assing_id: string) => {
        try {
            
            const response = await serverRestApi.get<Response>(`/api/grades/getStudentTurned/${assing_id}`, { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setStudentTurnedIn(response.data.data);
            }

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        }
    }

    //Grade Actions
    const [gradingAction, setGradingAction] = useState<GraddingObj[]>([]);

    const addGrade = (student: string, assign: string, grade: number | string) => {
        const tempHelper: GraddingObj[] = [...gradingAction];
        const exist = gradingAction.some(objeto => objeto.ID_Entrega === assign);

        if(exist){
            if(typeof (grade) == 'string'){
                setGradingAction(tempHelper.filter((obj) => obj.ID_Entrega != assign));
            }else{
                const nuevoArreglo = gradingAction.map(obj =>
                    obj.ID_Entrega === assign ? { ...obj, Calificacion: grade } : obj
                );
                setGradingAction(nuevoArreglo);
            }
        }else{
            const obj: GraddingObj = {
                Calificacion: grade as number,
                FK_Estudiante: student,
                ID_Entrega: assign
            }

            tempHelper.push(obj);
            setGradingAction(tempHelper);
        }
    }

    //Handle show turned detail
    const [showDetail, setShowDetail] = useState<GraderTeacherObj | null>(null);
    const handleShowDetail = (turned_selected: GraderTeacherObj | null) => setShowDetail(turned_selected);

    //Send Grades
    const [entregasSelect, setEntregasSelect] = useState<string[]>([]);
    const addToSendEntrega = (entrega_id: string) => {
        const exist = entregasSelect.indexOf(entrega_id);
        if(exist >= 0){
            const updatedArray = entregasSelect.filter((id) => id !== entrega_id);
            setEntregasSelect(updatedArray);
        }else{
            setEntregasSelect((prev) => [...prev, entrega_id]);
        }
    }

    const addEveryoneToSelect = () => {
        const helper: GraddingObj[] = studentTurnedIn.map((turned) => ({
            ID_Entrega: turned.ID_Entregas,
            Calificacion: 0,
            FK_Estudiante: turned.FK_Estudiante
        }));

        setGradingAction(helper);
        setEntregasSelect(helper.map((obj) => obj.ID_Entrega));
    }

    const updateTheAllGrade = (newGrade: number) => {
        const helper = gradingAction.map((item) => ({
            ...item,
            Calificacion: newGrade,
        }));

        setGradingAction(helper);
    }

    //Send the update
    const [isGradingLoading, setIsGradingLoading] = useState(false);
    const sendTheGrades = async (assing_id: string) => {
        try {
            setIsGradingLoading(true);

            const response = await serverRestApi.put<Response>('/api/grades/setStudentGrades', {
                grades: gradingAction.filter((obj) => entregasSelect.includes(obj.ID_Entrega))
            }, { headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                setGradingAction([]);
                setEntregasSelect([]);
                setShowDetail(null);
                setQuickAssignmentIdSaver('');

                showSuccessToast({position: 'top-center', text: response.data.message});
            }

        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
        } finally {
            setIsGradingLoading(false);
        }
    }


    const values: gradeContextModel= {
        //handle assigment id
        quickGraderSave: quickAssignmentIdSaver,
        handleQuickGraderSave: handleQuickAssigment,

        //Students Turned In Obj
        studentTurnToGrade: studentTurnedIn,
        getStudentTurnToGrade: getTurnedInToGrade,

        //Grade Actions
        gradingObj: gradingAction,
        addGrade: addGrade,

        //Handle show turned detail
        turnedDetail: showDetail,
        showTurnedDetail: handleShowDetail,

        //Send Grades
        idsToSend: entregasSelect,
        addToSend: addToSendEntrega,
        addAllToSend: addEveryoneToSelect,
        updateAllGrade: updateTheAllGrade,

        //Send the update
        gradeUpdateLoader: isGradingLoading,
        sendGradesUpdate: sendTheGrades,
    }

    return(
        <GradeContext.Provider value={values}>
            { children }
        </GradeContext.Provider>
    )
}

export const useGradeContext = (): gradeContextModel => {
    const context = useContext(GradeContext);
    if(context === undefined){
        throw new Error('useGradeContext debe ser utilizado dentro de un Context Provider');
    }
    return context;
}

