import React, { useEffect, useReducer } from 'react'
import authReducer, { initialAuthState } from './AuthReducer'
import AuthContext from './AuthContext'
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig'
import { Response } from '../../models/responsesModels/responseModel'
import { UserModel } from '../../models/authModels/UserModel'

export const AuthProvider = ({children}: any) => {

    const [state, dispatch] = useReducer(authReducer, initialAuthState)

    const getAuthorized = async (email: string, password: string) => {
        const response = await serverRestApi.post<Response>('/api/auth/getAuthorized', {
            email,
            password
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        const user = response.data.data as UserModel;
        localStorage.setItem('token', user.jwt);

        dispatch({
            type: 'getAuthorized',
            payload: user
        });
    }

    const getValidateToken = async () => {        
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const response = await serverRestApi.get<Response>(`/api/auth/validateToken/${localStorage.getItem('token')}`);
                if(!response.data.success){
                    resolve(false);
                }
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

    const getUserByToken = async () => {
        const response = await serverRestApi.get<Response>(`/api/auth/getUserbyToken/${localStorage.getItem('token')}`);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        const user = response.data.data as UserModel;
        
        dispatch({
            type: 'getAuthorized',
            payload: user
        });
    }

    const logout = async () => {
        try {
            const response = await serverRestApi.get<Response>(`/api/auth/logout/${state.loggedUser?.ID_Persona}`);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }else{
                localStorage.clear();
            }

            dispatch({
                type: 'logout',
                payload: null
            });

        } catch (error) {
            console.error('Error loging out data: ', error);
        }
    }

    useEffect(() => {
        const awaitFunction = async () => {
            try {
                if(localStorage.getItem('token') != ''  && localStorage.getItem('token') != null){                    
                    const isValid = await getValidateToken();
                    if(isValid){
                        await getUserByToken()
                    }else{
                        localStorage.clear();
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        awaitFunction();
    }, [])
    

    return (
        <AuthContext.Provider value={{
            state,
            dispatch,
            getAuthFuncion: getAuthorized,
            validateToken: getValidateToken,
            logoutFunction: logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
