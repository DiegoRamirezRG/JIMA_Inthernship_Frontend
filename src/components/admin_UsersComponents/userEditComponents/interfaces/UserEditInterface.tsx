import { AddressModel } from "../../../../models/addressModels/AddressModel";
import { AlergiesModel, AlergiesModelCreate } from "../../../../models/alergiesModel/AlergiesModel";
import { SingleUser } from "../../../../models/authModels/UserModel";
import { Credentials } from "../../../../models/credentialsModels/CredentialsModels";
import { administrative, student, teacher, parent } from "../../../../models/userTypesModels/UserTypesModel";


export interface SingleUserInterface{
    user: SingleUser;
    user_id: string;
}

export interface UserProfileCard extends SingleUserInterface{
    address: AddressModel;
    editActive: boolean;
    handleActiveEdit: () => void;
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    imageCropped: string;
    editingObserver: boolean;
    activeSureModal: () =>void;
    cancelEditing: () => void;
}

export interface UserInformation extends SingleUserInterface{
    editActive: boolean;
    handleActiveEdit: () => void;
    handleUserChange: (name: keyof SingleUser, value: any) => void;
    cancelUserEdit: () => void;
    activeSureModal: () =>void;
}


export interface CredentialsInformation{
    credentials: Credentials;
    editObserver: boolean;
    editActive: boolean;
    handleActiveEdit: () => void;
    handleCredentialsEdit: (name: keyof Credentials, value: any) => void
    cancelCredentialsEdit: () => void;
    activeSureModal: () =>void;
}

export interface AddressInformation{
    address: AddressModel;
    editActive: boolean;
    handleActivateEdit: () => void;
    handleAddressEdit: (name: keyof AddressModel, value: any) => void;
    cancelAddressEdit: () => void;
    activeSureModal: () => void;
}

export interface MedicInformation extends SingleUserInterface{
    isEditing: boolean;
    handleActiveEdit: () => void;
    handleUserEdit: (name: keyof SingleUser, value: any) => void;
    alergies: AlergiesModel[];
    addNewAlergieGlobal: (newAlergie: AlergiesModelCreate) => void;
    deleteAlergieGlobal: (searchedTitle: string) => void;
    cancelAlergiesEdit: () => void;
    activeSureModal: () => void;
}

export interface RolesInformation extends SingleUserInterface{
    rol: administrative | teacher | student | parent[];
}