import React from 'react'
import './AnnouncementComponent.scss'
import { MdOutlineAssignment } from 'react-icons/md'
import { AssigmentObject } from '../../../../../models/homeworkModels/HomeworkModels';
import { formatMonthDate } from '../../../../../utils/dateSpanishFormater/dateSpanishFormater';
import moment from 'moment';
import { useGroupsContext } from '../../../../../contexts/groupsContext/GroupsContext';
import { useTeacherContext } from '../../../../../contexts/teacherContext/TeacherContext';
import { useNavigate, useParams } from 'react-router-dom';

interface innerProps{
    homework: AssigmentObject;
}

export const AnnouncementComponent = ({ homework } : innerProps) => {

    const { activeGroup } = useGroupsContext();
    const { teachersObj } = useTeacherContext();
    const { classId } = useParams();
    const navigate = useNavigate();

    const workingTeacher = teachersObj!.find((teacher) => teacher.ID_Profesor == activeGroup!.FK_Profesor);

    return (
        <div className='annoucnementHomeworkContainer' onClick={() => navigate(`/student/classes/${classId}/${homework.ID_Actividad}`)}>
            <div className="typeIconSection">
                <div className="icon_container">
                    <MdOutlineAssignment />
                </div>
            </div>
            <div className="announcementBody">
                <p>{ `${workingTeacher?.Nombre} ${workingTeacher?.Apellido_Paterno}` } publico: <b>{homework.Titulo}</b></p>
                <p>Publicado el { moment(homework.Creado_En).format("DD") + ' ' + formatMonthDate( moment(homework.Creado_En).format("MM")).slice(0,3) }{ homework.Fecha_De_Entrega ? `, Fecha de entrega el ${moment(homework.Fecha_De_Entrega).format("DD")} ${formatMonthDate(moment(homework.Fecha_De_Entrega).format("MM")).slice(0,3)} a las ${moment(homework.Fecha_De_Entrega).format("HH:mm")}` : '' }</p>
            </div>
        </div>
    )
}
