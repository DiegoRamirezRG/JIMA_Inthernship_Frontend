import { ReactNode } from "react";
import { CycleStatus, innerStepper } from "./CycleModels";
import { StepDTO } from "react-form-stepper/dist/components/Step/StepTypes";
import { CareerModel, CareerModelCreate } from "../careersModels/CareersModel";

export interface initProviderProps{
    children: ReactNode;
}

export interface CycleCalendarContext{
    //Master Loading
    masterLoading: boolean;

    //Loaders
    getCycleStatusLoader: boolean;

    //Cycle Status
    cycleStatusState: CycleStatus | null;
    getCycleStatusFunc: () => Promise<void>;

    //Stteper Handler
    stepConfig: Map<number, JSX.Element>;
    stepActivePage: number;
    stepsHelper: StepDTO[];

    //Validator Stepper
    validator_Opts: innerStepper[];
    validator_indexActive: number;
    validator_Screens: Map<number, JSX.Element>;
    validator_nextView: () => void;
    validator_backView: () => void;
    validator_loadView: (index: number) => void;
    roadmap_count: number;
}