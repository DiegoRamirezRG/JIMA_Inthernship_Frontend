import React, { useState } from 'react'
import './EndTheCycleModal.scss'
import { IoClose } from 'react-icons/io5'
import { useEndCycleSchoolarContext } from '../../../contexts/endCycleSchoolar/EncCycleSchoolarContext';

export const EndTheCycleModal = () => {

    const { handleEndCycleModal, handleCompletelySureModal} = useEndCycleSchoolarContext();
    const [readConfirm, setReadConfirm] = useState(false);
    const [understandConfirm, setUnderstandConfirm] = useState(false);

    const handleClose = () => {
        setReadConfirm(false);
        setUnderstandConfirm(false);
        handleEndCycleModal();
    }

    return (
        <div className='maxEndCycleContainer'>
            <div className="header">
                <h2>Terminar ciclo escolar</h2>
                <button className='cancel-btn' onClick={handleEndCycleModal}>
                    <IoClose/>
                </button>
            </div>
            <div className="disclaimers">
                <p>Usted esta apunto de terminar con el ciclo escolar bajo el calendario de *Nombre del calendario* lo cual pasara lo siguiente</p>
                <ol>
                    <li>Se desactivaran todas las clases de profesores, lo cual los profesores no podran crear asignaciones, calificar las mimas y toma de asistencia.</li>
                    <li>Se desactivaran todas las clases de estudiantes, lo cual los estudiantes no podran anexar / entregar ninguna asignacion.</li>
                    <li>Se desactivaran todos los perfiles de estudiante.</li>
                    <li>El calendario seguira activo hasta que cumpla su fecha de termino.</li>
                    <li>Los estudiantes podran ser reinscritos e inscritos nuevamente al siguiente ciclo escolar.</li>
                </ol>
                <p>Al realizar esta accion quedara guardado en la tabla de bitacoras, esta usted completamente conciente del proceso que esta por realizar?</p>
            </div>
            <div className="checkers">
                <div className="inputContainer">
                    <input type="checkbox" id="iRead" checked={readConfirm} onClick={() => setReadConfirm(!readConfirm)}/>
                    <label htmlFor="iRead">He leido lo anterior</label>
                </div>
                <div className="inputContainer">
                    <input type="checkbox"id="iKnow" checked={understandConfirm} onClick={() => setUnderstandConfirm(!understandConfirm)}/>
                    <label htmlFor="iKnow">Se lo que estoy por realizar</label>
                </div>
            </div>
            <div className="actions">
                <button className='cancel-btn' onClick={handleClose}>Cancelar</button>
                <button className='warning-btn' onClick={handleCompletelySureModal} disabled = {!readConfirm || !understandConfirm}>Terminar Ciclo</button>
            </div>
        </div>
    )
}
