import { UserModel } from "./UserModel";

export interface AuthContextActions {
    type: 'getAuthorized' | 'validateToken' | 'logout';
    payload?: UserModel | null;
}

export interface AuthContextState {
    loggedUser: UserModel | null;
}

export interface AuthContextInterface {
    state: AuthContextState;
    dispatch: React.Dispatch<AuthContextActions>;
    getAuthFuncion?: any;
    validateToken?: any;
    logoutFunction?: any;
}