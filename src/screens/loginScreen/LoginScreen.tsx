import React from 'react'
import { MaxContainerComponent } from '../../components/generalComponents/maxContainerComponent/MaxContainerComponent'
import { InputComponent } from '../../components/generalComponents/inputComponent/InputComponent'
import { IoEyeOffOutline } from "react-icons/io5";

import './LoginScreen.scss'
import { useAuthLoginHook } from '../../hooks/auth/useAuthLoginHook';

export const LoginScreen = () => {

    const { email, hanldeEmailType, handlePasswordType, password, showPassword, handleShowPassword } = useAuthLoginHook();


    return (
        <MaxContainerComponent>
            <div className="realLoginContainer">
                
                <div className="sideCardCredentials">
                    <div className="logoSection">
                        <img src="../../../public/Kyubi - logo.svg" alt="" />
                    </div>
                    <div className="instructionsSection">
                        <h2>Inicia sesión.</h2>
                        <p>Inicia sesión con el correo que se le asigno al momento de dar de alta al sistema.</p>
                    </div>
                    <div className="inputsSection">
                        <InputComponent placeholder="nombre@ejemplo.com" type='text' value={email} title={'Correo electrónico'} handleState={hanldeEmailType}/>
                        <InputComponent placeholder="Contraseña" type='password' value={password} title={'Contraseña'} icon={<IoEyeOffOutline onClick={(e) => handleShowPassword('password')}/>} handleState={handlePasswordType} showPassword={showPassword}/>

                        <button>Iniciar sesión</button>
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
