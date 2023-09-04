import { AddressModel } from "../../../../models/addressModels/AddressModel";
import { AlergiesModel } from "../../../../models/alergiesModel/AlergiesModel";
import { SingleUser } from "../../../../models/authModels/UserModel";
import { Credentials } from "../../../../models/credentialsModels/CredentialsModels";
import { administrative, student, teacher, parent } from "../../../../models/userTypesModels/UserTypesModel";

export interface UserInformation{
    user: SingleUser;
}

export interface UserProfileCard extends UserInformation{
    address: AddressModel;
    isUserImageEditing: boolean;
    imageSource: string;
    onSelectFile(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface CredentialsInformation{
    cred: Credentials;
}

export interface AddressInformation{
    address: AddressModel;
}

export interface MedicInformation extends UserInformation{
    alergies: AlergiesModel[];
}

export interface RolesInformation extends UserInformation{
    rol: administrative | teacher | student | parent[];
}