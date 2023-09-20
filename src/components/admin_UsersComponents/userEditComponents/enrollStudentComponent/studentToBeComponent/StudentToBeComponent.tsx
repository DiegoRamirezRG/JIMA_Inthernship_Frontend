import React, { useState } from 'react'
import './StudentToBeComponent.scss'
import { SelectedEditComponent } from '../../inputEditComponent/InputEditComponent';
import { optionSelect } from '../../../../../models/universalApiModels/UniversalApiModel';
import { useEnrollStudent } from '../../../../../hooks/admin_user/useEnrollStudent';
import { GradedStudentComponent } from './gradedStudentComponent/GradedStudentComponent';

interface CreateAspirante{
    handleModalState: () => void;
    careerOptions : optionSelect[];
}

export const StudentToBeComponent = ({ handleModalState, careerOptions }: CreateAspirante) => {

    const [showNewAspStudent, setShowNewAspStudent] = useState(true);

    const { 
        //Observers
        isEnrollEdited,

        //Data Changers
        handleEnrollEdit,

        //Data
        enrollState
    } = useEnrollStudent();

    return (
        <>
            <div className="pickerRegisterHow">
                <div className={`picker ${showNewAspStudent ? 'active' : ''}`} onClick={() => setShowNewAspStudent(true)}>Nuevo Ingreso</div>
                <div className={`picker ${showNewAspStudent ? '' : 'active'}`} onClick={() => setShowNewAspStudent(false)}>Personalizado</div>
            </div>
            {
                showNewAspStudent
                ?   <div className='innerEnrolledBody'>
                        <SelectedEditComponent opts={careerOptions} label='Carreras a elegir' editActive={true} id='asp_career_picker' name='ID_Career' value={enrollState.ID_Career ? enrollState.ID_Career : 'Seleccione una carrera'} onChange={handleEnrollEdit} key={'asp_career_picker'}/>
                        <button className='aspButtn' disabled = { !isEnrollEdited ? true : false } onClick={handleModalState}>Asignar</button>
                    </div>
                :   <GradedStudentComponent state={enrollState} handleState={handleEnrollEdit} careerOptions={careerOptions}/>
            }
        </>
    )
}
