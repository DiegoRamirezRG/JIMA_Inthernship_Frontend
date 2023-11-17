import { ReactNode } from "react";
import { CreateAssigment, CriteriaRubricCreate, Rubric, Unit } from "./HomeworkModels";
import { optionSelect } from "../universalApiModels/UniversalApiModel";

export interface HomeWorkContextInterface{
    //Create Unit Modal
    unitModalState: boolean;
    handleUnitModalState: () => void;
    newTitle: string;
    onChangeTitle: (name: any, value: string) => void;

    //Create Rubric Modal
    rubricModalState: boolean;
    handleRubricModalState: () => void;
    criteriaCreationObj: CriteriaRubricCreate[];
    criteriaCreateHandler: CriteriaRubricCreate;
    handleOnChangeCriteria: (name: keyof CriteriaRubricCreate, value: string) => void;
    cancelCriteriaCreate: () => void;
    addToRubric: () => void;
    deleteOneCriteria: (name: string, value: string) => void;
    editOneCriteria: (name: string, value: string, desc: string) => void;

    //Rubric Create
    rubricCreateLoading: boolean;
    sendRubricCreate: (person_id: string) => Promise<void>;
    rubrics: Rubric[];
    formatedOptRubrics: optionSelect[];
    getRubrics: (person_id: string) => Promise<void>;
    
    //send createUnit
    unitCreateLoading: boolean;
    sendCreateUnit: (title: string, classID: string, rubricId?: string) => Promise<void>;
    classUnits: Unit[];
    classUnitsOpt: optionSelect[];
    unitsLoading: boolean;
    getClassUnits: (class_id: String) => Promise<void>;

    //Assignment
    assigmentCreateModal: boolean;
    handleAssigmentCreateModal: () => void;
    createAssignmentObj: CreateAssigment;
    handleAssignToggleBooleans: (name: 'Requiere_Anexos' | 'Acepta_Despues' | 'Calificable') => void;
}

export interface HomeWorkProvider{
    children: ReactNode;
}