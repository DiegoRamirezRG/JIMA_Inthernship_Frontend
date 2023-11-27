import { ReactNode } from "react";
import { AssigmentObject, AssigmentStudentTurnInfo, CreateAssigment, CriteriaRubricCreate, Rubric, Unit } from "./HomeworkModels";
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
    selectedRubric: string;
    
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
    handleAssignChange: (name: keyof CreateAssigment, value: any) => void;
    loadAssigmentFiles: (archivos: File[]) => void;
    setRubricFK: (rubric: string) => void;
    assigmentFiles: File[];
    deleteAssigmentFiles: () => void;
    cancelTheAssigmentCreation: () => void;
    deleteFileByName: (fileName: string) => void;
    addStudentsToAssign: (student_id: string) => void;
    removeStudentsFromAssign: (student_id: string) => void;
    resetStuedntAssign: () => void;
    needDate: boolean;
    handleNeedDate: (newDate: boolean) => void;
    sendCreateAssign: (class_id: string) => Promise<void>;
    sendCreateAssignLoading: boolean;

    //Rubric For Homework
    pickRubricModal: boolean;
    handlePickRubricModal: (newValue: boolean) => void;
    createOrPickSlide: boolean;
    handleCreateOrPickSlide: (from: 'pick' | 'create') => void;
    pickedRubric: string;
    pickRubric: (rubricId: string) => void;
    cancelPickingRubric: () => void;

    //Get Assigments
    getAssigmentsByClass: (class_id: string) => Promise<void>;
    classAsigments: AssigmentObject[];

    //Handle Student Homwework
    studentAttachedFiles: File[];
    attachStudentFiles: (archivos: File[]) => void;
    deleteStudentAttachedFiles: (filename: string) => void;
    dropZoneAttachModal: boolean;
    handleDropzoneAttachModal: () => void;
    deleteAllAtachemnts: () => void;
    homeworkStudntStatus: AssigmentStudentTurnInfo | boolean;
    homeworkStudntStatusLoader: boolean;
    gethomeworkStudntStauts: (assign_id: string, person_id: string) => Promise<void>;

    //Turn In Assigment
    isTurnInLoading: boolean;
    turnInAssign:(person_id: string, assign_id: string) => Promise<void>;

    //Get All Class Grades
    turnInObjs: AssigmentStudentTurnInfo[];
    turnInObjsLoading: boolean;
    getTurnInObjs: (class_id: string, person_id: string) => Promise<void>;
}

export interface HomeWorkProvider{
    children: ReactNode;
}