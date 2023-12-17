import React, { useEffect, useState } from 'react'
import './ValidateStudentComponent.scss'
import { useStudentContext } from '../../../../contexts/studentContext/StudentContext'
import { LoadingComponent } from '../../../generalComponents/loadingComponent/LoadingComponent';
import { NoLastYearStudent } from './innerComponents/noLastYearStuends/NoLastYearStudent';
import { LastYeatStudentsObj } from '../../../../models/studentModels/StudentModel';
import { LastCycleYearStudentsCard } from './innerComponents/lastCycleYearStudentsCard/LastCycleYearStudentsCard';

export const ValidateStudentComponent = () => {

    const { lastYearStudents, getLastYearStudents } = useStudentContext();
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
                };
            }

            const siguienteGrado = item.Numero + 1;
            carreras[carreraId][turnoId][gradoId][grupoId].siguienteGrado = siguienteGrado;
            carreras[carreraId][turnoId][gradoId][grupoId].cantidadAlumnos += 1;
        });

        return carreras;
    }

    useEffect(() => {
        setLoader(true);
        const awiatF = async () => {
            await getLastYearStudents();
        }

        awiatF().then(() => {
            setLastYearStudentMapped(filterData(lastYearStudents));
            setLoader(false);
        });
    }, [])

    useEffect(() => {
        setLastYearStudentMapped(filterData(lastYearStudents));
    }, [lastYearStudents])
    

    return (
        <div className='validateStudentsContainer'>
            {
                loader
                ?   <LoadingComponent/>
                :   <div className='innerValidateStudentContainer'>
                        <div className="studentValidatorHeader">
                            <h2>Tienes los siguientes estudiantes para el nuevo ciclo</h2>
                        </div>
                        <div className="contentValidatorStudentContainer">
                            {
                                lastYearStudents.length > 0 
                                ?   <div className='lastYearStudentsContainer'>
                                        <div className="dinamycHeightGrid">
                                            {
                                                lastYearStudentMapped && Object.keys(lastYearStudentMapped).map(carreraId  => (
                                                    Object.keys(lastYearStudentMapped[carreraId]).map(turnoId => (
                                                        Object.keys(lastYearStudentMapped[carreraId][turnoId]).map(gradoId => (
                                                            Object.keys(lastYearStudentMapped[carreraId][turnoId][gradoId]).map(grupoId => {
                                                                const datos = lastYearStudentMapped[carreraId][turnoId][gradoId][grupoId];

                                                                return (
                                                                    <LastCycleYearStudentsCard data={datos} key={Math.random()}/>
                                                                );
                                                            })
                                                        ))
                                                    ))
                                                ))
                                            }
                                        </div>
                                    </div>
                                :   <NoLastYearStudent/>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
