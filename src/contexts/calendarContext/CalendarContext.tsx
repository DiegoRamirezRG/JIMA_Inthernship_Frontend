import { createContext, useContext, useEffect, useState } from "react";
import { CalendarContextInterface, CalendarProviderProps } from "../../models/calendarModels/CalendarContextModels";
import { CalendarEvent, CalendarInfo, ConfirmEventModalType, FullCalendarEventFormater } from "../../models/calendarModels/CalendarModels";
import { serverRestApi } from "../../utils/apiConfig/apiServerConfig";
import { Response } from "../../models/responsesModels/responseModel";
import { showErrorTost, showSuccessToast } from "../../components/generalComponents/toastComponent/ToastComponent";
import { getContrast } from "../../utils/colorContrast/colorContrast";
import moment from "moment";
import { formatEventForFullCalendar } from "../../utils/calendarHelpers/FullCalendarFormater";
import { DateSelectArg, EventClickArg, EventContentArg, EventInput } from "@fullcalendar/core";
import { validateEvent } from "./validator/EventValidator";
import { ConfirmModal } from '../../components/generalComponents/confirmModal/ConfirmModal';
import { CalendarColors } from "../../utils/colorRandom/ColorArrayRandom";

const CalendarContext = createContext<CalendarContextInterface | undefined>(undefined);

