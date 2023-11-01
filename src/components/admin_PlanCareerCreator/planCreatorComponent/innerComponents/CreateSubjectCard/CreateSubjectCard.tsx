import React from 'react'
import './CreateSubjectCard.scss'
import { InputEditComponent, SelectedEditComponentWithIDS } from '../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { useSubjectsContext } from '../../../../../contexts/subjectContext/SubjectsContext'
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';
import { usePlanMakerContext } from '../../../../../contexts/planMakerContext/PlanMakerContext';

interface CreateSubjectInterface {
    cancel: () => void;
}

export const CreateSubjectCard = ({ cancel } : CreateSubjectInterface) => {

    const { areaOpts, editableSubject, handleChangeEditSubject, createSubjectFunc, createSubjectLoading, excludeAdded } = useSubjectsContext();
    const { ciclesState } = usePlanMakerContext();

    const filterTheSubjectsShow = (): Promise<string[]> => {
        return new Promise((resolve) => {
            let temp: string[] = [];
            for (const indice in ciclesState) {
                if (Object.prototype.hasOwnProperty.call(ciclesState, indice)) {
                // Recorrer el arreglo en el índice actual
                    ciclesState[indice].forEach((subject) => {
                        temp.push(subject.ID_Materia);
                    });
                }
            }        
            resolve(temp);
        })
    }

    const handleOnCreate = async() => {
        await createSubjectFunc();
        const helper = await filterTheSubjectsShow();
        excludeAdded(helper);
        cancel();
    }

    return (
        <div className='createSubjectContainer'>
            {
                createSubjectLoading
                ?   <LoadingComponent/>
                :   <>
                        <div className="edit-section">
                            <InputEditComponent key={'subject-name'} id={'subject-name'} placeholder={'Nombre de la Materia'} value={editableSubject.Nombre} label={'Nombre de la Materia'} name={'Nombre'} inputType={'text'} editActive={true} onChange={handleChangeEditSubject}/>
                            <InputEditComponent key={'subject-code'} id={'subject-code'} placeholder={'Codigo de la Materia'} value={editableSubject.Codigo_De_Materia} label={'Nombre de la Materia'} name={'Codigo_De_Materia'} inputType={'text'} editActive={true} onChange={handleChangeEditSubject}/>
                            <div className="gridRow">
                                <InputEditComponent key={'subject-credit'} id={'subject-credit'} placeholder={'Creditos'} value={editableSubject.Creditos.toString() != '0' ? editableSubject.Creditos.toString() : ''} label={'Creditos'} name={'Creditos'} inputType={'text'} editActive={true} onChange={handleChangeEditSubject}/>
                                <InputEditComponent key={'subject-hours'} id={'subject-hours'} placeholder={'Horas'} value={editableSubject.Horas_De_Clase.toString() != '0' ? editableSubject.Horas_De_Clase.toString() : ''} label={'Horas'} name={'Horas_De_Clase'} inputType={'text'} editActive={true} onChange={handleChangeEditSubject}/>
                            </div>
                            <SelectedEditComponentWithIDS key={'subject-area'} id={'subject-area'} name={'FK_Area'} editActive={true} label={'Area'} value={editableSubject.FK_Area} opts={areaOpts!} onChange={handleChangeEditSubject}/>
                        </div>
                        <div className="create-row">
                            <button className='cancel-btn' onClick={cancel}>Cancelar</button>
                            <button className='save-btn' onClick={handleOnCreate}>Crear</button>
                        </div>
                    </>
            }
        </div>
    )
}

// Nombre
// Descripcion
// Codigo_De_Materia
// Creditos
// Horas_De_Clase
// FK_Area