import React, { useState } from 'react'
import './StudentToBeComponent.scss'
import { SelectedEditComponent } from '../../inputEditComponent/InputEditComponent';
import { optionSelect } from '../../../../../models/universalApiModels/UniversalApiModel';
import { useEnrollStudent } from '../../../../../hooks/admin_user/useEnrollStudent';
import { GradedStudentComponent } from './gradedStudentComponent/GradedStudentComponent';
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';
import { customStudentToBe } from '../../../../../models/enrollModels/EnrollModels';

interface CreateAspirante{
    careerOptions : optionSelect[];
    allCareersOptions: optionSelect[];
    registerStudentAspirante: (student_id: string, user_id: string, careers: optionSelect[]) => Promise<void>;
    user_id: string;
    student_id: string;
    loader: boolean;
    isEnrollEdited: boolean;
    handleEnrollEdit: (name: keyof customStudentToBe, value: string) => void;
    enrollState: customStudentToBe;
    enrollCustom: (user_id: string) => void;
}

export const StudentToBeComponent = ({ careerOptions, allCareersOptions, registerStudentAspirante, student_id, user_id, loader, enrollState, handleEnrollEdit, isEnrollEdited, enrollCustom }: CreateAspirante) => {

    const [showNewAspStudent, setShowNewAspStudent] = useState(true);

    return (
        <>
            {
                !loader
                ?   <>
                        <div className="pickerRegisterHow">
                            <div className={`picker ${showNewAspStudent ? 'active' : ''}`} onClick={() => setShowNewAspStudent(true)}>Nuevo Ingreso</div>
                            <div className={`picker ${showNewAspStudent ? '' : 'active'}`} onClick={() => setShowNewAspStudent(false)}>Personalizado</div>
                        </div>
                        {
                            showNewAspStudent
                            ?   <div className='innerEnrolledBody'>
                                    <SelectedEditComponent opts={careerOptions} label='Carreras a elegir' editActive={true} id='asp_career_picker' name='ID_Career' value={enrollState.ID_Career ? enrollState.ID_Career : 'Seleccione una carrera'} onChange={handleEnrollEdit} key={'asp_career_picker'}/>
                                    <button className='aspButtn' disabled = { !isEnrollEdited ? true : false } onClick={() => registerStudentAspirante(student_id, user_id, careerOptions)}>Asignar</button>
                                </div>
                            :   <GradedStudentComponent state={enrollState} handleState={handleEnrollEdit} careerOptions={allCareersOptions} enrollCustom={enrollCustom} student_id={student_id} user_id={user_id}/>
                        }
                    </>
                : <LoadingComponent/>
            }
        </>
    )
}
