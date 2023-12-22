export interface CriteriaRubric{
    ID_Detalle_Rubrica: string;
    FK_Rubrica: string;
    Nombre: string;
    Descripcion: string | null;
    Valor: number;
    Creado_En: string;
    Actualizado_EN: string | null;
}

export interface CriteriaRubricCreate{
    Nombre: string;
    Descripcion: string | null;
    Valor: string;
}

export interface Rubric {
    ID_Rubrica:     string;
    Creado_Por:     string;
    Active:         number;
    criterias:      CriteriaRubric[];
    Creado_En:      string;
    Actualizado_EN: string | null;
}

export interface Unit {
    ID_Unidad:      string;
    FK_Clase:       string;
    Nombre:         string;
    FK_Rubrica:     string | null;
    Creado_En:      string;
    Actualizado_EN: string | null;
}

export interface CreateAssigment{
    Titulo: string;
    Descripcion: string;        //Null
    Fecha_De_Entrega: string;   //Date
    FK_Clase: string;
    FK_Rubrica: string;         //Null
    Fk_Unidad: string;          //Null
    Alumnos_Actividad: string[] //Null
    Requiere_Anexos: boolean;
    Acepta_Despues: boolean;
    Calificable: boolean;
}

export interface AssigmentObject {
    ID_Actividad:      string;
    Titulo:            string;
    Descripcion:       string | null;
    Fecha_De_Entrega:  string | null;
    FK_Clase:          string;
    FK_Rubrica:        string | null;
    Fk_Unidad:         string | null;
    Active:            boolean;
    Requiere_Anexos:   boolean;
    Alumnos_Actividad: string[] | null;
    Acepta_Despues:    boolean;
    Calificable:       boolean;
    Creado_En:         string;
    Actualizado_EN:    string | null;
    Entregas:          string[] | null;
}

export interface AssigmentStudentTurnInfo {
    ID_Entregas:    string;
    FK_Actividad:   string;
    FK_Estudiante:  string;
    Anexos:         string[] | null;
    Calificacion:   number | null;
    Creado_En:      string;
    Actualizado_EN: string | null;
}
