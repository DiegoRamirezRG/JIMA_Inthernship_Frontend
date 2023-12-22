import React from 'react'
import './CycleManagmentComponent.scss'
import { ColorArray } from '../../../utils/colorRandom/ColorArrayRandom'
import { useNavigate } from 'react-router-dom'
import { useEndCycleSchoolarContext } from '../../../contexts/endCycleSchoolar/EncCycleSchoolarContext'

export const CycleManagmentComponent = () => {

    const navigate = useNavigate();
    const { handleEndCycleModal } = useEndCycleSchoolarContext();

    return (
        <div className='cycleManagmentCard'>
            <div className="innerRow">
                <p className='cardHeader'>Administracion de Ciclo</p>
            </div>
            <div className="managmentContainer">
                <button onClick={() => navigate('/admin_users')}>Gestionar Estudiantes</button>
                <button onClick={() => navigate('/admin_calendar')}>Gestionar Calendario</button>
                <button onClick={() => navigate('/admin_payments')}>Gestionar Pagos</button>
                <button onClick={ handleEndCycleModal }>Terminar Ciclo</button>
            </div>
        </div>
    )
}
