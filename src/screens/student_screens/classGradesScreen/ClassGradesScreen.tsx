import React, { useContext, useEffect, useState } from 'react'
import './ClassGradesScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { HiDocumentDownload } from 'react-icons/hi'
import AuthContext from '../../../contexts/authContext/AuthContext'
import defaultImg from '../../../assets/img/default.jpg'
import { API_ADDR, APT_PORT } from '../../../utils/env/config'
import { useTeacherContext } from '../../../contexts/teacherContext/TeacherContext'
import { useHomeworkContext } from '../../../contexts/homeworkContext/HomeworkContext'
import { useGroupsContext } from '../../../contexts/groupsContext/GroupsContext'
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext'
import { useParams } from 'react-router-dom'
import { SubjectModel } from '../../../models/subjectsModels/SubjectModels'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import Collapsible from 'react-collapsible'
import moment from 'moment'
import { formatMonthDate } from '../../../utils/dateSpanishFormater/dateSpanishFormater'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { fileExt, getFileIcon } from '../../../utils/iconFilesMap/IconFilesMap'
import { AssigmentGradeRender } from '../../../components/studentComponents/assigmentGradeRender/AssigmentGradeRender'
import done from '../../../assets/svg/no_assigns_more.svg'
import { sortByDate } from '../../../components/teacherComponents/groupComponents/assignsComponentView/helpers/sortDates'


export const ClassGradesScreen = () => {

    const { state } = useContext(AuthContext);

    const { classId } = useParams();
    const { subjectsData, getSubjectsData, isSubjectsLoading } = useSubjectsContext();
    const { activeGroup, getActiveGroupData, getActiveGroupLoading, groupAttendance, groupSchedule } = useGroupsContext();
    const { getClassUnits, getAssigmentsByClass, classAsigments, classUnits, turnInObjs, turnInObjsLoading, getTurnInObjs } = useHomeworkContext();
    const { getAllTeachers } = useTeacherContext();

    const [workingSubject, setWorkingSubject] = useState<SubjectModel>();

    const getGrade = (unidadId: string) => {
        const works = classAsigments.filter((homework) => homework.Fk_Unidad === unidadId).map((trabajo) => trabajo.ID_Actividad);
        const entregasDeUnidad = turnInObjs.filter((entrega) => works.includes(entrega.FK_Actividad));

        const calificacionUnidad = entregasDeUnidad.reduce((sum, cur) => {
            console.log(cur)
            const calificacion = cur.Calificacion != null ? cur.Calificacion : 100;
            return sum + calificacion;
        }, 0)

        const prom = (calificacionUnidad / works.length).toFixed(0);

        return prom;
    }

    useEffect(() => {
        if(classId){
            const awaF = async () => {
                await getAllTeachers();
                await getAssigmentsByClass(classId);
                await getClassUnits(classId);
                await getActiveGroupData(classId);
            }
            awaF();
        }
    }, [])

    useEffect(() => {
        if(subjectsData){
            const awaF = async () => {
                await getSubjectsData();
            }
            awaF();
        }
    }, []);

    useEffect(() => {
        if(subjectsData && activeGroup){
            const work = subjectsData.find((subject) => subject.ID_Materia === activeGroup?.FK_Materia);
            setWorkingSubject(work);
        }
    }, [subjectsData, activeGroup]);

    useEffect(() => {
        if(state){
            const awaitF = async () => {
                await getTurnInObjs(classId!, state.loggedUser?.ID_Persona!);
            }
            awaitF();
        }
    }, [state]);

    return (
        <NavigationComponent>
            <div className="classesGradesSchool">
                {
                    getActiveGroupLoading || !workingSubject  || turnInObjsLoading
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="gradesClassBodyContainer">
                                <div className="studentInfo">
                                    <div className="imageContainer">
                                        <img src={state.loggedUser?.Imagen != null ? `http://${API_ADDR}:${APT_PORT}/images/user_profiles/${state.loggedUser?.ID_Persona}/${state.loggedUser?.Imagen}` : defaultImg} alt="USER" />
                                    </div>
                                    <div className="nameContainer">
                                        <p> { state.loggedUser?.Nombre } { state.loggedUser?.Apellido_Paterno } { state.loggedUser?.Apellido_Materno ?? state.loggedUser?.Apellido_Materno }</p>
                                        <p> { workingSubject.Nombre } | { workingSubject.Codigo_De_Materia } </p>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="renderingAssignsContainer">
                                    {
                                        classAsigments
                                        .filter((homework) => homework.Fk_Unidad === null).length > 0
                                        ?      <div className="noUnitWorks">
                                                {
                                                    //TODO: Here 
                                                }
                                            </div>
                                        :   <></>
                                    }
                                    {
                                        classUnits.length > 0
                                        ?   classUnits
                                            .map((unit, index) => (
                                                <div className='unitDividerForGrade' key={`unit_grade_${index}`}>
                                                    <div className="unitGradeHeader">
                                                        <div className="unitInfo">
                                                            <p> { unit.Nombre } </p>
                                                        </div>
                                                        <div className="yourUnitGrade">
                                                            <p>Califcacion</p>
                                                            <p>
                                                                {
                                                                    getGrade(unit.ID_Unidad)
                                                                }
                                                            /<b>100</b></p>
                                                        </div>
                                                    </div>
                                                    <div className="unitAssigments">
                                                    {
                                                        !(classAsigments.filter((homework) => homework.Fk_Unidad === unit.ID_Unidad).length > 0)
                                                        ?   <div className='no-homeworks'>
                                                                No has añadido ningun trabajo a esta unidad
                                                            </div>
                                                        :   <div className='homeworks_container'>
                                                                {
                                                                    classAsigments
                                                                    .filter((homework) => homework.Fk_Unidad === unit.ID_Unidad)
                                                                    .sort(sortByDate)
                                                                    .map((homework, index) => {

                                                                        const workingAssig = turnInObjs.find((obj) => obj.FK_Actividad == homework.ID_Actividad);

                                                                        return (
                                                                            <AssigmentGradeRender homework={homework} workingAssig={workingAssig} key={`${homework.ID_Actividad}_${index}`}/>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                    }
                                                    </div>
                                                </div>
                                            ))
                                        :   <div className='no_assigments'>
                                                <p>El profesor no ha añadido ninguna tarea</p>
                                                <img src={done}/>
                                            </div>
                                    }   
                                </div>
                            </div>
                        </>
                }
            </div>
            <Tooltip id="helper" className='tooltiphelper'/>
            <Tooltip id="filesTooltip" className='tooltiphelper'/>
        </NavigationComponent>
    )
}
