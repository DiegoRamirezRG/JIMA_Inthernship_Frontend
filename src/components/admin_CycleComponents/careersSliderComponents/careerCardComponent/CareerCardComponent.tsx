import React from 'react'
import './CareerCardComponent.scss'
import { lighten,darken } from 'polished';
import { IconDynamicMap } from './helpers/IconDynamicMap';

interface CardSlider{
    title: string;
    cantity: number;
    total: number;
    color: string;
    icon: string;
}

export const CareerCardComponent = ({ title, cantity, total, color, icon }: CardSlider) => {

    const porcentaje = (cantity / total) * 100;
    const lightenedColor = lighten(0.15, color);
    const darkenedColor = darken(0.20, color)

    return (
        <div className='CaareerCardComponent'>
            <div className="cardHeader">
                <div className="reviewData">
                    <IconDynamicMap color={color} searched={icon}/>
                    <p style={{color: darkenedColor}}>{title}</p>
                </div>
                <div className="numerData" style={{color: darkenedColor}}>
                    {cantity}
                </div>
            </div>
            <div className="sliderContainer">
                <div className="totallyCompleted" style={{backgroundColor: lightenedColor}}>
                    <div className="realLoaded" style={{width: `${porcentaje}%`, backgroundColor: color}}>
                    </div>
                </div>
            </div>
        </div>
    )
}
