import React from 'react'
import './notFoundScreen.scss'
import blob from './assets/blob.svg'
import animation from './assets/404.json'
import { MaxContainerComponent } from '../../components/generalComponents/maxContainerComponent/MaxContainerComponent'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'

export const NotFoundScreen = () => {

    const navigation = useNavigate();

    const handleReturnHome = () => {
        navigation('/home')
    }

    return (
        <MaxContainerComponent>
            <div className="ownContainer">
                <div className="realWorkContainer">
                    <div className="animationAndBlob">
                        <img src={blob} className='blob404'/>
                        <div className="animationContainer">
                            <Lottie animationData={animation} loop={true} />
                        </div>
                    </div>
                    <div className="info">
                        <h3>PARECE QUE ESTAS PERDIDO</h3>
                        <p>la pagina que estas buscando, no existe</p>
                    </div>
                    <div className="returnHomeBtn">
                        <button className='goHomeBtn' onClick={handleReturnHome}>Ir a la pagina principal</button>
                    </div>
                </div>
            </div>
        </MaxContainerComponent>
    )
}
