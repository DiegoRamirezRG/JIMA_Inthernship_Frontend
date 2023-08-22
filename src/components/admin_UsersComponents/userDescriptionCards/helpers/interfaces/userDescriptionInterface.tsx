import { AddressModelCreate } from "../../../../../models/addressModels/AddressModel";
import { AlergiesModel, AlergiesModelCreate } from "../../../../../models/alergiesModel/AlergiesModel";
import { UserModelPersonCreate } from "../../../../../models/authModels/UserModel";
import { optionSelect } from "../../../../../models/universalApiModels/UniversalApiModel";
import { administrativeCrate, parentCreate, studentCreate, teacherCreate } from "../../../../../models/userTypesModels/UserTypesModel";

//interfaces
export interface defaultProps{
    hasTitle: boolean;
    titleText?: string;
    hasActionBtn: boolean;
    btnText?: string;
    btnFunc?: () => any;
    children: any;
}

export interface inputProps{
    label: string;
    placeholder?: string;
    name: keyof UserModelPersonCreate | keyof AddressModelCreate | keyof administrativeCrate | keyof teacherCreate | keyof studentCreate | keyof parentCreate;
    onChange?: (name: keyof UserModelPersonCreate , value: any) => void;
    handleRolInfo?: (name: keyof administrativeCrate | keyof teacherCreate | keyof studentCreate | keyof parentCreate, value: string) => void
    onChangeAddress?: (name: keyof AddressModelCreate, value: any) => void;
    value?: string;
    type?: 'text' | 'date' | 'phone' | 'email' | 'password';
    id: string;
    opts?: optionSelect[];
}

export interface infoCardInterface{
    person: UserModelPersonCreate;
    inputHandler: (name: keyof UserModelPersonCreate, value: any) => void 
}

export interface domCardInterface{
    address: AddressModelCreate;
    inputHandler: (name: keyof AddressModelCreate, value: any) => void;
    countries: optionSelect[];
    states: optionSelect[] | null;
    cities: optionSelect[] | null;
}

export interface medCardInterface extends infoCardInterface{
    alergies: AlergiesModel[] | null;
    handleAlergies: (alergie: AlergiesModelCreate) => void;
    deleteAlergieHandler: (searchedTitle: string) => void;
}

export interface userTypeSelecter extends infoCardInterface{
    rolInfo: administrativeCrate | teacherCreate | studentCreate | parentCreate[] | any;
    handleRolInfo: (name: keyof administrativeCrate | keyof teacherCreate | keyof studentCreate | keyof parentCreate, value: string) => void;
}