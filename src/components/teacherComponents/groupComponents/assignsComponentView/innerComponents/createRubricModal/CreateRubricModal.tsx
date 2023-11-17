import React, { useContext, useState } from 'react'
import './CreateRubricModal.scss'
import { IoAdd, IoClose, IoSaveOutline, IoTrashOutline } from 'react-icons/io5'
import { InputEditComponent } from '../../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { useHomeworkContext } from '../../../../../../contexts/homeworkContext/HomeworkContext';
import { CriteriaRendering } from '../criteriaRendering/CriteriaRendering';
import { LoadingComponent } from '../../../../../generalComponents/loadingComponent/LoadingComponent';
import AuthContext from '../../../../../../contexts/authContext/AuthContext';

export const CreateRubricModal = () => {

    const [addStatement, setAddStatement] = useState(false);
    const { criteriaCreationObj, criteriaCreateHandler, handleOnChangeCriteria, cancelCriteriaCreate, addToRubric, rubricCreateLoading, sendRubricCreate, handleRubricModalState } = useHomeworkContext();
    const { state } = useContext(AuthContext);

    const handleState = (newState: boolean) => setAddStatement(newState);

    const sendCreation = async () => {
        await sendRubricCreate(state.loggedUser!.ID_Persona);
        handleRubricModalState();
    }

    return (
        <div className="modal-content">
            {
                rubricCreateLoading
                ?   <div className='loader'>
                        <LoadingComponent/>
                        <p className='message'>Creando Rubrica</p>
                    </div>
                :   <>
                        <div className="modal-header">
                            <h5>Creacion de Rubrica</h5>
                            <button className='modal-btn-close' onClick={ () => {} }>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='maxCreateRubricModal'>
                                <div className="innerHeader">
                                    <div className="innerRowHeader">
                                        <p>Puntaje Total: </p>
                                        <p>
                                            {
                                                isNaN(
                                                    criteriaCreationObj.reduce((acc, current) => {
                                                        const parsedValue = parseInt(current.Valor, 10);
                                                        return acc + parsedValue;
                                                    }, 0) ) 
                                                ? '0' 
                                                : criteriaCreationObj.reduce((acc, current) => {
                                                    const parsedValue = parseInt(current.Valor, 10);
                                                    return acc + parsedValue;
                                                }, 0) 
                                            }
                                        </p>
                                    </div>
                                    <div className="innerRowHeader recomended">
                                        <p>Puntaje maximo</p>
                                        <p>100</p>
                                    </div>
                                </div>
                                <div className="renderingContainer">
                                    <div className="dynamicHeightGridCriteria">    
                                        {
                                            criteriaCreationObj.map((criteria, index) => (
                                                <CriteriaRendering criteria={criteria} handleEdit={handleState} key={index}/>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="inputsContainer">
                                    <div className="inputsSectionContainer">
                                        {
                                            addStatement
                                            ?   <>
                                                    <div className="innerInptuageRow">
                                                        <InputEditComponent key={'criteria-title'} id={'criteria-title'} placeholder={'Titulo del Criterio'} value={criteriaCreateHandler.Nombre} label={'Titulo del Criterio'} name={'Nombre'} inputType={'text'} editActive={true} onChange={handleOnChangeCriteria}/>
                                                        <InputEditComponent key={'criteria-points'} id={'criteria-points'} placeholder={'0'} value={criteriaCreateHandler.Valor} label={'Puntaje'} name={'Valor'} inputType={'text'} editActive={true} onChange={handleOnChangeCriteria}/>
                                                    </div>
                                                    <textarea key={'criteria-desc'} name="Descripcion" id="criteria-desc" cols={1} placeholder='Descripcion (Opcional)' value={criteriaCreateHandler.Descripcion != null ? criteriaCreateHandler.Descripcion : ''} onChange={(e) => handleOnChangeCriteria('Descripcion', e.target.value)}></textarea>
                                                </>
                                            :   <></>
                                        }
                                    </div>
                                    <div className="actionsBtnsContainer">
                                        {
                                            addStatement
                                            ?   <>
                                                    <button className='save-btn' disabled={
                                                            criteriaCreateHandler.Nombre === ''
                                                        ||  criteriaCreateHandler.Valor === ''
                                                    } onClick={() => {
                                                        addToRubric();
                                                        setAddStatement(false);
                                                    }}>
                                                        <IoSaveOutline/>
                                                    </button>
                                                    <button className='cancel-btn' onClick={() => {
                                                        cancelCriteriaCreate();
                                                        setAddStatement(false);
                                                    }}>
                                                        <IoTrashOutline/>
                                                    </button>
                                                </>
                                            :   <button onClick={() => setAddStatement(true)} className='create' disabled = {
                                                criteriaCreationObj.reduce((acc, current) => {
                                                    const parsedValue = parseInt(current.Valor, 10);
                                                    return acc + parsedValue;
                                                }, 0) === 100
                                            }>
                                                    <IoAdd/>
                                                </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-footer">
                            {
                                criteriaCreationObj.reduce((acc, current) => {
                                    const parsedValue = parseInt(current.Valor, 10);
                                    return acc + parsedValue;
                                }, 0) != 100
                                ?   <></>
                                :   <button onClick={async () => await sendCreation()}>Crear</button>
                            }
                            <button onClick={() => {}}>Cancelar</button>
                        </div>
                    </>
            }
        </div>
    )
}
