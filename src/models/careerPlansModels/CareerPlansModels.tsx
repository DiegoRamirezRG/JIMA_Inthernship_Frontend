import { CareerModel, CareerModelCreate } from "../careersModels/CareersModel";

export type ValidCareersPlan = CareerMissingPlans[] | boolean;

export interface CareerMissingPlans {
    ID_Carrera: string;
    Nombre:     string;
}

export interface CareerPlansActives extends CareerModelCreate{
    creditos: number;
    numMaterias: number;
    Creado_En: string;
    Active?: boolean;
}
