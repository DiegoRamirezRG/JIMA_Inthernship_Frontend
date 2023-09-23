
export interface Shift {
    ID_Turno:       string;
    Nombre:         string;
    Hora_Inicio:    string;
    Hora_Fin:       string;
    Creado_En:      string;
    Actualizado_EN: null;
    Active:         boolean;
}

export interface ShiftCreateOrEdit {
    ID_Turno:       string | null;
    Nombre:         string | null;
    Hora_Inicio:    string | null;
    Hora_Fin:       string | null;
    Creado_En:      string | null;
    Actualizado_EN: string | null;
    Active:         boolean | null;
}

export interface Grade {
    ID_Grado:       string;
    Numero:         number;
    Descripcion:    null;
    Creado_En:      string;
    Actualizado_EN: null;
    Active:         number;
}

export interface Group {
    ID_Grupo:       string;
    Indicador:      string;
    Creado_En:      string;
    Actualizado_EN: null;
    Active:         number;
}
