import { ReactNode } from "react";
import { ClassTeacher, doneHelper } from "./LoadScheduleModels";
import { confirmedInsGroup, confirmedInsGroupWithSubjects } from "../reins_inscrModels/InscriptionModels";
import { SubjectModel } from "../subjectsModels/SubjectModels";
import { EventResizeDoneArg } from "@fullcalendar/interaction";
import { EventDropArg } from "@fullcalendar/core";

export interface LoadReinsScheduleContextModel{
    //Format and merge group - subjects data
    merguedData: GroupSchedule[];
    formatGroupsAnsSubjetcs: (groups: confirmedInsGroup[], loadedSubjects: confirmedInsGroupWithSubjects[]) => void;

    //Schedule Modal Handler
    reinsScheduleMakerModal: boolean;
    workingObj: GroupSchedule | null;
    handleReinsScheduleMakerModal: (workingObj?: GroupSchedule) => void;

    //Shifts Getter
    shiftData: ShiftData | null;
    getShiftData: (shift_id: string) => Promise<void>;

    //Confirm Modal Handler
    wizardReinsConfirmModal: boolean;
    workingReinsWizardSubject: SubjectModel | null;
    workingReinsWizardDay: number | null;
    handlerWizardReinsModal: (subject?: SubjectModel, day?: number) => void;

    //Dummy render
    dummyRednerHelper: boolean;

    //Schedule Builder
    addTeacherToSubjectReinsc: (fk_materia: string, new_teacher: string, id_grupo: string, id_career: string, id_turno: string) => void;
    addScheduleToSubjectReinsc: (fk_materia: string, new_teacher: string, id_grupo: string, id_career: string, id_turno: string, dia: number, init: string, end: string) => void;

    //eventHandler
    onResizeReinsc: (eventArg: EventResizeDoneArg) => void;
    onMoveReincs: (eventArg: EventDropArg) => void;
    resetScheduleReincsBuilder: () => void;

    // Done Helper
    reinscDoneHelper: doneHelper[] | null;
    resetDoneGroup: (carrera: string, grupo: string, turno: string, grado: number) => void;

    //Handle Save this Schedule
    handleSaveScheduleDone: (carrera: string, grupo: string, turno: string, grado: number) => void;

    //Send reinsc schedule
    sendReinsSchedule: () => Promise<void>;
}

export interface LoadReinsScheduleProviderModel{
    children: ReactNode;
}

export interface GroupSchedule {
    gradeNumber: number;
    id_Grupo: string;
    id_Career: string;
    id_Turno: string;
    students_ids: string[];
    class_teacher: ClassTeacher[];
}

export interface ShiftData {
    Hora_Inicio: string;
    Hora_Fin:    string;
}
