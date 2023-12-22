import { ReactNode } from "react";
import { AreaModel, AreaModelCreate, SubjectModel, SubjectModelCreate, SubjectsFilters } from "./SubjectModels";
import { optionSelect } from "../universalApiModels/UniversalApiModel";

export interface SubjectContextInterface{
    //Get Subjects Data
    isSubjectsLoading: boolean;
    subjectsData: SubjectModel[];
    getSubjectsData: () => Promise<void>;
    //Filter Subjects
    filteredSubjects: SubjectModel[];
    filters: SubjectsFilters;
    excludeAdded: (exclude: string[]) => void;
    changeActiveFilter: (newState: boolean | "all") => void;
    changeAreasFilter: (area: string | "all") => void;
    cleanFilters: () => void;
    cancelFiltering: () => void;
    //Get Areas Data
    isAreasLoading: boolean;
    areaOpts: optionSelect[] | null;
    areasData: AreaModel[] | null;
    getAreasData: () => Promise<void>;
    //Create Area
    editableArea: AreaModelCreate;
    cancelEditArea: () => void;
    handleChangeEditArea: (name: keyof AreaModelCreate, value: any) => void;
    createAreaLoading: boolean;
    createAreaFunc: () => Promise<void>;
    //Create Subject
    editableSubject: SubjectModelCreate;
    cancelEditSubject: () => void;
    handleChangeEditSubject: (name: keyof SubjectModelCreate, value: any) => void;
    createSubjectFunc: () => Promise<void>;
    createSubjectLoading: boolean;
}

export interface SubjectProviderProps{
    children: ReactNode;
}