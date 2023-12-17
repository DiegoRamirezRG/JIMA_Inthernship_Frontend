export interface tempAttendanceObj{
    ID_Estudiante: string;
    ID_Clase: string;
    Estado: attendanceStatus;
}

export type attendanceStatus = 'Asistencia' | 'Retraso' | 'Justificacion' | 'Falta';

export interface AttendanceDBModel {
    ID_Asistencia:  string;
    FK_Clase:       string;
    FK_Estudiante:  string;
    Fecha:          attendanceStatus;
    Estado:         string;
    Creado_En:      string;
    Actualizado_EN: string | null;
}
