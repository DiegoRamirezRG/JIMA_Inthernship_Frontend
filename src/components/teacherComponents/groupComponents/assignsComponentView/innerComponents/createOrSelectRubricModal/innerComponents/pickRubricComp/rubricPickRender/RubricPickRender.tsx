import React from 'react'
import './RubricPickRender.scss'
import { Rubric } from '../../../../../../../../../models/homeworkModels/HomeworkModels';
import moment from 'moment';
import { DarkColorsForWhite } from '../../../../../../../../../utils/colorRandom/ColorArrayRandom';
import { useHomeworkContext } from '../../../../../../../../../contexts/homeworkContext/HomeworkContext';

interface innerProps{
    rubric: Rubric;
}

export const RubricPickRender = ({ rubric } : innerProps) => {

    const { pickedRubric, pickRubric } = useHomeworkContext();

    return (
        <div className={`rubricPicketRenderContainer ${ pickedRubric == rubric.ID_Rubrica ? 'selected' : ''}`} onClick={() => pickRubric(pickedRubric != '' ? '' : rubric.ID_Rubrica)}>
            <div className="rubricPickerRenderHeader">
                <p className='id_rubric'>ID: {rubric.ID_Rubrica}</p>
                <div className="innerRow">
                    <p>Creado: {moment(rubric.Creado_En).format('YYYY-MM-DD')}</p>
                    <p>Total: {rubric.criterias.reduce((acc, tot) => acc + tot.Valor, 0)}</p>
                </div>
            </div>
            <div className="badgesRendering">
                {
                    rubric.criterias.map((criteria, index) => (
                        <div className="criteria_pill" style={{backgroundColor: DarkColorsForWhite[index]}}>
                            <p>{criteria.Nombre}: {criteria.Valor}</p>
                            {
                                criteria.Descripcion ?? <p>{criteria.Descripcion}</p>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
