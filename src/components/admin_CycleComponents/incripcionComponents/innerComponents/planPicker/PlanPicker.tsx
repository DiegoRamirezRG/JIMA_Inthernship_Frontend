import React, { useEffect } from 'react'
import './PlanPicker.scss'
import { useCareersPlansContext } from '../../../../../contexts/careersContext/CareersPlansContext';
import { usePlanMakerContext } from '../../../../../contexts/planMakerContext/PlanMakerContext';
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';
import { PlansViewerChanger } from './innerComponents/plansViewerChanger/PlansViewerChanger';

export const PlanPicker = () => {

    const { getPlansStatus, plansStatus, plansStatusLoading, createModalState } = useCareersPlansContext();
    const { isMakingPlanLoading } = usePlanMakerContext();

    useEffect(() => {
        const awaitFunc = async() => {
            await getPlansStatus();
        }
        awaitFunc()
    }, [])

    return (
        <div className='maxPlansValidatorsContainer'>
            {
                plansStatusLoading
                ?   <LoadingComponent/>
                :   plansStatus === false
                    ?   <PlansViewerChanger/>
                    :   <></> //No puede no haber planes
            }
        </div>
    )
}
