import { ReactNode } from "react";
import { SubjectModel, SubjectsId } from "../subjectsModels/SubjectModels";
import { EventResizeDoneArg } from "@fullcalendar/interaction";
import { EventDropArg } from "@fullcalendar/core";

export interface LoadScheduleContext {
    //Get Groups
    groups: GroupNeeded[] | null;
    groupdDone: doneHelper[] | null;
    groupsLoading: boolean;
    getGroupsFunc: () => Promise<void>;

    //Set Cicle Subjects
    getAndSetSubjects: (group: GroupNeeded[], cicle: number) => Promise<void>;
    subjectsPerGroup: AsignClasses[];
    subjectsLoader: boolean;

    //ScheduleMaker
    scheduleMakerModal: boolean;
    groupScopeFac: GroupNeeded | null;
    handleScheduleModal: (scope?: GroupNeeded) => Promise<void>;
    handleScheudleDoneModal: (carrera: string, grupo: string, turno: string, grado: number) => void;

    //WizarsSetupModal
    wizardModal: boolean;
    workingSubject: SubjectModel | null;
    handleWizardModal: (subject? : SubjectModel, day?: number) => void;
    workingDay: number | null;

    //Add to Local
    addTeacherClass: (fk_materia: string, new_teacher: string, id_grupo: string, id_career: string, id_turno: string) => void;
    addScheduleClass: (fk_materia: string, new_teacher: string, id_grupo: string, id_career: string, id_turno: string, dia: number, init: string, end: string) => void;
    dummyRender: boolean;

    //Calendar Events
    onRezise: (eventArg: EventResizeDoneArg) => void;
    onMove: (eventArg: EventDropArg) => void;
    resetScheduleMaker: () => void;

    //Send Schedules
    sendScheduleLoader: boolean;
    sendSchedule: () => Promise<void>
}

export interface InnerChildContext {
    children: ReactNode;
}

export interface AsignClasses {
    id_Grupo: string;
    id_Career: string;
    id_Turno: string;
    class_teacher: ClassTeacher[];
}

export interface ClassTeacher{
    FK_Materia: string;
    FK_Profesor?: string;
    schedule?: CreateSchedule[];
}

export interface CreateSchedule{
    Dia:  'Domingo' | 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
    Hora_Inicio: string;
    Hora_Fin: string;
}

export interface GroupNeeded {
    ID_Carrera:  string;
    Carrera:     string;
    ID_Grado:    string;
    Numero:      number;
    ID_Grupo:    string;
    Indicador:   string;
    ID_Turno:    string;
    Turno:       string;
    Hora_Inicio: string;
    Hora_Fin:    string;
}

export interface doneHelper{
    id_Grupo: string;
    id_Career: string;
    id_Turno: string;
    grado: number;
}