import React, { useEffect, useState } from 'react'
import './AttendanceTableRow.scss'
import { AttendanceData } from '../../../../../models/groupsModels/GroupsModels';
import { useAttendanceContext } from '../../../../../contexts/attendanceContext/AttendanceContext';
import { useParams } from 'react-router-dom';
import { AttendanceDBModel, attendanceStatus, tempAttendanceObj } from '../../../../../models/attendanceModels/AttendanceModels';

interface innerProps{
    isTheHeader: boolean;
    listNumber?: number;
    attendanceData?: AttendanceData;
}

export const AttendanceTableRow = ({ isTheHeader, listNumber, attendanceData }: innerProps) => {

    const { todayAttendance, attendanceObj, addAttendance, attendanceModal } = useAttendanceContext();
    const { classId } = useParams();

    const [workingState, setWorkingState] = useState<tempAttendanceObj | null>(null);
    const [workingDbAttendance, setWorkingDbAttendance] = useState<AttendanceDBModel | null>(null)

    const statusMap = new Map<number, attendanceStatus | string >([
        [0, 'Sin captura'],
        [1, 'Asistencia'],
        [2, 'Retraso'],
        [3, 'Justificacion'],
        [4, 'Falta'],
    ])

    const invertedStatusMap = new Map<string, number >([
        ['Sin captura',     0],
        ['Asistencia',      1],
        ['Retraso',         2],
        ['Justificacion',   3],
        ['Falta',           4],
    ])

    const handleAddStatus = () => {
        if(workingState){
            const temp = invertedStatusMap.get(workingState.Estado);
            if(temp == 4){
                addAttendance(attendanceData?.ID_Estudiante!, classId!, 'Asistencia');
            }else{
                addAttendance(attendanceData?.ID_Estudiante!, classId!, statusMap.get(temp! + 1) as attendanceStatus);
            }
        }else{
            if(workingDbAttendance){
                const temp = invertedStatusMap.get(workingDbAttendance.Estado);
                addAttendance(attendanceData?.ID_Estudiante!, classId!, statusMap.get(temp! + 1) as attendanceStatus);
            }else{
                addAttendance(attendanceData?.ID_Estudiante!, classId!, 'Asistencia');
            }
        }
    }

    useEffect(() => {
        if(attendanceObj){
            const temp = attendanceObj.find((att) => att.ID_Clase == classId! &&  att.ID_Estudiante == attendanceData?.ID_Estudiante);
            if(temp){
                setWorkingState(temp);
            }
        }
    }, [attendanceObj])

    useEffect(() => {
        if(attendanceModal){
            setWorkingState(null)
        }
    }, [attendanceModal])
    
    useEffect(() => {
        if(todayAttendance){
            const temp = todayAttendance.find((att) => att.FK_Estudiante == attendanceData?.ID_Estudiante && att.FK_Clase == classId!)
            if(temp){
                setWorkingDbAttendance(temp);
            }
        }
    }, [todayAttendance])
    

    return (
        <div className={`attendanceRowContainer ${isTheHeader ? 'header': 'content'}`}>
            <div className="listNumber">
                {
                    isTheHeader
                    ?   <p>No.</p>
                    :   <p>{listNumber}</p>
                } 
            </div>
            <div className="studentName">
                {
                    isTheHeader
                    ?   <p>Nombre del estudiante</p>
                    :   <p className='studentName'>{attendanceData?.Nombre} {attendanceData?.Apellido_Paterno} {attendanceData?.Apellido_Materno}</p>
                } 
            </div>
            <div className="attendanceStatus">
                {
                    isTheHeader
                    ?   <p>Asistencia</p>
                    :   <button className={statusMap.get( workingState ? invertedStatusMap.get(workingState.Estado)! : workingDbAttendance ? invertedStatusMap.get(workingDbAttendance.Estado)! : 0 )} onClick={handleAddStatus}>
                            {
                                statusMap.get( workingState ? invertedStatusMap.get(workingState.Estado)! : workingDbAttendance ? invertedStatusMap.get(workingDbAttendance.Estado)! : 0 )
                            }
                        </button>
                }
            </div>
        </div>
    )
}
