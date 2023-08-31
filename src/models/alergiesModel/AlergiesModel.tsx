export interface AlergiesModel{
    Nombre: string;
    Descripcion?: string | null;
}

export interface AlergiesModelCreate{
    Nombre: string | '';
    Descripcion?: string | '';
}