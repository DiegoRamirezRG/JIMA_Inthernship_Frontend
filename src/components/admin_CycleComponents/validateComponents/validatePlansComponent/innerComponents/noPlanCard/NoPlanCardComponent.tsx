import React from 'react'
import './NoPlanCardComponent.scss'
import { CareerMissingPlans } from '../../../../../../models/careerPlansModels/CareerPlansModels'
import { useCareersPlansContext } from '../../../../../../contexts/careersContext/CareersPlansContext';

interface NoPlanCardInterface {
    career: CareerMissingPlans;
}

export const NoPlanCardComponent = ({ career }: NoPlanCardInterface) => {

    const { handleCreateModalState } = useCareersPlansContext();

    return (
        <div className='noPlanCardContainer'>
            <h3>{career.Nombre}</h3>
            <button onClick={() => handleCreateModalState(career.ID_Carrera)}>Realizar Plan</button>
        </div>
    )
}
