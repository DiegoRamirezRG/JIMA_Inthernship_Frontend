import React, { useEffect } from 'react'
import './ValidatePlansComponent.scss'
import { useCareersPlansContext } from '../../../../contexts/careersContext/CareersPlansContext'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';
import { NoPlansActivedComponent } from './innerComponents/noPlansActived/NoPlansActivedComponent';
import { ModalComponent } from '../../../generalComponents/modalComponent/ModalComponent';
import { PlanCreatorComponent } from '../../../admin_PlanCareerCreator/planCreatorComponent/PlanCreatorComponent';

export const ValidatePlansComponent = () => {

    const { getPlansStatus, plansStatus, plansStatusLoading, createModalState } = useCareersPlansContext();

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
                :   plansStatus === true
                    ?   <>Mostrar planes</>
                    :   <NoPlansActivedComponent careersNeedPlan={plansStatus}/>
            }
            <ModalComponent  handleModalState={() => {}} modalState={createModalState} modalSize='modal-xxxl'>
                <PlanCreatorComponent/>
            </ModalComponent>
        </div>
    )
}
