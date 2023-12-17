import { ReactNode } from "react";

export interface endCycleSchoolarContext {
    //End Cycle Modal
    endCycleModal: boolean;
    handleEndCycleModal: () => void;

    //Completely Sure Modal
    completelySureModal: boolean;
    handleCompletelySureModal: () => void;
}

export interface endCycleSchoolarProvider {
    children: ReactNode;
}