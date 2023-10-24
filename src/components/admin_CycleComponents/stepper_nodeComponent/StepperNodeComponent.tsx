import React from 'react'
import './StepperNodeComponent.scss'
import { useCycleSchoolarContext } from '../../../contexts/initCycleSchoolar/CycleSchoolarContext';
import { Step, Stepper } from 'react-form-stepper';

export const StepperNodeComponent = () => {

    const { stepActivePage, stepsHelper } = useCycleSchoolarContext();

    return (
        <div>
            <Stepper steps={stepsHelper} activeStep={stepActivePage}>
                {
                    stepsHelper.map((item, index) => (
                        <Step key={index} label={item.label}/>
                    ))
                }
            </Stepper>
        </div>
    )
}
