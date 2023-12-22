import React, { useState } from 'react'
import './StudentCheckRender.scss'
import { useGradeContext } from '../../../../../contexts/gradeContext/GradeContext';
import { GraderTeacherObj } from '../../../../../models/gradesModels/GradesModels';
import { showErrorTost } from '../../../../generalComponents/toastComponent/ToastComponent';

interface innerProps{
    icon?: JSX.Element;
    img?: string;
    title: string;
    isAll: boolean;
    graded?: GraderTeacherObj;
    renderIndex?: number;
}

export const StudentCheckRender = ({ title, icon, img, isAll, graded, renderIndex }: innerProps) => {

    const { gradingObj, addGrade, showTurnedDetail, addToSend, addAllToSend, idsToSend, studentTurnToGrade } = useGradeContext();

    const handleAddGrade = (value: string) => {
        if(value != ''){
            const numberVal = parseInt(value, 10);

            if(isNaN(numberVal)){
                showErrorTost({position: 'top-center', text: 'La calificacion tiene que ser un numero'})
                return;
            }

            addGrade(graded!.FK_Estudiante, graded!.ID_Entregas, numberVal);
        }else{
            addGrade(graded!.FK_Estudiante, graded!.ID_Entregas, '');
        }
    }

    return (
        <div className={`selectorRowContainer ${isAll ? 'allPick' : ''} ${renderIndex == 0 ? 'first' : ''}`}>
            <div className="inputCheckAside">
                <input type="checkbox" checked={isAll ? idsToSend.length == studentTurnToGrade.length : idsToSend.includes(graded!.ID_Entregas)} onChange={ isAll ? () => addAllToSend() : () => addToSend(graded?.ID_Entregas!)  }/>            </div>
            <div className="displayedInfoAside">
                {
                    icon 
                    ?    <div className="iconCol">
                            { icon }
                        </div>
                    :   <></>
                }
                {
                    img
                    ?   <div className="imageCol">
                            <img src={ img }/>
                        </div>
                    :   <></>
                }
                <div className="nametitle"  onClick={() => showTurnedDetail(graded!)}>
                    {title}
                </div>
                {
                    isAll
                    ?   <></>
                    :   <div className={`graderCol`}>
                            <input placeholder={'0'} type="text" onChange={(e) => handleAddGrade(e.target.value)} value={gradingObj.find((grade) => grade.FK_Estudiante = graded!.FK_Estudiante) ? gradingObj.find((grade) => grade.FK_Estudiante = graded!.FK_Estudiante)?.Calificacion.toString()  : graded?.Calificacion ? graded.Calificacion.toString() : ''}/>
                            <p className={`floatingIndc ${graded?.Calificacion || gradingObj.find((obj) => obj.ID_Entrega = graded!.ID_Entregas) ? 'grade' : ''}`}>/100</p> 
                        </div>
                }
            </div>
        </div>
    )
}
