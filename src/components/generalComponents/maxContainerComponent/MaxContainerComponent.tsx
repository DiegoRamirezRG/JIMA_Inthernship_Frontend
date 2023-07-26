import React from 'react'
import './MaxContainerComponent.scss'

export const MaxContainerComponent = (props: any) => {
    return (
        <div className='maxContainer'>
            {props.children}
        </div>
    )
}
