import { AddressModel } from "../../../../models/addressModels/AddressModel";
import { AlergiesModel } from "../../../../models/alergiesModel/AlergiesModel";
import { SingleUser } from "../../../../models/authModels/UserModel";
import { Credentials } from "../../../../models/credentialsModels/CredentialsModels";
import { administrativeCrate, parentCreate, studentCreate, teacherCreate } from "../../../../models/userTypesModels/UserTypesModel";

export interface UserInformation{
    user: SingleUser;
}

export interface UserProfileCard extends UserInformation{
    address: AddressModel;
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
    rol: administrativeCrate | teacherCreate | studentCreate | parentCreate[];
}