import { FaGraduationCap } from "react-icons/fa";
import { innerStepper } from "../../../../models/cycleModels/CycleModels";
import { IoOptions, IoPerson } from "react-icons/io5";

export const options: innerStepper[] = [
    {label: 'Carreras', active: true, completed: false, icon: <FaGraduationCap/>},
    {label: 'Planes', active: false, completed: false, icon: <IoOptions/>},
    {label: 'Estudiantes', active: false, completed: false, icon: <IoPerson/>},
]