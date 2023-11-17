import React, { useEffect, useState } from 'react'
import './WizardSubjectModal.scss'
import { IoClose } from 'react-icons/io5'
import { usePlanMakerContext } from '../../../../contexts/planMakerContext/PlanMakerContext'
import { ToggleSwitchInput } from '../../../generalComponents/toggleSwitch/ToggleSwitchInput'
import { optionSelect } from '../../../../models/universalApiModels/UniversalApiModel'
import { SelectedEditComponentWithIDS } from '../../../admin_UsersComponents/userEditComponents/inputEditComponent/InputEditComponent'
import { reqSubject } from '../../../../models/subjectsModels/SubjectModels'
import { useSubjectsContext } from '../../../../contexts/subjectContext/SubjectsContext'

export const WizardSubjectModal = () => {

    const {selectedSubject, numberOfCycle, addNewSubject, handleConfirmSetupModal, ciclesState} = usePlanMakerContext();
    const { excludeAdded } = useSubjectsContext();
    const [require, setRequire] = useState<boolean>(false);
    const [reqOpts, setReqOpts] = useState<optionSelect[] | null>(null);
    const [selectedReq, setselectedReq] = useState<reqSubject>({
        id_req: ''
    })

    const handleReqSelect = (name: keyof reqSubject, value: any) => {
        setselectedReq((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleRequire = () => {
        setRequire(!require);
    }

    const handleConfirm = async () => {
        await addNewSubject(selectedSubject!, numberOfCycle!, require, selectedReq.id_req);
        setRequire(false);
        setselectedReq({id_req: ''})
        handleConfirmSetupModal();
    }

    const filterTheSubjectsShow = (): Promise<string[]> => {
        return new Promise((resolve) => {
            let temp: string[] = [];
            for (const indice in ciclesState) {
                if (Object.prototype.hasOwnProperty.call(ciclesState, indice)) {
                // Recorrer el arreglo en el índice actual
                    ciclesState[indice].forEach((subject) => {
                        temp.push(subject.ID_Materia);
                    });
                }
            }        
            resolve(temp);
        })
    }

    const helpFilterToReq = () => {
        setReqOpts(() => {
            const helperFilter: optionSelect[] = [];
            for (let i = 0; i < numberOfCycle!; i++) {
                if(ciclesState[i]){
                    ciclesState[i].forEach(objeto => {
                        helperFilter.push({ value: objeto.ID_Materia, label: objeto.Nombre });
                    });
                }
            }
            return helperFilter;
        })
    }

    useEffect(() => {
        if(require){
            helpFilterToReq();
        }
    }, [require]);

    useEffect(() => {
        const awaitF = async() => {
            const helper = await filterTheSubjectsShow();
            excludeAdded(helper);
        }
        awaitF()
    }, [ciclesState])
    

    return (
        <div className='modal-content'>
            <div className="modal-header">
                <h5>Confirmacion</h5>
                <button className='modal-btn-close' onClick={ () => { handleConfirmSetupModal(); setRequire(false)} }>
                    <IoClose/>
                </button>
            </div>
            <div className="modal-body">
                <div className="wizardInitContent">
                    <div className="warningConfirm">
                        <div className="confirmationMessage">
                            <p>Estas agregando la siguiente asignatura a el ciclo numero {numberOfCycle! + 1}:</p>
                        </div>
                        <div className="subjectInformation">
                            <div className="innerCardContainer">
                                <p className='title-subject'>{selectedSubject?.Nombre}</p>
                                <div className="contentInnerRow">
                                    <p><b>Creditos:</b> {selectedSubject?.Creditos}</p>
                                    <p><b>Horas/Semana:</b> {selectedSubject?.Horas_De_Clase}</p>
                                </div>
                            </div>
                        </div>
                        <div className="thisHasBeforeRequirement">
                            <div className="toggleContainer">
                                <p>Requiere asignatura anterior</p>
                                <ToggleSwitchInput active={require} changeActive={handleRequire} disable={numberOfCycle === 0}/>
                            </div>
                            {
                                require
                                ?    <div className="pickerContainer">
                                        <SelectedEditComponentWithIDS id={'reqIdsSelect'} name={'id_req'} editActive={true} label={'Selecciona la materia requerida'} value={selectedReq.id_req} opts={reqOpts!= null ? reqOpts : []} onChange={handleReqSelect}/>
                                    </div>
                                :   <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="modal-footer">
                <button onClick={ handleConfirm }>Guardar</button>
                <button onClick={ () => { handleConfirmSetupModal(); setRequire(false)} }>Cerrar</button>
            </div>
        </div>
    )
}
