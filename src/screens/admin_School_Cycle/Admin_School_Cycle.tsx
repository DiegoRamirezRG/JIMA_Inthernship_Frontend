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
import moment from 'moment'
import { Tooltip } from 'react-tooltip'
import { formatMonthDate } from '../../utils/dateSpanishFormater/dateSpanishFormater'
import { CalendarWeekCounter } from '../../components/admin_CycleComponents/calendarWeekCounter/CalendarWeekCounter'
import { StudentChartComponent } from '../../components/admin_CycleComponents/studentsChartComponent/StudentChartComponent'
import { CareerChartComponent } from '../../components/admin_CycleComponents/careerChartComponent/CareerChartComponent'
import { CycleManagmentComponent } from '../../components/admin_CycleComponents/cycleManagmentComponent/CycleManagmentComponent'
import { useStadisticsContext } from '../../contexts/stadisticsContext/StadisticsContext'
import kyubi from '../../../public/Kyubi - logo.svg'
import { EndTheCycleModal } from '../../components/admin_CycleComponents/endTheCycleModal/EndTheCycleModal'
import { useEndCycleSchoolarContext } from '../../contexts/endCycleSchoolar/EncCycleSchoolarContext'
import Lottie from 'lottie-react'
import warning from '../../assets/animations/warning.json'

export const Admin_School_Cycle = () => {

    const { isCalendarExist, createCalendarModal, calendarInfo } = useCalendarContext();
    const { getCycleStatusLoader, getCycleStatusFunc, cycleStatusState } = useCycleSchoolarContext();
    const { cycleStats, getCycleStats } = useStadisticsContext();
    const { endCycleModal, completelySureModal, handleCompletelySureModal } = useEndCycleSchoolarContext();

    const { 
        //Data
        userStadistics,
        //Loader
        isGettingInitialDataLoading,
    } = useAdminCycleStats();

    useEffect(() => {
        const awaitF = async() => {
            await getCycleStats();
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
                                                    :   <div className="manageCicle">
                                                            <div className="graphStadistics">
                                                                <div className="asideGraph">
                                                                    <p className='cardHeader'>Estudiantes por grado</p>
                                                                    <StudentChartComponent nonFomatData={cycleStats}/>
                                                                </div>
                                                                <div className="anotherGraph">
                                                                    <p className='cardHeader'>Estudiantes por carrera</p>
                                                                    <CareerChartComponent nonformatedData={cycleStats}/>
                                                                    <p className='cardFooter'>Total de estudiantes: {cycleStats.length}</p>
                                                                </div>
                                                                <div className="cycleInfo">
                                                                    <CalendarWeekCounter calendarInfo={calendarInfo}/>
                                                                    <CycleManagmentComponent/>
                                                                </div>
                                                            </div>
                                                            <div className="bannerBranding">
                                                                <p>powered by</p>
                                                                <img src={kyubi} alt="" />
                                                            </div>
                                                        </div>
                                        }
                                    </div>
                                </div>
                            </>
                }
            </div>
            <ModalComponent modalState={createCalendarModal} handleModalState={() => {}}>
                <CreateNewCalendarModal/>
            </ModalComponent>
            <ModalComponent modalState={endCycleModal} handleModalState={() => {}} modalSize='modal-lg'>
                <EndTheCycleModal/>
            </ModalComponent>
            <ModalComponent modalState={completelySureModal} handleModalState={() => {}}>
                <div className="surellyModal">
                    {
                        false
                        ?   <>Loading</>
                        :   <div className="warningContainer">
                                <div className="animationContainer">
                                    <Lottie animationData={warning} className='lootie-animation' loop={false}/>;
                                </div>
                                <div className="textbanner">
                                    ¿Esta usted <b>COMPLETAMENTE SEGURO</b> de terminar el ciclo?
                                </div>
                                <div className="actions">
                                    <button className='cancel-btn' onClick={handleCompletelySureModal}>Cancelar</button>
                                    <button className='save-btn' >Terminar Ciclo</button>
                                </div>
                            </div>
                    }
                </div>
            </ModalComponent>
        </NavigationComponent>
    )
}
