import React, { useContext, useEffect } from 'react'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import AuthContext from '../../../contexts/authContext/AuthContext';
import { useStudentContext } from '../../../contexts/studentContext/StudentContext';
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext';
import { GroupCardComponent } from '../../../components/teacherComponents/groupComponents/GroupCardComponent/GroupCardComponent';

export const ClassesScreen = () => {

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
            {
                isSubjectsLoading || studentClassesLoading
                ?   <LoadingComponent/>
                :   <div className="maxGroupsContainer">
                        <div className="headerGroups">
                            <h2>Todas tus clases</h2>
                            <div className="acctionsContainer">
                                <div className="listForFastAccionts">
                                    <ul className="menu">
                                        <li>Acciones Rapidas
                                            <ul className="submenu">
                                                <li>Generar Boleta</li>
                                                <li>Clases Archivadas</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="groupsContent">
                            <div className="groupsDynamic">
                                {
                                    studentClasses.map((classs) => (
                                        <GroupCardComponent group={classs} subject={subjectsData.find((subje) => subje.ID_Materia === classs.FK_Materia)!}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            }
        </NavigationComponent>
    )
}
