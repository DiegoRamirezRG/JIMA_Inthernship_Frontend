import React, { useContext, useEffect, useState } from 'react'
import './AssigmentScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { HomeworkHeader } from '../../../components/teacherComponents/detailedHomeworkComponents/homeworkHeader/HomeworkHeader'
import { useParams } from 'react-router-dom';
import { IoAdd, IoClose, IoTrashOutline } from 'react-icons/io5';
import { useHomeworkContext } from '../../../contexts/homeworkContext/HomeworkContext';
import { ModalComponent } from '../../../components/generalComponents/modalComponent/ModalComponent';
import { DropzoneComponent } from '../../../components/studentComponents/dropzoneComponent/DropzoneComponet';
import { fileExt, getFileIcon } from '../../../utils/iconFilesMap/IconFilesMap';
import AuthContext from '../../../contexts/authContext/AuthContext';
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent';
import moment from 'moment';

export const AssigmentScreen = () => {

    const { assignId, classId } = useParams();
    const { state } = useContext(AuthContext);
    const { unitsLoading, classAsigments, studentAttachedFiles, deleteStudentAttachedFiles, dropZoneAttachModal, handleDropzoneAttachModal,
        deleteAllAtachemnts, homeworkStudntStatus, homeworkStudntStatusLoader, gethomeworkStudntStauts, getAssigmentsByClass, getClassUnits, isTurnInLoading, turnInAssign } = useHomeworkContext();

    const assignmentObj = classAsigments.find((assign) => assign.ID_Actividad === assignId);
    const passDate = moment(assignmentObj?.Fecha_De_Entrega).isBefore(moment());

    const handleTurnIn = async() => {
        await turnInAssign(state.loggedUser?.ID_Persona!, assignId!);
    }

    useEffect(() => {
        if(state){
            const awaitF = async () => {
                await gethomeworkStudntStauts(assignId!, state.loggedUser?.ID_Persona!);
            }
            awaitF();
        }
    }, [state])
    

    useEffect(() => {
        if(classId){
            const awaitFunc = async () => {
                await getAssigmentsByClass(classId);
                await getClassUnits(classId);
            }

            awaitFunc();
        }
    }, []);

    useEffect(() => {
        deleteAllAtachemnts()
    }, []);
    

    return (
        <NavigationComponent>
            <div className="assigmentStudentMaxContainer">
                {
                    homeworkStudntStatusLoader
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="assigmentConent">
                                <HomeworkHeader homeworkId={assignId!}/>
                            </div>
                            <div className="attachAndOptionsAside">
                                {
                                    unitsLoading
                                    ?   <LoadingComponent/>
                                    :   <>
                                            <div className="attachedHeader">
                                                <p>Tu trabajo</p>
                                                {
                                                    typeof(homeworkStudntStatus) == 'boolean'
                                                    ?   <p className={`${passDate ? 'atraso' : ''}`}>{ passDate  ? 'Sin Entregar' : 'Asignado'}</p>
                                                    :   <p>Entregado</p>
                                                }
                                            </div>
                                            {
                                                typeof(homeworkStudntStatus) == 'boolean'
                                                ?   studentAttachedFiles.length > 0
                                                    ?   <div className="renderingAttachedFiles">
                                                            {
                                                                studentAttachedFiles.map((file, index) => (
                                                                    <div className='attachRenderContainer' key={`file_${index}`}>
                                                                        <div className="thumbAside">
                                                                            { getFileIcon(fileExt(file.name)!) }
                                                                        </div>
                                                                        <div className="renderFileInfo">
                                                                            <p>{file.name}</p>
                                                                            <p>{fileExt(file.name)!.toUpperCase()}</p>
                                                                        </div>
                                                                        <div className="deleteAttchAside" onClick={() => deleteStudentAttachedFiles(file.name)}>
                                                                            <IoTrashOutline/>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    :   <></>
                                                :   homeworkStudntStatus.Anexos && homeworkStudntStatus.Anexos.length > 0
                                                    ?   <div className="renderingAttachedFiles">
                                                            {
                                                                homeworkStudntStatus.Anexos.map((file, index) => (
                                                                    <div className='attachRenderContainer' key={`file_${index}`}>
                                                                        <div className="thumbAside">
                                                                            { getFileIcon(fileExt(file)!) }
                                                                        </div>
                                                                        <div className="renderFileInfo">
                                                                            <p>{file}</p>
                                                                            <p>{fileExt(file)!.toUpperCase()}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    :   <></>
                                            }
                                            <div className='buttonage_section'>
                                                {
                                                    typeof(homeworkStudntStatus) == 'boolean'
                                                    ?
                                                        !passDate
                                                        ?   <>
                                                                <button onClick={() => handleDropzoneAttachModal()}>
                                                                    <IoAdd className='add_icon'/>
                                                                    Añadir Archivos
                                                                </button>
                                                                {
                                                                    studentAttachedFiles.length > 0
                                                                    ?   <button className='done' onClick={ handleTurnIn }>
                                                                            Entregar
                                                                        </button>
                                                                    :   <button>
                                                                            Marcar como completada
                                                                        </button>
                                                                }
                                                            </>
                                                        :   assignmentObj?.Acepta_Despues
                                                                ?   <>
                                                                        <button onClick={() => handleDropzoneAttachModal()}>
                                                                            <IoAdd className='add_icon'/>
                                                                            Añadir Archivos
                                                                        </button>
                                                                        {
                                                                            studentAttachedFiles.length > 0
                                                                            ?   <button className='done' onClick={ handleTurnIn }>
                                                                                    Entregar
                                                                                </button>
                                                                            :   <button onClick={ () => console.log('Marcar') }>
                                                                                    Marcar como completada
                                                                                </button>
                                                                        }
                                                                    </>
                                                                :   <>
                                                                        <p style={{ textAlign: 'justify' }}>No has adjuntado ningun archivo y la asignacion no acepta entregas despues de la fecah limite</p>
                                                                    </>
                                                    :   !passDate
                                                        ?   <button className='done'>
                                                                Cancelar entrega
                                                            </button>
                                                        :   assignmentObj?.Acepta_Despues
                                                            ?   <button className='done'>
                                                                    Cancelar entrega
                                                                </button>
                                                            :   <></>
                                                }
                                                
                                            </div>
                                        </>
                                }
                            </div>
                        </>
                }
            </div>
            <ModalComponent handleModalState={() => {}} modalState={dropZoneAttachModal} modalSize='modal-lg'>
                <DropzoneComponent/>
            </ModalComponent>
            <ModalComponent handleModalState={() => {}} modalState={isTurnInLoading}>
                <div className="LoadingTurnInContainer">
                    <LoadingComponent/>
                    <p className='lodaing_turn_title'>Entregando tu tarea....</p>
                </div>
            </ModalComponent>
        </NavigationComponent>
    )
}
