import { ReactNode } from "react";
import { ClassByTeacher, TeacherForPick } from "./TeacherModels";

export interface TeacherContextModel{
    //Teachers
    teachers: TeacherForPick[] | null;
    getTeachers: () => Promise<void>;

    //Teacher-Classes
    teachClassLoading: boolean;
    classes: ClassByTeacher[];
    getClasses: (teacher_id: string) => Promise<void>;
}

export interface TeacherProvider{
    children: ReactNode;
}