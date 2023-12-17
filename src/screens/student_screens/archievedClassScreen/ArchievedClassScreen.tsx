import React, { useContext, useEffect } from 'react'
import './ArchievedClassScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import AuthContext from '../../../contexts/authContext/AuthContext';
import { useStudentContext } from '../../../contexts/studentContext/StudentContext';
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext';
import { useNavigate } from 'react-router-dom';
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent';
import { ClassRedneringGradeRecords } from '../../../components/studentComponents/classRenderingForGradeRecords/ClassRedneringGradeRecords';
import { API_ADDR, APT_PORT } from '../../../utils/env/config';
import { showErrorTost } from '../../../components/generalComponents/toastComponent/ToastComponent';

export const ArchievedClassScreen = () => {

    const { state } = useContext(AuthContext);
    const { studentClasses, studentClassesLoading, getStudentClasses } = useStudentContext();
    const { isSubjectsLoading, subjectsData, getSubjectsData } = useSubjectsContext();

    const getClassesInfo = async () => {
        await getStudentClasses(state.loggedUser!.ID_Persona);
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
            <div className="maxArchievedStudentClasses"> 
                {
                    isSubjectsLoading || studentClassesLoading
                    ?   <LoadingComponent/>
                    :   <>
                            <div className="headerGradesContainer">
                                <h2>Clases Archivadas</h2>
                            </div>
                            <div className="gradesBody">
                                <div className="activeSubjects">
                                    <div className="classesDynamic">
                                        {
                                            studentClasses && studentClasses
                                            .filter((classOjb => classOjb.Active == false))
                                            .map((classObj) => (
                                                <ClassRedneringGradeRecords subject={subjectsData.find((subje) => subje.ID_Materia === classObj.FK_Materia)!} group={classObj} generateReport={handleReportPerClass}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </NavigationComponent>
    )
}
