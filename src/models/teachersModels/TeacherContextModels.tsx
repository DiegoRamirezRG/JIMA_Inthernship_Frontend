import { ReactNode } from "react";
import { ClassByTeacher, TeacherForPick } from "./TeacherModels";
import { teacherScheduleObj } from "../groupsModels/GroupsModels";

export interface TeacherContextModel{
    //Teachers
    teachers: TeacherForPick[] | null;
    getTeachers: () => Promise<void>;

    //Teacher-Classes
    teachClassLoading: boolean;
    classes: ClassByTeacher[];
    getClasses: (teacher_id: string) => Promise<void>;

    //Get all teachers
    teachersObj: TeacherForPick[] | null;
    teachersObjLoader: boolean;
    getAllTeachers: () => Promise<void>;

    //Get Teacher Schedule
    teacherSchedule: teacherScheduleObj[];
    isTeacherScheduleLoading: boolean;
    getTeacherSchedule: (person_id: string) => Promise<void>;
}

export interface TeacherProvider{
    children: ReactNode;
}