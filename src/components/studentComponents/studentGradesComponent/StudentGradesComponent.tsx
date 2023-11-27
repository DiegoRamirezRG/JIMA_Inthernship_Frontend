import React, { useContext, useState } from 'react'
import './StudentGradesComponent.scss'
import { useHomeworkContext } from '../../../contexts/homeworkContext/HomeworkContext'
import { HomeworkRender } from '../../teacherComponents/groupComponents/assignsComponentView/innerComponents/unitRender/innerComponents/homeworkRender/HomeworkRender'
import { UnitRender } from '../../teacherComponents/groupComponents/assignsComponentView/innerComponents/unitRender/UnitRender'
import { SelectedEditComponentWithIDS } from '../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { MdGrade } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import done from '../../../assets/svg/no_assigns_more.svg';
import AuthContext from '../../../contexts/authContext/AuthContext'

export const StudentGradesComponent = () => {

    const { classAsigments, classUnits, classUnitsOpt } = useHomeworkContext();
    const [unitSearched, setunitSearched] = useState('');
    const navigate = useNavigate();
    const { classId } = useParams();
    const { state } = useContext(AuthContext);

    const handleUnitFilter = (name: any, value: any)=> {
        if(value == undefined){
            setunitSearched('');
        }else{
            setunitSearched(value);
        }
    }

    return (
        <div className='maxGradContainerStudent'>
            <div className="headerGrad">
                <div className="selectorUnitFilter">
                    <SelectedEditComponentWithIDS id={''} name={''} editActive={true} label={'Filtrar por Unidad'} value={unitSearched} opts={classUnitsOpt} isClearable={true} onChange={handleUnitFilter}/>
                </div>
                <button onClick={() => navigate(`/student/classes/${classId}/grades`)}>
                    <MdGrade />
                    Ver Calificaciones
                </button>
            </div>
            <div className="gradStudentBody">
                {
                    unitSearched == '' ?
                        classAsigments
                        .filter((homework) => homework.Fk_Unidad === null).length > 0
                        ?      <div className="noUnitWorks">
                                {
                                    classAsigments
                                    .filter((homework) => homework.Fk_Unidad === null)
                                    .map((homework) => (
                                        <HomeworkRender homework={homework} key={homework.ID_Actividad}/>
                                    ))
                                }
                            </div>
                        :   <></>
                    : <></>
                }

                {
                    classUnits.length > 0
                    ?   classUnits
                        .filter((unit) => {
                            if(unitSearched != ''){
                                return unit.ID_Unidad = unitSearched;
                            }else{
                                return true;
                            }
                        })
                        .map((unit, index) => (
                            <UnitRender unit={unit} key={`unitrender-${index}`}/>
                        ))
                    :   <div className='noDataContainer'>
                            {
                                state.loggedUser?.Rol == 'Profesor'
                                ?   <>Teacher</>
                                :   <>
                                        <p>El profesor no ha añadido ninguna tarea</p>
                                        <img src={done}/>
                                    </>
                            }
                        </div>
                }   
            </div>
        </div>
    )
}
