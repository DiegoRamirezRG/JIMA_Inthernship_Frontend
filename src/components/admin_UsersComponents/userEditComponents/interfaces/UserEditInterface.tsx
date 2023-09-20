import { AddressModel } from "../../../../models/addressModels/AddressModel";
import { AlergiesModel, AlergiesModelCreate } from "../../../../models/alergiesModel/AlergiesModel";
import { SingleUser, roles } from "../../../../models/authModels/UserModel";
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
    RolData: administrative | teacher | student | any;
    isEditing: boolean;
    editingObserver: boolean;
    handleActiveEdit: () => void;
    handleRolEdit: (name: keyof administrative | keyof teacher | keyof student, value: any) => void;
    handleModalState: () => void;
}

export interface StudentRol extends SingleUserInterface {
    RolData: student;
    isEditing: boolean;
    editObserver: boolean;
    handleActiveEdit: () => void;
    handleRolEdit: (name: keyof student, value: any) => void;
    handleModalState: () => void;
}

export interface TeacherRol extends SingleUserInterface {
    RolData: teacher;
    isEditing: boolean;
    editObserver: boolean;
    handleActiveEdit: () => void;
    handleRolEdit: (name: keyof teacher, value: any) => void;
}

export interface AdminRol extends SingleUserInterface {
    RolData: administrative;
    isEditing: boolean;
    editObserver: boolean;
    handleActiveEdit: () => void;
    handleRolEdit: (name: keyof teacher, value: any) => void;
}

export interface DetailedAcademicStudent extends SingleUserInterface{
    RolData: student;
    handleModalState: () => void;
}