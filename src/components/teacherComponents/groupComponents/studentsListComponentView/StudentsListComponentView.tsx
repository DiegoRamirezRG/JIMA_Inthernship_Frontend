import React, { useState } from 'react'
import './StudentsListComponentView.scss'
import { BsSortAlphaDown, BsSortAlphaDownAlt  } from "react-icons/bs";
import { useGroupsContext } from '../../../../contexts/groupsContext/GroupsContext';
import { StudentRender } from './innerComponents/studentRender/StudentRender';
import { AttendanceData } from '../../../../models/groupsModels/GroupsModels';
import { IoSearch } from 'react-icons/io5';

export const StudentsListComponentView = () => {

    const { groupAttendance } = useGroupsContext();
    const [sorting, setSorting] = useState(false);
    const [searched, setSearched] = useState('');

    const sortAtoZ = (personaA: AttendanceData, personaB: AttendanceData) => {
        const comparacionPaterno = personaA.Apellido_Paterno.localeCompare(personaB.Apellido_Paterno);

        if (comparacionPaterno !== 0) {
            return comparacionPaterno;
        }

        const apellidoMaternoA = personaA.Apellido_Materno || ''; 
        const apellidoMaternoB = personaB.Apellido_Materno || ''; 

        return apellidoMaternoA.localeCompare(apellidoMaternoB);
    }

    const sortZtoA = (personaA: AttendanceData, personaB: AttendanceData) => {
        const comparacionPaterno = personaB.Apellido_Paterno.localeCompare(personaA.Apellido_Paterno);

        if (comparacionPaterno !== 0) {
            return comparacionPaterno;
        }

        const apellidoMaternoA = personaA.Apellido_Materno || ''; 
        const apellidoMaternoB = personaB.Apellido_Materno || ''; 

        return apellidoMaternoB.localeCompare(apellidoMaternoA);
    };

    return (
        <div className='studentListContainerView'>
            <div className="headerOfStudentList">
                <h2>Lista de Estudiantes</h2>
                <div className="actionsContainer">
                    <div className="searcherContainer">
                        <input type="text" placeholder='Buscar Alumno' value={searched} onChange={(e) => setSearched(e.target.value)}/>
                        <IoSearch className='icon-search'/>
                    </div>
                    <div className="filterOptContainer" onClick={ () => setSorting(!sorting) }>
                        {
                            sorting
                            ?   <BsSortAlphaDownAlt/>
                            :   <BsSortAlphaDown/>  
                        }
                    </div>
                </div>
            </div>
            <div className="studentListGrid">
                {
                    groupAttendance
                        .sort(sorting ? sortZtoA : sortAtoZ)
                        .filter((stnd) => {
                            if(searched === ''){
                                return true
                            }

                            let fullName = `${stnd.Nombre} ${stnd.Apellido_Paterno}${stnd.Apellido_Materno ?? ' '+stnd.Apellido_Materno}`;
                            return fullName.toLowerCase().includes(searched.toLowerCase());
                        })
                        .map((stdnt, index) => (
                            <StudentRender student={stdnt} key={`STDNG${index}`} indexing={index} maxIndex={groupAttendance.length}/>
                        ))
                }
            </div>
        </div>
    )
}
