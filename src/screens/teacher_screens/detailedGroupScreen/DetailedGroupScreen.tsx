import React, { useEffect, useState } from 'react'
import './DetailedGroupScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { useParams } from 'react-router-dom';
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent';
import { useGroupsContext } from '../../../contexts/groupsContext/GroupsContext';
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext';
import { SubjectModel } from '../../../models/subjectsModels/SubjectModels';
import wlld from '../../../assets/img/default_wallpaper.jpg';
import { HiOutlineClipboardList, HiOutlineDocumentAdd } from 'react-icons/hi';
import { Tooltip } from 'react-tooltip';
import { HomeComponent } from '../../../components/teacherComponents/groupComponents/homeComponentView/HomeComponent';
import { AssignsComponentView } from '../../../components/teacherComponents/groupComponents/assignsComponentView/AssignsComponentView';
import { StudentsListComponentView } from '../../../components/teacherComponents/groupComponents/studentsListComponentView/StudentsListComponentView';
import { GradesComponentView } from '../../../components/teacherComponents/groupComponents/gradesComponentView/GradesComponentView';
import { ScheduleComponentView } from '../../../components/teacherComponents/groupComponents/scheduleComponentView/ScheduleComponentView';
import { useHomeworkContext } from '../../../contexts/homeworkContext/HomeworkContext';
import { ModalComponent } from '../../../components/generalComponents/modalComponent/ModalComponent';
import { CreateRubricModal } from '../../../components/teacherComponents/groupComponents/assignsComponentView/innerComponents/createRubricModal/CreateRubricModal';
import { CreateAssignamentModal } from '../../../components/teacherComponents/groupComponents/assignsComponentView/innerComponents/createAssigmentModal/CreateAssignamentModal';
import { AttendanceTakeComponent } from '../../../components/teacherComponents/attendanceTakeComponent/AttendanceTakeComponent';
import { useAttendanceContext } from '../../../contexts/attendanceContext/AttendanceContext';

export const DetailedGroupScreen = () => {

    const { classId } = useParams();
    const { activeGroup, getActiveGroupData, getActiveGroupLoading, groupAttendance, groupSchedule } = useGroupsContext();
    const { subjectsData, getSubjectsData } = useSubjectsContext();
    const { handleAssigmentCreateModal, assigmentCreateModal } = useHomeworkContext();
    const { attendanceModal, handleAttendanceModal } = useAttendanceContext();

    const [workingSubject, setWorkingSubject] = useState<SubjectModel>();
    const [defaultSrc, setDefaultSrc] = useState(wlld);
    const [renderingIndex, setRenderingIndex] = useState<number>(0);

    const renderingPage = new Map<number, JSX.Element>([
        [0, <AssignsComponentView/>],
        [1, <StudentsListComponentView/>],
        [2, <ScheduleComponentView/>],
    ])

    const onLoadImage = () => {
        setDefaultSrc(`https://source.unsplash.com/random/425×240/?${workingSubject!.Area_Nombre}`);
    }

    useEffect(() => {
        if(classId){
            const awaF = async () => {
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
                                    <div className="realActionageContainer">
                                        <div className="icons list" onClick={ handleAttendanceModal }>
                                            <a
                                                data-tooltip-id="helper_tooltip"
                                                data-tooltip-content="Nombrar Lista"
                                                data-tooltip-place="top"
                                            >
                                                <HiOutlineClipboardList/>
                                            </a>
                                        </div>
                                        <div className="icons add" onClick={ handleAssigmentCreateModal }>
                                            <a
                                                data-tooltip-id="helper_tooltip"
                                                data-tooltip-content="Agregar Tarea"
                                                data-tooltip-place="top"
                                            > 
                                                <HiOutlineDocumentAdd/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="navigatorRender">
                                <div className="buttonageRendering">
                                    <button key={1} className={`${renderingIndex == 0 ? 'active' : ''}`} onClick={() => setRenderingIndex(0)}>Trabajos</button>
                                    <button key={2} className={`${renderingIndex == 1 ? 'active' : ''}`} onClick={() => setRenderingIndex(1)}>Estudiantes</button>
                                    <button key={3} className={`${renderingIndex == 2 ? 'active' : ''}`} onClick={() => setRenderingIndex(2)}>Horario</button>
                                </div>
                            </div>
                            <div className="contentRenderDynamicContainer">
                                {
                                    renderingPage.get(renderingIndex)
                                }
                            </div>
                        </>
                }
                <Tooltip id="helper_tooltip" />
                <ModalComponent modalState={assigmentCreateModal} handleModalState={() => {}} modalSize='modal-xxxl'>
                    <CreateAssignamentModal/>
                </ModalComponent>
                <ModalComponent modalState={attendanceModal} handleModalState={() => {}} modalSize='modal-lg'>
                    <AttendanceTakeComponent/>
                </ModalComponent>
            </div>
        </NavigationComponent>
    )
}
