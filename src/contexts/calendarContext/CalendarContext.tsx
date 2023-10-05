import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CalendarYearly } from "../../components/admin_CalendarComponents/CalendarRender/Calendar_Yearly/CalendarYearly";
import { CalendarMontlyComponent } from "../../components/admin_CalendarComponents/CalendarRender/Calendar_Montly/CalendarMontlyComponent";
import { CalendarWeeklyComponent } from "../../components/admin_CalendarComponents/CalendarRender/Calendar_Weekly/CalendarWeeklyComponent";
import { CalendarDailyComponent } from "../../components/admin_CalendarComponents/CalendarRender/Calendar_Daily/CalendarDailyComponent";
import { serverRestApi } from '../../utils/apiConfig/apiServerConfig';
import { Response } from '../../models/responsesModels/responseModel';
import { showErrorTost } from "../../components/generalComponents/toastComponent/ToastComponent";
import { CalendarBuilder, CalendarEvent, CalendarInfo, CreateOrEditCalendarEvent, MontlyEvents, PickDetailed } from '../../models/calendarModels/CalendarModels';
import moment from "moment";
import { daysOfTheWeekEnglish } from "../../utils/calendarHelpers/DaysOfTheWeek";
import { validateEvent } from "./validator/EventValidator";

interface CalendarContextInterface{
    //Data
    calendarView: 0 | 1 | 2 | 3;
    getCalendarDataLoading: boolean;
    getEventsDataLoading: boolean;
    calendarData: CalendarInfo | null;
    eventsData: CalendarEvent[] | null;
    monthEvents: MontlyEvents[] | null;
    date: moment.Moment;
    formatedData: string;
    monthDays: CalendarBuilder[];
    showDetailedModal: boolean;
    daySelected: PickDetailed;
    editOrCreateEvent: CalendarEvent | CreateOrEditCalendarEvent | null;
    isEditOrCreateEventActive: boolean;
    isCreating: boolean;
    isCretingLoading: boolean;
    //Functions
    handleCalendarView: (index: 0 | 1 | 2 | 3) => void;
    renderOptions: Map<number, JSX.Element>;
    getCalendarData: () => Promise<void>;
    getCalendarEvents: () => Promise<void>;
    nextMonthHandler: () => void;
    passMonthHandler: () => void;
    changeDetailedModalState: (day: number | null, month: number | null, year: number | null) => void;
    loadEventEdit: (event: MontlyEvents) => void;
    cancelEventEdit: () => void;
    handleChangeEventEdit: (name: keyof CalendarEvent | keyof CreateOrEditCalendarEvent, value: any) => void;
    handleActivateCreateEvent: () => void;
    createEventFromADay: () => void;
}

interface CalendarProviderProps{
    children: ReactNode;
}

const CalendarContext = createContext<CalendarContextInterface | undefined>(undefined);

