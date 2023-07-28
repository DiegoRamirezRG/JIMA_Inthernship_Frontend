import React, { useReducer } from 'react'
import authReducer, { initialAuthState } from './AuthReducer'
import AuthContext from './AuthContext'

export const AuthProvider = ({children}: any) => {

    const [state, dispatch] = useReducer(authReducer, initialAuthState)

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
