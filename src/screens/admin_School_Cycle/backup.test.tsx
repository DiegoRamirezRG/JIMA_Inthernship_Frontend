import React from 'react'
import './Admin_School_Cycle.scss'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import { CareerSliderComponent } from '../../components/admin_CycleComponents/careersSliderComponents/careerSliderComponent/CareerSliderComponent'
import { FooterStatsComponent } from '../../components/admin_CycleComponents/footerStatsComponents/footerStatsComponet/FooterStatsComponent'
import { LineChartComponent } from '../../components/admin_CycleComponents/linechartComponent/LineChartComponent'
import { useAdminCycleStats } from '../../hooks/stadistics/useAdminCycleStats'
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent'
import { useCalendarContext } from '../../contexts/calendarContext/CalendarContext'
import { CreateNewCalendarComponent } from '../../components/admin_CalendarComponents/CreateNewCalendar/CreateNewCalendarComponent'
import { ModalComponent } from '../../components/generalComponents/modalComponent/ModalComponent'
import { CreateNewCalendarModal } from '../../components/admin_CalendarComponents/CreateNewCalendarModal/CreateNewCalendarModal'
import { sideBarOpts } from './helpers/siderOptionsMenu'
import { SidebarOptionComponent } from '../../components/admin_CycleComponents/sidebarOptionComponent/SidebarOptionComponent'

export const Admin_School_Cycle = () => {

    const { isCalendarExist, createCalendarModal } = useCalendarContext();

    const { 
        //Data
        userStadistics,
        genderStadistics,

        //Loader
        isGettingInitialDataLoading,
    } = useAdminCycleStats();

    return (
        <NavigationComponent>
            <div className="AdminCycleContainer">
                <div className="headerTitle">
                    <h2>Ciclo Escolar</h2>
                </div>
                <div className="contentSection">
                    {
                        isGettingInitialDataLoading
                        ?   <LoadingComponent/>
                        :   !isCalendarExist
                            ?   <CreateNewCalendarComponent/>
                            :   <>
                                    <div className="contentSideA">
                                        <CareerSliderComponent stadistics={userStadistics!}/>
                                        <LineChartComponent/>
                                        <FooterStatsComponent genders={genderStadistics!}/>
                                    </div>
                                    <div className="contentSideB">
                                        <h4>Configuraciones Generales</h4>
                                        <div className="generalOptions">
                                            {
                                                sideBarOpts.map((opt, index) => (
                                                    <SidebarOptionComponent option={opt} key={index}/>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </>
                    }
                </div>
            </div>
            <ModalComponent modalState={createCalendarModal} handleModalState={() => {}}>
                <CreateNewCalendarModal/>
            </ModalComponent>
        </NavigationComponent>
    )
}
