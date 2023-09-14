import React from 'react'
import './Admin_School_Cycle.scss'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import { CareerSliderComponent } from '../../components/admin_CycleComponents/careersSliderComponents/careerSliderComponent/CareerSliderComponent'
import { FooterStatsComponent } from '../../components/admin_CycleComponents/footerStatsComponents/footerStatsComponet/FooterStatsComponent'
import { LineChartComponent } from '../../components/admin_CycleComponents/linechartComponent/LineChartComponent'
import { useAdminCycleStats } from '../../hooks/stadistics/useAdminCycleStats'
import { LoadingComponent } from '../../components/generalComponents/loadingComponent/LoadingComponent'

export const Admin_School_Cycle = () => {

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
                    <h2>Administracion de Ciclo Escolar</h2>
                </div>
                <div className="contentSection">
                    {
                        isGettingInitialDataLoading
                        ?   <LoadingComponent/>
                        :   <>
                                <div className="contentSideA">
                                    <CareerSliderComponent stadistics={userStadistics!}/>
                                    <LineChartComponent/>
                                    <FooterStatsComponent genders={genderStadistics!}/>
                                </div>
                                <div className="contentSideB">
                                    
                                </div>
                            </>
                    }
                </div>
            </div>
        </NavigationComponent>
    )
}
