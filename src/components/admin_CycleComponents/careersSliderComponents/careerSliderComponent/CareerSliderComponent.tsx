import React, { useEffect, useRef, useState } from 'react'
import './CareerSliderComponent.scss'
import { CareerCardComponent } from '../careerCardComponent/CareerCardComponent'
import { cardsData } from '../../../../screens/admin_School_Cycle/temp.data.test';

export const CareerSliderComponent = () => {

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [total, setTotal] = useState<number | null>(null);

    const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += e.deltaY * 5;
        }
    };

    useEffect(() => {
        let sum = 0;
        for (const card of cardsData) {
            sum += card.cantity;
        }
        setTotal(sum);
    }, [])
    

    return (
        <div className="careersSliderStats" ref={sliderRef} onWheel={handleMouseWheel}>
            {
                cardsData.map((item, index) => (
                    <>
                        <CareerCardComponent title={item.title} cantity={item.cantity} total={total!} icon={item.icon} color={item.color} key={index}/>
                    </>
                ))
            }
        </div>
    )
}
