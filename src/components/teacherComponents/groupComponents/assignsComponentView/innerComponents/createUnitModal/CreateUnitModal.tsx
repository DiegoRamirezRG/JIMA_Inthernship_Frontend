import React, { useContext, useEffect, useState } from 'react'
import './CreateUnitModal.scss'
import { IoClose } from 'react-icons/io5';
import { useHomeworkContext } from '../../../../../../contexts/homeworkContext/HomeworkContext';
import { InputEditComponent, SelectedEditComponentWithAddBtn, SelectedEditComponentWithAddBtnCustomRender } from '../../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import AuthContext from '../../../../../../contexts/authContext/AuthContext';
import { LoadingComponent } from '../../../../../generalComponents/loadingComponent/LoadingComponent';
import { useParams } from 'react-router-dom';

export const CreateUnitModal = () => {

    const { classId } = useParams();
    const { handleUnitModalState, newTitle, onChangeTitle, handleRubricModalState, formatedOptRubrics, getRubrics, unitCreateLoading, sendCreateUnit } = useHomeworkContext();
    const { state } = useContext(AuthContext);
    const [addRub, setAddRub] = useState(true);
    const [loading, setLoading] = useState(true);
    const [rubricIdSelected, setRubricIdSelected] = useState('');

    const handleSelectRubric = (name: any, value: any) => {
        setRubricIdSelected(value);
    }

    const sendUnitCreate = async (rubric? : string) => {
        try{
            if(rubric){
                await sendCreateUnit(newTitle, classId!, rubric);
            }else{
                await sendCreateUnit(newTitle, classId!);
            }
        }finally{
            closeAndCancel();
        }
    }

    const closeAndCancel = () => {
        setRubricIdSelected('');
        onChangeTitle('nothing', '');
        handleUnitModalState();
    }

    useEffect(() => {
        if(state.loggedUser){
            const awaitF = async () => {
                await getRubrics(state.loggedUser!.ID_Persona);
                setLoading(false);
            }
            awaitF()
        }
    }, [])
    

    return (
        <div className="modal-content">
            {
                unitCreateLoading
                ?   <LoadingComponent/>
                :   <>
                        <div className="modal-header">
                            <h5>Creacion de Unidad</h5>
                            <button className='modal-btn-close' onClick={ closeAndCancel }>
                                <IoClose/>
                            </button>
                        </div>
                        <div className='modal-body'>
                            {
                                loading
                                ?   <LoadingComponent/>
                                :   <div className="innerMaxContainerCreateUnit">
                                        <div className="createUnitModalContainer">
                                            <InputEditComponent id={'title-unit'} placeholder={'Titulo de la Unidad'} value={newTitle} label={'Titulo de Unidad'} name={'Nombre'} inputType={'text'} editActive={true} onChange={onChangeTitle}/>
                                            {
                                                addRub
                                                ?   <button className='addRubBtn' onClick={ () => setAddRub(false) }>Añadir Rubrica</button>
                                                :   <SelectedEditComponentWithAddBtnCustomRender addBtnAction={handleRubricModalState} id={'rub_selector'} name={''} editActive={true} label={'Rubrica'} value={rubricIdSelected} opts={formatedOptRubrics} onChange={handleSelectRubric}/>
                                            }
                                        </div>
                                    </div>
                            }
                            <div className="actionsContainer">
                                {
                                    newTitle === ''
                                    ?   <div style={{height: '40px'}}></div>
                                    :   !addRub
                                        ?   rubricIdSelected != ''
                                            ?   <button className='save-btn' onClick={ async () => await sendUnitCreate(rubricIdSelected) }>Crear Unidad</button>
                                            :   <div style={{height: '40px'}}></div>
                                        :   <button className='save-btn' onClick={async () => await sendUnitCreate()}>Crear Unidad</button>
                                }
                            </div>
                        </div>
                    </>
            }
            
        </div>
    )
}
