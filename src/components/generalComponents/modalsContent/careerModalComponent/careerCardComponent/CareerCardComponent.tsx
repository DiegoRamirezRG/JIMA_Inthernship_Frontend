import React from 'react'
import './CareerCardComponent.scss';
import { CareerModel } from '../../../../../models/careersModels/CareersModel';
import { MdModeEdit } from 'react-icons/md'
import { showErrorTost } from '../../../toastComponent/ToastComponent';

interface CareerCardProps{
    career: CareerModel;
    selectCareerToEdit: (career: CareerModel) => void;
    editing: boolean;
}

export const CareerCardComponent = ({ career, selectCareerToEdit, editing } : CareerCardProps) => {
    return (
        <div className='CardContainer'>
            <div className="infoSection">
                <h3>{career.Nombre}</h3>
                <div className="row">
                    <p><b>Ciclos:</b> {career.Numero_De_Ciclos}</p>
                    <p><b>Duracion de ciclos:</b> {career.Duracion_Mensual_De_Ciclos} (mes)</p>
                </div>
                <div className="row">
                    <p><b>ID:</b> {career.ID_Carrera}</p>
                </div>
            </div>
            <div className="editSection">
                <div className="icon" onClick={!editing ? () => selectCareerToEdit(career) : () => showErrorTost({position: 'top-right', text: 'Se encuentra editando una carrera'})}>
                    <MdModeEdit/>
                </div>
            </div>
        </div>
    )
}
