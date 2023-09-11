import React from 'react'
import './SelecterBtnsComponent.scss'

interface SelectedButtonProp{
    title: string;
    index: number;
    currentIndex: number;
    changeIndex: (index: number) => void;
}

export const SelecterBtnsComponent = ({title, index, changeIndex, currentIndex}: SelectedButtonProp) => {
    return (
        <div className={`btnContainer ${currentIndex === index ? 'rendering' : ''}`} onClick={() => changeIndex(index)}>
            <p>{title}</p>
        </div>
    )
}
