export interface administrative{
    ID_Administrativos:         string;
    FK_Persona:                 string;
    Codigo_De_Administrativo:   string;
    NSS:                        string;
    Fecha_De_Contratacion:      string;
    URL:                        string | null;
}

export interface teacher{
    ID_Profesor:                string;
    FK_Persona:                 string;
    Codigo_De_Profesor:         string;
    NSS:                        string;
    Fecha_De_Contratacion:      string;
    URL:                        string | null;
}

export interface student{
    ID_Estudiante:  string;  
    FK_Persona:     string;  
    Matricula:      string;  
    URL:            string | null;  
    Titulado:       boolean;  
}

export interface parent{
    ID_Papa:    string;
    FK_Persona: string;
    FK_Hijo:    string;
}

//Creationg Intances
export interface administrativeCrate{
    Codigo_De_Administrativo:   string;
    NSS:                        string;
    Fecha_De_Contratacion:      string;
    URL:                        string;
}

export interface teacherCreate{
    Codigo_De_Profesor:         string;
    NSS:                        string;
    Fecha_De_Contratacion:      string;
    URL:                        string;
}

export interface studentCreate{
    Matricula:      string;  
    URL:            string;  
    Titulado:       boolean;  
}

export interface parentCreate{
    FK_Hijo:    string;
}