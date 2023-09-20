import { HTMLInputTypeAttribute } from "react";
import { SingleUser } from "../../../../models/authModels/UserModel";
import { optionSelect } from "../../../../models/universalApiModels/UniversalApiModel";
import { Credentials } from '../../../../models/credentialsModels/CredentialsModels';
import { AddressModel } from "../../../../models/addressModels/AddressModel";
import { administrative, student, teacher } from "../../../../models/userTypesModels/UserTypesModel";
import { createStudentToBe, customStudentToBe } from "../../../../models/enrollModels/EnrollModels";

export interface dynamicInput{
    id: string;
    placeholder: string;
    value: string;
    label: string;
    name: keyof SingleUser | keyof Credentials | keyof AddressModel | keyof administrative | keyof teacher | keyof student;
    inputType: HTMLInputTypeAttribute;
    editActive: boolean;
    onChange?: any;
}

export interface dynamicSelect{
    opts?: optionSelect[];
    id: string;
    name: keyof SingleUser | keyof AddressModel | keyof createStudentToBe | keyof customStudentToBe;
    editActive: boolean;
    label: string;
    value: string;
    onChange?: any;
}

export interface dynamicSelectWithBtn extends dynamicSelect{
    addBtnAction: () => void;
}