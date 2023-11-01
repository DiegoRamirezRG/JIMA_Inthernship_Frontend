export interface AreaModelCreate {
    Nombre: string;
    Descripcion: string | null;
    Codigo_De_Area: string;
}

export interface AreaModel extends AreaModelCreate{
    ID_Area: string;
    Active: boolean;
}

export interface SubjectsFilters{
    state: 'all' | boolean;
    areas: 'all' | string[];
}

export interface SubjectModelCreate {
    Nombre: string;
    Descripcion: string | null;
    Codigo_De_Materia: string;
    Creditos: number;
    Horas_De_Clase: number;
    FK_Area: string;
}

export interface SubjectModel extends SubjectModelCreate {
    ID_Materia:        string;
    Actice:            boolean;
    Creado_En:         string;
    Actualizado_EN:    string | null;
    Area_Nombre:       string;
    Codigo_De_Area:    string;
}

export interface reqSubject {
    id_req: string;
}

export interface SubjectsId {
    ID_Materia: string;
}
