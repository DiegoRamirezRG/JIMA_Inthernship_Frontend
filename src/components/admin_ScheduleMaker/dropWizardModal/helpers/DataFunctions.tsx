import moment from "moment";
import { optionSelect } from "../../../../models/universalApiModels/UniversalApiModel";
import { AsignClasses, GroupNeeded } from "../../../../models/loadScheduleModels/LoadScheduleModels";
import { daysOfTheWeek } from "../../../../utils/calendarHelpers/DaysOfTheWeek";
import { SubjectModel } from "../../../../models/subjectsModels/SubjectModels";

export const getLeftScheduleHoursByDay = ({ day, group_scope, schedule_obj } : getAvailableHours): string[] => {
    const groupSelected = schedule_obj.find((group) => group.id_Grupo === group_scope.ID_Grupo && group.id_Career === group_scope.ID_Carrera && group.id_Turno === group_scope.ID_Turno);
    const notAvailableHours: string[] = [];

    //Validate
    if(groupSelected){
        groupSelected.class_teacher.forEach((clase) => {
            if(clase.schedule){
                clase.schedule.forEach((sche) => {
                    if(sche.Dia === daysOfTheWeek[day]){
                        const temp_init = new Date(`1970-01-01T${sche.Hora_Inicio}:00`);
                        const temp_end = new Date(`1970-01-01T${sche.Hora_Fin}:00`);

                        while(temp_init < temp_end){
                            notAvailableHours.push(
                                temp_init.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false,
                                })
                            );

                            temp_init.setMinutes(temp_init.getMinutes() + 30);
                        }
                    }
                })
            }
        })
    }
    
    return notAvailableHours;
}

export const getLeftClassAvailavleHours = ({ group_scope, schedule_obj, subject } : calcClassHours): number => {
    const groupSelected = schedule_obj.find((group) => group.id_Grupo === group_scope.ID_Grupo && group.id_Career === group_scope.ID_Carrera && group.id_Turno === group_scope.ID_Turno);
    let horasTotales = 0;

    if(groupSelected){
        groupSelected.class_teacher
            .forEach((clase) => {
                if(clase.FK_Materia === subject.ID_Materia){
                    if(clase.schedule){
                        clase.schedule.forEach((sche) => {
                            const inicio = moment(`1970-01-01T${sche.Hora_Inicio}:00`);
                            const fin = moment(`1970-01-01T${sche.Hora_Fin}:00`);

                            const duracion = moment.duration(fin.diff(inicio));
                            horasTotales += duracion.asHours();
                        })
                    }
                }
            })
    }
    
    return subject.Horas_De_Clase - horasTotales;
}

export const calculateAvailableHours = ({ init_time, end_time } : calcLeftHours) : optionSelect[] => {    
    const startTime = moment(init_time, 'HH:mm:ss');
    const endTime = moment(end_time, 'HH:mm:ss');

    const totalHours = endTime.diff(startTime, 'minutes') / 30;
    const helperHours: rowDataToSelect[] = [];
    for (let i = 0; i <= totalHours; i++) {
        const tempHour = startTime.clone().add(i * 30, 'minutes');
        helperHours.push({label: tempHour.format('HH:mm').toString(), value: tempHour.format('HH:mm').toString()});
    }

    return formatSelectOpt(helperHours);
}

export const formatSelectOpt = (data: rowDataToSelect[]) : optionSelect[] => {
    const formattedOptions = data.map(item => ({
        label: item.label.toString(),
        value: item.value.toString()
    }));
    return formattedOptions;
}


//-----------------------------------------
// Helepr Interfaces
//-----------------------------------------

interface rowDataToSelect{
    label: string;
    value: string;
}

interface calcLeftHours{
    init_time: string;
    end_time: string;
}

interface getAvailableHours{
    group_scope: GroupNeeded;
    schedule_obj: AsignClasses[];
    day: number;
}

interface calcClassHours{
    group_scope: GroupNeeded;
    schedule_obj: AsignClasses[];
    subject: SubjectModel;
}