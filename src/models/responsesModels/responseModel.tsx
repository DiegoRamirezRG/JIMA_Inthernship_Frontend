// Generated by https://quicktype.io

import { AddressModel } from "../addressModels/AddressModel";
import { AlergiesModel } from "../alergiesModel/AlergiesModel";
import { SingleUser, UserModel } from "../authModels/UserModel";
import { Credentials } from "../credentialsModels/CredentialsModels";
import { GenderStats } from "../stadisticsModels/stadisticsModels";
import { City, Country, State } from "../universalApiModels/UniversalApiModel";
import { persona } from "../usersModels/UserModel";

export interface Response {
    success: boolean;
    message: string;
    data?:    any | UserModel | persona[] | SingleUser |Credentials | AddressModel | AlergiesModel[] | Country[] | State[] | City[] | GenderStats[];
    error?: string | any;
}
