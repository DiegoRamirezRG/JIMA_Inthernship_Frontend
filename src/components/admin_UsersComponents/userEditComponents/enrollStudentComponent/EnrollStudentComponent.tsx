import React, { useEffect } from 'react'
import './EnrollStudentComponent.scss'
import { DetailedAcademicStudent } from '../interfaces/UserEditInterface'
import { useCareers } from '../../../../hooks/careers/useCareers';
import { useEnrollStudent } from '../../../../hooks/admin_user/useEnrollStudent';
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';
import { StudentRegisteredComponent } from './studentRegisteredComponent/StudentRegisteredComponent';
import { StudentToBeComponent } from './studentToBeComponent/StudentToBeComponent';

export const EnrollStudentComponent = ({ user_id, user, RolData, handleModalState }: DetailedAcademicStudent) => {

    const {
        isGettingInformationLoading,
        careerOptions,
    } = useCareers();

    const {
        studentData,
        enrollState,
        getInitialStudentData,
        isGettingInfoLoading,
    } = useEnrollStudent();

    useEffect(() => {
        const awaitFunc = async () => {
            await getInitialStudentData(user_id);
        }

        awaitFunc();
    }, [])

    return (
        <>
            {
                isGettingInfoLoading || isGettingInformationLoading
                ?   <LoadingComponent/>
                :   <div>
                        <div className="internalHeader">
                            <p className='internalTitle'>
                                {
                                    studentData
                                    ?   <>
                                            {
                                                "ID_Aspirante" in studentData
                                                ? 'Aspirante'
                                                : 'Informacion Academica'
                                            }
                                        </>
                                    :   'Crear Aspirante'
                                }
                            </p>
                        </div>
                        {
                            studentData
                            ?   <>
                                    {
                                        "ID_Aspirante" in studentData
                                        ? <StudentRegisteredComponent/> //Acciones de Aspirante
                                        : 'Informacion Academica' //Acciones de estudiante ya con grupo y la shingada
                                    }
                                </>
                            :   <StudentToBeComponent handleModalState={handleModalState} careerOptions={careerOptions!}/>
                        }
                    </div>
            }
        </>
    )
}
