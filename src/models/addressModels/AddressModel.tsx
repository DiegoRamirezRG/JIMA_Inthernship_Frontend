export interface AddressModel {
    Ciudad              : string    | null;
    Estado              : string    | null;
    Pais                : string    | null;
    Codigo_Postal       : string    | null;
    Numero_Interior?    : string    | number   | null;
    Numero_Exterior     : number    | null;
    Calle               : string    | null;
}

export interface AddressModelCreate{
    Ciudad              : string | null;
    Estado              : string | null;
    Pais                : string | null;
    Codigo_Postal       : string | null;
    Numero_Interior?    : string | number | null;
    Numero_Exterior     : number | null | string;
    Calle               : string | null;
}