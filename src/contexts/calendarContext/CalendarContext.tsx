import { ReactNode, createContext, useContext, useState } from "react";
import { CalendarYearly } from "../../components/admin_CalendarComponents/CalendarRender/Calendar_Yearly/CalendarYearly";
import { CalendarMontlyComponent } from "../../components/admin_CalendarComponents/CalendarRender/Calendar_Montly/CalendarMontlyComponent";
import { CalendarWeeklyComponent } from "../../components/admin_CalendarComponents/CalendarRender/Calendar_Weekly/CalendarWeeklyComponent";
import { CalendarDailyComponent } from "../../components/admin_CalendarComponents/CalendarRender/Calendar_Daily/CalendarDailyComponent";
import { serverRestApi } from "../../utils/apiConfig/apiServerConfig";
import { Response } from "../../models/responsesModels/responseModel";
import { showErrorTost } from "../../components/generalComponents/toastComponent/ToastComponent";
import { CalendarInfo } from '../../models/calendarModels/CalendarModels';

interface CalendarContextInterface{
    calendarView: 0 | 1 | 2 | 3;
    getCalendarDataLoading: boolean;
    calendarData: CalendarInfo | null;
    handleCalendarView: (index: 0 | 1 | 2 | 3) => void;
    renderOptions: Map<number, JSX.Element>;
    getCalendarData: () => Promise<void>;
}

interface CalendarProviderProps{
    children: ReactNode;
}

const CalendarContext = createContext<CalendarContextInterface | undefined>(undefined);

export const CalendarContextProvider = ({ children }: CalendarProviderProps) => {

    //Loaders
    const [isGettingCalendarDataLoading, SetisGettingCalendarDataLoading] = useState(true);

    //Get Initial Data
    const [calendarInfo, setCalendarInfo] = useState<CalendarInfo | null>(null);

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

    }

    //Handle Calendar View
    const [renderCalendarView, setRenderCalendarView] = useState<0 | 1 | 2 | 3>(0);

    const handleCalendarView = (index: 0 | 1 | 2 | 3) => {
        setRenderCalendarView(index);
    }

    const calendarRenderViews = new Map<number, JSX.Element>([
        [0, <CalendarYearly/>],
        [1, <CalendarMontlyComponent/>],
        [2, <CalendarWeeklyComponent/>],
        [3, <CalendarDailyComponent/>],
    ])

    //Context Value
    const contextValue: CalendarContextInterface = {
        calendarView: renderCalendarView,
        handleCalendarView: handleCalendarView,
        renderOptions: calendarRenderViews,
        getCalendarData: getInitialCalendarData,
        getCalendarDataLoading: isGettingCalendarDataLoading,
        calendarData: calendarInfo
    };

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

