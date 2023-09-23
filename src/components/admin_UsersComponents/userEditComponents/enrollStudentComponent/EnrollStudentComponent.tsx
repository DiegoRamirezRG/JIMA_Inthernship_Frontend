import React, { useEffect } from 'react'
import './EnrollStudentComponent.scss'
import { DetailedAcademicStudent } from '../interfaces/UserEditInterface'
import { useCareers } from '../../../../hooks/careers/useCareers';
import { useEnrollStudent } from '../../../../hooks/admin_user/useEnrollStudent';
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';
import { StudentRegisteredComponent } from './studentRegisteredComponent/StudentRegisteredComponent';
import { StudentToBeComponent } from './studentToBeComponent/StudentToBeComponent';

export const EnrollStudentComponent = ({ user_id, user, RolData }: DetailedAcademicStudent) => {

    const {
        isGettingInformationLoading,
        careerOptions,
        careerActiveOptions
    } = useCareers();

    const {
        studentData,
        enrollState,
        getInitialStudentData,
        isGettingInfoLoading,
        isEnrollEdited,
        handleEnrollEdit,
        makeAspiranteLoader,
        registerStudentAspirante,
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
                isGettingInfoLoading
                ?   <LoadingComponent/>
                :   <div>
                        <div className="internalHeader">
                            <p className='internalTitle'>
                                {
                                    studentData
                                    ?   <>
                                            {
                                                "ID_Aspirante" in studentData
                                                ? <></> //Aspirante creado
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
                                        ? <StudentRegisteredComponent studentData={studentData} allCareersOptions={careerOptions!}/> //Acciones de Aspirante
                                        : 'Informacion Academica' //Acciones de estudiante ya con grupo y la shingada
                                    }
                                </>
                            :   ! isGettingInformationLoading
                                ?   <StudentToBeComponent careerOptions={careerActiveOptions!} allCareersOptions={careerOptions!} registerStudentAspirante={registerStudentAspirante} student_id={RolData.ID_Estudiante} user_id={user_id} loader={makeAspiranteLoader} enrollState={enrollState} isEnrollEdited={isEnrollEdited} handleEnrollEdit={handleEnrollEdit}/>
                                :   <LoadingComponent/>
                        }
                    </div>
            }
        </>
    )
}
