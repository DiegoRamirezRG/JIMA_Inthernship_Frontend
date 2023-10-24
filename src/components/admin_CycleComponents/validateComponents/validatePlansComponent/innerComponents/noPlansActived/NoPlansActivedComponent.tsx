import React from 'react'
import './NoPlansActivedComponent.scss'
import { CareerMissingPlans, ValidCareersPlan } from '../../../../../../models/careerPlansModels/CareerPlansModels';
import { NoPlanCardComponent } from '../noPlanCard/NoPlanCardComponent';

interface NoPlansActiveProps{
    careersNeedPlan?: false | CareerMissingPlans[];
}

export const NoPlansActivedComponent = ({ careersNeedPlan } : NoPlansActiveProps) => {
    return (
        <div className='noPlansContainer'>
            <div className="noPlansInnerContainer">
                <div className="noPlansHeader">
                    <h2>No existen planes (activos / inactivos) para las siguientes carreras</h2>
                </div>
                <div className="gridNoPlans">
                    {
                        !careersNeedPlan
                        ?   <>Es un falso, sepa que paso</>
                        :   careersNeedPlan.map((item, index) => (
                            <NoPlanCardComponent key={index} career={item}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
