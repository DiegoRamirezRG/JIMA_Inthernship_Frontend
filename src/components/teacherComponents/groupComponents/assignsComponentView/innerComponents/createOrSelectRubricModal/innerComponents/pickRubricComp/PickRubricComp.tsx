import React from 'react'
import './PickRubricComp.scss'
import { useHomeworkContext } from '../../../../../../../../contexts/homeworkContext/HomeworkContext'
import { RubricPickRender } from './rubricPickRender/RubricPickRender';
import { Rubric } from '../../../../../../../../models/homeworkModels/HomeworkModels';

export const PickRubricComp = () => {

    const { rubrics, pickedRubric, pickRubric, cancelPickingRubric, handlePickRubricModal, setRubricFK } = useHomeworkContext();

    const handleCancelPicking = () => {
        cancelPickingRubric();
        handlePickRubricModal(false);
    }

    const handlePicking = () => {
        setRubricFK(pickedRubric);
        handleCancelPicking();
    }

    return (
        <div className='pickerRubricCompContainer'>
            <div className="pickerRubricHeader">
                <h4>Selecciona una Rubrica</h4>
            </div>
            <div className="pickerRubricsBody">
                {
                    rubrics.map((rubric: Rubric) => (
                        <RubricPickRender rubric={rubric} key={rubric.ID_Rubrica}/>
                    ))
                }
            </div>
            <div className="cancelBtns">
                <button className='cancel-btn' onClick={ handleCancelPicking }>
                    Cancelar
                </button>
                <button className='save-btn' onClick={ handlePicking } disabled={ pickedRubric == '' }>
                    Seleccionar
                </button>
            </div>
        </div>
    )
}
