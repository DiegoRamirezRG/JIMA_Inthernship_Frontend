import React, { useEffect, useRef, useState } from 'react'
import './CareerSliderComponent.scss'
import { CareerCardComponent } from '../careerCardComponent/CareerCardComponent'
import { GenderStats, stadisticState } from '../../../../models/stadisticsModels/stadisticsModels';

interface props{
    stadistics: stadisticState[] | null;
}

export const CareerSliderComponent = ({ stadistics } : props) => {

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [total, setTotal] = useState<number | null>(null);

    const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += e.deltaY * 5;
        }
    };

    useEffect(() => {
        if(stadistics){
            setTotal(stadistics[0].data);
        }
    }, [])

    return (
        <div className="careersSliderStats" ref={sliderRef} onWheel={handleMouseWheel}>
            {
                stadistics!.map((item, index) => (
                    <>
                        <CareerCardComponent title={item.index} cantity={item.data} total={total!} icon={item.index} color={item.color != '' ? item.color : '#000'} key={index}/>
                    </>
                ))
            }
        </div>
    )
}
