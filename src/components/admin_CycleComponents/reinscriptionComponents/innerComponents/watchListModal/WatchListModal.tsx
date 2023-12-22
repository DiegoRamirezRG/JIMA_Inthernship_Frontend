import React, { useState } from 'react'
import './WatchListModal.scss'
import { IoClose } from 'react-icons/io5'
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext'
import { IoMdSearch } from 'react-icons/io'
import { useStudentContext } from '../../../../../contexts/studentContext/StudentContext'

export const WatchListModal = () => {

    const { workingGroup, handleUserListModal } = useReinsInscrContext();
    const { lastYearStudents } = useStudentContext();
    const [searched, setSearched] = useState('');

    return (
        <div className='watchStudentListModalContainer'>
            <div className="watchListHeader">
                <h2>Lista del grupo</h2>
                <button className='cancel-btn' onClick={() => {
                    setSearched('');
                    handleUserListModal();
                }}>
                    <IoClose/>
                </button>
            </div>
            <div className="watchListContent">
                <div className="searcher">
                    <div className="searchContainer">
                        <IoMdSearch className='iconly'/>
                        <input type="text" placeholder='Buscar alumno' value={searched} onChange={(e) => setSearched(e.target.value)}/>
                    </div>
                </div>
                <div className="studentsList">
                    {
                        lastYearStudents
                        .filter((obj) => `${obj.Nombre} ${obj.Apellido_Paterno} ${obj.Apellido_Paterno ?? `${obj.Apellido_Materno}`}`.toLowerCase().includes(searched.toLowerCase()))
                        .filter((obj) => workingGroup?.idsEstudiantes.includes(obj.ID_Estudiante))
                        .map((obj, index) => (
                            <div className={`studentListItem ${index == 0 ? 'first' : ''}`} key={obj.ID_Estudiante}>
                                <p>{obj.Nombre} {obj.Apellido_Paterno} {obj.Apellido_Paterno ?? `${obj.Apellido_Materno}`}</p>
                                <p>{obj.ID_Estudiante}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
