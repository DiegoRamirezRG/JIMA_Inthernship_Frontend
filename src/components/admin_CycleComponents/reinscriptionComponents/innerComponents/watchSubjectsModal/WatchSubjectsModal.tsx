import React, { useState } from 'react'
import './WatchSubjectsModal.scss'
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext'
import { IoClose } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';

export const WatchSubjectsModal = () => {

    const { workingGroupForSubj, handleShowSubjListModal } = useReinsInscrContext();
    const [searched, setSearched] = useState('');

    return (
        <div className='watchSubjModalContainer'>
            <div className="watchSubjHeader">
                <h2>Lista de materias</h2>
                <button className='cancel-btn' onClick={() => {
                    setSearched('');
                    handleShowSubjListModal();
                }}>
                    <IoClose/>
                </button>
            </div>
            <div className="watchSubjContent">
                <div className="searcher">
                    <div className="searchContainer">
                        <IoMdSearch className='iconly'/>
                        <input type="text" placeholder='Buscar materia' value={searched} onChange={(e) => setSearched(e.target.value)}/>
                    </div>
                </div>
                <div className="subjectList">
                    {
                        workingGroupForSubj && workingGroupForSubj.next_subjects
                        .filter((obj) => obj.Nombre.toLowerCase().includes(searched.toLowerCase()))
                        .map((obj, index) => (
                            <div className={`subjectListItem ${index == 0 ? 'first' : ''}`}>
                                <p>{obj.Nombre}</p>
                                <p>Creditos: {obj.Creditos}</p>
                                <p>Horas: {obj.Horas_De_Clase}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
