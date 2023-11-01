import React, { useEffect } from 'react'
import './ValidatePlansComponent.scss'
import { useCareersPlansContext } from '../../../../contexts/careersContext/CareersPlansContext'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';
import { NoPlansActivedComponent } from './innerComponents/noPlansActived/NoPlansActivedComponent';
import { ModalComponent } from '../../../generalComponents/modalComponent/ModalComponent';
import { PlanCreatorComponent } from '../../../admin_PlanCareerCreator/planCreatorComponent/PlanCreatorComponent';
import { CreatingLoaderModal } from '../../../admin_PlanCareerCreator/planCreatorComponent/creatingLoaderModal/CreatingLoaderModal';
import { usePlanMakerContext } from '../../../../contexts/planMakerContext/PlanMakerContext';
import { PlansViewer } from './innerComponents/plansViewer/PlansViewer';

export const ValidatePlansComponent = () => {

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
                :   plansStatus
                    ?   <PlansViewer/>
                    :   <NoPlansActivedComponent careersNeedPlan={plansStatus}/>
            }
            <ModalComponent  handleModalState={() => {}} modalState={createModalState} modalSize='modal-xxxl'>
                <PlanCreatorComponent/>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}} modalState={isMakingPlanLoading}>
                <CreatingLoaderModal/>
            </ModalComponent>
        </div>
    )
}
