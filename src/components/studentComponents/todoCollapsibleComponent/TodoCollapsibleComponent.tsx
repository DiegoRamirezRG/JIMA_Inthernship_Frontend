import React, { useEffect, useState } from 'react'
import './TodoCollapsibleComponent.scss'
import Collapsible from 'react-collapsible';
import { IoChevronDown } from 'react-icons/io5';
import { TodoAssigment } from '../../../models/studentModels/StudentModel';
import { MdOutlineAssignment } from 'react-icons/md';
import { useTeacherContext } from '../../../contexts/teacherContext/TeacherContext';
import moment from 'moment';
import { formatMonthDate } from '../../../utils/dateSpanishFormater/dateSpanishFormater';
import { useNavigate } from 'react-router-dom';

interface innerProps{
    title: string;
    assigns: TodoAssigment[];
}

export const TodoCollapsibleComponent = ({ title, assigns } : innerProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Collapsible open={isOpen} handleTriggerClick={() => setIsOpen(!isOpen)} trigger={
            <div className='collapsibleContainerTriiger'>
                <p>{ title }</p>
                <div className="helperDisplay">
                    <p>{assigns.length}</p>
                    <IoChevronDown className={`icon ${isOpen ? 'open' : ''}`}/>
                </div>
            </div>
        }>
            <div className="renderingAssignmentsTodoInnerContainer">
                {
                    assigns.map((assing, index) => (
                        <div className='assigmentTodoContainer' key={`todo_ass_${index}`} onClick={() => navigate(`/student/classes/${assing.FK_Clase}/${assing.ID_Actividad}`)}>
                            <div className="typeIconSection">
                                <div className="icon_container">
                                    <MdOutlineAssignment />
                                </div>
                            </div>
                            <div className="assigmentInfo">
                                <div className="assigmentData">
                                    <p>{assing.Titulo}</p>
                                    <p>{ assing.clase_nombre }</p>
                                    {
                                        assing.Fecha_De_Entrega
                                        ?   <></>
                                        :   <p>Publicado el {moment(assing.Creado_En).format('D')} de { formatMonthDate( moment(assing.Creado_En).format('MM') ) }</p>
                                    }
                                    
                                </div>
                                {
                                    assing.Fecha_De_Entrega
                                    ?   <div className="dateLimit">
                                            jueves, 14:00
                                        </div>
                                    :   <></>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </Collapsible>
    )
}
