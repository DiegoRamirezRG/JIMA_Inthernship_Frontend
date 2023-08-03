import React, { useState } from 'react'
import { Option } from '../../../models/optionModels/OptionModel'
import './MenuOptionComponent.scss'

interface props{
    option: Option;
    isMenuOpen: boolean;
    isShow: boolean;
    handleNavigation: () => void;
}

export const MenuOptionComponent = ({ option, isMenuOpen, isShow, handleNavigation }: props) => {
    
    const { icon, id, text, route } = option;
    return (
        <div className={`OptionMenuContainer ${isMenuOpen && isShow ? 'menuOpened' : ''}`} onClick={handleNavigation} id={id}>
            <div className={`iconSection ${isShow ? 'showed' : 'no-showed'}`}>
                {icon}
            </div>
            <div className={`textSection ${isMenuOpen ? 'menuOpened' : 'menuClosed'}`}>
                {text}
            </div>
        </div>
    )
}
