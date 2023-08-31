import { HTMLInputTypeAttribute } from "react";
import { SingleUser } from "../../../../models/authModels/UserModel";
import { optionSelect } from "../../../../models/universalApiModels/UniversalApiModel";
import { Credentials } from '../../../../models/credentialsModels/CredentialsModels';
import { AddressModel } from "../../../../models/addressModels/AddressModel";

export interface dynamicInput{
    id: string;
    placeholder: string;
    value: string;
    label: string;
    name: keyof SingleUser | keyof Credentials | keyof AddressModel;
    inputType: HTMLInputTypeAttribute;
    editActive: boolean;

}

export interface dynamicSelect{
    opts?: optionSelect[];
    id: string;
    name: keyof SingleUser | keyof AddressModel;
    editActive: boolean;
    label: string;
    value: string;
}