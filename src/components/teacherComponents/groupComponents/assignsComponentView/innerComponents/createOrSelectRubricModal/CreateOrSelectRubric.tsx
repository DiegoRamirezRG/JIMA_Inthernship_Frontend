import React, { useState } from 'react'
import './CreateOrSelectRubric.scss'
import { PickRubricComp } from './innerComponents/pickRubricComp/PickRubricComp'
import { IoArrowForwardOutline } from 'react-icons/io5';
import { useHomeworkContext } from '../../../../../../contexts/homeworkContext/HomeworkContext';
import { CreateRubricComp } from './innerComponents/createRubricComp/CreateRubricComp';
import { LoadingComponent } from '../../../../../generalComponents/loadingComponent/LoadingComponent';

export const CreateOrSelectRubric = () => {

    const { createOrPickSlide, handleCreateOrPickSlide, rubricCreateLoading } = useHomeworkContext();

    return (
        <div className='createOrSelectRubricContainer'>
            {
                rubricCreateLoading
                ?   <div className='loader-container'>
                        <LoadingComponent/>
                        <p className='message'>Creando Rubrica</p>
                    </div>
                :   <>
                        <div className={`changeViewBtn ${createOrPickSlide ? 'pick' : 'create'}`} onClick={() => handleCreateOrPickSlide(createOrPickSlide  ? 'create' : 'pick')}>
                            <p>{createOrPickSlide ? 'Seleccionar' : 'Crear'}</p>
                            <IoArrowForwardOutline className='helper_icon'/>
                        </div>
                        <div className={`pickContainer ${createOrPickSlide ? 'hide' : 'show'}`}>
                            <PickRubricComp/>
                        </div>
                        <div className={`createContainer ${createOrPickSlide ? 'show' : 'hide'}`}>
                            <CreateRubricComp/>
                        </div>
                    </>
            }
        </div>
    )
}
