export interface GraderTeacherObj {
    ID_Entregas:     string;
    FK_Actividad:    string;
    FK_Estudiante:   string;
    Anexos:          string[] | null;
    Calificacion:    number | null;
    Creado_En:       string;
    Actualizado_EN:  string | null;
    Nombre_Completo: string;
    ID_Persona:      string;
    Imagen:          string | null;
}

export interface GraddingObj {
    FK_Estudiante:   string;
    ID_Entrega:      string;
    Calificacion:    number;
}