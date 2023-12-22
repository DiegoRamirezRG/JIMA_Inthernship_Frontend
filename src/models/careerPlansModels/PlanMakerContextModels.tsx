import { ReactNode } from "react";
import { SubjectModel } from "../subjectsModels/SubjectModels";

export interface PlanMakerContextInterface{
    //Subjects per cicle
    prepareCiclesState: (cicles: number) => void;
    ciclesState: SubjectsPerCicleInterface;
    addNewSubject: (subject: SubjectModel, cicle: number, prev: boolean, fk_prev?: string) => Promise<void>;
    deleteSubject: (id_subject: string) => Promise<void>;
    confirmModalDelete: () => Promise<void>;
    triggerFilterHelper: boolean;
    deleteSubjectFromPlanLoading: boolean;
    prevSubjects: MakingPlanSubject[];

    //Confirm and Setting modal
    confirmSetupModalState: boolean;
    handleConfirmSetupModal: (subject?: SubjectModel, cicle?: number) => void;

    //Selected Subject
    selectedSubject: SubjectModel | null;
    numberOfCycle: number | null;

    //Delete from plan modal and funcs
    deleteModalState: boolean;
    handleDeleteModalState: (subject_id?: string) => void;
    deletedId: string | null;

    //Maker Plan
    cancelPlanMaking: () => void;
    sendMakePlan: (careerId: string) => Promise<void>;
    isMakingPlanLoading: boolean;
}

export interface PlanMakerContextProviderInterface{
    children: ReactNode;
}

export interface MakingPlanSubject {
    subject: string;
    prevSubject: string;
}

export interface SubjectsPerCicleInterface {
    [indice: number]: SubjectModel[];
}