import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5';
import { useCreateGradeModal } from '../../../../contexts/modals_states/gradeModal/gradeModal';
import './GradeModalComponent.scss';
import { useSchoolInfo } from '../../../../hooks/school_information/useSchoolInfo';
import { Grade } from '../../../../models/schoolInfoModels/schoolInfoModels';
import { InputEditComponent } from '../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent';
import { GradeCardComponent } from './gradeCardComponent/GradeCardComponent';
import { LoadingComponent } from '../../loadingComponent/LoadingComponent';

export const GradeModalComponent = () => {

    const { changeGradeModalState } = useCreateGradeModal();
    const { gradesState, getInitialData, handleEditGrade, isGradeEditing, hanldeCancelGradeEditing, handleLoadGradeForEdit, isGettingInitDataLoading, createOrEditGrade, generalLoader, createNewGrade, sendUpdateGrade } = useSchoolInfo();

    useEffect(() => {
        const awaitFunc = async () => {
            await getInitialData();
        }
        awaitFunc();
    }, [])

    return (
        <>
            {
                isGettingInitDataLoading
                ?   <LoadingComponent/>
                :   <div className='modal-content'>
                        <div className="modal-header">
                            <h5>Administracion de Grados</h5>
                            <button className='modal-btn-close' onClick={changeGradeModalState}>
                                <IoClose/>
                            </button>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-body">
                            <div className="gradeInnerContainer">
                                
                                <div className="actionHeader">
                                    <div className="inputSection">
                                        <InputEditComponent editActive={true} id='gradeNumber' inputType='text' label='Grado' name='Numero' placeholder='Grado' value={createOrEditGrade.Numero!= null ? createOrEditGrade.Numero!.toString() : ''} key={'gradeNumber'} onChange={handleEditGrade}/>
                                    </div>
                                    <button className='success' onClick={isGradeEditing ? sendUpdateGrade : createNewGrade}>{isGradeEditing ? 'Actualizar': 'Crear'}</button>
                                    <button className='danger' onClick={hanldeCancelGradeEditing}>Cancelar</button>
                                </div>

                                <div className="gradesContainer">
                                    {
                                        generalLoader
                                        ? <LoadingComponent/>
                                        :   gradesState?.map((grade: Grade) => (
                                                <GradeCardComponent grade={grade} isAlreadyEditing={isGradeEditing} loadData={handleLoadGradeForEdit} key={grade.ID_Grado}/>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="modal-footer">
                            <button onClick={changeGradeModalState}>Cerrar</button>
                        </div>
                    </div>
            }
        </>
    );
}