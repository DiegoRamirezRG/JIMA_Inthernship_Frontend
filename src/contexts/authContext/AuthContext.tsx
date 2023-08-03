import React, { createContext } from 'react'
import { AuthContextInterface } from '../../models/authModels/AuthContextModels'

const AuthContext = createContext<AuthContextInterface>( {
    dispatch: () => {},
    state: {loggedUser: null}
} );
export default AuthContext;