import { ReactNode } from "react";
import { stattsCycleStudent } from "./stadisticsModels";

export interface stadisticsContextModel{
    //Cycle Student Stadistics
    cycleStats: stattsCycleStudent[];
    getCycleStats: () => Promise<void>;
}

export interface stadisticsPrivder{
    children: ReactNode;
}