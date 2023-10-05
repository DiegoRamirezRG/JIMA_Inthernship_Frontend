import React, { useContext, useEffect, useRef } from 'react'
import { MaxContainerComponent } from '../../components/generalComponents/maxContainerComponent/MaxContainerComponent'
import { InputComponent } from '../../components/generalComponents/inputComponent/InputComponent'
import { IoEyeOffOutline } from "react-icons/io5";

import './LoginScreen.scss'
import { useAuthLoginHook } from '../../hooks/auth/useAuthLoginHook';
import AuthContext from '../../contexts/authContext/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginScreen = () => {

    const { email, hanldeEmailType, handlePasswordType, password, showPassword, handleShowPassword, handleButtonGetAuth } = useAuthLoginHook();
    const {state, validateToken} = useContext(AuthContext);
    const navigate = useNavigate();
    const myDivRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleButtonGetAuth();
        }
    };
    
    useEffect(() => {
        const awaitFunction = async () => {
            if(localStorage.getItem('token') != null && localStorage.getItem('token') != ''){
                const isValid = await validateToken();

                if(isValid){
                    localStorage.setItem('showedPage', '0');
                    navigate('/home');
                }
            }
        }
        awaitFunction();
    }, [state])
    

    return (
        <MaxContainerComponent>
            <div className="realLoginContainer">
                <div className="overlayDiv">
                    <div className="textOverlay">
                        <p>La educación es el arma más poderosa que puedes usar para cambiar el mundo.</p>
                        <p>Nelson Mandela</p>
                    </div>
                </div>
                <div className="sideCardCredentials">
                    <div className="logoSection">
                        <img src="../../../public/Kyubi - logo.svg" alt="" />
                    </div>
                    <div className="instructionsSection">
                        <h2>Inicia sesión.</h2>
                        <p>Inicia sesión con el correo que se le asigno al momento de dar de alta al sistema.</p>
                    </div>
                    <div className="inputsSection" ref={myDivRef} onKeyDown={handleKeyDown}>
                        <InputComponent placeholder="nombre@ejemplo.com" type='text' value={email} title={'Correo electrónico'} handleState={hanldeEmailType}/>
                        <InputComponent placeholder="Contraseña" type='password' value={password} title={'Contraseña'} icon={<IoEyeOffOutline onClick={(e) => handleShowPassword('password')}/>} handleState={handlePasswordType} showPassword={showPassword}/>

                        <button onClick={handleButtonGetAuth}>Iniciar sesión</button>
                    </div>
                    <div className="actionsSection">
                        <a href="#">Recuperar contraseña</a>
                        <button>Solicitar acceso</button>
                    </div>
                </div>

            </div>
        </MaxContainerComponent>
    )
}
