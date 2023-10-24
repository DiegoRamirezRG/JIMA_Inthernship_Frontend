import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { SingleUser } from "../../../../models/authModels/UserModel";
import { optionSelect } from "../../../../models/universalApiModels/UniversalApiModel";
import { Credentials } from '../../../../models/credentialsModels/CredentialsModels';
import { AddressModel } from "../../../../models/addressModels/AddressModel";
import { administrative, student, teacher } from "../../../../models/userTypesModels/UserTypesModel";
import { createStudentToBe, customStudentToBe } from "../../../../models/enrollModels/EnrollModels";
import { CareerModel } from "../../../../models/careersModels/CareersModel";
import { Grade, Group, Shift } from "../../../../models/schoolInfoModels/schoolInfoModels";
import { StudentAcademicInfo } from "../../../../models/studentModels/StudentModel";
import { CalendarEvent, NewCalendarCreation } from "../../../../models/calendarModels/CalendarModels";
import { AreaModelCreate, SubjectModelCreate, reqSubject } from "../../../../models/subjectsModels/SubjectModels";

export interface dynamicInput{
    id: string;
    placeholder: string;
    value: string;
    label: string;
    name:   keyof SingleUser 
            | keyof Credentials 
            | keyof AddressModel 
            | keyof administrative 
            | keyof teacher 
            | keyof student 
            | keyof CareerModel 
            | keyof Shift 
            | keyof Grade 
            | keyof Group 
            | keyof StudentAcademicInfo
            | keyof CalendarEvent
            | keyof NewCalendarCreation
            | keyof AreaModelCreate
            | keyof SubjectModelCreate;
    inputType: HTMLInputTypeAttribute;
    editActive: boolean;
    onChange?: any;
}

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface timerPickerInterface {
    id: string;
    label: string;
    time: string;
    onChange: any;
    name:     keyof CalendarEvent;
    format: 'h:m a';
}

export interface dateTimePickerInterface{
    id: string;
    label: string;
    date: string;
    onChange: any;
    name:  keyof CalendarEvent | keyof NewCalendarCreation;
}

export interface dynamicSelect{
    opts?: optionSelect[];
    id: string;
    name: keyof SingleUser | keyof AddressModel | keyof createStudentToBe | keyof customStudentToBe | keyof SubjectModelCreate | keyof reqSubject;
    editActive: boolean;
    label: string;
    value: string;
    onChange?: any;
}

export interface dynamicSelectWithBtn extends dynamicSelect{
    addBtnAction: () => void;
}

export interface hourInput {
    value: string;
    label: string;
    name: keyof Shift;
    onChange: any;
    hora: string;
    minuto: string;
    setHora: Dispatch<SetStateAction<string>>;
    setMinuto: Dispatch<SetStateAction<string>>;
    isAm: boolean;
    setIsAm: Dispatch<SetStateAction<boolean>>;
}