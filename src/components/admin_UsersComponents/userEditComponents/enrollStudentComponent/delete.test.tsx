import React, { useEffect } from 'react'
import { DetailedAcademic } from '../interfaces/UserEditInterface'
import './EnrollStudentComponent.scss'
import { useEnrollStudent } from '../../../../hooks/admin_user/useEnrollStudent'
import { SelectedEditComponent } from '../inputEditComponent/InputEditComponent'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent'
import { useCareers } from '../../../../hooks/careers/useCareers'
import { StudentToBeComponent } from './studentToBeComponent/StudentToBeComponent'
import { StudentRegisteredComponent } from './studentRegisteredComponent/StudentRegisteredComponent'

export const EnrollStudentComponent = ({ isEditing, handleActiveEdit, user, user_id, RolData }: DetailedAcademic) => {
    
    const { 
        //loaders
        isGettingInfoLoading,

        //Oberserver
        isEnrollEdited,

        //Data Getters
        getInitialStudentData,

        //Data
        studentData,
        enrollState,

        //Data Handler
        handleEnrollEdit,
    } = useEnrollStudent();

    const {
        //Loader
        isGettingInformationLoading,

        //Data
        careerOptions,
    } = useCareers();


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
                                    ? <StudentRegisteredComponent/>
                                    : 'Informacion Academica'
                                }
                            </>
                        :   <StudentToBeComponent careerOptions={careerOptions!} handleEdit={handleEnrollEdit} isEditing={isEditing} observer={isEnrollEdited}/>
                    }
                </div>
        }
        </>
    )
}
