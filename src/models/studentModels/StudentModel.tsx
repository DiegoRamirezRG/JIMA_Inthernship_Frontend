import { SingleUser } from "../authModels/UserModel";

export interface StudentAcademicInfo {
    Nombre:    string;
    Turno:     string;
    Grado:    number;
    Grupo: string;
    Active:    number;
    Pagado:    number;
}

export interface StudentToBe extends SingleUser{
    ID_Aspirante:         string;
    ID_Estudiante:        string;
    ID_Carrera:           string;
    ID_Persona:           string;
}


export interface TodoAssigment {
    ID_Actividad:      string;
    Titulo:            string;
    Descripcion:       string | null;
    Fecha_De_Entrega:  string |null;
    FK_Clase:          string;
    FK_Rubrica:        string;
    Fk_Unidad:         string;
    Active:            number;
    Requiere_Anexos:   number;
    Alumnos_Actividad: string[];
    Acepta_Despues:    number;
    Calificable:       number;
    Creado_En:         string;
    Actualizado_EN:    string | null;
    clase_nombre:      string;
    FK_Profesor:       string;
}
