export interface CalendarInfo {
    ID_Calendario:  string;
    Nombre:         string;
    Inicio:         string;
    Fin:            string;
    Active:         number;
    Creado_En:      string;
    Actualizado_EN: null;
}

export interface CalendarBuilder {
    dayNumber: number;
    dayText: string;
    month: number;
    year: number;
}

export interface CalendarEvent {
    ID_Calendario_Eventos: string;
    Titulo:                string;
    Descripcion:           string | null;
    Fecha_Inicio:          string;
    Fecha_Fin:             string | null;
    Color:                 string;
    FK_Calendario:         string;
    Creado_En:             string;
    Actualizado_EN:        string |null;
}

export interface CreateOrEditCalendarEvent {
    Titulo:                string;
    Descripcion:           string;
    Fecha_Inicio:          string;
    Fecha_Fin:             string;
    Color:                 string;
}

export interface MontlyEvents {
    day: number,
    event: CalendarEvent
}

export interface PickDetailed {
    day: number | null,
    month: number | null,
    year: number | null
}