export interface Option {
    icon: JSX.Element,
    text: string,
    id: string,
    route?: string;
}

export interface cycle_sidebar_opt extends Option{
    color: string;
}