import React, { useContext, useEffect } from 'react'
import './GradesScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { HiDocumentDownload } from 'react-icons/hi'
import AuthContext from '../../../contexts/authContext/AuthContext'
import { useStudentContext } from '../../../contexts/studentContext/StudentContext'
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import { ClassRedneringGradeRecords } from '../../../components/studentComponents/classRenderingForGradeRecords/ClassRedneringGradeRecords'
import { showErrorTost } from '../../../components/generalComponents/toastComponent/ToastComponent'
import { API_ADDR, APT_PORT } from '../../../utils/env/config'
import { BiSolidBox } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export const GradesScreen = () => {

    const { state } = useContext(AuthContext);
    const { studentClasses, studentClassesLoading, getStudentClasses } = useStudentContext();
    const { isSubjectsLoading, subjectsData, getSubjectsData } = useSubjectsContext();

    const navigate = useNavigate();

    const getClassesInfo = async () => {
        await getStudentClasses(state.loggedUser!.ID_Persona);
    }

    const handleKardexMaker = async () => {
        try {
            const pdfUrl = `http://${API_ADDR}:${APT_PORT}/api/student/kardex/generateKardex/${state.loggedUser?.ID_Persona}`;
            window.open(pdfUrl, '_blank');
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    const handleBoletaMaker = async () => {
        try {
            const pdfUrl = `http://${API_ADDR}:${APT_PORT}/api/student/grades/generateGradesReport/${state.loggedUser?.ID_Persona}`;
            window.open(pdfUrl, '_blank');
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    const handleReportPerClass = async (class_id: string) => {
        try {
            const pdfUrl = `http://${API_ADDR}:${APT_PORT}/api/student/grades/generateGradesReport/${state.loggedUser?.ID_Persona}/${class_id}`;
            window.open(pdfUrl, '_blank');
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
        }
    }

    useEffect(() => {
        if(subjectsData.length <= 0){
            const awa = async() => {
                await getSubjectsData();
            }
            awa();
        }
    }, []);

    useEffect(() => {
        if(state){
            getClassesInfo();
        }
    }, [state])

    return (
        <NavigationComponent>
            <div className="maxGradesStudentViewComponent">
                {
                    isSubjectsLoading || studentClassesLoading
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="headerGradesContainer">
                                <h2>Tus Calificaciones</h2>
                                <div className="acctionsContainer">
                                    <button onClick={ handleKardexMaker }>
                                        <HiDocumentDownload />
                                        Kardex
                                    </button>
                                    <button onClick={ handleBoletaMaker }>
                                        <HiDocumentDownload />
                                        Boleta
                                    </button>
                                </div>
                            </div>
                            <div className="gradesBody">
                                <div className="activeSubjects">
                                    <div className="classesDynamic">
                                        {
                                            studentClasses && studentClasses
                                            .filter((classOjb => classOjb.Active == true))
                                            .map((classObj) => (
                                                <ClassRedneringGradeRecords subject={subjectsData.find((subje) => subje.ID_Materia === classObj.FK_Materia)!} group={classObj} generateReport={handleReportPerClass}/>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="genReportAside">
                                    <button className='archieved_classes' onClick={() => navigate('/student/classes/archieved')}>
                                        <BiSolidBox className='iconly'/>
                                        Clases Archivadas
                                    </button>
                                </div>
                            </div>
                        </>
                }
            </div>
        </NavigationComponent>
    )
}
