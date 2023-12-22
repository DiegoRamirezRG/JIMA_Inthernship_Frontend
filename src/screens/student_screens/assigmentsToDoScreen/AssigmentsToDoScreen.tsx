import React, { useContext, useEffect } from 'react'
import './AssigmentsToDoScreen.scss'
import { NavigationComponent } from '../../../components/generalComponents/navigationComponent/NavigationComponent'
import { TodoCollapsibleComponent } from '../../../components/studentComponents/todoCollapsibleComponent/TodoCollapsibleComponent'
import { useStudentContext } from '../../../contexts/studentContext/StudentContext'
import AuthContext from '../../../contexts/authContext/AuthContext'
import { LoadingComponent } from '../../../components/generalComponents/loadingComponent/LoadingComponent'
import { useSubjectsContext } from '../../../contexts/subjectContext/SubjectsContext'
import done from '../../../assets/svg/no_assigns_more.svg'
import moment from 'moment'

export const AssigmentsToDoScreen = () => {

    const { getTodoLoader, todoStudent, getTodo } = useStudentContext();
    const { subjectsData, getSubjectsData, isSubjectsLoading } = useSubjectsContext();
    const { state } = useContext(AuthContext);

    const fechaInicioSemana = moment().startOf('week');
    const fechaInicioProximaSemana = moment().add(1, 'week').startOf('week');
    const fechaMasSemana = moment().add(2, 'week').startOf('week');


    useEffect(() => {
        if(state.loggedUser){
            const awaitF = async () => {
                await getTodo(state.loggedUser!.ID_Persona);
            }
            awaitF();
        }
    }, [state]);

    useEffect(() => {
        if(subjectsData){
            const awaF = async () => {
                await getSubjectsData();
            }
            awaF();
        }
    }, []);

    return (
        <NavigationComponent>
            {
                getTodoLoader || isSubjectsLoading
                ?   <LoadingComponent/>
                :   <div className="maxToDoScreen">
                        <div className="maxTodoScreenHeader">
                            <h2>Tus trabajos pendientes</h2>
                        </div>
                        {
                            todoStudent.length > 0
                            ?   <div className="todoScreenBody">
                                    <TodoCollapsibleComponent key={'student_todo_1'} title='Sin fecha limite'  assigns={todoStudent.filter((todo) => !todo.Fecha_De_Entrega)}/>
                                    <TodoCollapsibleComponent key={'student_todo_2'} title='Esta semana'       assigns={todoStudent.filter((todo) => moment(todo.Fecha_De_Entrega).isSameOrAfter(fechaInicioSemana, 'day') && moment(todo.Fecha_De_Entrega).isBefore(fechaInicioProximaSemana, 'day'))}/>
                                    <TodoCollapsibleComponent key={'student_todo_3'} title='Semana siguiente'  assigns={todoStudent.filter((todo) => moment(todo.Fecha_De_Entrega).isSameOrAfter(fechaInicioProximaSemana, 'day') && moment(todo.Fecha_De_Entrega).isBefore(fechaMasSemana, 'day'))}/>
                                    <TodoCollapsibleComponent key={'student_todo_4'} title='Más tarde'         assigns={todoStudent.filter((todo) => moment(todo.Fecha_De_Entrega).isSameOrAfter(fechaMasSemana, 'day'))}/>
                                </div>
                            :   <div className="well_done">
                                    <img src={done} />
                                    <div className="innerCol">
                                        <p>No tienes mas tareas por ahora</p>
                                        <p>Felicidades</p>
                                    </div>
                                </div>
                        }
                    </div>
            }
        </NavigationComponent>
    )
}
