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
