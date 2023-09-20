
export interface Shift {
    ID_Turno:       string;
    Nombre:         string;
    Hora_Inicio:    string;
    Hora_Fin:       string;
    Creado_En:      string;
    Actualizado_EN: null;
    Active:         number;
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
