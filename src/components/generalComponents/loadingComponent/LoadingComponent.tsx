import React from 'react';
import './LoadingComponent.scss';
import Lottie from 'lottie-react';
import animation from './animation/Loading.json'

export const LoadingComponent = () => {
    return (
        <div className='loadingContainer'>
            <div className="loadingAnimation" style={{
                width: 200
            }}>
                <Lottie animationData={animation} loop={true}/>
            </div>
        </div>
    )
}
