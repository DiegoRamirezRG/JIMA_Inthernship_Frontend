import { ReactNode } from "react";
import { GroupModelMaker, confirmedInsGroup, confirmedInsGroupWithSubjects, groupForReinscription } from "./InscriptionModels";

export interface ReinsInscrContextInterface{
    //INSCRIPCION
    //INSCRIPCION
    //INSCRIPCION
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

    //REINCRIPCION
    //REINCRIPCION
    //REINCRIPCION
    //User List
    userListModal: boolean;
    workingGroup: groupForReinscription | null;
    handleUserListModal: (workingGroup?: groupForReinscription) => void;

    //Confirmed Groups
    confirmedGroups: confirmedInsGroup[];
    addToConfirmedGroups: (group: groupForReinscription) => void;
    removeConfirmedGroup: (group: confirmedInsGroup) => void;
    addAllConfirmedGroups: (data: any) => void;

    //Get Next Subjects By Group
    groupNextSubjects: confirmedInsGroupWithSubjects[];
    getNextSubjects: () => Promise<void>;

    //Load Handler
    loadedGroups: confirmedInsGroup[];
    addToLoadedGroup: (group: groupForReinscription) => void;
    removeLoadedGroup: (group: confirmedInsGroup) => void;
    loadAllGroups: (data: any) => void;

    //See Subjetcs modal
    workingGroupForSubj: confirmedInsGroupWithSubjects | null;
    showSubjListModal: boolean;
    handleShowSubjListModal: (group?: confirmedInsGroupWithSubjects) => void;
}

export interface ReinsInscrProviderInterface{
    children: ReactNode;
}