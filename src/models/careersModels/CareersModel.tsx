
export interface CareerModel {
    ID_Carrera:                 string;
    Nombre:                     string;
    Numero_De_Ciclos:           number;
    Duracion_Mensual_De_Ciclos: number;
    Descripcion:                string | null;
}


export interface CareerModelCreate {
    ID_Carrera:                 string | null;
    Nombre:                     string | null;
    Numero_De_Ciclos:           number | null;
    Duracion_Mensual_De_Ciclos: number | null;
    Descripcion:                string | null ;
}
