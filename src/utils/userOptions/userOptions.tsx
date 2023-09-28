
import { IoCalendarOutline, IoFileTrayFullOutline, IoPeopleOutline } from 'react-icons/io5';
import { RxDashboard } from "react-icons/rx";
import { Option } from "../../models/optionModels/OptionModel";


const administrativeOptions: Option[] = [
    {text: 'Dashboard', id: 'adminDashbord', icon: <RxDashboard/>, route: '/home'},
    {text: 'Usuarios', id: 'usersAdmin', icon: <IoPeopleOutline/>, route: '/admin_users'},
    {text: 'Ciclo Escolar', id: 'cycleAdmin', icon: <IoFileTrayFullOutline/>, route: '/admin_cycle'},
    {text: 'Calendario', id: 'calendarAdmin', icon: <IoCalendarOutline/>, route: '/admin_calendar'},
]


export const sidebardOptions = new Map<string, Option[]>([
    ['Administrativo', administrativeOptions],
])