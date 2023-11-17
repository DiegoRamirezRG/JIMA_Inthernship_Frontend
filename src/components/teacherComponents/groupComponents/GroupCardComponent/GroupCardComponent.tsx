import React, { useEffect, useState } from 'react'
import './GroupCardComponent.scss'
import { ClassByTeacher } from '../../../../models/teachersModels/TeacherModels';
import { Clipper } from './helpers/Clipper';
import { SubjectModel } from '../../../../models/subjectsModels/SubjectModels';
import { Tooltip } from 'react-tooltip'
import { HiOutlineClipboardList, HiOutlineDocumentAdd } from "react-icons/hi";
import 'react-tooltip/dist/react-tooltip.css'
import { Navigate, useNavigate } from 'react-router-dom';

interface cardProps{
    group: ClassByTeacher;
    subject: SubjectModel;
}

export const GroupCardComponent = ({ group, subject } : cardProps) => {

    const navigate = useNavigate();

    return (
        <div className='cardContainer' onClick={() => navigate(`/teacher/classes/${group.ID_Clase}`)}>
            <div className="imageContainer">
                <Clipper src={`https://source.unsplash.com/random/425×240/?${subject.Area_Nombre}`}/>
            </div>
            <div className="informationContainer">
                <div className="innerRow">
                    <p className='subj_title'>{subject.Nombre}</p>
                    <p>Codigo: {subject.Codigo_De_Materia}</p>
                </div>
                <div className="innerRow">
                    <p className='subj_area'>Area: {subject.Area_Nombre}</p>
                    <p className='subj_area'>Horas: {subject.Horas_De_Clase}</p>
                </div>
                <div className="floatingActions">
                    <div className="icons list">
                        <a
                            data-tooltip-id="helper_tooltip"
                            data-tooltip-content="Nombrar Lista"
                            data-tooltip-place="top"
                        >
                            <HiOutlineClipboardList/>
                        </a>
                    </div>
                    <div className="icons add">
                        <a
                            data-tooltip-id="helper_tooltip"
                            data-tooltip-content="Agregar Tarea"
                            data-tooltip-place="top"
                        > 
                            <HiOutlineDocumentAdd/>
                        </a>
                    </div>
                </div>
            </div>
            <Tooltip id="helper_tooltip" />
        </div>
    )
}
