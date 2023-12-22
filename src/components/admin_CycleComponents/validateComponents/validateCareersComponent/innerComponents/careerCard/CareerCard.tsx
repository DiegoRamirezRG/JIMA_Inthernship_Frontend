import React from 'react'
import './CareerCard.scss'
import { CareerModel } from '../../../../../../models/careersModels/CareersModel';
import { useCycleSchoolarContext } from '../../../../../../contexts/initCycleSchoolar/CycleSchoolarContext';
import { useCareersContext } from '../../../../../../contexts/careersContext/CareersContext';

interface props{
    career: CareerModel;
}

export const CareerCard = ({ career } : props) => {

    const { handleModalCareers } = useCareersContext();

    return (
        <div className='career_card' onClick={() => {
            handleModalCareers(career);
        }}>
            <h5>{career.Nombre}</h5>
            {
                career.Descripcion
                ?   <p className='desc'>{career.Descripcion}</p>
                :   <></>
            }
            <div className="innerRow">
                <p>Ciclos: {career.Numero_De_Ciclos}</p>
                <p>Mes/Ciclo: {career.Duracion_Mensual_De_Ciclos}</p>
            </div>
            <div className={`indicator ${career.Active ? 'active' : 'inactive'}`}></div>
        </div>
    )
}
