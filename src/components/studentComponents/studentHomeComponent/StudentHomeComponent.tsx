import React from 'react'
import './StudentHomeComponent.scss'
import { useHomeworkContext } from '../../../contexts/homeworkContext/HomeworkContext'
import { AnnouncementComponent } from './innerComponents/announcementComponent/AnnouncementComponent';
import done from '../../../assets/svg/no_assigns_more.svg'

export const StudentHomeComponent = () => {
    
    const { classAsigments } = useHomeworkContext();

    return (
        <div className='homeStudentClassContainer'>
            {
                classAsigments.length > 0
                ?   classAsigments.map((assign) => (
                        <AnnouncementComponent homework={assign} key={assign.ID_Actividad}/>
                    ))
                :   <div className="no_assigments">
                        <p>El profesor no ha añadido ninguna tarea</p>
                        <img src={done}/>
                    </div>
            }
        </div>
    )
}
