export interface CalendarInfo {
    ID_Calendario:  string;
    Nombre:         string;
    Inicio:         string;
    Fin:            string;
    Active:         number;
    Creado_En:      string;
    Actualizado_EN: null;
}

export interface CalendarEvent {
    ID_Calendario_Eventos: string | null;
    Titulo:                string | null;
    Descripcion:           string | null;
    Fecha_Inicio:          string | null;
    Fecha_Fin:             string | null;
    Color:                 string | null;
    FK_Calendario:         string | null;
    Creado_En:             string | null;
    Actualizado_EN:        string | null;
}

export interface FullCalendarEventFormater {
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    editable: boolean;
}

export interface NewCalendarCreation {
    Nombre: string;
    Inicio: string;
    Fin: string;
}

export type ConfirmEventModalType = 'rezise' | 'dropped' | 'click' | null;
