import React, { useContext, useState } from 'react'
import Collapsible from 'react-collapsible'
import { AssigmentObject, AssigmentStudentTurnInfo } from '../../../models/homeworkModels/HomeworkModels';
import moment from 'moment';
import { formatMonthDate } from '../../../utils/dateSpanishFormater/dateSpanishFormater';
import { fileExt, getFileIcon } from '../../../utils/iconFilesMap/IconFilesMap';
import './AssigmentGradeRender.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { serverRestApi } from '../../../utils/apiConfig/apiServerConfig';
import AuthContext from '../../../contexts/authContext/AuthContext';

interface innerProps{
    homework: AssigmentObject;
    workingAssig :AssigmentStudentTurnInfo | undefined;
}

export const AssigmentGradeRender = ({ homework, workingAssig }: innerProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const { classId } = useParams();
    const navigate = useNavigate();
    
    const { state } = useContext(AuthContext);

    const downloadFileStudent = async (filename: string, homeworkID: string) => {
        const response = await serverRestApi.get(`/api/files/download/homework/${homeworkID}/${state.loggedUser?.ID_Persona}/${filename}`, { headers: { Authorization: localStorage.getItem('token') }, responseType: 'blob' });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Collapsible open={isOpen} handleTriggerClick={() => setIsOpen(!isOpen)} trigger={
            <div className={`triggerable_assigment_grade ${isOpen ? 'open' : ''}`}>
                <div className="assigmentInfoGrade">
                    <p> { homework.Titulo } </p>
                    {
                        homework.Fecha_De_Entrega
                        ?   <p>Fecha Limite: { moment(homework.Fecha_De_Entrega).format("DD") + ' ' + formatMonthDate(moment(homework.Fecha_De_Entrega).format("MM")) + moment(homework.Fecha_De_Entrega).format(", HH:mm") } </p>
                        :   <p>Sin Fecha Limite</p>
                    }
                </div>
                <div className="gradeContainer">
                    {
                        workingAssig
                        ?   workingAssig.Calificacion
                            ?   <p>{workingAssig.Calificacion}/<b>100</b></p>
                            :   <p 
                                    data-tooltip-id="helper"
                                    data-tooltip-content="Esperando Calificacion, default 100"
                                    data-tooltip-place="top"
                                >Entregado</p>
                        :   <p className='no_turned'>Sin entregar</p>
                    }
                </div>
            </div>
        }>
            <div className={`innerCollapsibleContainer ${isOpen ? 'open' : ''}`}>
                <div className="anexesContainer">
                    {
                        workingAssig
                        ?   workingAssig.Anexos && workingAssig.Anexos.length > 0
                            ?   workingAssig.Anexos.map((anex, index) => (
                                    <div className='assigmentStudentFile' key={`${workingAssig.ID_Entregas}_${index}`}
                                    data-tooltip-id="filesTooltip"
                                    data-tooltip-content={anex}
                                    data-tooltip-place="top"
                                    onClick={() => downloadFileStudent(anex, homework.ID_Actividad)}
                                    >
                                        <div className="previewContainerFile">
                                            {
                                                getFileIcon( fileExt(anex)! )
                                            }
                                        </div>
                                        <div className="informationFile">
                                            <p className='file_title'>{anex.split('.')[0]}</p>
                                            <p>{ fileExt(anex)!.toUpperCase() }</p>
                                        </div>
                                    </div>
                                ))
                            :   <p>No has adjuntano ningun</p>
                        :   <p>No has entregado la asignacion</p>
                    }
                </div>
                <div className="actionBtns">
                    <button onClick={() => navigate(`/student/classes/${classId}/${homework.ID_Actividad}`)}>Ver detalles</button>
                </div>
            </div>
        </Collapsible>
    )
}
