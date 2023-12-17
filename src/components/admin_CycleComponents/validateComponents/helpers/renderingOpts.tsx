import { FaGraduationCap } from "react-icons/fa";
import { innerStepper } from "../../../../models/cycleModels/CycleModels";
import { IoOptions, IoPerson } from "react-icons/io5";
import { HiMiniIdentification, HiMiniUserGroup } from "react-icons/hi2";
import { PiBooksFill } from "react-icons/pi";

export const options: innerStepper[] = [
    {label: 'Carreras', active: true, completed: false, icon: <FaGraduationCap/>},
    {label: 'Planes', active: false, completed: false, icon: <IoOptions/>},
    {label: 'Estudiantes', active: false, completed: false, icon: <IoPerson/>},
]

export const inscriptionsOptions: innerStepper[] = [
    {label: 'Grupos', active: true, completed: false, icon: <HiMiniUserGroup/>},
    {label: 'Planes', active: false, completed: false, icon: <IoOptions/>},
    {label: 'Materias', active: false, completed: false, icon: <PiBooksFill/>},
    {label: 'Horario', active: false, completed: false, icon: <HiMiniIdentification/>},
]

export const reinscriptionsOpts: innerStepper[] = [
    {label: 'Grupos', active: true, completed: false, icon: <HiMiniUserGroup/>},
    {label: 'Materias', active: false, completed: false, icon: <PiBooksFill/>},
    {label: 'Horarios', active: false, completed: false, icon: <HiMiniIdentification/>},
]