import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import './CreateAssignamentModal.scss'
import { IoAdd, IoChevronDownOutline, IoClose, IoTrash, IoTrashBinOutline, IoTrashOutline } from 'react-icons/io5';
import { DateTimeComponent, SelectedEditComponentWithIDS, InputEditComponent } from '../../../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { useHomeworkContext } from '../../../../../../contexts/homeworkContext/HomeworkContext';
import { ToggleSwitchInput } from '../../../../../generalComponents/toggleSwitch/ToggleSwitchInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useDropzone} from 'react-dropzone'
import { acceptStyle, baseStyle, focusedStyle, rejectStyle } from './helper/DropzoneStyle';
import { LuFilePlus2 } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { fileExt, getFileIcon, iconFiles } from '../../../../../../utils/iconFilesMap/IconFilesMap';
import { CheckStudentList } from '../checkStudentList/CheckStudentList';
import { useGroupsContext } from '../../../../../../contexts/groupsContext/GroupsContext';
import { LoadingComponent } from '../../../../../generalComponents/loadingComponent/LoadingComponent';
import { useParams } from 'react-router-dom';
import { ModalComponent } from '../../../../../generalComponents/modalComponent/ModalComponent';
import { CreateOrSelectRubric } from '../createOrSelectRubricModal/CreateOrSelectRubric';
import { DarkColorsForWhite } from '../../../../../../utils/colorRandom/ColorArrayRandom';


