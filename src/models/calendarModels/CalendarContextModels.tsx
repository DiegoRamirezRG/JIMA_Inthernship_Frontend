import { Dispatch, ReactNode, SetStateAction } from "react";
import { CalendarEvent, ConfirmEventModalType } from "./CalendarModels";
import { DateSelectArg, EventClickArg, EventContentArg, EventInput } from "@fullcalendar/core";

export interface CalendarContextInterface{
    //events
    eventLoader: boolean;
    eventArray: CalendarEvent[];
    fullCalendarArray: EventInput[];
    getEventsFunction: () => Promise<void>;
    eventRender: (eventContent: EventContentArg) => void;
    eventResize: (resizeInfo: any) => void;
    eventDrop: (dropInfo: any) => void;
    eventClick: (dropInfo: any) => void;

    //Modals
    createEventModal: boolean;
    handleCreateEventModal: (selectInfo?: DateSelectArg) => void;
    confirmChangeModal: boolean;
    handleConfirmChangeModal: () => void;
    detailEventModal: boolean;
    handleDetailEventModal: () => void;

    //ModalHelpers
    resizeHelper: any | null;
    dropHelper: any | null;
    confirmHelper: ConfirmEventModalType;
    clickHelper: EventClickArg | null;

    //Handle Create Or Edit
    createOrEditState: CalendarEvent;
    handleCreateOrEditState: (name: keyof CalendarEvent, value: string) => void;
    handleEditInitDate: (name: keyof CalendarEvent, value: string) => void;
    cancelCreateOrEdit: () => void;
    sendCreateOrEdit: () => Promise<void>;
    isCreateOrEditLoading: boolean;

    //Color picker helper
    setColor: Dispatch<SetStateAction<number>>;
    color: number;

    //Data Senders
    sendEventUpdate: () => Promise<void>;
}

export interface CalendarProviderProps{
    children: ReactNode;
}