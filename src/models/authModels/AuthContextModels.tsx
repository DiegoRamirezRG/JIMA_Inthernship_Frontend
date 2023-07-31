import { UserModel } from "./UserModel";

export interface AuthContextActions {
    type: 'getAuthorized' | 'validateToken';
    payload?: UserModel;
}

export interface AuthContextState {
    loggedUser: UserModel | null;
}

export interface AuthContextInterface {
    state: AuthContextState;
    dispatch: React.Dispatch<AuthContextActions>;
    getAuthFuncion?: any;
    validateToken?: any;
}