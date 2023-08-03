
import { IoPeopleOutline } from 'react-icons/io5';
import { RxDashboard } from "react-icons/rx";
import { Option } from "../../models/optionModels/OptionModel";


const administrativeOptions: Option[] = [
    {text: 'Dashboard', id: 'adminDashbord', icon: <RxDashboard/>, route: '/home'},
    {text: 'Usuarios', id: 'usersAdmin', icon: <IoPeopleOutline/>, route: '/admin_users'},
]


export const sidebardOptions = new Map<string, Option[]>([
    ['Administrativo', administrativeOptions],
])