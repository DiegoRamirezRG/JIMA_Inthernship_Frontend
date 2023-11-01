import { ReactNode } from "react";
import { GroupModelMaker } from "./InscriptionModels";

export interface ReinsInscrContextInterface{
    //Create Group Modal Hanlder
    createGroupModal: boolean;
    handleGroupModal: (careerId?: string) => void;
    careerID: string | null;
    //Shift Modals
    shiftModal: boolean;
    shiftPicker: string[];
    handleShiftModal: () => void;
    handleShiftPikcer: (name: any, value: any) => void;
    cancelShiftPicker: () => void;
    //Groups Maker
    groups: GroupModelMaker[];
    addGroupFunc: () => void;
    removeGroupFunc: (groupIndex: number) => void;
    addStudentToGroup: (studentId: string, groupIndex: number) => void;
    removeStudentOfGroup: (studentId: string, groupIndex: number) => void;
    cancelGroupMaking: () => void;

    //Build Data
    buildingGroupsLoader: boolean;
    buildGroupsFunc: () => Promise<void>;
    triggerGetAgain: boolean;
}

export interface ReinsInscrProviderInterface{
    children: ReactNode;
}