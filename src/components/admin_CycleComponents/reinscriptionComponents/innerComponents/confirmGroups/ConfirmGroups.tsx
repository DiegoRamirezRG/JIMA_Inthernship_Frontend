import React, { useEffect, useState } from 'react'
import './ConfirmGroups.scss'
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent'
import { useStudentContext } from '../../../../../contexts/studentContext/StudentContext';
import { LastYeatStudentsObj } from '../../../../../models/studentModels/StudentModel';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext';
import { confirmedInsGroup } from '../../../../../models/reins_inscrModels/InscriptionModels';

export const ConfirmGroups = () => {

    const { lastYearStudents } = useStudentContext();
    const { handleUserListModal, confirmedGroups, addToConfirmedGroups, removeConfirmedGroup, addAllConfirmedGroups } = useReinsInscrContext();

    const [lastYearStudentMapped, setLastYearStudentMapped] = useState<ReturnType<typeof filterData> | null>(null);

    const filterData = (data: LastYeatStudentsObj[]) => {
        const carreras: Record<string, Record<string, Record<string, Record<string, {
            grado: number;
            grupo: string;
            turno: string;
            carrera: string;
            siguienteGrado: number | null;
            cantidadAlumnos: number;
            idsEstudiantes: string[];
            id_carrera: string;
            id_turno: string;
            id_grupo: string;
        }>>>> = {};

        data.forEach(item => {
            const carreraId = item.FK_Carrera;
            const turnoId = item.FK_Turno;
            const gradoId = item.FK_Grado;
            const grupoId = item.FK_Grupo;

            if (!carreras[carreraId]) {
                carreras[carreraId] = {};
            }

            if (!carreras[carreraId][turnoId]) {
                carreras[carreraId][turnoId] = {};
            }

            if (!carreras[carreraId][turnoId][gradoId]) {
                carreras[carreraId][turnoId][gradoId] = {};
            }

            if (!carreras[carreraId][turnoId][gradoId][grupoId]) {
                carreras[carreraId][turnoId][gradoId][grupoId] = {
                    grado: item.Numero,
                    grupo: item.Indicador,
                    turno: item.Turno,
                    carrera: item.Carrera,
                    siguienteGrado: null,
                    cantidadAlumnos: 0,
                    idsEstudiantes: [],
                    id_carrera: item.ID_Carrera,
                    id_turno: item.ID_Turno,
                    id_grupo: item.ID_Grupo,
                };
            }

            const siguienteGrado = item.Numero + 1;
            carreras[carreraId][turnoId][gradoId][grupoId].siguienteGrado = siguienteGrado;
            carreras[carreraId][turnoId][gradoId][grupoId].cantidadAlumnos += 1;
            carreras[carreraId][turnoId][gradoId][grupoId].idsEstudiantes.push(item.ID_Estudiante);
        });

        return carreras;
    }

    useEffect(() => {
        setLastYearStudentMapped(filterData(lastYearStudents));
    }, [])
    

    return (
        <div className='confirmGroupsContainer'>
            {
                false
                ?   <LoadingComponent/>
                :   <div className="confirmGroupsInnerContainer">
                        <div className="confirmGroupsHeader">
                            <h2>Estos son los grupos del ciclo anterior a los cuales puedes hacerles reinscripcion</h2>
                        </div>
                        <div className="gridSectionContainer">
                            <div className="dynamicHeightContainer">
                                {
                                    lastYearStudentMapped && Object.keys(lastYearStudentMapped).length  != confirmedGroups.length
                                    ?   <div className="groupForReinscription_extra">
                                            <button onClick={() => addAllConfirmedGroups(lastYearStudentMapped)}>Confirmar todos los grupos</button>
                                        </div>
                                    :   <></>
                                }
                                {
                                    lastYearStudentMapped && Object.keys(lastYearStudentMapped).map(carreraId  => (
                                        Object.keys(lastYearStudentMapped[carreraId]).map(turnoId => (
                                            Object.keys(lastYearStudentMapped[carreraId][turnoId]).map(gradoId => (
                                                Object.keys(lastYearStudentMapped[carreraId][turnoId][gradoId]).map(grupoId => {
                                                    const datos = lastYearStudentMapped[carreraId][turnoId][gradoId][grupoId];
                                                    const filtered: confirmedInsGroup = {
                                                        nextGrade: datos.grado + 1,
                                                        grupo: datos.id_grupo,
                                                        turno: datos.id_turno,
                                                        carrera: datos.id_carrera,
                                                        idsEstudiantes: datos.idsEstudiantes,
                                                    }

                                                    let exist : confirmedInsGroup | boolean | undefined;

                                                    if(Array.isArray(confirmedGroups)){
                                                        exist =  confirmedGroups.find(item => (
                                                            item.nextGrade === filtered.nextGrade &&
                                                            item.grupo === filtered.grupo &&
                                                            item.turno === filtered.turno &&
                                                            item.carrera === filtered.carrera &&
                                                            JSON.stringify(item.idsEstudiantes) === JSON.stringify(filtered.idsEstudiantes)
                                                        ))
                                                    }else{
                                                        exist = false;
                                                    }

                                                    return (
                                                        <div className="groupForReinscription">
                                                            <p className='career_name'>{datos.carrera}</p>
                                                            <div className="innerRow">
                                                                <div className="innerCol">
                                                                    <p>Actual</p>
                                                                    <p>{datos.grado}</p>
                                                                </div>
                                                                <div className="icon">
                                                                    <IoArrowForwardOutline />
                                                                </div>
                                                                <div className="innerCol">
                                                                    <p>Proximo</p>
                                                                    <p>{datos.siguienteGrado}</p>
                                                                </div>
                                                            </div>
                                                            <div className="btnActionRow">
                                                                <button className='view_list' onClick={() => handleUserListModal(datos)}>Ver la lista</button>
                                                                <button className='confirm_group' onClick={() => addToConfirmedGroups(datos)}>Confirmar grupo</button>
                                                            </div>
                                                            {
                                                                exist != false && exist != undefined ?
                                                                <div className="floatingOpe">
                                                                    <p className='career_name'>{datos.carrera}</p>
                                                                    <p>Has confirmado el grupo</p>
                                                                    <button className='cancel-btn' onClick={() => removeConfirmedGroup(filtered)}>Cancelar confirmacion</button>
                                                                </div>
                                                                :   <></>
                                                            }
                                                            
                                                        </div>
                                                    )
                                                })
                                            ))
                                        ))
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
