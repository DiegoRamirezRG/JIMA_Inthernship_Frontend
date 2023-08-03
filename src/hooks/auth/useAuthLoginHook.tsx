import React, { useContext } from 'react'
import { useState } from 'react';
import { AxiosError } from 'axios';
import { showErrorTost } from '../../components/generalComponents/toastComponent/ToastComponent';
import AuthContext from '../../contexts/authContext/AuthContext';

export const useAuthLoginHook = () => {

    const { getAuthFuncion } = useContext(AuthContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const hanldeEmailType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleShowPassword = (type:  "email" | "password" | "text" | "date") => {
        if(type == 'password'){
            setShowPassword((prevState) => !prevState);
        }
    }

    const handleButtonGetAuth = async () => {

        try {
            if(email.length == 0 || email == null){
                showErrorTost({text: 'El correo no puede estar vacio', position: 'top-center'});
                return;
            }
    
            if(!validateEmail(email)){
                showErrorTost({text: 'El correo no es valido', position: 'top-center'});
                return;
            }
    
            if(password.length == 0 || password == null){
                showErrorTost({text: 'La contraseña no puede estar vacia', position: 'top-center'});
                return;
            }
    
            await getAuthFuncion(email, password);
        } catch (error: any) {
            showErrorTost({text: error.response.data.message!, position: 'top-center'});
            return;
        }

    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return {
        email,
        password,
        showPassword,
        handleShowPassword,
        hanldeEmailType,
        handlePasswordType,
        handleButtonGetAuth
    }
}
