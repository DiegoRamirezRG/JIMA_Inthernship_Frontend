import React, { useState } from 'react'
import './Admin_InitCycleScreen.scss'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent'
import { useCycleSchoolarContext } from '../../contexts/initCycleSchoolar/CycleSchoolarContext'
import { StepperNodeComponent } from '../../components/admin_CycleComponents/stepper_nodeComponent/StepperNodeComponent'
import { ModalComponent } from '../../components/generalComponents/modalComponent/ModalComponent'
import { EditCareerModalComponent } from '../../components/admin_CareerComponents/EditCareerModal/EditCareerModalComponent'
import { useCareersContext } from '../../contexts/careersContext/CareersContext'


export const Admin_InitCycleScreen = () => {

    const { masterLoading, stepConfig, stepActivePage} = useCycleSchoolarContext();
    const { modalCareers, handleModalCareers, editCareer  } = useCareersContext();

    return (
        <NavigationComponent>
            <div className="AdminCycleInitContainer">
                {
                    false
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="headerTitle">
                                <h2>Creacion de Ciclo</h2>
                            </div>
                            <div className="contentSection">
                                <div className="steppers">
                                    <StepperNodeComponent/>
                                </div>
                                <div className="stepRenderContainer">
                                    {
                                        stepConfig.get(stepActivePage)
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
            <ModalComponent handleModalState={handleModalCareers} modalState={modalCareers}>
                    <EditCareerModalComponent career={editCareer} />
            </ModalComponent>
        </NavigationComponent>
    )
}
