import React, { useEffect, useState } from 'react'
import './LoadReinsSubjects.scss'
import { useReinsInscrContext } from '../../../../../contexts/reins_inscrContext/ReinsInscrContext'
import { LoadingComponent } from '../../../../generalComponents/loadingComponent/LoadingComponent';
import { LastYeatStudentsObj } from '../../../../../models/studentModels/StudentModel';
import { useStudentContext } from '../../../../../contexts/studentContext/StudentContext';
import { confirmedInsGroup } from '../../../../../models/reins_inscrModels/InscriptionModels';

export const LoadReinsSubjects = () => {

    const { confirmedGroups, getNextSubjects, groupNextSubjects, loadedGroups, addToLoadedGroup, removeLoadedGroup, loadAllGroups, handleShowSubjListModal } = useReinsInscrContext();
    const { lastYearStudents } = useStudentContext();
    const [loader, setLoader] = useState(true);
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
        setLoader(true);
        setLastYearStudentMapped(filterData(lastYearStudents));
        const awaitF = async () => {
            await getNextSubjects();
        } 

        awaitF()
        .then(() => {
            setLoader(false);
        })
        
    }, [confirmedGroups])

    return (
        <div className='loadReinsSubjectsContainer'>
            {
                loader
                ?   <LoadingComponent/>
                :   <div className='loadSubjectsRealContainer'>
                        <div className="loadSubjectsHeader">
                            <h2>Cargar materias de reinscripcion</h2>
                        </div>
                        <div className="renderingSubjects">
                            <div className="gridDynamicContainer">
                                {
                                    lastYearStudentMapped && Object.keys(lastYearStudentMapped).length  != loadedGroups.length
                                    ?   <div className="groupForReinscription_extra">
                                            <button onClick={() => loadAllGroups(lastYearStudentMapped)}>Cargar todas las materias</button>
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

                                                    const subjects = groupNextSubjects.find((obj) => (
                                                        obj.id_carrera == datos.id_carrera &&
                                                        obj.id_grupo === datos.id_grupo &&
                                                        obj.id_turno === datos.id_turno
                                                    ));

                                                    let exist : confirmedInsGroup | boolean | undefined;

                                                    if(Array.isArray(loadedGroups)){
                                                        exist =  loadedGroups.find(item => (
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
                                                        <div className="groupLoadSubjectsContainer">
                                                            <p className='career_name'>{datos.carrera}</p>
                                                            <div className="informationContainer">
                                                                <p><b>Materias:</b> {subjects?.next_subjects.length}</p>
                                                                <p><b>Creditos:</b> {subjects?.next_subjects.reduce((acc, tot) => acc + tot.Creditos, 0)}</p>
                                                                <p><b>Horas:</b> {subjects?.next_subjects.reduce((acc, tot) => acc + tot.Horas_De_Clase, 0)}</p>
                                                            </div>
                                                            <div className="buttonAction">
                                                                <button className='view_list' onClick={() => handleShowSubjListModal(subjects)}>Ver materias</button>
                                                                <button className='confirm_group' onClick={() => addToLoadedGroup(datos)}>Cargar materias</button>
                                                            </div>
                                                            {
                                                                exist != false && exist != undefined ?
                                                                    <div className="floatingOpe">
                                                                        <p className='career_name'>{datos.carrera}</p>
                                                                        <p>Has cargado las materias del grupo</p>
                                                                        <button className='cancel-btn' onClick={() => removeLoadedGroup(filtered)}>Cancelar confirmacion</button>
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
