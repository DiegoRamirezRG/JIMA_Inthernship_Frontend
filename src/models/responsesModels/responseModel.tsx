// Generated by https://quicktype.io

import { UserModel } from "../authModels/UserModel";

export interface Response {
    success: boolean;
    message: string;
    data?:    UserModel | any;
    error?: string | any;
}