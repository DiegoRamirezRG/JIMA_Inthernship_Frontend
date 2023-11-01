import React, { useState } from 'react'
import './ValidateComponents.scss'
import { options } from './helpers/renderingOpts'
import { useCycleSchoolarContext } from '../../../contexts/initCycleSchoolar/CycleSchoolarContext'
import { useCareersContext } from '../../../contexts/careersContext/CareersContext'
import { useCareersPlansContext } from '../../../contexts/careersContext/CareersPlansContext'
import { useStudentContext } from '../../../contexts/studentContext/StudentContext'

export const ValidateComponents = () => {
    
    const { validator_Opts, validator_indexActive, validator_Screens, validator_nextView, validator_backView, validator_loadView, roadmap_count, handleActivePage, stepActivePage } = useCycleSchoolarContext();
    const { careers } = useCareersContext();
    const { plansStatus } = useCareersPlansContext();
    const { lastYearStudents } = useStudentContext();

    return (
        <div className='validatorMaxContainer'>
            <div className="innerSteper">
                {
                    validator_Opts.map((item, index) => (
                        <div className={`container-rounded ${item.active ? 'active' : 'no-active'} ${item.completed ? 'completed' : 'inCompleted'}`} onClick={item.completed || item.active ? () => validator_loadView(index) : () => {}} key={index}>
                            <div className="iconContainer">
                                {item.icon}
                            </div>
                            <p>{item.label}</p>
                        </div>
                    ))
                }
                <div className="connectorLine">
                    <div className="completedLine" style={{height: `calc((100% / ${options.length}) * ${roadmap_count + 1})`}}></div>
                </div>
            </div>
            <div className="stepperContentRender">
                <div className="innerContentSection">
                    {
                        validator_Screens.get(validator_indexActive)
                    }
                </div>
                <div className="buttonsActionsSections">
                    {
                        validator_indexActive !== 0
                        ?   <button className='back' onClick={validator_backView}>Anterior</button>
                        :   <div></div>
                    }
                    {
                        validator_indexActive !== validator_Opts.length - 1
                        ?   validator_indexActive === 0 && careers != null && careers.length > 0
                            ?   <button className='next' onClick={validator_nextView}>Siguiente</button>
                            :   plansStatus
                                ?   <button className='next' onClick={validator_nextView}>Siguiente</button>
                                :   <></>
                        :   validator_indexActive === validator_Opts.length - 1
                            ?   lastYearStudents.lenght > 0
                                ?   <button className='next' onClick={() => handleActivePage(stepActivePage + 1)}>Pasar a Reinscripciones</button>
                                :   <button className='next' onClick={() => handleActivePage(stepActivePage + 2)}>Pasar a Inscripciones</button>
                            :   <div></div>
                    }
                </div>
            </div>
        </div>
    )
}
