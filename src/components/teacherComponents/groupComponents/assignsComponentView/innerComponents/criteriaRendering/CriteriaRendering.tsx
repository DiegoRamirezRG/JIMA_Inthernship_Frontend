import React from 'react'
import './CriteriaRendering.scss'
import { CriteriaRubricCreate } from '../../../../../../models/homeworkModels/HomeworkModels';
import { useHomeworkContext } from '../../../../../../contexts/homeworkContext/HomeworkContext';

interface internalProps{
    criteria: CriteriaRubricCreate;
    handleEdit: (newState: boolean) => void;
}

export const CriteriaRendering = ({ criteria, handleEdit } : internalProps) => {

    const { deleteOneCriteria, editOneCriteria } = useHomeworkContext();

    const deleteCrit = () => deleteOneCriteria(criteria.Nombre, criteria.Valor);
    
    const handleEditing = () => {
        editOneCriteria(criteria.Nombre, criteria.Valor, criteria.Descripcion!)
        handleEdit(true);
    }

    return (
        <div className='maxCriteriaContainer'>
            <div className="criteriaHeader">
                <p>{criteria.Nombre}</p>
                <p>{criteria.Valor} pts.</p>
            </div>
            {
                criteria.Descripcion != ''
                ?   <div className="descripctionContaner">
                        <p>{criteria.Descripcion}</p>
                    </div>
                :   <></>
            }
            <div className="actionBtnsContainer">
                <button className='warning-btn' onClick={handleEditing}>Editar</button>
                <button className='cancel-btn' onClick={deleteCrit}>Eliminar</button>
            </div>
        </div>
    )
}
