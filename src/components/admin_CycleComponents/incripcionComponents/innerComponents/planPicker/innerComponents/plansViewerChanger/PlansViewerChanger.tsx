import React, { useEffect } from 'react'
import { useCareersPlansContext } from '../../../../../../../contexts/careersContext/CareersPlansContext';
import { LoadingComponent } from '../../../../../../generalComponents/loadingComponent/LoadingComponent';
import { PlanCardComponent } from '../../../../../validateComponents/validatePlansComponent/innerComponents/planCard/PlanCardComponent';

export const PlansViewerChanger = () => {

    const { activePlans, gettingActivePlansLoading, getActivePlans, handleCreateModalState, createModalState } = useCareersPlansContext();

    useEffect(() => {
        if(!createModalState){
            const funawait = async () => {
                await getActivePlans();
            }
            funawait();
        }
    }, [createModalState])

    return (
        <div className='planViewerContainer'>
            {
                gettingActivePlansLoading
                ?   <LoadingComponent/>
                :   <div className="plansInnerContainer">
                        <div className="plansInnerHeader">
                            <h2>Existen los siguientes planes activos para las siguientes carreras</h2>
                        </div>
                        <div className="gridPlansContainer">
                            <div className="dynamicHeighContainer">
                                {
                                    activePlans && Object.values(activePlans).map((item, index) => (
                                        <PlanCardComponent data={item} key={index} change={handleCreateModalState}/>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="explainedTextContainer">
                            <p>Si usted tiene mas carreras sin planes / con plan y no aparecen aqui, por favor contacte a soporte</p>
                        </div>
                    </div>
            }
        </div>
    )
}
