
import { IoCalendarOutline, IoFileTrayFullOutline, IoPeopleOutline } from 'react-icons/io5';
import { RxDashboard } from "react-icons/rx";
import { Option } from "../../models/optionModels/OptionModel";
import { LuFileBadge, LuHome } from 'react-icons/lu';
import { PiBooks } from 'react-icons/pi';
import { MdOutlineFolderCopy, MdOutlineViewTimeline } from 'react-icons/md';
import { LiaMoneyCheckAltSolid } from 'react-icons/lia';


const administrativeOptions: Option[] = [
    {text: 'Dashboard', id: 'adminDashbord', icon: <RxDashboard/>, route: '/home'},
    {text: 'Usuarios', id: 'usersAdmin', icon: <IoPeopleOutline/>, route: '/admin_users'},
    {text: 'Ciclo Escolar', id: 'cycleAdmin', icon: <IoFileTrayFullOutline/>, route: '/admin_cycle'},
    {text: 'Calendario', id: 'calendarAdmin', icon: <IoCalendarOutline/>, route: '/admin_calendar'},
]

const teacherOptions: Option[] = [
    {text: 'Home', id: 'teacherHome', icon: <LuHome/>, route: '/home'},
    {text: 'Clases', id: 'teacherClasses', icon: <PiBooks/>, route: '/teacher/classes'},
    {text: 'Horario', id: 'teacherSchedule', icon: <MdOutlineViewTimeline/>, route: '/teacher/schedules'},
    {text: 'Calendario', id: 'teacherCalendar', icon: <IoCalendarOutline/>, route: '/teacher/calendar'}
]

const studentOptions: Option[] = [
    {text: 'Home', id: 'studentHome', icon: <LuHome/>, route: '/home'},
    {text: 'Clases', id: 'studentClasses', icon: <PiBooks/>, route: '/student/classes'},
    {text: 'Tareas', id: 'studentTodo', icon: <MdOutlineFolderCopy />, route: '/student/todo'},
    {text: 'Horario', id: 'studentSchedule', icon: <MdOutlineViewTimeline />, route: '/student/schedule'},
    {text: 'Calendario', id: 'studentCalendar', icon: <IoCalendarOutline />, route: '/student/calendar'},
    {text: 'Calificaciones', id: 'studentCalendar', icon: <LuFileBadge />, route: '/student/grades'},
    {text: 'Pagos', id: 'studentPayments', icon: <LiaMoneyCheckAltSolid />, route: '/student/payments'},
]

export const sidebardOptions = new Map<string, Option[]>([
    ['Administrativo', administrativeOptions],
    ['Profesor', teacherOptions],
    ['Estudiante', studentOptions]
])