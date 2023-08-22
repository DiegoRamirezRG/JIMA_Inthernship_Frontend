export interface UserModel{
    ID_Persona:           string;
    Nombre:               string;
    Apellido_Paterno:     string;
    Apellido_Materno:     string | null;
    CURP:                 string | null;
    Genero:               string;
    Fecha_De_Nacimiento:  string;
    Tipo_De_Sagre:        string;
    Numero_De_Emergencia: number | null;
    Numero_De_Telefono:   number;
    Nacionalidad:         string | null;
    Correo_Electronico:   string;
    Rol:                  string;
    Active:               boolean;
    Imagen:               string | null;
    Creado_En:            string;
    Actualizado_EN:       string | null;
    jwt:                  string;
}

export interface UserModelPersonCreate{
    Nombre:                 string   | null | string;
    Apellido_Paterno:       string   | null | string;
    Apellido_Materno:       string   | null | string;
    CURP:                   string   | null | string;
    Genero:                 gender   | null | string;
    Fecha_De_Nacimiento:    string   | null | string;
    Tipo_De_Sagre:          blood    | null | string;
    Numero_De_Emergencia:   number   | null | string;
    Numero_De_Telefono:     number   | null | string;
    Nacionalidad:           string   | null | string;
    Correo_Electronico:     string   | null | string;
    Rol:                    roles    ;
    Active:                 boolean  | null | string;
    Imagen:                 string   | null | string;
    Contraseña:             string   | null | string;
}

export type gender = 'Masculino' | 'Femenino' | 'Otro';
export type blood = 'A' | 'B' | 'AB' | 'O' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type roles = 'Estudiante' | 'Profesor' | 'Administrativo' | 'Padre';