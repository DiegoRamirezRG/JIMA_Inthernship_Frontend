import { AssigmentObject } from "../../../../../models/homeworkModels/HomeworkModels";

export const sortByDate = (a: AssigmentObject, b: AssigmentObject) => {
    const dateA = new Date(a.Creado_En).getTime();
    const dateB = new Date(b.Creado_En).getTime();

    return dateB - dateA;
}