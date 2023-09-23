import React, { useEffect } from 'react'
import './GradedStudentComponent.scss'
import { useSchoolInfo } from '../../../../../../hooks/school_information/useSchoolInfo';
import { LoadingComponent } from '../../../../../generalComponents/loadingComponent/LoadingComponent';
import { SelectedEditComponentWithAddBtn } from '../../../inputEditComponent/InputEditComponent';
import { customStudentToBe } from '../../../../../../models/enrollModels/EnrollModels';
import { optionSelect } from '../../../../../../models/universalApiModels/UniversalApiModel';
import { useCreateCareerModalContext } from '../../../../../../contexts/modals_states/careerModal/createCareerContext';
import { useShiftModalContext } from '../../../../../../contexts/modals_states/shiftModal/shiftModalContext';

interface customStudent{
    state: customStudentToBe;
    handleState: (name: keyof customStudentToBe, value: string) => void;
    careerOptions : optionSelect[];
}

export const GradedStudentComponent = ({ state, handleState, careerOptions }: customStudent) => {

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

    useEffect(() => {
        const asyncFunc = async () => {
            await getInitialData();
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
                            <SelectedEditComponentWithAddBtn addBtnAction={() => {}} editActive={true} id='tobeGrade' label='Grado' name='ID_Grado' value={state.ID_Grado} onChange={handleState} opts={selectGradesData} key={'tobeGrade'}/>
                            <SelectedEditComponentWithAddBtn addBtnAction={() => {}} editActive={true} id='tobeGroup' label='Grupo' name='ID_Grupo' value={state.ID_Grupo} onChange={handleState} opts={selectGroupsData} key={'tobeGroup'}/>
                            <SelectedEditComponentWithAddBtn addBtnAction={changeCareerModalState} editActive={true} id='tobeCareer' label='Carrera' name='ID_Career' value={state.ID_Career} onChange={handleState} opts={careerOptions} key={'tobeCareer'}/>
                        </div>
                        <div className="crateCustomStudent">
                            <button onClick={() => {}}>Confirmar Ingreso</button>
                        </div>
                    </>
            }
        </div>
    )
}
