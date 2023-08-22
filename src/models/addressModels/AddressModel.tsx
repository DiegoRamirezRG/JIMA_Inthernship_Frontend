export interface AddressModel {
    Ciudad              : string;
    Estado              : string;
    Pais                : string;
    Codigo_Postal       : string;
    Numero_Interior?    : string | number;
    Numero_Exterior     : number;
    Calle               : string;
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