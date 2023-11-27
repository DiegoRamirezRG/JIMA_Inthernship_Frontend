import React, { useContext, useEffect } from 'react'
import './GradesScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { HiDocumentDownload } from 'react-icons/hi'
import AuthContext from '../../../contexts/authContext/AuthContext'
import { useStudentContext } from '../../../contexts/studentContext/StudentContext'
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import { ClassRedneringGradeRecords } from '../../../components/studentComponents/classRenderingForGradeRecords/ClassRedneringGradeRecords'

export const GradesScreen = () => {

    const { state } = useContext(AuthContext);
    const { studentClasses, studentClassesLoading, getStudentClasses } = useStudentContext();
    const { isSubjectsLoading, subjectsData, getSubjectsData } = useSubjectsContext();

    const getClassesInfo = async () => {
        await getStudentClasses(state.loggedUser!.ID_Persona);
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
                                    <button>
                                        <HiDocumentDownload />
                                        Kardex
                                    </button>
                                    <button>
                                        <HiDocumentDownload />
                                        Boleta
                                    </button>
                                </div>
                            </div>
                            <div className="gradesBody">
                                <div className="activeSubjects">
                                    <div className="classesDynamic">
                                        {
                                            studentClasses && studentClasses.map((classObj) => (
                                                <ClassRedneringGradeRecords subject={subjectsData.find((subje) => subje.ID_Materia === classObj.FK_Materia)!} group={classObj}/>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="genReportAside">
                                    Sidebar
                                </div>
                            </div>
                        </>
                }
            </div>
        </NavigationComponent>
    )
}