export const CalendarContextProvider = ({ children }: CalendarProviderProps) => {

    //Loaders
    const [isGettingCalendarDataLoading, SetisGettingCalendarDataLoading] = useState(true);
    const [isGettingEventsDataLoading, setIsGettingEventsDataLoading] = useState(false);
    const [isCreateEventLoading, setIsCreateEventLoading] = useState(false);

    //Moment Helpers
    const [dateAux, setDateAux] = useState(moment());
    const [formatedDateAux, setformatedDateAux] = useState<string>('');
    const [monthDays, setMonthDays] = useState<CalendarBuilder[]>([]);

    const passMonth = () => {
        setDateAux(dateAux.subtract(1, 'months'));
        setformatedDateAux(dateAux.format('YYYY-MM-DD HH:mm:ss'));
        getMonthDays();
        loadMontlyEvents();
    }

    const nextMonth = () => {
        setDateAux(dateAux.add(1, 'months'));
        setformatedDateAux(dateAux.format('YYYY-MM-DD HH:mm:ss'));
        getMonthDays();
        loadMontlyEvents();
    }

    const getMonthDays = () => {
        const daysInMonth = dateAux.daysInMonth();
        const newWeekdays: CalendarBuilder[] = [];

        const indexOfFirstDay = daysOfTheWeekEnglish.indexOf(dateAux.date(1).format('dddd'));

        if(indexOfFirstDay > 0){
            for (let j = 0; j < indexOfFirstDay; j++) {
                newWeekdays.push({
                    dayNumber: 0,
                    dayText: '',
                    month: 0,
                    year: 0
                });
            }
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = dateAux.date(day);
            const weekday = date.format('dddd');
            const month = dateAux.format('MM');
            const year = dateAux.format('YYYY');
            newWeekdays.push({
                dayNumber: day,
                dayText: weekday,
                month: parseInt(month),
                year: parseInt(year)
            });
        }

        setMonthDays(newWeekdays);
    }

    //Get Initial Data
    const [calendarInfo, setCalendarInfo] = useState<CalendarInfo | null>(null);
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[] | null>([]);

    const [montlyEvents, setMontlyEvents] = useState<MontlyEvents[] | null>([]);

    const getInitialCalendarData = async () => {
        try {
            const response = await serverRestApi.get<Response>('/api/calendar/getActiveCalendar', { headers: { Authorization: localStorage.getItem('token') } });
            if(response.data.success){
                setCalendarInfo(response.data.data);
            }else{
                throw new Error('Ha ocurrido un error obteniendo el Calendario')
            }
            SetisGettingCalendarDataLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            SetisGettingCalendarDataLoading(false);
        }
    }

    const getInitialEventsData = async () => {
        try {
            setIsGettingEventsDataLoading(true);

            const eventRes = await serverRestApi.get<Response>('/api/calendar/getActiveEvents', { headers: { Authorization: localStorage.getItem('token') } });
            if(eventRes.data.success){
                setCalendarEvents(eventRes.data.data);
            }else{
                throw new Error('Ha ocurrido un error obteniendo los Eventos');
            }
            
            setIsGettingEventsDataLoading(false);
        } catch (error:any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-center', text: error.message})
            }
            setIsGettingEventsDataLoading(false);
        }
    }

    const loadMontlyEvents =  async () => {        
        const stateHelper: MontlyEvents[] = [];

        calendarEvents?.map((event) => {
            const eventDate = moment(event.Fecha_Inicio).format('YYYY-MM-DD');
            const eventDay = moment(event.Fecha_Inicio).format('D');            

            if(dateAux.isSame(eventDate, 'month') && dateAux.isSame(eventDate, 'year')){
                stateHelper.push({day: parseInt(eventDay), event: event});
            }
        });

        if (stateHelper.length > 0) {
            setMontlyEvents([...stateHelper]);
        }else{
            setMontlyEvents([]);
        }
    }

    //Handle Calendar View
    const [renderCalendarView, setRenderCalendarView] = useState<0 | 1 | 2 | 3>(0);

    const handleCalendarView = (index: 0 | 1 | 2 | 3) => {
        setRenderCalendarView(index);
        loadMontlyEvents();
    }

    const calendarRenderViews = new Map<number, JSX.Element>([
        [0, <CalendarYearly/>],
        [1, <CalendarMontlyComponent/>],
        [2, <CalendarWeeklyComponent/>],
        [3, <CalendarDailyComponent/>],
    ]);

    //Modal Handler
    const [detailedDayModalState, setDetailedDayModalState] = useState<boolean>(false);
    const [detailedDateDaySelected, setDetailedDateDaySelected] = useState<PickDetailed>({
        day: null,
        month: null,
        year: null
    });

    const handleDetailedDayModalState = (day: number | null, month: number | null, year: number | null) => {
        setDetailedDateDaySelected({day, month, year});
        setDetailedDayModalState(!detailedDayModalState);
    }

    //HandleModalEdit
    const defultEditEventState: CreateOrEditCalendarEvent = {
        Titulo: '',
        Descripcion: '',
        Fecha_Inicio: '',
        Fecha_Fin: '',
        Color: '',
    }

    const [createOrEditEvent, setCreateOrEditEvent] = useState<CalendarEvent | CreateOrEditCalendarEvent>(defultEditEventState);
    const [isCreateOrEditEventActive, setisCreateOrEditEventActive] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState(true);

    const loadEventToEdit = (event: MontlyEvents) => {
        setCreateOrEditEvent(event.event);
        setisCreateOrEditEventActive(true);
        setIsCreating(false);
    }

    const cancelEditEvent = () => {
        setisCreateOrEditEventActive(false);
        setCreateOrEditEvent(defultEditEventState);
        setIsCreating(true);
    }

    const handleCreateActivate = () => {
        setisCreateOrEditEventActive(true);
    }

    const handleEditEvent = (name: keyof CalendarEvent | keyof CreateOrEditCalendarEvent, value: any) => {

        if(name === 'Fecha_Inicio'){

            const { year, month, day } = detailedDateDaySelected;
            let hourHelper = value.split(':')

            let date = moment({
                year: year!,
                month: month! - 1,
                day: day!,
                hour: hourHelper[0],
                minute: hourHelper[1]
            });

            const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');

            setCreateOrEditEvent((prevState) => ({
                ...prevState,
                [name]: formattedDate,
            }));
        }else{
            setCreateOrEditEvent((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }

    }

    const createNewEventOnADayDetail = async () => {
        try {
            setIsCreateEventLoading(true);

            await validateEvent(createOrEditEvent);
            
            const response = await serverRestApi.post<Response>('/api/calendar/createNewEvent',{
                ...createOrEditEvent,
                ID_Calendario: calendarInfo?.ID_Calendario
            },{ headers: { Authorization: localStorage.getItem('token') } });

            if(response.data.success){
                await getInitialEventsData();
                await loadMontlyEvents();
            }


            setCreateOrEditEvent(defultEditEventState);
            setisCreateOrEditEventActive(false);
            setIsCreateEventLoading(false);
        } catch (error: any) {
            if(error.response){
                showErrorTost({position: 'top-center', text: error.response.data.message})
            }else{
                showErrorTost({position: 'top-right', text: error.message})
            }
            setIsCreateEventLoading(false);
        }
    }

    //Context Value
    const contextValue: CalendarContextInterface = {
        calendarView: renderCalendarView,
        handleCalendarView: handleCalendarView,
        renderOptions: calendarRenderViews,
        getCalendarData: getInitialCalendarData,
        getCalendarDataLoading: isGettingCalendarDataLoading,
        calendarData: calendarInfo,
        date: dateAux,
        nextMonthHandler: nextMonth,
        passMonthHandler: passMonth,
        formatedData: formatedDateAux,
        monthDays: monthDays,
        eventsData: calendarEvents,
        getCalendarEvents: getInitialEventsData,
        getEventsDataLoading: isGettingEventsDataLoading,
        monthEvents: montlyEvents,
        showDetailedModal: detailedDayModalState,
        changeDetailedModalState: handleDetailedDayModalState,
        daySelected: detailedDateDaySelected,
        loadEventEdit: loadEventToEdit,
        cancelEventEdit: cancelEditEvent,
        editOrCreateEvent: createOrEditEvent,
        isEditOrCreateEventActive: isCreateOrEditEventActive,
        handleChangeEventEdit: handleEditEvent,
        isCreating: isCreating,
        handleActivateCreateEvent: handleCreateActivate,
        createEventFromADay: createNewEventOnADayDetail,
        isCretingLoading: isCreateEventLoading
    };

    useEffect(() => {
        if(localStorage.getItem('token') != null && localStorage.getItem('token') != ''){
            const awaitFunc = async () => {
                await getInitialCalendarData();
                await getInitialEventsData();
            }
    
            awaitFunc();
    
            setformatedDateAux(dateAux.format('YYYY-MM-DD HH:mm:ss'));
            getMonthDays();
            loadMontlyEvents();
            setCreateOrEditEvent(defultEditEventState);
        }
    }, [])

    //Context Provider
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

