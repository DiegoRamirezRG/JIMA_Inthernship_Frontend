import React, { useEffect, useRef, useState } from 'react'
import './PlanCreatorComponent.scss'
import { useCareersContext } from '../../../contexts/careersContext/CareersContext'
import { useCareersPlansContext } from '../../../contexts/careersContext/CareersPlansContext';
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent';
import { IoClose } from 'react-icons/io5';
import { DroppableContainer } from './innerComponents/DroppableContainer/DroppableContainer';
import { SubjectsComponent } from './innerComponents/SubjectsComponent/SubjectsComponent';
import { usePlanMakerContext } from '../../../contexts/planMakerContext/PlanMakerContext';
import { ModalComponent } from '../../generalComponents/modalComponent/ModalComponent';
import { WizardSubjectModal } from './wizardSubjectModal/WizardSubjectModal';
import { DeleteSubjectFromPlan } from './innerComponents/DeleteSubjectFromPlan/DeleteSubjectFromPlan';
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext';

export const PlanCreatorComponent = () => {

    const { getCareerById, gettedCareer, gettedCareerLoading } = useCareersContext();
    const { handleCreateModalState, getPlansStatus } = useCareersPlansContext();
    const { prepareCiclesState, confirmSetupModalState, deleteModalState, cancelPlanMaking, sendMakePlan } = usePlanMakerContext();
    const { cancelFiltering } = useSubjectsContext();
    const [initialCicleStateLoading, setInitialCicleStateLoading] = useState(true);
    const { planCareerId } = useCareersPlansContext();
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += e.deltaY * 2.5;
        }
    };

    const handleCancelMakingPlan = () => {        
        handleCreateModalState();
        cancelFiltering();
        cancelPlanMaking();
    }

    const handleMakePlan = async () => {
        try {
            await sendMakePlan(gettedCareer!.ID_Carrera);
            await getPlansStatus();
            handleCreateModalState();
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if(planCareerId != null){
            const getData = async () => {
                await getCareerById(planCareerId);
            }
            getData();
        }
    }, [planCareerId]);

    useEffect(() => {
        if(gettedCareer != null){
            prepareCiclesState(gettedCareer.Numero_De_Ciclos);
            setInitialCicleStateLoading(false);
        }
    }, [gettedCareer]);
    

    return (
        <div className='planCreatorContainer'>
            {
                gettedCareerLoading
                ?   <LoadingComponent/>
                :   initialCicleStateLoading
                    ?   <LoadingComponent/>
                    :   <div className='innerPlanCreatorContainer'>
                            <div className="planMakerHeader">
                                <h3>{gettedCareer?.Nombre}</h3>
                                <div className="innerRow">
                                    <p>Ciclos: {gettedCareer?.Numero_De_Ciclos} de {gettedCareer?.Duracion_Mensual_De_Ciclos} mes(es)</p>
                                    <p>|</p>
                                    <p>Con un el ID: {gettedCareer?.ID_Carrera}</p>
                                </div>
                            </div>
                            <div className="planMakerBody">
                                <div className="careerCiclesContainer" ref={sliderRef} onWheel={handleMouseWheel}>
                                    {
                                        Array.from({length: gettedCareer!.Numero_De_Ciclos}, (_, index) => (
                                            <DroppableContainer index={index} key={index}/>
                                        ))
                                    }
                                </div>
                                <div className="planMakerTools">
                                    <div className="makerToolsHeader">
                                        <p>Creacion de Plan v1</p>
                                    </div>
                                    <div className="contentInnerContainer">
                                        <div className="subjectsPlace">
                                            <SubjectsComponent/>
                                        </div>
                                        <div className="confirmActions">
                                            <button className='cancel-btn' onClick={handleCancelMakingPlan}>Cancelar</button>
                                            <button className='save-btn' onClick={handleMakePlan}>Crear Plan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="closeBtn" onClick={handleCancelMakingPlan}>
                                <IoClose/>
                            </div>
                        </div>
            }
            <ModalComponent modalState={confirmSetupModalState} handleModalState={() => {}}>
                <WizardSubjectModal/>
            </ModalComponent>
            <ModalComponent modalState={deleteModalState} handleModalState={() => {}}>
                <DeleteSubjectFromPlan/>
            </ModalComponent>
        </div>
    )
}
