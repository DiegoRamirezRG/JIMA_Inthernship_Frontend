import React, { useEffect, useState } from 'react'
import './MakeGroupsWithAsp.scss'
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent'
import { useCareersPlansContext } from '../../../../../contexts/careersContext/CareersPlansContext';
import { useStudentContext } from '../../../../../contexts/studentContext/StudentContext';
import { CareersAvailableCard } from '../CareersAvailableCard/CareersAvailableCard';
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext';

export const MakeGroupsWithAsp = () => {

    const { activePlans, getActivePlans, gettingActivePlansLoading } = useCareersPlansContext();
    const { isStudentsToBeLoading, studentsToBe, getStudentsToBe } = useStudentContext();
    const { triggerGetAgain } = useReinsInscrContext();
    const [loadingInner, setLoadingInner] = useState(false);

    useEffect(() => {
        const awaitFun = async () => {
            await getStudentsToBe();
        }
        awaitFun();
    }, [])

    useEffect(() => {
        setLoadingInner(true)
        const awaitFunc  = async () => {
            await getActivePlans();
            setLoadingInner(false);
        }
        awaitFunc();
    }, [triggerGetAgain])
    
    

    return (
        <div className='makeGroupsByCareerIns'>
            {
                isStudentsToBeLoading
                ?   <LoadingComponent/>
                :   <div className="makeGroupInnerContainer">
                        {
                            studentsToBe?.length == 0
                            ?   <div className='noMoreAsp'>
                                    <p>No hay mas aspirantes</p>
                                    <p>Todos los aspirantes han sido aceptados.</p>
                                    <p>Por favor continua con la seleccion de planes de estudio de materias.</p>
                                </div>
                            :   <>
                                    <div className="makeGroupInnerHeader">
                                        <h2>Existen las siguientes carreras las cuales puedes realizarles inscripciones</h2>
                                    </div>
                                    <div className="gridSectionContainer">
                                        {
                                            loadingInner
                                            ?   <LoadingComponent/>
                                            :   <div className="dynamicHeighContainer">
                                                    {
                                                        activePlans && Object.values(activePlans)
                                                        .filter(item => item.Active == true)
                                                        .map((item, index) => {

                                                            const aspCareer = studentsToBe ? studentsToBe.filter(aspirante => aspirante.ID_Carrera === item.ID_Carrera) : [];
                                                            
                                                            if(aspCareer!.length > 0){
                                                                return <CareersAvailableCard key={index} careerOfPlan={item} asp={aspCareer}/>
                                                            }else{
                                                                return <>No more asp</>
                                                            }
                                                        })
                                                    }
                                                </div>
                                        }
                                    </div>
                                </>
                        }
                        <div className="explainingTextSection">
                            <p>Si no quieres crear grupo solamente no lo inicies puedes rechazar a todos en la opcion de no hacer grupo</p>
                            <p>Si tu tienes mas carreras activas con planes y no aparecen aqui, por favor contacta a soporte</p>
                        </div>
                    </div>
            }
        </div>
    )
}
