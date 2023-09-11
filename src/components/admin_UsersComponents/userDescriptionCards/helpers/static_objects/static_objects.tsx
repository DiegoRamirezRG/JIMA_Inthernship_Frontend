import { optionSelect } from "../../../../../models/universalApiModels/UniversalApiModel";

export const blootTypes: optionSelect[] = [
    {label: 'A',     value: 'A'},
    {label: 'B',     value: 'B'},
    {label: 'AB',    value: 'AB'},
    {label: 'O',     value: 'O'},
    {label: 'A+',    value: 'A+'},
    {label: 'A-',    value: 'A-'},
    {label: 'B+',    value: 'B+'},
    {label: 'B-',    value: 'B-'},
    {label: 'AB+',   value: 'AB+'},
    {label: 'AB-',   value: 'AB-'},
    {label: 'O+',    value: 'O+'},
    {label: 'O-',    value: 'O-'},
]

export const genderOpt: optionSelect[] = [
    {label: 'Masculino', value: 'Masculino'},
    {label: 'Femenino', value: 'Femenino'},
    {label: 'Otro', value: 'Otro'}
]

export const renderOpts: string[] = [
    'Administrativo',
    'Profesor',
    'Estudiante',
    'Padre'
]