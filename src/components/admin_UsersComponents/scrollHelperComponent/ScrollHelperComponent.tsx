import React from 'react'
import './ScrollHelperComponent.scss'

interface props{
    text: string;
    isSelected: boolean;
}

export const ScrollHelperComponent = ({ isSelected, text }: props) => {
    return (
        <div className={`scrollHelperContainer ${isSelected ? 'selected' : ''}`}>
            <p>{text}</p>
        </div>
    )
}
