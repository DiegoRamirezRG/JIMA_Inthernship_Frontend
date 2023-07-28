import { AuthContextActions, AuthContextState } from "../../models/authModels/AuthContextModels";


export const initialAuthState: AuthContextState = { loggedUser: null};

function authReducer(state: AuthContextState, action: AuthContextActions): AuthContextState {
    switch(action.type){
        case 'getAuthorized': 
            return {...state, loggedUser: action.payload || null};
        default:
            return state;
    }
}

export default authReducer;