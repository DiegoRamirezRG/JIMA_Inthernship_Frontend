import React, { useContext, useEffect } from 'react'
import './GroupsScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { IoSearch } from 'react-icons/io5'
import { useTeacherContext } from '../../../contexts/teacherContext/TeacherContext'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import AuthContext from '../../../contexts/authContext/AuthContext'
import { GroupCardComponent } from '../../../components/teacherComponents/groupComponents/GroupCardComponent/GroupCardComponent'
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext'
import no_classes from '../../../assets/svg/no_schedule_day.svg'

export const GroupsScreen = () => {

    const { state } = useContext(AuthContext);
    const { teachClassLoading, classes, getClasses } = useTeacherContext();
    const { isSubjectsLoading, subjectsData, getSubjectsData } = useSubjectsContext();

    const getClassesInfo = async () => {
        await getClasses(state.loggedUser!.ID_Persona);
    }


    useEffect(() => {
        if(subjectsData.length <= 0){
            const awa = async() => {
                await getSubjectsData();
            }
            awa();
        }
    }, [])

    useEffect(() => {
        if(state){
            getClassesInfo();
        }
    }, [state])

    return (
        <NavigationComponent>
            {
                teachClassLoading || isSubjectsLoading
                ?   <LoadingComponent/>
                :   classes.length > 0
                ?   <div className="maxGroupsContainer">
                        <div className="headerGroups">
                            <h2>Manejo de Clases</h2>
                        </div>
                        <div className="groupsContent">
                            <div className="groupsDynamic">
                                {
                                    classes.map((classs) => (
                                        <GroupCardComponent group={classs} subject={subjectsData.find((subje) => subje.ID_Materia === classs.FK_Materia)!}/>
                                    ))
                                }
                            </div>
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