export const CreateAssignamentModal = () => {

    const { cancelTheAssigmentCreation, handleAssigmentCreateModal, classUnitsOpt, createAssignmentObj, handleAssignToggleBooleans, loadAssigmentFiles, assigmentFiles, deleteAssigmentFiles, deleteFileByName, handleAssignChange, addStudentsToAssign, removeStudentsFromAssign, resetStuedntAssign, needDate, handleNeedDate, sendCreateAssign, sendCreateAssignLoading, pickRubricModal, handlePickRubricModal, rubrics } = useHomeworkContext();
    const { groupAttendance } = useGroupsContext();
    const [restrictStudent, setRestrictStudent] = useState(false);
    
    const { classId } = useParams();

    const studentListRef = useRef<HTMLDivElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        loadAssigmentFiles(acceptedFiles);
    }, []);

    const cancelTheCreation = () => {
        cancelTheAssigmentCreation();
        deleteAssigmentFiles();
        handleAssigmentCreateModal();
    }

    const {getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive} = useDropzone({onDrop})

    const propsStyle = useMemo(()=> ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const handleChange = (value: any) => {
        handleAssignChange('Descripcion', value)
    };

    return (
        <div className='maxCreateAssigmentContainer'>
            {
                sendCreateAssignLoading
                ?   <LoadingComponent/>
                :   <>
                        <div className="assignDetails">
                            <div className="headerDetails">
                                <h5>Creacion de Asignacion</h5>
                                <button className='modal-btn-close cancel-btn' onClick={ cancelTheCreation }>
                                    <IoClose/>
                                </button>
                            </div>
                            <div className="assignDetailInputSection">
                                <div className="inputsTextContainer">
                                    <div className="titleAndDescContainer">
                                        <InputEditComponent key={'titleAssign'} id={'titleAssign'} placeholder={'Ingrese un titulo'} value={createAssignmentObj.Titulo} label={'Titulo'} name={'Titulo'} inputType={'text'} editActive={true} onChange={handleAssignChange}/>
                                        <div className="partContainer">
                                            <label htmlFor="listStudentsFor">Para</label>
                                            <button name='listStudentsFor' onClick={() => setRestrictStudent(!restrictStudent)}>
                                                <p>
                                                    {
                                                        createAssignmentObj.Alumnos_Actividad.length > 0
                                                        ?   `${createAssignmentObj.Alumnos_Actividad.length} Estudiante (s)`
                                                        :   'Todos los Estudiantes'
                                                    }
                                                </p>
                                                <IoChevronDownOutline />
                                            </button>
                                            <div className={`studentsListFloating ${restrictStudent ? 'show-container' : 'hidde-container'}`} ref={studentListRef}>
                                                <CheckStudentList student={""} checked={!(createAssignmentObj.Alumnos_Actividad.length > 0)} addStudents={resetStuedntAssign}/>
                                                {
                                                    groupAttendance.map((student) => (
                                                        <CheckStudentList student={student} checked={createAssignmentObj.Alumnos_Actividad.some(alumno => alumno === student.ID_Estudiante)} addStudents={createAssignmentObj.Alumnos_Actividad.some(alumno => alumno === student.ID_Estudiante) ? () => removeStudentsFromAssign(student.ID_Estudiante) : () => addStudentsToAssign(student.ID_Estudiante)}/>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="descriptionEditText">
                                        <label htmlFor="listStudentsFor">Descripcion (Opcional)</label>
                                        <ReactQuill className='textEditor' value={createAssignmentObj.Descripcion} onChange={handleChange} placeholder='Ingresa una descripcion' />
                                    </div>
                                </div>
                                <div className="anexFilesContainer">
                                    <div className="headerAnexFilex">
                                        <label htmlFor="dropZoneContainer">Anexos (Opcional)</label>
                                        {
                                            assigmentFiles.length > 0
                                            ?  <div className="anexFilexContainer">
                                                    <button className='cancel-btn'  onClick={deleteAssigmentFiles}>
                                                        <a
                                                            data-tooltip-id="anexFileTooltip"
                                                            data-tooltip-content="Eliminar archivos"
                                                            data-tooltip-place="top"
                                                        >
                                                            <IoTrash/>
                                                        </a>
                                                    </button>
                                                    <button className='save-btn'>
                                                        <a
                                                            data-tooltip-id="anexFileTooltip"
                                                            data-tooltip-content="Añadir Archivos"
                                                            data-tooltip-place="top"
                                                        >
                                                            <LuFilePlus2/>
                                                        </a>
                                                    </button>
                                                </div>
                                            :   <></>
                                        }
                                    </div>
                                    {
                                        assigmentFiles.length > 0
                                        ?   <div className='thumbsContainer' style={{ justifyContent:  assigmentFiles.length > 3 ? 'flex-start' : 'center'}}>
                                                {
                                                    assigmentFiles.map((file: File) => (
                                                        <div className='thumbsObject' key={`index_${file.name}`}>
                                                            <div className="iconSection">
                                                                { getFileIcon(fileExt(file.name)!) }
                                                            </div>
                                                            <div className="informationContainer">
                                                                <a
                                                                    data-tooltip-id="anexFileTooltip"
                                                                    data-tooltip-content={`${file.name}`}
                                                                    data-tooltip-place="left-start"
                                                                >
                                                                    {file.name}
                                                                </a>
                                                            </div>
                                                            <div className="deleteFloatingBtn" onClick={() => deleteFileByName(file.name)}>
                                                                <a
                                                                    data-tooltip-id="anexFileTooltip"
                                                                    data-tooltip-content="Eliminar archivo"
                                                                    data-tooltip-place="top"
                                                                >
                                                                    <IoTrash/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        :   <div className="dropContainer">
                                                <div {...getRootProps()} style={{...propsStyle}}>
                                                    <input {...getInputProps()} />
                                                    {
                                                        isDragActive ?
                                                        <p>Suelta los archivos aquí...</p> :
                                                        <p>Arrastre y suelte algunos archivos aquí o haga clic para seleccionar archivos</p>
                                                    }
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="assignConfig">
                            <div className="configsSection">
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
                                    ?   <div className="partContainerDate">
                                            <label htmlFor="innerRow">Fecha Limite</label>
                                            <div className="innerRow">
                                                <p>{needDate ? 'Fecha Limite' : 'Sin Fecha Limite'}</p>
                                                <ToggleSwitchInput active={needDate} changeActive={ () => handleNeedDate(!needDate) } disable={false}/>
                                            </div>
                                            <div className="datetimeContainer">
                                                {
                                                    needDate
                                                    ?   <DateTimeComponent id={''} label={''} date={ createAssignmentObj.Fecha_De_Entrega } onChange={ handleAssignChange } name={'Fecha_De_Entrega'}/>
                                                    :   <div></div>
                                                }
                                            </div>
                                        </div>
                                    :   <></>
                                }
                                {
                                    needDate
                                    ?   <div className="partContainer">
                                            <label htmlFor="innerRow">Acepta despues de Termino</label>
                                            <div className="innerRow">
                                                <p>{createAssignmentObj.Acepta_Despues ? 'Acepta' : 'No Acepta'}</p>
                                                <ToggleSwitchInput active={createAssignmentObj.Acepta_Despues} changeActive={() => handleAssignToggleBooleans('Acepta_Despues')} disable={false}/>
                                            </div>
                                        </div>
                                    :   <></>
                                }
                                <div className="partContainerExtra">
                                    <SelectedEditComponentWithIDS id={'assig_unit'} name={'Fk_Unidad'} editActive={true} label={'Selecciona una Unidad (Opcional)'} value={createAssignmentObj.Fk_Unidad} opts={classUnitsOpt} isClearable={true} onChange={handleAssignChange}/>
                                </div>
                                {
                                    createAssignmentObj.Calificable
                                    ?   <div className="partContainer">
                                            <label htmlFor="innerRow">Rubrica (Opcional)</label>
                                            {
                                                createAssignmentObj.FK_Rubrica != ''
                                                ?   <div className='rubricsDetail'>
                                                        <div className="bnt_opt_container">
                                                            <div className='cancel-btn btn-in-div' onClick={ () => handleAssignChange('FK_Rubrica', '') }>
                                                                <IoTrashOutline/>
                                                                Eliminar
                                                            </div>
                                                        </div>
                                                        {
                                                            rubrics.find((rubric) => rubric.ID_Rubrica === createAssignmentObj.FK_Rubrica)!.criterias.map((criteria, index) => (
                                                                <div className='criteria_pill' style={{backgroundColor: DarkColorsForWhite[index]}}>
                                                                    {criteria.Nombre} - {criteria.Valor}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                :   <div className="rubricPicker">
                                                        <div className='pickRubricBtn' onClick={() => handlePickRubricModal(true)}>
                                                            <IoAdd/> Rubrica
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    :   <></>
                                }
                            </div>
                            <div className="btnsSection">
                                <button className='cancel-btn' onClick={ cancelTheCreation }>Cancelar</button>
                                <button className='save-btn' disabled={createAssignmentObj.Titulo == ''} onClick={async() => await sendCreateAssign(classId!)}>Crear Tarea</button>
                            </div>
                        </div>
                        <Tooltip id="anexFileTooltip" />
                    </>
            }
            <ModalComponent modalState={pickRubricModal} handleModalState={() => {}}>
                <CreateOrSelectRubric/>
            </ModalComponent>
        </div>
    )
}
