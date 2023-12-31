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
    handleActivePage: (index: number) => void;
    stepsHelper: StepDTO[];

    //Validator Stepper
    validator_Opts: innerStepper[];
    validator_indexActive: number;
    validator_Screens: Map<number, JSX.Element>;
    validator_nextView: () => void;
    validator_backView: () => void;
    validator_loadView: (index: number) => void;
    roadmap_count: number;

    //Stepper Reinscriptions
    reinscription_Opts: innerStepper[];
    reinscription_indexActive: number;
    reinscription_screens: Map<number, JSX.Element>;
    reinscription_roadmap: number;
    reinscripction_nextView: () => void;
    reinscripction_backView: () => void;
    reinscripction_loadView: (index: number) => void;

    //Stteper Inscripcionts
    inscription_Opts: innerStepper[];
    inscription_indexActive: number;
    inscription_screens: Map<number, JSX.Element>;
    inscription_roadmap: number;
    inscripction_nextView: () => void;
    inscripction_backView: () => void;
    inscripction_loadView: (index: number) => void;
}