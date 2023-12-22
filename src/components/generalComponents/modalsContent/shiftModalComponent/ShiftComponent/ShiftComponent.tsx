import React from 'react'
import './ShiftComponent.scss'
import { IoSettingsSharp } from 'react-icons/io5'
import { Shift } from '../../../../../models/schoolInfoModels/schoolInfoModels'

interface ShiftComponentInterface{
    shift: Shift;
    loadShift: (shift: Shift) => void;
    disable: boolean;
    creating: boolean;
}

export const ShiftComponent = ({ shift, loadShift, disable, creating } : ShiftComponentInterface) => {
    return (
        <div className='shiftContainer' >
            <div className="shiftHeaderSection">
                <p>Turno</p>
                <IoSettingsSharp className={`configIcon ${disable || creating ? 'disable' : ''}`} onClick={() => loadShift(shift)}/>
            </div>
            <div className="shiftNameSection">
                <p>{shift.Nombre}</p>
            </div>
            <div className="clockersSection">
                <div className="clocker-section">
                    <div className="clocker">
                        <p>{parseInt(shift.Hora_Inicio.split(':')[0]) > 12 ? (parseInt(shift.Hora_Inicio.split(':')[0]) - 12).toString() : shift.Hora_Inicio.split(':')[0].split('')[1]}:{shift.Hora_Inicio.split(':')[1]}</p>
                    </div>
                    <div className="indicator">
                        <p>{parseInt(shift.Hora_Inicio.split(':')[0]) < 12 ? 'AM' : 'PM'}</p>
                    </div>
                </div>
                <div className="clockDivider">
                    <p>A</p>
                </div>
                <div className="clocker-section">
                    <div className="clocker">
                        <p>{parseInt(shift.Hora_Fin.split(':')[0]) > 12 ? (parseInt(shift.Hora_Fin.split(':')[0]) - 12).toString() : shift.Hora_Fin.split(':')[0]}:{shift.Hora_Fin.split(':')[1]}</p>
                    </div>
                    <div className="indicator">
                        <p>{parseInt(shift.Hora_Fin.split(':')[0]) < 12 ? 'AM' : 'PM'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
