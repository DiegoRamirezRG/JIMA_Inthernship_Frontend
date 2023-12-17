export interface TeacherForPick {
    Nombre:           string;
    Apellido_Paterno: string;
    Apellido_Materno: string;
    ID_Profesor:      string;
}

export interface ClassByTeacher {
    ID_Clase:       string;
    FK_Materia:     string;
    FK_Profesor:    string;
    Active:         boolean;
    Creado_En:      string;
    Actualizado_EN: string | null;
}
