import React, { useEffect } from 'react'
import './ValdidateCareerComponent.scss'
import { useCycleSchoolarContext } from '../../../../contexts/initCycleSchoolar/CycleSchoolarContext'
import { useCareers } from '../../../../hooks/careers/useCareers';
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';
import { CareerCard } from './innerComponents/careerCard/CareerCard';
import { useCareersContext } from '../../../../contexts/careersContext/CareersContext';
import { NoCareers } from './innerComponents/noCareers/NoCareers';

export const ValdidateCareerComponent = () => {

    const { isGettingInformationLoading, careers, getCareers, handleModalCareers } = useCareersContext();

    useEffect(() => {
        const awaitf = async () => {
            await getCareers();
        }

        awaitf()
    }, [])

    return (
        <div className='maxValidatorCareersContainer'>
            {
                isGettingInformationLoading
                ?   <LoadingComponent/>
                :   <>
                        <div className="careersContainerHeader">
                            <button onClick={() => handleModalCareers()}>Añadir otra carrera</button>
                        </div>
                        {
                            careers!.length > 0
                            ?   <div className="careersContainerBody">
                                    {
                                        careers?.map((item, index) => (
                                            <CareerCard key={index} career={item}/>
                                        ))
                                    }
                                </div>
                            :   <NoCareers/>
                        }
                    </>
            }
        </div>
    )
}
