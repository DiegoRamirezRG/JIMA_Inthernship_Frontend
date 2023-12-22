import React, { useEffect, useState } from 'react'
import './SubjectCard.scss'
import { SubjectModel } from '../../../../../models/subjectsModels/SubjectModels'
import { IoClose } from 'react-icons/io5';
import { usePlanMakerContext } from '../../../../../contexts/planMakerContext/PlanMakerContext';
import { useSubjectsContext } from '../../../../../contexts/subjectContext/SubjectsContext';

interface SubjectCard {
    subject: SubjectModel;
}

export const SubjectCard = ({ subject }: SubjectCard) => {

    const [prevSubject, setprevSubject] = useState<string | null>(null);
    const { prevSubjects, handleDeleteModalState } = usePlanMakerContext();
    const { subjectsData } = useSubjectsContext();

    const obtenerPrevSubject = (subjectABuscar: string): string | null => {
        const matchingSubject = prevSubjects.find(subject => subject.subject === subjectABuscar);
        if(matchingSubject){
            const subjectEncontrado = subjectsData.find(subject => subject.ID_Materia === matchingSubject.prevSubject);
            return subjectEncontrado ? subjectEncontrado.Nombre : null;
        }else{
            return null;
        }
    };

    useEffect(() => {
        setprevSubject(obtenerPrevSubject(subject.ID_Materia));
    }, [prevSubjects])

    return (
        <div className='subject-in-drop-container'>
            <div className="subject-in-drop-header">
                <p>{subject.Nombre}</p>
            </div>
            <div className="deleteContainer" onClick={() => handleDeleteModalState(subject.ID_Materia)}>
                <IoClose/>
            </div>
            <div className="subjectInfoSection">
                <p><b>Creditos:</b> {subject.Creditos}</p>
                <p><b>Horas:</b> {subject.Horas_De_Clase}</p>
            </div>
            {
                prevSubject
                ?   <div className="reqNeeded">
                        Req: {prevSubject}
                    </div>
                :   <></>
            }
        </div>
    )
}
