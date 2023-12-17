import React, { useEffect, useState } from 'react'
import './AttendanceTakeComponent.scss'
import { AttendanceTableRow } from './innerComponents/renderAttendanceTableRow/AttendanceTableRow'
import { useGroupsContext } from '../../../contexts/groupsContext/GroupsContext'
import { AttendanceData } from '../../../models/groupsModels/GroupsModels'
import moment from 'moment'
import { formatDayDate, formatMonthDate } from '../../../utils/dateSpanishFormater/dateSpanishFormater';
import { IoClose } from 'react-icons/io5'
import { useAttendanceContext } from '../../../contexts/attendanceContext/AttendanceContext'
import { LoadingComponent } from '../../generalComponents/loadingComponent/LoadingComponent'
import { useParams } from 'react-router-dom'
import noScheduleDay from '../../../assets/svg/no_schedule_day.svg'

export const AttendanceTakeComponent = () => {

    const [innerLoader, setInnerLoader] = useState(true);
    const [valid, setValid] = useState(true);
    const [classDays, setClassDays] = useState<string[]>([]);

    const { classId } = useParams();

    const { groupAttendance, groupSchedule } = useGroupsContext();
    const { getTodayAttendance, attendanceObj, handleAttendanceModal, sendAttendanceLoader, sendAttendance, todayAttendance } = useAttendanceContext();

    const sortAtoZ = (personaA: AttendanceData, personaB: AttendanceData) => {
        const comparacionPaterno = personaA.Apellido_Paterno.localeCompare(personaB.Apellido_Paterno);

        if (comparacionPaterno !== 0) {
            return comparacionPaterno;
        }

        const apellidoMaternoA = personaA.Apellido_Materno || ''; 
        const apellidoMaternoB = personaB.Apellido_Materno || ''; 

        return apellidoMaternoA.localeCompare(apellidoMaternoB);
    }

    useEffect(() => {
        if(classId){
            const awaitF = async () => {
                await getTodayAttendance(classId);
            }

            awaitF().then(() => setInnerLoader(false));
        }
    }, [classId]);

    useEffect(() => {
        if(attendanceObj.length > 0){
            setValid(false);
        }else{
            setValid(true);
        }
    }, [attendanceObj])

    useEffect(() => {
        if(groupSchedule){
            const temp: string[] = [];
            groupSchedule.map((sch) => {
                if(!(temp.includes(sch.Dia))){
                    temp.push(sch.Dia);
                }
            })
            setClassDays(temp);
        }
    }, [groupSchedule])
    
    

    return (
        <div className='attendanceMaxContainer'>
            {
                innerLoader || sendAttendanceLoader
                ?   <LoadingComponent/>
                :   classDays.includes(formatDayDate(moment().format('ddd')))
                    ?   <>
                            <div className="attendaneHead">
                                <p>Asistencia del dia {moment().format('D [de]') +' ' + formatMonthDate(moment().format('MM'))}</p>
                                <div className="closeBtn">
                                    <button className='cancel-btn' onClick={ handleAttendanceModal }>
                                        <IoClose/>
                                    </button>
                                </div>
                            </div>
                            <div className="attendaceBody">
                                <div className="attendanceTakeTableHeader">
                                    <AttendanceTableRow isTheHeader={true} key={'student_attendance_header'}/>
                                </div>
                                <div className="attendanceTableBody">
                                    {
                                        groupAttendance
                                        .sort(sortAtoZ)
                                        .map((student, index) => (
                                            <AttendanceTableRow isTheHeader={false} key={`student_attendance_${student.ID_Persona}`} listNumber={index + 1} attendanceData={student}/>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="attendanceFooter">
                                <button className='cancel-btn' onClick={ handleAttendanceModal }>Cancelar</button>
                                <button className='save-btn' disabled={ todayAttendance.length > 0 ? valid : (attendanceObj.length !== groupAttendance.length) } onClick={sendAttendance}>Guardar</button>
                            </div>
                        </>
                    :   <div className='no_schedule_day'>
                        <button className='cancel-btn closeNoDay' onClick={ handleAttendanceModal }>
                            <IoClose/>
                        </button>
                            <p>El dia de hoy no esta dispoible la clase en el horario, por lo cual no podras tomar asistencia.</p>
                            <img src={noScheduleDay}/>
                        </div>
            }
        </div>
    )
}
