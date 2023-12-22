import React, { useEffect } from 'react'
import './GradedStudentComponent.scss'
import { useSchoolInfo } from '../../../../../../hooks/school_information/useSchoolInfo';
import { LoadingComponent } from '../../../../../generalComponents/loadingComponent/LoadingComponent';
import { SelectedEditComponentWithAddBtn } from '../../../inputEditComponent/InputEditComponent';
import { customStudentToBe } from '../../../../../../models/enrollModels/EnrollModels';
import { optionSelect } from '../../../../../../models/universalApiModels/UniversalApiModel';
import { useCreateCareerModalContext } from '../../../../../../contexts/modals_states/careerModal/createCareerContext';
import { useShiftModalContext } from '../../../../../../contexts/modals_states/shiftModal/shiftModalContext';
import { useCreateGradeModal } from '../../../../../../contexts/modals_states/gradeModal/gradeModal';
import { useGroupCreateModalContext } from '../../../../../../contexts/modals_states/groupModal/groupModal';
import { ModalComponent } from '../../../../../generalComponents/modalComponent/ModalComponent';
import { useConfrimCustomModalContext } from '../../../../../../contexts/modals_states/confirmCustomEnrollModal/confirmCustomEnrollModal';
import { CustomConfirmModalComponent } from '../../../../../generalComponents/modalsContent/customConfirmComponent/CustomConfirmModalComponent';

interface customStudent{
    state: customStudentToBe;
    handleState: (name: keyof customStudentToBe, value: string) => void;
    careerOptions : optionSelect[];
    enrollCustom: (user_id: string) => void;
    student_id: string;
    user_id: string;
}

export const GradedStudentComponent = ({ state, handleState, careerOptions, enrollCustom, student_id, user_id }: customStudent) => {

    const { 
        //Select Data
        selectShiftData,
        selectGradesData,
        selectGroupsData,

        //Loaders
        isGettingInitDataLoading,

        //Get Data
        getInitialData,

    } = useSchoolInfo();

    const { changeCareerModalState } = useCreateCareerModalContext();
    const { changeShiftContextModalState } = useShiftModalContext();
    const { changeGradeModalState } = useCreateGradeModal();
    const { changeGroupModalState } = useGroupCreateModalContext();
    const { changeConfirmCustomModalState, confirmCustomModalState } = useConfrimCustomModalContext();

    useEffect(() => {
        const asyncFunc = async () => {
            await getInitialData();
            handleState('ID_Student', student_id);
        }
        asyncFunc();
    }, [])
    

    return (
        <div className='customStudentRegister'>
            {
                isGettingInitDataLoading
                ?   <LoadingComponent/>
                :   <>
                        <div className='innerContentContainer'>
                            <SelectedEditComponentWithAddBtn addBtnAction={changeShiftContextModalState} editActive={true} id='tobeShift' label='Turno' name='ID_Turno' value={state.ID_Turno} onChange={handleState} opts={selectShiftData} key={'tobeShift'}/>
                            <SelectedEditComponentWithAddBtn addBtnAction={changeGradeModalState} editActive={true} id='tobeGrade' label='Grado' name='ID_Grado' value={state.ID_Grado} onChange={handleState} opts={selectGradesData} key={'tobeGrade'}/>
                            <SelectedEditComponentWithAddBtn addBtnAction={changeGroupModalState} editActive={true} id='tobeGroup' label='Grupo' name='ID_Grupo' value={state.ID_Grupo} onChange={handleState} opts={selectGroupsData} key={'tobeGroup'}/>
                            <SelectedEditComponentWithAddBtn addBtnAction={changeCareerModalState} editActive={true} id='tobeCareer' label='Carrera' name='ID_Career' value={state.ID_Career} onChange={handleState} opts={careerOptions} key={'tobeCareer'}/>
                        </div>
                        <div className="crateCustomStudent">
                            <button onClick={changeConfirmCustomModalState}>Confirmar Ingreso</button>
                        </div>
                        <ModalComponent modalState={confirmCustomModalState} handleModalState={changeConfirmCustomModalState}>
                            <CustomConfirmModalComponent user_id={user_id} confirmAction={() => enrollCustom(user_id)} cancelAction={changeConfirmCustomModalState} text={
                                <>  
                                    <p>Está seguro de que va a registrar al estudiante. Una vez registrado, el estudiante aparecerá en las listas correspondientes.</p>
                                    <p>En caso de estar a mitad del ciclo, tenga en cuenta que se le asignarán todas las actividades pasadas que no ha entregado.</p>
                                    <p>Esto puede afectar su calificación en el sistema, por lo que le recomendamos encarecidamente que se ponga al día con las tareas pendientes para asegurar un buen rendimiento académico.</p>
                                    <p>¿Esta seguro de registrar al estudiante?</p>
                                </>
                            }/>
                        </ModalComponent>
                    </>
            }
        </div>
    )
}
