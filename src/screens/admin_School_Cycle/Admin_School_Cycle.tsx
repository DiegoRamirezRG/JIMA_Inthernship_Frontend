import React, { useEffect } from 'react'
import './Admin_School_Cycle.scss'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import { CareerSliderComponent } from '../../components/admin_CycleComponents/careersSliderComponents/careerSliderComponent/CareerSliderComponent'
import { useAdminCycleStats } from '../../hooks/stadistics/useAdminCycleStats'
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent'
import { useCalendarContext } from '../../contexts/calendarContext/CalendarContext'
import { CreateNewCalendarComponent } from '../../components/admin_CalendarComponents/CreateNewCalendar/CreateNewCalendarComponent'
import { ModalComponent } from '../../components/generalComponents/modalComponent/ModalComponent'
import { CreateNewCalendarModal } from '../../components/admin_CalendarComponents/CreateNewCalendarModal/CreateNewCalendarModal'
import { useCycleSchoolarContext } from '../../contexts/initCycleSchoolar/CycleSchoolarContext'
import { NotInitOrFinishCycleComponent } from '../../components/admin_CycleComponents/notInitOrFinishedCycleComponent/NotInitOrFinishCycleComponent'

export const Admin_School_Cycle = () => {

    const { isCalendarExist, createCalendarModal } = useCalendarContext();
    const { getCycleStatusLoader, getCycleStatusFunc, cycleStatusState } = useCycleSchoolarContext();

    const { 
        //Data
        userStadistics,
        //Loader
        isGettingInitialDataLoading,
    } = useAdminCycleStats();

    useEffect(() => {
        const awaitF = async() => {
            await getCycleStatusFunc();
        }

        awaitF();
    }, [])
    

    return (
        <NavigationComponent>
            <div className="AdminCycleContainer">
                {
                    isGettingInitialDataLoading
                    ?   <LoadingComponent/>
                    :   !isCalendarExist
                        ?   <CreateNewCalendarComponent/>
                        :   <>
                                <div className="headerTitle">
                                    <h2>Ciclo Escolar</h2>
                                </div>
                                <div className="contentSection">
                                    <div className="headerUserInfo">
                                        <CareerSliderComponent stadistics={userStadistics!}/>
                                    </div>
                                    <div className="innerContainerContent">
                                        {
                                            getCycleStatusLoader
                                            ?   <LoadingComponent/>
                                            :   !cycleStatusState?.Ciclo_Iniciado
                                                ?   <NotInitOrFinishCycleComponent type='not-init'/>
                                                :   !cycleStatusState.Ciclo_Conf_Term
                                                    ?   <NotInitOrFinishCycleComponent type='not-finished'/>
                                                    :   <>Ciclo listo</>
                                        }
                                    </div>
                                </div>
                            </>
                }
            </div>
            <ModalComponent modalState={createCalendarModal} handleModalState={() => {}}>
                <CreateNewCalendarModal/>
            </ModalComponent>
        </NavigationComponent>
    )
}
