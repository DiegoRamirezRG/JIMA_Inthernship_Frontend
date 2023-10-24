import { ReactNode } from "react";
import { ValidCareersPlan } from "../careerPlansModels/CareerPlansModels";

export interface CareerPlanContextInterface{
    //Initial data
    plansStatus: ValidCareersPlan;
    plansStatusLoading: boolean;
    getPlansStatus: () => Promise<void>;

    //Modal Create
    createModalState: boolean;
    planCareerId: string | null;
    handleCreateModalState: (careerId? : string) => void;
}

export interface CareerPlanProviderInterface{
    children: ReactNode;
}