import React, { useEffect, useState } from 'react'
import './CreatingLoaderModal.scss'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent'
import { usePlanMakerContext } from '../../../../contexts/planMakerContext/PlanMakerContext'

export const CreatingLoaderModal = () => {

    const { isMakingPlanLoading } = usePlanMakerContext();
    const [indiexText, setIndiexText] = useState<number>(0);
    const texts = [
        'Escondiendo secretos en la base de datos',
        'Haciendo magia con ceros y unos',
        'Convenciendo a las máquinas de que la escuela es genial',
        'Enseñando a los números a bailar salsa',
        'Dando un toque de genialidad al sistema'
    ]

    const [part, setPart] = useState<string>('');
    const [i, setI] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [forwards, setForwards] = useState<boolean>(true);
    const [skipCount, setSkipCount] = useState<number>(0);
    const skipDelay = 70;
    const speed = 30;

    useEffect(() => {
        const wordFlick = setInterval(() => {
            if (forwards) {
                if (offset >= texts[i].length) {
                    setSkipCount((prevCount) => prevCount + 1);
                    if (skipCount === skipDelay) {
                        setForwards(false);
                        setSkipCount(0);
                    }
                }
            } else {
                if (offset === 0) {
                    setForwards(true);
                    setI((prevI) => (prevI + 1 >= texts.length ? 0 : prevI + 1));
                    setOffset(0);
                }
            }
        
            const newPart = texts[i].substr(0, offset);
            setPart(newPart);
        
            if (skipCount === 0) {
                setOffset((prevOffset) => (forwards ? prevOffset + 1 : prevOffset - 1));
            }
        }, speed);
    
        return () => clearInterval(wordFlick);
    }, [forwards, i, offset, skipCount, speed, texts]);

    return (
        <div className='loadingPlanMakerContainer'>
            <div className="loadingBanner">
                <LoadingComponent/>
            </div>
            <div className="loadingMessages">
                <p className="loading-text">{part}</p>
            </div>
        </div>
    )
}
