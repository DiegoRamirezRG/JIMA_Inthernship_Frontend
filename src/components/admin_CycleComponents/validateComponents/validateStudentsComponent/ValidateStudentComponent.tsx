import React, { useEffect } from 'react'
import './ValidateStudentComponent.scss'
import { useStudentContext } from '../../../../contexts/studentContext/StudentContext'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';
import { NoLastYearStudent } from './innerComponents/noLastYearStuends/NoLastYearStudent';

export const ValidateStudentComponent = () => {

    const { lastYearLoader, lastYearStudents, getLastYearStudents } = useStudentContext();

    useEffect(() => {
        const awiatF = async () => {
            await getLastYearStudents();
        }

        awiatF();
    }, [])

    return (
        <div className='validateStudentsContainer'>
            {
                lastYearLoader
                ?   <LoadingComponent/>
                :   <div className='innerValidateStudentContainer'>
                        <div className="studentValidatorHeader">
                            <h2>Tienes los siguientes estudiantes para el nuevo ciclo</h2>
                        </div>
                        <div className="contentValidatorStudentContainer">
                            {
                                lastYearStudents.lenght > 0 
                                ?   <>Data</>
                                :   <NoLastYearStudent/>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