export const CalendarContextProvider = ({ children }: CalendarProviderProps) => {

  //Degault Obj
  const defaultCreateOrEdit: CalendarEvent = {
    ID_Calendario_Eventos: '',
    Titulo: '',
    Descripcion: '',
    Fecha_Inicio: '0000-00-00 00:00:00',
    Fecha_Fin: '',
    Color: '',
    FK_Calendario: '',
    Creado_En: '',
    Actualizado_EN: ''
  }

  //Handle Calendar Events
  const [calendarGeneralLoader, setCalendarGeneralLoader] = useState(false);
  const [eventLoader, setEventLoader] = useState(false);
  const [calendarInfo, setCalendarInfo] = useState<CalendarInfo | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [formatedCalendarEvents, setFormatedCalendarEvents] = useState<EventInput[]>([]);

  const [dateArgs, setDateArgs] = useState<DateSelectArg | null>(null);
  const [selectedEventDetails, setSelectedEventDetails] = useState<EventClickArg | null>(null);
  const [createOrEditNewEvent, setCreateOrEditNewEvent] = useState<CalendarEvent>(defaultCreateOrEdit);
  const [isCreatingLoading, setIsCreatingLoading] = useState(false);

  const [colorSelected, setColorSelected] = useState<number>(9);
  const [resizeInfo, setResizeInfo] = useState<any | null>(null);
  const [dropInfo, setDropInfo] = useState<any | null>(null)
  const [confirmType, setConfirmType] = useState<ConfirmEventModalType>(null);

  const [isCalendarValid, setIsCalendarValid] = useState<boolean | null>(null);
  const [isValidatingCalendar, setIsValidatingCalendar] = useState(true);

  const getActiveCalendarEvents = async () => {
    try {
      setEventLoader(true);
      const response = await serverRestApi.get<Response>('/api/calendar/getActiveEvents', { headers: { Authorization: localStorage.getItem('token') } });
      setCalendarEvents(response.data.data);

      const heleper = response.data.data.map(formatEventForFullCalendar);
      setFormatedCalendarEvents(heleper);

      setEventLoader(false);
    } catch (error: any) {
      if(error.response){
        showErrorTost({position: 'top-center', text: error.response.data.message})
      }else{
        showErrorTost({position: 'top-center', text: error.message})
      }
      setEventLoader(false);
    }
  }

  const getInitialCalendarData = async () => {
    try {
        const response = await serverRestApi.get<Response>('/api/calendar/getActiveCalendar', { headers: { Authorization: localStorage.getItem('token') } });        
        if(response.data.success){
          if(response.data.data === null){
            setIsCalendarValid(false);
            setIsValidatingCalendar(false);
          }else{
            setIsCalendarValid(true);
            setIsValidatingCalendar(false);
            setCalendarInfo(response.data.data);
          }
        }else{
            throw new Error('Ha ocurrido un error obteniendo el Calendario')
        }
    } catch (error: any) {
        if(error.response){
            showErrorTost({position: 'top-center', text: error.response.data.message})
        }else{
            showErrorTost({position: 'top-center', text: error.message})
        }
    }
}


  //MODALS
  const [createEventModal, setCreateEventModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [detailedModal, setDetailedModal] = useState<boolean>(false);
  const [createCalendarModal, setCreateCalendarModal] = useState<boolean>(false);
  
  const handleCreateEventModal = (selectInfo?: DateSelectArg ) => {
    setCreateEventModal(!createEventModal);

    if(selectInfo){
      setDateArgs(selectInfo);
    }else{
      setDateArgs(null);
    }
  }

  const handleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  }

  const handleDetailedEventModal = () => {
    setDetailedModal(!detailedModal);
  }

  const handleCreationCalendarModal = () => {
    setCreateCalendarModal(!createCalendarModal);
  }

  //Manipulate Events
  const handleOnChangeEditOrCreateEvent = (name: keyof CalendarEvent, value: string) => {
    if(name === 'Fecha_Inicio'){
      const dateTimeHelper = `${dateArgs?.startStr} ${value}:00`;
      setCreateOrEditNewEvent((prevState) => ({
        ...prevState,
        [name]: moment(dateTimeHelper).format('YYYY-MM-DD HH:mm:ss')
      }));
    }else{
      setCreateOrEditNewEvent((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  const handleEditCompleteInitDate = (name: keyof CalendarEvent, value: string) => {
    setCreateOrEditNewEvent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const cancelCreateOrEditEvent = () => {
    setCreateOrEditNewEvent(defaultCreateOrEdit);
  }

  const handleCreateNewCalendar = async (title: string, init: string, end: string) => {
    try {
      
      setCalendarGeneralLoader(true);

      if(!init || !end || init == '' || end == ''){
        throw new Error('Los datos no pueden ser vacios')
      }

      const resposne = await serverRestApi.post<Response>('/api/calendar/createNewCalendar', {
        Nombre: title,
        Inicio: init,
        Fin: end
      }, { headers: { Authorization: localStorage.getItem('token') } });

      if(resposne.data.success){
        showSuccessToast({position: 'top-right', text: resposne.data.message});

        await getInitialCalendarData();
        setCreateCalendarModal(false);
        setCalendarGeneralLoader(false);
      }

    } catch (error: any) {
      console.log(error);
      
      if(error.response){
        showErrorTost({position: 'top-center', text: error.response.data.message})
      }else{
        showErrorTost({position: 'top-right', text: error.message})
      }
      setCalendarGeneralLoader(false);
    }
  }

  const sendCreateEvent = async () => {
    try {
      setIsCreatingLoading(true);
      const daySelected = moment(dateArgs?.startStr);      
      const itsOver = createOrEditNewEvent.Fecha_Fin ? !moment(createOrEditNewEvent.Fecha_Fin).isBefore(daySelected) : true;

      await validateEvent(createOrEditNewEvent);

      const response = await serverRestApi.post<Response>('/api/calendar/createNewEvent', {
        ...createOrEditNewEvent,
        ID_Calendario: calendarInfo?.ID_Calendario
      }, { headers: { Authorization: localStorage.getItem('token') } });

      if(response.data.success){
        let calendarApi = dateArgs!.view.calendar;
        calendarApi.unselect();

        calendarApi.addEvent({
          id: response.data.data,
          title: createOrEditNewEvent.Titulo!,
          start: moment(createOrEditNewEvent.Fecha_Inicio).format('YYYY-MM-DDTHH:mm:ss'),
          end: createOrEditNewEvent.Fecha_Fin != null && createOrEditNewEvent.Fecha_Fin != '' ? createOrEditNewEvent.Fecha_Fin : '',
          allDay: createOrEditNewEvent.Fecha_Fin != null && createOrEditNewEvent.Fecha_Fin != '' ? false : true,
          backgroundColor: createOrEditNewEvent.Color!,
          borderColor: createOrEditNewEvent.Color!,
          textColor: getContrast(createOrEditNewEvent.Color!),
          editable: !moment(createOrEditNewEvent.Fecha_Inicio).isBefore(daySelected) && itsOver
        });
      }
      cancelCreateOrEditEvent();
      handleCreateEventModal();
      setIsCreatingLoading(false);
    } catch (error: any) {
      console.log(error);
      
      if(error.response){
        showErrorTost({position: 'top-center', text: error.response.data.message})
      }else{
        showErrorTost({position: 'top-right', text: error.message})
      }
      setIsCreatingLoading(false);
    }
  }

  const handleSendUpdateEvent = async () => {
    try {

      if(confirmType == 'rezise'){
        const isValidDateResize = moment(moment(resizeInfo.event.end).format('YYYY-MM-DDTHH:mm:ss'), 'YYYY-MM-DDTHH:mm:ss', true).isValid();

        await serverRestApi.put<Response>('/api/calendar/updateEvent',{
          ID_Calendario_Eventos: resizeInfo.event._def.publicId,
          Titulo: resizeInfo.event.title,
          Descripcion: resizeInfo.event.extendedProps.description,
          Fecha_Inicio: moment(resizeInfo.event.start).format('YYYY-MM-DDTHH:mm:ss'),
          Fecha_Fin: isValidDateResize ? moment(resizeInfo.event.end).format('YYYY-MM-DDTHH:mm:ss') : '',
          Color: resizeInfo.event._def.ui.backgroundColor,
        }, { headers: { Authorization: localStorage.getItem('token') } });

        handleEventResize();
      }else if(confirmType == 'dropped'){
        const isValidDateDrop = moment(moment(dropInfo.event.end).format('YYYY-MM-DDTHH:mm:ss'), 'YYYY-MM-DDTHH:mm:ss', true).isValid();

        await serverRestApi.put<Response>('/api/calendar/updateEvent',{
          ID_Calendario_Eventos: dropInfo.event.id,
          Titulo: dropInfo.event.title,
          Descripcion: dropInfo.event.extendedProps.description,
          Fecha_Inicio: moment(dropInfo.event.start).format('YYYY-MM-DDTHH:mm:ss'),
          Fecha_Fin: isValidDateDrop ? moment(dropInfo.event.end).format('YYYY-MM-DDTHH:mm:ss') : '',
          Color: dropInfo.event.backgroundColor,
        }, { headers: { Authorization: localStorage.getItem('token') } });   
        
        handleEventDrop();
      }else if(confirmType === 'click'){
        const isValidDateFinish = moment(moment(createOrEditNewEvent.Fecha_Fin).format('YYYY-MM-DDTHH:mm:ss'), 'YYYY-MM-DDTHH:mm:ss', true).isValid();
        
        await serverRestApi.put<Response>('/api/calendar/updateEvent',{
          ID_Calendario_Eventos: createOrEditNewEvent.ID_Calendario_Eventos,
          Titulo: createOrEditNewEvent.Titulo,
          Descripcion: createOrEditNewEvent.Descripcion != null ? createOrEditNewEvent.Descripcion : '',
          Fecha_Inicio: moment(createOrEditNewEvent.Fecha_Inicio).format('YYYY-MM-DDTHH:mm:ss'),
          Fecha_Fin: isValidDateFinish ? moment(createOrEditNewEvent.Fecha_Fin).format('YYYY-MM-DDTHH:mm:ss') : '',
          Color: createOrEditNewEvent.Color,
        }, { headers: { Authorization: localStorage.getItem('token') } });


        const helperEvent = {
          ...selectedEventDetails?.event.toPlainObject(),
          title: createOrEditNewEvent.Titulo,
          start: createOrEditNewEvent.Fecha_Inicio,
          end: createOrEditNewEvent.Fecha_Fin,
          description: createOrEditNewEvent.Descripcion != null ? createOrEditNewEvent.Descripcion : '',
          color: createOrEditNewEvent.Color,
        }

        selectedEventDetails?.event.setProp('title', helperEvent.title);
        selectedEventDetails?.event.setStart(helperEvent.start!);
        selectedEventDetails?.event.setEnd(helperEvent.end);
        selectedEventDetails?.event.setProp('backgroundColor', helperEvent.color);
        selectedEventDetails?.event.setProp('borderColor', helperEvent.color);
        selectedEventDetails?.event.setExtendedProp('description', helperEvent.description);

        handleEventClick();
        setColorSelected(9);
        cancelCreateOrEditEvent();
      }
    } catch (error: any) {
      console.log(error);
      
      if(error.response){
        showErrorTost({position: 'top-center', text: error.response.data.message})
      }else{
        showErrorTost({position: 'top-right', text: error.message})
      }
    }
  }

  const handleCustomEventRender = (eventContent: EventContentArg) => {
    return (
        <>
            <b>{isNaN(Number(eventContent.timeText)) ? eventContent.timeText : ''}</b>
            <i className="event-title-rendering"> {eventContent.event.title}</i>
        </>
    )
  }

  const handleEventResize = (info?: any) => {
    handleConfirmModal();
    if(info){
      setResizeInfo(info);
      setConfirmType('rezise');
    }else{
      setResizeInfo(null);
      setConfirmType(null);
    }
  }

  const handleEventDrop = (info?: any) => {
    handleConfirmModal();
    if(info){
      setDropInfo(info);
      setConfirmType('dropped');
    }else{
      setDropInfo(null);
      setConfirmType(null);
    }
  }

  const handleEventClick = (info?: EventClickArg) => {
    if(info != null && info){
      
      setSelectedEventDetails(info);
      setConfirmType('click');

      const indice = CalendarColors.indexOf(info.event.backgroundColor);
      setColorSelected(indice); 

      let tempEvent: CalendarEvent = {
        ID_Calendario_Eventos: info.event.id,
        Titulo: info.event.title,
        Descripcion: info.event.extendedProps.Descripcion ? info.event.extendedProps.Descripcion : '',
        Color: info.event.backgroundColor,
        Fecha_Inicio: info.event.start!.toString(),
        Fecha_Fin: info.event.end ? info.event.end.toString() : '',
        Actualizado_EN: null,
        Creado_En: null,
        FK_Calendario: null
      }

      setCreateOrEditNewEvent(tempEvent);
    }else{
      setSelectedEventDetails(null);
      setConfirmType(null);
    }
    handleDetailedEventModal();
  }

  //Context Value
  const contextValue : CalendarContextInterface = {
    eventLoader: eventLoader,
    eventArray: calendarEvents,
    fullCalendarArray: formatedCalendarEvents,
    getEventsFunction: getActiveCalendarEvents,
    eventRender: handleCustomEventRender,
    eventResize: handleEventResize,
    eventDrop: handleEventDrop,
    eventClick: handleEventClick,

    //Modals
    createEventModal: createEventModal,
    handleCreateEventModal: handleCreateEventModal,
    confirmChangeModal: confirmModal,
    handleConfirmChangeModal: handleConfirmModal,
    detailEventModal: detailedModal,
    handleDetailEventModal: handleDetailedEventModal,
    createCalendarModal: createCalendarModal,
    handleCreateCalendarModal: handleCreationCalendarModal,

    //Modal Helpers
    confirmHelper: confirmType,
    resizeHelper: resizeInfo,
    dropHelper: dropInfo,
    clickHelper: selectedEventDetails,

    //Handle Create Or Edit
    createOrEditState: createOrEditNewEvent,
    handleCreateOrEditState: handleOnChangeEditOrCreateEvent,
    handleEditInitDate: handleEditCompleteInitDate,
    cancelCreateOrEdit: cancelCreateOrEditEvent,
    sendCreateOrEdit: sendCreateEvent,
    isCreateOrEditLoading: isCreatingLoading,

    //Handle Colors
    color: colorSelected,
    setColor: setColorSelected,

    //Data senders
    sendEventUpdate: handleSendUpdateEvent,

    //Calendar Validator
    isCalendarExist: isCalendarValid,
    isCalendarExistLoading: isValidatingCalendar,

    //Create Calendar
    createCalendar: handleCreateNewCalendar,
    createCalendarLoader: calendarGeneralLoader
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      const asyncFunc = async() => {
        await getInitialCalendarData();
      }

      asyncFunc()
    }
  }, [localStorage.getItem('token')]);
  

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
}

//Use Context
export const useCalendarContext = () : CalendarContextInterface => {
  const context = useContext(CalendarContext);
  if(context === undefined){
      throw new Error('useCalendarContext debe ser utilizado dentro de un Context Provider');
  }
  return context;
}