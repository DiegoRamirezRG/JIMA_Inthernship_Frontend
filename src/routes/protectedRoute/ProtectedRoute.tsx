import React, { useContext, useEffect } from 'react'
import AuthContext from '../../contexts/authContext/AuthContext';
import { Navigate, } from 'react-router-dom';
import { useState } from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const {validateToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setisValid] = useState<boolean | null>(null);

    useEffect(() => {

        const awaitFunction = async () => {
            if(localStorage.getItem('token') != null && localStorage.getItem('token') != ''){
                const isValid = await validateToken();
                setisValid(isValid);
                if(isValid){
                    setIsLoading(false);
                }else{
                    localStorage.clear();
                    setIsLoading(false);
                }
            }else{
                setIsLoading(false);
                setisValid(false);
            }
        }

        awaitFunction();
    }, [])


    if(!isLoading){
        return isValid ? <>{children}</> : <Navigate to="/" />;
    }else{
        return <>Loading...</>
    }

}
