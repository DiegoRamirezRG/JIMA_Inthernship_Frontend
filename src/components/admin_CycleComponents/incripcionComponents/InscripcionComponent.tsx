import React, { useEffect } from 'react'
import './InscripcionComponent.scss'
import { useCycleSchoolarContext } from '../../../contexts/initCycleSchoolar/CycleSchoolarContext'
import { inscriptionsOptions } from '../validateComponents/helpers/renderingOpts';
import { ModalComponent } from '../../generalComponents/modalComponent/ModalComponent';
import { GroupMakerModal } from './innerComponents/GroupMakerModal/GroupMakerModal';
import { useReinsInscrContext } from '../../../contexts/reins_inscrContext/ReinsInscrContext';
import { PickShiftModalComponent } from './innerComponents/PickShiftModalComponent/PickShiftModalComponent';
import { useShiftModalContext } from '../../../contexts/modals_states/shiftModal/shiftModalContext';
import { ShiftModalComponent } from '../../generalComponents/modalsContent/shiftModalComponent/ShiftModalComponent';
import { PlanCreatorComponent } from '../../admin_PlanCareerCreator/planCreatorComponent/PlanCreatorComponent';
import { CreatingLoaderModal } from '../../admin_PlanCareerCreator/planCreatorComponent/creatingLoaderModal/CreatingLoaderModal';
import { useCareersPlansContext } from '../../../contexts/careersContext/CareersPlansContext';
import { usePlanMakerContext } from '../../../contexts/planMakerContext/PlanMakerContext';
import { useLoadScheduleContext } from '../../../contexts/loadScheduleContext/LoadScheduleContext';
import { PlanScheduleMakerModal } from '../../admin_ScheduleMaker/PlanScheduleMakerModal/PlanScheduleMakerModal';
import { useStudentContext } from '../../../contexts/studentContext/StudentContext';

export const InscripcionComponent = () => {

    const { inscription_Opts, inscription_indexActive, inscription_screens, inscription_roadmap, inscripction_nextView, inscripction_backView, inscripction_loadView, handleActivePage, stepActivePage } = useCycleSchoolarContext();
    const { createGroupModal, shiftModal } = useReinsInscrContext();
    const { shiftContextModalState } = useShiftModalContext();
    const { createModalState } = useCareersPlansContext()
    const { isMakingPlanLoading } = usePlanMakerContext();
    const { isStudentsToBeLoading, studentsToBe, getStudentsToBe } = useStudentContext();
    const { groups, subjectsPerGroup, scheduleMakerModal, groupdDone } = useLoadScheduleContext();

    useEffect(() => {
        const awaitFun = async () => {
            await getStudentsToBe();
        }
        awaitFun();
    }, [])

    return (
        <>
            <div className='inscriptionsStepContainer'>
                <div className="innerSteper">
                    {
                        inscription_Opts.map((item, index) => (
                            <div key={index} className={`container-rounded ${item.active ? 'active' : 'no-active'} ${item.completed ? 'completed' : 'inCompleted'}`} onClick={item.completed || item.active ? () => inscripction_loadView(index) : () => {}}>
                                <div className="iconContainer">
                                    {item.icon}
                                </div>
                                <p>{item.label}</p>
                            </div>
                        ))
                    }
                    <div className="connectorLine">
                        <div className="completedLine" style={{height: `calc((100% / ${inscriptionsOptions.length}) * ${inscription_roadmap + 1})`}}></div>
                    </div>
                </div>
                <div className="stepperContentRender">
                    <div className="innerContentSection">
                        {
                            inscription_screens.get(inscription_indexActive)
                        }
                    </div>
                    <div className="buttonsActionsSections">
                        {
                            inscription_indexActive !== 0
                            ?   <button className='back' onClick={inscripction_backView}>Anterior</button>
                            :   <div></div>
                        }
                        {
                            inscription_indexActive !== inscription_Opts.length - 1
                            ?   inscription_indexActive === 2
                                ?   groups && groups.length === subjectsPerGroup.length
                                    ?   <button className='next' onClick={inscripction_nextView}>Siguiente</button>
                                    :   <div></div>
                                :   <button className='next' onClick={() => studentsToBe?.length == 0 ? handleActivePage(stepActivePage + 1) : inscripction_nextView}>Siguiente</button> // If there is no asp then skip
                            :   inscription_indexActive === 3
                                ?   groups && groupdDone && groupdDone.length == groups.length
                                    ?   <button className='next' onClick={() => handleActivePage(stepActivePage + 1)}>Siguiente</button>
                                    :   <div></div>
                                :   <div></div>
                        }
                    </div>
                </div>
            </div>
            <ModalComponent modalState={createGroupModal} handleModalState={() => {}} modalSize='modal-lg'>
                <GroupMakerModal/>
            </ModalComponent>
            <ModalComponent modalState={shiftModal} handleModalState={() => {}}>
                <PickShiftModalComponent/>
            </ModalComponent>
            <ModalComponent modalState={shiftContextModalState} handleModalState={() => {}} modalSize='modal-xl'>
                <ShiftModalComponent/>
            </ModalComponent>
            <ModalComponent  handleModalState={() => {}} modalState={createModalState} modalSize='modal-xxxl'>
                <PlanCreatorComponent/>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}} modalState={isMakingPlanLoading}>
                <CreatingLoaderModal/>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}} modalState={scheduleMakerModal} modalSize='modal-xxxl'>
                <PlanScheduleMakerModal/>
            </ModalComponent>
        </>
    )
}
