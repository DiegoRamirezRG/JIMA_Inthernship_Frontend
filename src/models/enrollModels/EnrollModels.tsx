export interface studentToBe{
    ID_Aspirante:   string;
    FK_Estudiante:  string;
    FK_Carrera:     string;
    Creado_En:      string;
    Actualizado_EN: string |null;
}

export interface createStudentToBe{
    ID_Student: string;
    ID_Career: string;
}

export interface customStudentToBe extends createStudentToBe{
    ID_Grado: string;
    ID_Grupo: string;
    ID_Turno: string;
}

export interface Student {
    ID_Inscripciones: string;
    FK_Estudiante:    string;
    FK_Carrera:       string;
    FK_Grado:         string;
    FK_Grupo:         string;
    FK_Turno:         string;
    Creado_En:        string;
    Actualizado_EN:   string | null;
    Active:           boolean;
    Pagado:           boolean;
}
