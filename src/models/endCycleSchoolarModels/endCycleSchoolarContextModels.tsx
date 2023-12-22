import { ReactNode } from "react";

export interface endCycleSchoolarContext {
    //End Cycle Modal
    endCycleModal: boolean;
    handleEndCycleModal: () => void;

    //Completely Sure Modal
    completelySureModal: boolean;
    handleCompletelySureModal: () => void;

    //End cucle Func
    endCycleFunc: () => Promise<void>;
}

export interface endCycleSchoolarProvider {
    children: ReactNode;
}