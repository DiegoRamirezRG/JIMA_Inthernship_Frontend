import React, { useContext, useEffect } from 'react'
import './ClassesScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import AuthContext from '../../../contexts/authContext/AuthContext';
import { useStudentContext } from '../../../contexts/studentContext/StudentContext';
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext';
import { GroupCardComponent } from '../../../components/teacherComponents/groupComponents/GroupCardComponent/GroupCardComponent';
import nodata from '../../../assets/svg/relax_no_data.svg'
import no_classes from '../../../assets/svg/no_schedule_day.svg'

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
                :     studentClasses.filter((classs) => classs.Active == true).length > 0
                    ?
                        <div className="maxGroupsContainer">
                            <div className="headerGroups">
                                <h2>Todas tus clases</h2>
                            </div>
                            <div className="groupsContent">
                                {
                                    studentClasses.length > 0
                                    ?   <div className="groupsDynamic">
                                            {
                                                studentClasses
                                                .filter((classs) => classs.Active == true)
                                                .map((classs) => (
                                                    <GroupCardComponent group={classs} subject={subjectsData.find((subje) => subje.ID_Materia === classs.FK_Materia)!}/>
                                                ))
                                            }
                                        </div>
                                    :   <div className='no_classes'>
                                            <img src={nodata}/>
                                            <p className='banner'>No tienes niguna clase</p>
                                            <p>Si deberias tener clases y esto es un error comunicate con la administracion de tu escuela</p>
                                        </div>
                                }
                            </div>
                        </div>
                    :   <div className='no_active_clases'>
                            <p>No tienes clases activas</p>
                            <img src={no_classes}/>
                            <button>Ver clases archivadas</button>
                        </div>
            }
        </NavigationComponent>
    )
}
