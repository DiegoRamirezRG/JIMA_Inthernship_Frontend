import React, { useContext, useState } from 'react'
import Collapsible from 'react-collapsible'
import { AssigmentObject } from '../../../../../../../../models/homeworkModels/HomeworkModels'
import { MdOutlineAssignment } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './HomeworkRender.scss'
import moment from 'moment';
import { formatMonthDate } from '../../../../../../../../utils/dateSpanishFormater/dateSpanishFormater';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../../../../../../contexts/authContext/AuthContext';
import { useGradeContext } from '../../../../../../../../contexts/gradeContext/GradeContext';

interface innerProps{
    homework: AssigmentObject;
}

export const HomeworkRender = ({ homework } : innerProps) => {

    const [opened, setOpened] = useState(false);
    const { state } = useContext(AuthContext);
    const { handleQuickGraderSave } = useGradeContext()
    const { classId } = useParams();
    const navigate = useNavigate();

    return (
        <Collapsible
            open={opened}
            handleTriggerClick={() => setOpened(!opened)}
            trigger={
                <div className={`homework-item ${opened ? 'open' : 'closed'}`}>
                    <div className="typeIconSection">
                        <div className="icon_container">
                            <MdOutlineAssignment />
                        </div>
                    </div>
                    <div className="titleHomSection">
                        <p>{homework.Titulo}</p>
                    </div>
                    <div className="dateHomSection">
                        {
                            homework.Fecha_De_Entrega
                            ?   <>
                                    <p>Fecha Limite</p>
                                    <p>{ moment(homework.Fecha_De_Entrega).format("DD") + ' ' + formatMonthDate(moment(homework.Fecha_De_Entrega).format("MM")).slice(0,3) + moment(homework.Fecha_De_Entrega).format(", HH:mm") }</p>
                                </>
                            :   <>
                                    <p>Publicado</p>
                                    <p>{ moment(homework.Creado_En).format("DD") + ' ' + formatMonthDate(moment(homework.Creado_En).format("MM")).slice(0,3) }</p>
                                </>
                        }
                    </div>
                    <div className="optionageSection">
                        <BsThreeDotsVertical />
                    </div>
                </div>
            }
        >
            <div className="detailedHomeWorkCollapse">
                <div className="homework_detailed">
                    <div className="descSection">
                        <div className="pubDetail">
                            <div className="pub_container">
                                <p>Publicado { moment(homework.Creado_En).format("DD") + ' ' + formatMonthDate(moment(homework.Creado_En).format("MM")) }</p>
                            </div>
                            <div className="inst_container">
                                <ReactQuill className='textEditor' value={homework.Descripcion!} readOnly/>
                            </div>
                        </div>
                    </div>
                    {
                        state && state.loggedUser?.Rol != 'Profesor'
                        ?   <></>
                        :   <div className="metricsSections">
                                <div className="assigned_sec">
                                    <p>Asignados</p>
                                    <p className='numberInd'>{homework.Alumnos_Actividad ? homework.Alumnos_Actividad.length : 0}</p>
                                </div>
                                <div className="vert_divider"></div>
                                <div className="completed_sec">
                                    <p>Entregados</p>
                                    <p className='numberInd'>{homework.Entregas && [...homework.Entregas].length > 0 ? homework.Entregas.length : '0'}</p>
                                </div>
                            </div>
                    }
                </div>
                <div className="navigateActionsFooter">
                    <p className='save-btn' onClick={() => state && state.loggedUser?.Rol != 'Profesor' ? navigate(`/student/classes/${classId}/${homework.ID_Actividad}`) : navigate(`/teacher/classes/${classId}/${homework.ID_Actividad}`)}>Ver asignacion</p>
                    {
                        state && state.loggedUser?.Rol != 'Profesor'
                        ?   <></>
                        :   <p className='info-btn' onClick={ () => handleQuickGraderSave(homework.ID_Actividad)}>Calificar</p>
                    }
                </div>
            </div>
        </Collapsible>
    )
}
