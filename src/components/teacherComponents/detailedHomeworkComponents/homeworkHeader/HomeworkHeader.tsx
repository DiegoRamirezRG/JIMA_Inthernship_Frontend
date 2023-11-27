import React, { useEffect, useState, useContext } from 'react'
import './HomeworkHeader.scss'
import { useHomeworkContext } from '../../../../contexts/homeworkContext/HomeworkContext';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useTeacherContext } from '../../../../contexts/teacherContext/TeacherContext';
import { TeacherForPick } from '../../../../models/teachersModels/TeacherModels';
import moment from 'moment';
import { formatMonthDate } from '../../../../utils/dateSpanishFormater/dateSpanishFormater';
import { MdOutlineAssignment } from 'react-icons/md';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';
import { Tooltip } from 'react-tooltip';
import { useFileManagmentContext } from '../../../../contexts/fileManagmentContext/FileManagmentContext';
import AuthContext from '../../../../contexts/authContext/AuthContext';
import { API_ADDR, APT_PORT } from '../../../../utils/env/config';
import { serverRestApi } from '../../../../utils/apiConfig/apiServerConfig';
import { fileExt, getFileIcon } from '../../../../utils/iconFilesMap/IconFilesMap';

interface innerProps{
    homeworkId: string;
}

export const HomeworkHeader = ({ homeworkId }: innerProps) => {

    const { state } = useContext(AuthContext);
    const { classAsigments, getAssigmentsByClass, getClassUnits, unitsLoading, gethomeworkStudntStauts, homeworkStudntStatus } = useHomeworkContext();
    const { getTeacgerAttachedFiles, teacherAttachedFiles } = useFileManagmentContext();
    const { classId } = useParams();

    const assignmentObj = classAsigments.find((assign) => assign.ID_Actividad === homeworkId);
    const passDate = moment(assignmentObj?.Fecha_De_Entrega).isBefore(moment())

    const downloadFile = async (filename: string) => {
        const response = await serverRestApi.get(`/api/files/download/homework/${homeworkId}/${filename}`, { headers: { Authorization: localStorage.getItem('token') }, responseType: 'blob' });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    useEffect(() => {
        if(classId){
            const awaitFunc = async () => {
                await getTeacgerAttachedFiles(homeworkId);
                await getAssigmentsByClass(classId);
                await getClassUnits(classId);
            }

            awaitFunc();
        }
    }, []);

    useEffect(() => {
        if(state.loggedUser?.Rol == 'Estudiante'){
            const awaitF = async () => {
                await gethomeworkStudntStauts(assignmentObj?.ID_Actividad!, state.loggedUser?.ID_Persona!);
            }
            awaitF();
        }
    }, [state]);
    
    return (
        <>
            {
                unitsLoading
                ?   <LoadingComponent/>
                :   <div className='homeworkDetailedHeader'>
                        <div className="homeworksInformationContainer">
                            <div className="iconDetailedSection">
                                <div className="assignmentIcon">
                                    <MdOutlineAssignment />
                                </div>
                            </div>
                            <div className="informationDetailedSection">
                                <div className="titleContainerSec">
                                    <h4>{ assignmentObj?.Titulo } </h4>
                                    <div className="iconOptContainer">
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className="postedInfo">
                                    <p>Publicado el { moment(assignmentObj?.Creado_En).format("DD") + ' ' + formatMonthDate(moment(assignmentObj?.Creado_En).format("MM")) }</p>
                                </div>
                                <div className="dateAndGrade">
                                    <div className='gradeAside'>
                                        {
                                            state && state.loggedUser?.Rol == 'Profesor'
                                            ?   <> 
                                                    <p>Calificado sobre</p>
                                                    <p>100 pts</p>
                                                </>
                                            :   typeof(homeworkStudntStatus) != 'boolean'
                                                ?   homeworkStudntStatus.Calificacion != null
                                                    ?   <>
                                                            <p>Calificacion</p>
                                                            <p><b>{homeworkStudntStatus.Calificacion}</b>/100</p>
                                                        </>
                                                    :   <>
                                                            <p>Calificacion</p>
                                                            <p>Esperando Calificacion</p>
                                                        </>
                                                :   passDate && assignmentObj?.Acepta_Despues
                                                    ?   <></>
                                                    :   <>
                                                            <p>Tu calificacion</p>
                                                            <p><b>Sin entregar</b></p>
                                                        </>
                                        }
                                    </div>
                                    {
                                        assignmentObj?.Fecha_De_Entrega
                                        ?   <p>Fecha Limite: { moment(assignmentObj?.Fecha_De_Entrega).format("DD") + ' ' + formatMonthDate(moment(assignmentObj?.Fecha_De_Entrega).format("MM")) + moment(assignmentObj?.Fecha_De_Entrega).format(", h:mm a") }</p>
                                        :   <p>Sin Fecha Limite</p>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            assignmentObj!.Descripcion!
                            ?   <div className="instructionsContainer">
                                    <label>Descripcion</label>
                                    <ReactQuill className='textEditor' value={assignmentObj!.Descripcion!} readOnly/>
                                </div>
                            :   <></>
                        }
                        {
                            teacherAttachedFiles.length > 0
                            ?    <div className="anexesFilexContainer">
                                    {
                                        teacherAttachedFiles.map((attached, index) => (
                                            <div className="fileDisplayView" key={`file-${index}`} 
                                                data-tooltip-id="filesTooltip"
                                                data-tooltip-content={attached.Nombre_Del_Archivo}
                                                data-tooltip-place="top"
                                                onClick={ () => downloadFile(attached.Nombre_Del_Archivo)}
                                            >
                                                <div className="previewContainer">
                                                    {
                                                        getFileIcon( fileExt(attached.Nombre_Del_Archivo)! )
                                                    }
                                                </div>
                                                <div className="fileInfo">
                                                    <p className='file_title'>{attached.Nombre_Del_Archivo.split('.')[0]}</p>
                                                    <p>{ fileExt(attached.Nombre_Del_Archivo)!.toUpperCase() }</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            :   <></>
                        }
                    </div>
            }
            <Tooltip id="filesTooltip" />
        </>
    )
}
