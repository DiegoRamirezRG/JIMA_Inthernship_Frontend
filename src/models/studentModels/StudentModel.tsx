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

export interface StudentObj {
    ID_Estudiante:     string;
    ID_Persona:        string;
    Nombre_Estudiante: string;
    Active:            boolean;
    Imagen:            null | string;
}

export interface LastYeatStudentsObj {
    ID_Inscripciones:           string;
    FK_Carrera:                 string;
    FK_Grado:                   string;
    FK_Grupo:                   string;
    FK_Turno:                   string;
    ID_Estudiante:              string;
    ID_Persona:                 string;
    Nombre:                     string;
    Apellido_Paterno:           string;
    Apellido_Materno:           string;
    ID_Carrera:                 string;
    Carrera:                    string;
    Numero_De_Ciclos:           number;
    Duracion_Mensual_De_Ciclos: number;
    Descripcion:                string | null;
    ID_Grupo:                   string;
    Indicador:                  string;
    ID_Grado:                   string;
    Numero:                     number;
    ID_Turno:                   string;
    Turno:                      string;
}
