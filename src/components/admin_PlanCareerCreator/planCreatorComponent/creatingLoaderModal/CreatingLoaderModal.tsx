import React, { useEffect, useState } from 'react'
import './CreatingLoaderModal.scss'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent'
import { usePlanMakerContext } from '../../../../contexts/planMakerContext/PlanMakerContext'

export const CreatingLoaderModal = () => {

    const { isMakingPlanLoading } = usePlanMakerContext();
    const [indiexText, setIndiexText] = useState<number>(0);
    const texts = [
        'Escondiendo secretos en la base de datos 😎🤫',
        'Haciendo magia con ceros y unos ✨',
        'Convenciendo a las máquinas de que la escuela es genial 🤖🎓',
        'Enseñando a los números a bailar salsa 💃🕺',
        'Dando un toque de genialidad al sistema 🚀🎓'
    ]

    useEffect(() => {
        if(isMakingPlanLoading){
            const intervalId = setInterval(() => {
                setIndiexText((prevIndex) =>
                    prevIndex === texts.length - 1 ? 0 : prevIndex + 1
                );
            }, 3000);
            return () => clearInterval(intervalId);
        }
    }, []);
    

    return (
        <div className='loadingPlanMakerContainer'>
            <div className="loadingBanner">
                <LoadingComponent/>
            </div>
            <div className="loadingMessages">
                <p className="loading-text">{texts[indiexText]}</p>
            </div>
        </div>
    )
}
