import { persona } from "../usersModels/UserModel";

export interface GroupClassObject {
    ID_Clase:       string;
    FK_Materia:     string;
    FK_Profesor:    string;
    Active:         boolean;
    Creado_En:      string;
    Actualizado_EN: string | null;
}

export interface AttendanceData extends persona{
    ID_Estudiante_Clases: string;
    ID_Estudiante:        string;
    Matricula:            string;
    Fecha_De_Nacimiento:  string;
    Numero_De_Emergencia: number;
    Numero_De_Telefono:   number;
    Correo_Electronico:   string;
}


export interface ScheduleObj {
    ID_Horario:  string;
    Dia:         string;
    Hora_Inicio: string;
    Hora_Fin:    string;
}

export interface teacherScheduleObj{
    Dia:         string;
    Hora_Inicio: string;
    Hora_Fin:    string;
    FK_Clase:    string;
    Nombre:      string;
}

export interface studentScheduleObj{
    Dia:         string;
    Hora_Inicio: string;
    Hora_Fin:    string;
    FK_Clase:    string;
    Nombre:      string;
}
