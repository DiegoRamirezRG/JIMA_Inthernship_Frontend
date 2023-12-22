import { ClassTeacher, CreateSchedule } from "../../../../models/loadScheduleModels/LoadScheduleModels";

const objetDataSche: ClassTeacher[] = [
    {
        FK_Materia: 'MAT',
        schedule: [
            {
                Dia: 'Lunes',
                Hora_Inicio: '7:00',
                Hora_Fin: '8:00'
            },
            {
                Dia: 'Miércoles',
                Hora_Inicio: '9:00',
                Hora_Fin: '11:00'
            },
            {
                Dia: 'Viernes',
                Hora_Inicio: '11:00',
                Hora_Fin: '13:00'
            }
        ]
    },
    {
        FK_Materia: 'ESP',
        schedule: [
            {
                Dia: 'Lunes',
                Hora_Inicio: '8:00',
                Hora_Fin: '10:00'
            },
            {
                Dia: 'Martes',
                Hora_Inicio: '7:00',
                Hora_Fin: '9:00'
            },
            {
                Dia: 'Viernes',
                Hora_Inicio: '7:00',
                Hora_Fin: '9:00'
            },
        ]
    },
    {
        FK_Materia: 'ENG',
    }
]