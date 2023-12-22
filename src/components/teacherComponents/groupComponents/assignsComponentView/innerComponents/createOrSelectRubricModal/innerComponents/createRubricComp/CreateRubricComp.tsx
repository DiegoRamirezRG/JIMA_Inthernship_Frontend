import React, { useContext } from 'react'
import './CreateRubricComp.scss'
import { InputEditComponent } from '../../../../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { useHomeworkContext } from '../../../../../../../../contexts/homeworkContext/HomeworkContext';
import { BiReset } from 'react-icons/bi';
import { IoAddOutline, IoTrashOutline } from 'react-icons/io5';
import { CriteriaRendering } from '../../../criteriaRendering/CriteriaRendering';
import { DarkColorsForWhite } from '../../../../../../../../utils/colorRandom/ColorArrayRandom';
import AuthContext from '../../../../../../../../contexts/authContext/AuthContext';
import { LoadingComponent } from '../../../../../../../generalComponents/loadingComponent/LoadingComponent';

export const CreateRubricComp = () => {

    const { state } = useContext(AuthContext);
    const { handleOnChangeCriteria, criteriaCreateHandler, criteriaCreationObj, addToRubric, cancelCriteriaCreate, deleteOneCriteria, sendRubricCreate, setRubricFK, selectedRubric, handlePickRubricModal, rubricCreateLoading } = useHomeworkContext();

    const handleCancelPicking = () => {
        cancelCriteriaCreate();
        handlePickRubricModal(false);
    }

    const sendRubricCreateFunc = async () => {
        await sendRubricCreate(state.loggedUser!.ID_Persona).then(() => {
            setRubricFK(selectedRubric);
        });
        handleCancelPicking();
    }

    return (
        <div className='createRubricCompContainer'>
            <div className="createRubricCompHeader">
                <h4>Crear una Rubrica</h4>
            </div>
            <div className="createRubricCompBody">
                <div className="renderingBadgesContainer">
                    <div className="renderingBadgesHeader">
                        <p>
                            Total: { isNaN( criteriaCreationObj.reduce((acc, current) => {
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
                        <p>
                            Total disponible: { isNaN( criteriaCreationObj.reduce((acc, current) => {
                                                            const parsedValue = parseInt(current.Valor, 10);
                                                            return acc + parsedValue;
                                                        }, 0) ) 
                                                    ? '100' 
                                                    : 100 - criteriaCreationObj.reduce((acc, current) => {
                                                        const parsedValue = parseInt(current.Valor, 10);
                                                        return acc + parsedValue;
                                                    }, 0)
                                                }
                        </p>
                    </div>
                    <div className="badgesRenderingBody">
                        <div className="pillContainer">
                            {
                                criteriaCreationObj.map((criteria, index) => (
                                    <div className='criteria_pill_create' style={{backgroundColor: DarkColorsForWhite[index]}}>
                                        {criteria.Nombre} - {criteria.Valor}
                                        <div className="deleteFloat" onClick={() => deleteOneCriteria(criteria.Nombre, criteria.Valor)}>
                                            <IoTrashOutline/>
                                            <p>Eliminar</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="inputsValuesContainer">
                    <div className="inputsSectionContainer">
                        <div className="innerInptuageRow">
                            <InputEditComponent key={'criteria-title'} id={'criteria-title'} placeholder={'Titulo del Criterio'} value={criteriaCreateHandler.Nombre} label={'Titulo del Criterio'} name={'Nombre'} inputType={'text'} editActive={true} onChange={handleOnChangeCriteria}/>
                            <InputEditComponent key={'criteria-points'} id={'criteria-points'} placeholder={'0'} value={criteriaCreateHandler.Valor} label={'Puntaje'} name={'Valor'} inputType={'text'} editActive={true} onChange={handleOnChangeCriteria}/>
                        </div>
                        <textarea key={'criteria-desc'} name="Descripcion" id="criteria-desc" cols={1} placeholder='Descripcion (Opcional)' value={criteriaCreateHandler.Descripcion != null ? criteriaCreateHandler.Descripcion : ''} onChange={(e) => handleOnChangeCriteria('Descripcion', e.target.value)}></textarea>
                    </div>
                    <div className="actionsBtnsContainer">
                        <button className='save-btn' disabled = {
                            criteriaCreateHandler.Nombre === ''
                            ||  criteriaCreateHandler.Valor === ''
                        } onClick={ () => addToRubric() }>
                            <IoAddOutline />
                        </button>
                        <button className='warning-btn' disabled = {
                            criteriaCreateHandler.Nombre == ''
                            &&  criteriaCreateHandler.Valor == ''
                        } onClick={ () => cancelCriteriaCreate() }>
                            <BiReset />
                        </button>
                    </div>
                </div>
            </div>
            <div className="cancelBtns">
                <button className='cancel-btn' onClick={ handleCancelPicking }>
                    Cancelar
                </button>
                <button className='save-btn' onClick={ sendRubricCreateFunc } 
                disabled={ criteriaCreationObj.reduce((acc, current) => {
                            const parsedValue = parseInt(current.Valor, 10);
                            return acc + parsedValue;
                }, 0) < 100 }>
                    Crear y Seleccionar
                </button>
            </div>
        </div>
    )
}
