import React, { KeyboardEvent } from 'react'
import './InputComponent.scss'

interface props{
    placeholder: String;
    icon?: JSX.Element;
    type: "email" | "password" | "text" | "date";
    inputName?: string | undefined;
    value: any;
    title?: String;
    handleState: (state: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword?: boolean;
}

export const InputComponent = ({placeholder, icon, type, inputName, value, title, handleState, showPassword}: props) => {
    return (
        <div className="inputComponentContainer">
            <p className='inputTitle'>{title}</p>
            <div className="inputContainer">
                <div className="inputSection">
                    <input type={ type == 'password' ? showPassword ? 'text' : type : type } name={inputName} value={value} placeholder={placeholder as string} onChange={(e) => handleState(e)}/>
                </div>
                {icon 
                    ?  
                        <div className='iconSection'>
                            {icon}
                        </div>
                    : ""}
            </div>
        </div>
    )
}
