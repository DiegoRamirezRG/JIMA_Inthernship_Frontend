import React, { useEffect, useState } from 'react'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import { HiOutlineClipboardList, HiOutlineDocumentAdd } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext'
import { SubjectModel } from '../../../models/subjectsModels/SubjectModels'
import wlld from '../../../assets/img/default_wallpaper.jpg';
import { useGroupsContext } from '../../../contexts/groupsContext/GroupsContext'
import './DetailedClassScreen.scss'
import { StudentHomeComponent } from '../../../components/studentComponents/studentHomeComponent/StudentHomeComponent'
import { StudentGradesComponent } from '../../../components/studentComponents/studentGradesComponent/StudentGradesComponent'
import { useHomeworkContext } from '../../../contexts/homeworkContext/HomeworkContext'
import { useTeacherContext } from '../../../contexts/teacherContext/TeacherContext'

export const DetailedClassScreen = () => {

    const { classId } = useParams();
    const { subjectsData, getSubjectsData, isSubjectsLoading } = useSubjectsContext();
    const { activeGroup, getActiveGroupData, getActiveGroupLoading, groupAttendance, groupSchedule } = useGroupsContext();
    const { getClassUnits, getAssigmentsByClass } = useHomeworkContext();
    const { getAllTeachers } = useTeacherContext();

    const [workingSubject, setWorkingSubject] = useState<SubjectModel>();
    const [defaultSrc, setDefaultSrc] = useState(wlld);
    const [renderingIndex, setRenderingIndex] = useState(true);

    const onLoadImage = () => {
        setDefaultSrc(`https://source.unsplash.com/random/425×240/?${workingSubject!.Area_Nombre}`);
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

    return (
        <NavigationComponent>
            <div className="maxDetailedGroup">
                {
                    getActiveGroupLoading || !workingSubject
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="wallcoverImage">
                                <img src={defaultSrc} alt="" loading='lazy' onLoad={onLoadImage}/>
                                <div className="acctionsFloating">
                                    <div className="infoSubjectFloating">
                                        <p className='title'>{workingSubject!.Nombre}</p>
                                        <p>{workingSubject!.Area_Nombre}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="selectorHandlerStudent">
                                <button className={renderingIndex ? 'selected' : ''} onClick={() => setRenderingIndex(true)}>Home</button>
                                <button className={renderingIndex ? '' : 'selected'} onClick={() => setRenderingIndex(false)}>Trabajo en Clase</button>
                            </div>
                            <div className="viewRenderingStudent">
                                {
                                    renderingIndex
                                    ?   <StudentHomeComponent/>
                                    :   <StudentGradesComponent/>
                                }
                            </div>  
                        </>
                }
            </div>
        </NavigationComponent>
    )
}
