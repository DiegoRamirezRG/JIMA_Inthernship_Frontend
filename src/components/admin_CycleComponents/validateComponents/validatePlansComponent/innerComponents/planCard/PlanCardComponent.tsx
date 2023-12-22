import React from 'react'
import './PlanCardComponent.scss'
import { CareerPlansActives } from '../../../../../../models/careerPlansModels/CareerPlansModels';
import moment from 'moment';

interface planActiveProps{
    data: CareerPlansActives;
    change? : any
}

export const PlanCardComponent = ({ data, change } : planActiveProps) => {
    return (
        <div className='plan-card-component' onClick={change ? () => change(data.ID_Carrera)  : () => {}}>
            <div className="plan-content">
                <p className='car_title'>{data.Nombre}</p>
                <div className="innerRow">
                    <p><b>Ciclos:</b> {data.Numero_De_Ciclos}</p>
                    <p><b>Duracion:</b> {data.Duracion_Mensual_De_Ciclos} mes(s)</p>
                </div>
                <div className="innerRow">
                    <p><b>Creditos:</b> {data.creditos}</p>
                    <p><b>Materias:</b> {data.numMaterias}</p>
                </div>
            </div>
            <div className="plan-indicator">
                Creado: {moment(data.Creado_En).format('MM/YYYY')}
            </div>
        </div>
    )
}
