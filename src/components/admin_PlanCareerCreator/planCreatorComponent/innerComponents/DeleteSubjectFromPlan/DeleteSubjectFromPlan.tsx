import React from 'react'
import './DeleteSubjectFromPlan.scss'
import { usePlanMakerContext } from '../../../../../contexts/planMakerContext/PlanMakerContext'
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';

export const DeleteSubjectFromPlan = () => {

    const { handleDeleteModalState, confirmModalDelete, deleteSubjectFromPlanLoading } = usePlanMakerContext();
    

    return (
        <div className='deleteFromPlan'>
            {
                deleteSubjectFromPlanLoading
                ?   <LoadingComponent/>
                :   <>
                        <h3>¿Quiere eliminar la asignatura del plan?</h3>
                        <div className="innerRow">
                            <button onClick={confirmModalDelete}>Aceptar</button>
                            <button onClick={() => handleDeleteModalState()}>Cancelar</button>
                        </div>
                    </>
            }
        </div>
    )
}
