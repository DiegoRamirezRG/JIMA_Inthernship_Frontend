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
