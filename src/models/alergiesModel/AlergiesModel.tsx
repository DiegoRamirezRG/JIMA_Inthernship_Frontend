export interface AlergiesModel{
    Nombre: string;
    Descripcion?: string;
}

export interface AlergiesModelCreate{
    Nombre: string | '';
    Descripcion?: string | '';
}