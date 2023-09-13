import React from 'react'
import './Admin_School_Cycle.scss'
import { NavigationComponent } from '../../components/generalComponents/navigationComponent/NavigationComponent'
import { CareerSliderComponent } from '../../components/admin_CycleComponents/careersSliderComponents/careerSliderComponent/CareerSliderComponent'
import { FooterStatsComponent } from '../../components/admin_CycleComponents/footerStatsComponents/footerStatsComponet/FooterStatsComponent'
import { LineChartComponent } from '../../components/admin_CycleComponents/linechartComponent/LineChartComponent'

export const Admin_School_Cycle = () => {
    return (
        <NavigationComponent>
            <div className="AdminCycleContainer">
                <div className="headerTitle">
                    <h2>Administracion de Ciclo Escolar</h2>
                </div>
                <div className="contentSection">
                    <div className="contentSideA">
                        <CareerSliderComponent/>
                        <LineChartComponent/>
                        <FooterStatsComponent/>
                    </div>
                    <div className="contentSideB">
                        
                    </div>
                </div>
            </div>
        </NavigationComponent>
    )
}
