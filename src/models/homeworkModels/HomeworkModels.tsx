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