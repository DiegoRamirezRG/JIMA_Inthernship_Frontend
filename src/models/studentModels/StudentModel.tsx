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
