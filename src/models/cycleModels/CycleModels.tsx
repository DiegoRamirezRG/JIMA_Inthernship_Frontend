export interface CycleStatus {
    Ciclo_Iniciado:  number;
    Ciclo_Conf_Term: number;
}

export interface innerStepper {
    label: string;
    active: boolean;
    completed: boolean;
    icon: JSX.Element;
}