import { LastYeatStudentsObj } from "../../../../models/studentModels/StudentModel";

export const filterData = (data: LastYeatStudentsObj[]) => {
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