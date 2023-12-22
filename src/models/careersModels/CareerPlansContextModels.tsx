import { ReactNode } from "react";
import { CareerPlansActives, ValidCareersPlan } from "../careerPlansModels/CareerPlansModels";

export interface CareerPlanContextInterface{
    //Initial data
    plansStatus: ValidCareersPlan;
    plansStatusLoading: boolean;
    getPlansStatus: () => Promise<void>;

    //Modal Create
    createModalState: boolean;
    planCareerId: string | null;
    handleCreateModalState: (careerId? : string) => void;

    //Get Active Plans
    gettingActivePlansLoading: boolean;
    activePlans: { [key: string]: CareerPlansActives } | null;
    getActivePlans: () => Promise<void>;
}

export interface CareerPlanProviderInterface{
    children: ReactNode;
}