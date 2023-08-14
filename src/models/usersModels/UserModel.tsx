export interface persona{
    ID_Persona: any;
    Nombre: string;
    Apellido_Paterno: string;
    Apellido_Materno: string | null;
    Rol: 'Estudiante' | 'Profesor' | 'Administrativo' | 'Padre';
    Active: boolean;
    Imagen: string | null;
}

export type typeFilter = 'all' | 'teachers' | 'students' | 'admins' | 'active' | 'inactive';

export const typeFilterToSqlQuery: Record<typeFilter, string> = {
    'all'       : "",
    'teachers'  : "Rol = 'Profesor'",
    'students'  : "Rol = 'Estudiante'",
    'admins'    : "Rol = 'Administrativo'",
    'active'    : "Active = true",
    'inactive'  : "Active = false",
};