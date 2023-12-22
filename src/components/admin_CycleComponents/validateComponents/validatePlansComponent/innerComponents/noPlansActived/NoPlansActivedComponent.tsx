import React from 'react'
import './NoPlansActivedComponent.scss'
import { CareerMissingPlans, ValidCareersPlan } from '../../../../../../models/careerPlansModels/CareerPlansModels';
import { NoPlanCardComponent } from '../noPlanCard/NoPlanCardComponent';
import { useCareersContext } from '../../../../../../contexts/careersContext/CareersContext';

interface NoPlansActiveProps{
    careersNeedPlan?: false | CareerMissingPlans[];
}

export const NoPlansActivedComponent = ({ careersNeedPlan } : NoPlansActiveProps) => {

    const { careers } = useCareersContext();

    return (
        <div className='noPlansContainer'>
            <div className="noPlansInnerContainer">
                <div className="noPlansHeader">
                    <h2>No existen planes (activos / inactivos) para las siguientes carreras</h2>
                </div>
                <div className="gridNoPlans">
                    {
                        !careersNeedPlan
                        ?   careers?.map((item, index) => (
                            <NoPlanCardComponent key={index} career={item}/>
                        ))
                        :   careersNeedPlan.map((item, index) => (
                            <NoPlanCardComponent key={index} career={item}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
