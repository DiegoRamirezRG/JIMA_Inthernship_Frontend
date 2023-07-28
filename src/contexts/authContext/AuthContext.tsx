import React, { createContext } from 'react'
import { AuthContextInterface } from '../../models/authModels/AuthContextModels'

const AuthContext = createContext<AuthContextInterface | null>( null );
export default AuthContext;