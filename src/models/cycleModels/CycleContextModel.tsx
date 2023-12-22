import { CareerModel } from "../careersModels/CareersModel";

export interface CycleContextActions {
    type: 'getCareers';
    payload?: any;
}

export interface CycleContextState {
    careers: CareerModel[] | null;
}

export interface CycleContextInterface {
    state: CycleContextState;
    dispatch: React.Dispatch<CycleContextActions>;
    getCareers?: () => Promise<void>;
}