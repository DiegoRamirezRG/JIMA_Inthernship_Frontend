import React, { useEffect } from 'react'
import './PlansViewer.scss'
import { LoadingComponent } from '../../../../../generalComponents/loadingComponent/LoadingComponent'
import { useCareersPlansContext } from '../../../../../../contexts/careersContext/CareersPlansContext'
import { PlanCardComponent } from '../planCard/PlanCardComponent'

export const PlansViewer = () => {

    const { activePlans, gettingActivePlansLoading, getActivePlans } = useCareersPlansContext();

    useEffect(() => {
        const funawait = async () => {
            await getActivePlans();
        }
        funawait();
    }, [])
    

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
                                        <PlanCardComponent data={item} key={index}/>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="explainedTextContainer">
                            <p>Si usted tiene mas carreras sin planes / con plan y no aparecen aqui, por favor contacte a soporte</p>
                            <p>Si usted necesita crear un plan nuevo mas adelante podra, este apartado es para validar los archivos de los estudiantes que aun estan activos</p>
                        </div>
                    </div>
            }
        </div>
    )
}
