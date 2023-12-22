export type optionsIndexing = 'total' | 'aspirantes' | 'estudiantes' | 'profesores' | 'admins';

export interface stadisticState{
    index: optionsIndexing;
    data: number;
    color: string;
}

export interface GenderStats {
    gender: string;
    value:  number;
    color:  string;
}

export interface stattsCycleStudent {
    ID_Estudiante: string;
    ID_Persona:    string;
    Numero:        number;
    Indicador:     string;
    Turno:         string;
    Carrera:       string;
}


export interface stadisticObjCareers {
    Carrera: string;
    [grado: string]: number | string;
}

export interface stadisticObjStudentByCareer{
    career: string;
    students: number;
}
