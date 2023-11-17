import React, { useState } from 'react'
import './CreateAssignamentModal.scss'
import { estudiantes } from './data.test';
import { IoAdd, IoChevronDownOutline, IoClose } from 'react-icons/io5';
import { DateTimeComponent, SelectedEditComponentWithIDS, InputEditComponent } from '../../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { useHomeworkContext } from '../../../../../../contexts/homeworkContext/HomeworkContext';
import { ToggleSwitchInput } from '../../../../../generalComponents/toggleSwitch/ToggleSwitchInput';

export const CreateAssignamentModal = () => {

    const { classUnitsOpt, createAssignmentObj, handleAssignToggleBooleans } = useHomeworkContext();
    const [needDate, setNeedDate] = useState(false);

    return (
        <div className='maxCreateAssigmentContainer'>
            <div className="assignDetails">
                <div className="headerDetails">
                    <h5>Creacion de Asignacion</h5>
                    <button className='modal-btn-close' onClick={ () => {} }>
                        <IoClose/>
                    </button>
                </div>
                <div className="assignDetailInputSection">
                    <div className="titleAndDescContainer">
                        <InputEditComponent id={''} placeholder={'Ingrese un titulo'} value={''} label={'Titulo'} name={'Nombre'} inputType={'text'} editActive={true}/>
                        <div className="partContainer">
                            <label htmlFor="listStudentsFor">Para</label>
                            <button name='listStudentsFor'>
                                <p>Todos los Estudiantes</p>
                                <IoChevronDownOutline />
                            </button>
                        </div>
                    </div>
                    <div className="anexFilesContainer">

                    </div>
                </div>
            </div>
            <div className="assignConfig">
                <div className="configsSection">
                    <div className="partContainerExtra">
                        <SelectedEditComponentWithIDS id={''} name={''} editActive={true} label={'Selecciona una Unidad (Opcional)'} value={''} opts={classUnitsOpt} isClearable={true}/>
                    </div>
                    <div className="partContainer">
                        <label htmlFor="innerRow">Puntuacion</label>
                        <div className="innerRow">
                            <p>{createAssignmentObj.Calificable ? 'Calificable' : 'No Calificable'}</p>
                            <ToggleSwitchInput active={createAssignmentObj.Calificable} changeActive={() => handleAssignToggleBooleans('Calificable')} disable={false}/>
                        </div>
                    </div>
                    <div className="partContainer">
                        <label htmlFor="innerRow">Requiere Entrega</label>
                        <div className="innerRow">
                            <p>{createAssignmentObj.Requiere_Anexos ? 'Requiere' : 'No Requiere'}</p>
                            <ToggleSwitchInput active={createAssignmentObj.Requiere_Anexos} changeActive={() => handleAssignToggleBooleans('Requiere_Anexos')} disable={false}/>
                        </div>
                    </div>
                    {
                        createAssignmentObj.Requiere_Anexos
                        ?   <div className="partContainer">
                                <label htmlFor="innerRow">Acepta despues de Termino</label>
                                <div className="innerRow">
                                    <p>{createAssignmentObj.Acepta_Despues ? 'Acepta' : 'No Acepta'}</p>
                                    <ToggleSwitchInput active={createAssignmentObj.Acepta_Despues} changeActive={() => handleAssignToggleBooleans('Acepta_Despues')} disable={false}/>
                                </div>
                            </div>
                        :   <></>
                    }
                    <div className="partContainerDate">
                        <label htmlFor="innerRow">Fecha Limite</label>
                        <div className="innerRow">
                            <p>{needDate ? createAssignmentObj.Fecha_De_Entrega != '' ? createAssignmentObj.Fecha_De_Entrega : 'Fecha Limite' : 'Sin Fecha Limite'}</p>
                            <ToggleSwitchInput active={needDate} changeActive={() => setNeedDate(!needDate)} disable={false}/>
                        </div>
                        <div className="datetimeContainer">
                            {
                                needDate
                                ?   <DateTimeComponent id={''} label={''} date={''} onChange={() => {}} name={'Nombre'}/>
                                :   <div></div>
                            }
                        </div>
                    </div>
                    <div className="partContainer">
                        <label htmlFor="innerRow">Rubrica (Opcional)</label>
                        <div className="rubricPicker">
                            <div className='pickRubricBtn'>
                                <IoAdd/> Rubrica
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btnsSection">
                    <button className='cancel-btn'>Cancelar</button>
                    <button className='save-btn'>Crear Tarea</button>
                </div>
            </div>
        </div>
    )
}
