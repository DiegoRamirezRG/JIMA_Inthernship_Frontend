import React from 'react'
import { useState } from 'react';

export const useAuthLoginHook = () => {

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

    return {
        email,
        password,
        showPassword,
        handleShowPassword,
        hanldeEmailType,
        handlePasswordType
    }
}
