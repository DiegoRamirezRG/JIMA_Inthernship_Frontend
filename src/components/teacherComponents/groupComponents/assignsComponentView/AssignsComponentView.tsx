import React, { useEffect, useState } from 'react'
import './AssignsComponentView.scss'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent'
import { SelectedEditComponentWithIDS } from '../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { ModalComponent } from '../../../generalComponents/modalComponent/ModalComponent';
import { CreateUnitModal } from './innerComponents/createUnitModal/CreateUnitModal'
import { useHomeworkContext } from '../../../../contexts/homeworkContext/HomeworkContext'
import { CreateRubricModal } from './innerComponents/createRubricModal/CreateRubricModal'
import { useParams } from 'react-router-dom'
import { UnitRender } from './innerComponents/unitRender/UnitRender'
import { CreateAssignamentModal } from './innerComponents/createAssigmentModal/CreateAssignamentModal';

export const AssignsComponentView = () => {

    const { classId } = useParams();
    const { unitModalState, handleUnitModalState, rubricModalState, classUnits, classUnitsOpt, unitsLoading, getClassUnits, assigmentCreateModal, handleAssigmentCreateModal } = useHomeworkContext();

    useEffect(() => {
        if(classId){
            const awaitFunc = async () => {
                await getClassUnits(classId);
            }

            awaitFunc();
        }
    }, [classId])
    

    return (
        <div className='maxAssignmentsContainerView'>
            {
                unitsLoading
                ?   <div className="loaderCOntainer">
                        <LoadingComponent/>
                    </div>
                :   <div className='realContainer'>
                        <div className="sidebarContainer">
                            <SelectedEditComponentWithIDS id={''} name={''} editActive={true} label={'Filtrar por Unidad'} value={''} opts={classUnitsOpt} isClearable={true}/>
                            <button onClick={ handleUnitModalState }>Crear Unidad</button>
                            <button onClick={ handleAssigmentCreateModal }>Crear Tarea</button>
                            <button>Informacion</button>
                            <button>Anexos</button>
                        </div>
                        <div className="innerContentContainer">
                            <div className="noUnitWorks">
                                no unit works
                            </div>
                            {
                                classUnits.length > 0
                                ?   classUnits.map((unit, index) => (
                                        <UnitRender unit={unit} key={`unitrender-${index}`}/>
                                    ))
                                :   <>No</>
                            }
                        </div>
                    </div>
            }
            <ModalComponent modalState={unitModalState} handleModalState={() => {}}>
                <CreateUnitModal/>
            </ModalComponent>
            <ModalComponent modalState={rubricModalState} handleModalState={() => {}}>
                <CreateRubricModal/>
            </ModalComponent>
            <ModalComponent modalState={assigmentCreateModal} handleModalState={() => {}} modalSize='modal-xxxl'>
                <CreateAssignamentModal/>
            </ModalComponent>
        </div>
    )
}
