import React, { useState } from 'react'
import './ClassRedneringGradeRecords.scss'
import { SubjectModel } from '../../../models/subjectsModels/SubjectModels';
import { ClassByTeacher } from '../../../models/teachersModels/TeacherModels';
import wlld from '../../../assets/img/default_wallpaper.jpg';
import { HiArrowUturnLeft, HiOutlineArrowLeft } from 'react-icons/hi2';
import { HiDocumentDownload } from 'react-icons/hi';

interface innerProps{
    subject: SubjectModel;
    group: ClassByTeacher;
}

export const ClassRedneringGradeRecords = ({ group, subject } : innerProps) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [defaultSrc, setDefaultSrc] = useState(wlld);

    const onLoadImage = () => {
        setDefaultSrc(`https://source.unsplash.com/random/425×240/?${subject!.Area_Nombre}`);
    }

    return (
        <div className={`gradeRecordClassContainer ${isFlipped ? 'flipped' : ''}`}>
            <div className="gradeRecordContainer-inner">
                <div className="classInfo-front">
                    <div className="imageSection">
                        <img src={defaultSrc} alt="" loading='lazy' onLoad={onLoadImage}/>
                        <div className="floaterHelper"></div>
                    </div>
                    <div className="classSection">
                        <div className="realClassSection">
                            <div className="classInfo">
                                <p>{ subject.Nombre }</p>
                                <p>{ subject.Codigo_De_Area } | { subject.Codigo_De_Materia }</p>
                            </div>
                            <div className="actionsAside">
                                <button>
                                    <HiDocumentDownload />
                                </button>
                                <button onClick={() => setIsFlipped(true)}>
                                    <HiArrowUturnLeft />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="classInfo-back">
                    <div className="class_picker_header">
                        <button onClick={() => setIsFlipped(false)}>
                            <HiOutlineArrowLeft />
                        </button>
                        <p>Titulo</p>
                    </div>
                    <div className="pickerUnitBody">
                        Aqui poner algo
                    </div>
                </div>
            </div>
        </div>
    )
}
