import React from 'react'
import './LastCycleYearStudentsCard.scss';
import { IoArrowForwardOutline } from 'react-icons/io5';

interface innerProps {
    data: filteredData
}

interface filteredData {
    grado: number;
    grupo: string;
    turno: string;
    carrera: string;
    siguienteGrado: number | null;
    cantidadAlumnos: number;
}

export const LastCycleYearStudentsCard = ({ data }: innerProps) => {
    return (
        <div className='lastYearStudents'>
            <p className='career_name'> {data.carrera} </p>
            <div className="information">
                <p>Alumnos: { data.cantidadAlumnos }</p>
                <p>Turno: {data.turno} </p>
                <p>Grupo: {data.grupo} </p>
                <p>Grado: {data.grado} </p>
            </div>
            <div className="innerRow">
                <div className="innerCol">
                    <p>Grado Actual</p>
                    <p>{data.grado}</p>
                </div>
                <div className="icon">
                    <IoArrowForwardOutline />
                </div>
                <div className="innerCol">
                    <p>Siguiente Grado</p>
                    <p>{data.siguienteGrado}</p>
                </div>
            </div>
        </div>
    )
}
