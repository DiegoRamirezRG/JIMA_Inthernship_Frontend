import { ReactNode } from "react";
import { SubjectsId } from "../subjectsModels/SubjectModels";

export interface LoadScheduleContext {
    //Get Groups
    groups: GroupNeeded[] | null;
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
}

export interface InnerChildContext {
    children: ReactNode;
}

export interface AsignClasses {
    id_Grupo: string;
    id_Career: string;
    id_turno: string;
    class_teacher: ClassTeacher[];
}

export interface ClassTeacher{
    FK_Materia: SubjectsId;
    FK_Profesor?: string;
    schedule?: CreateSchedule[];
}

export interface CreateSchedule{
    Dia:  'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
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
