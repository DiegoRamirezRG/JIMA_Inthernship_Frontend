import { ReactNode } from 'react';
import { GraddingObj, GraderTeacherObj } from './GradesModels';
export interface gradeContextModel{
    //handle assigment id
    quickGraderSave: string;
    handleQuickGraderSave: (assigmnet_id: string) => void;

    //Students Turned In Obj
    studentTurnToGrade: GraderTeacherObj[];
    getStudentTurnToGrade: (assing_id: string) => Promise<void>;

    //Grade Actions
    gradingObj: GraddingObj[];
    addGrade: (student: string, assign: string, grade: number | string) => void;

    //Handle show turned detail
    turnedDetail: GraderTeacherObj | null;
    showTurnedDetail: (turned_selected: GraderTeacherObj | null) => void;

    //Send Grades
    idsToSend: string[];
    addToSend: (entrega_id: string) => void;
    addAllToSend: () => void;
    updateAllGrade: (newGrade: number) => void;

    //Send the update
    gradeUpdateLoader: boolean;
    sendGradesUpdate: (assing_id: string) => Promise<void>;
}

export interface gradeProvider{
    children: ReactNode;
}