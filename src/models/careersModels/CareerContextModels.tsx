import { ReactNode } from "react";
import { CareerModel, CareerModelCreate } from "./CareersModel";

export interface CareerContextInterface{
    updateLoading: boolean;
    updateFunct: () => Promise<void>;

    //Career Helpers
    modalCareers: boolean;
    handleModalCareers: (career?: CareerModel) => void;
    editCareer: CareerModelCreate | null;
    careerOnChange: (name: keyof CareerModelCreate, value: any) => void;

    //Getters
    isGettingInformationLoading: boolean;
    careers: CareerModel[] | null;
    getCareers: () => Promise<void>;
    createCareer: () => Promise<void>;
    isCreating: boolean;

    //GetCareerInfoByID
    gettedCareer: CareerModel | null;
    gettedCareerLoading: boolean;
    getCareerById: (careerId: string) => Promise<void>;
}

export interface CareerContextProviderProps{
    children: ReactNode;
}