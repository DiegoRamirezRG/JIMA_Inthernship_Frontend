import React from 'react'
import { AuthProvider } from './authContext/AuthProvider'
import { CreateCareerContextProvider } from './modals_states/careerModal/createCareerContext'
import { ModalsProvider } from './modals_states/ModalsProvider'
import { StudentContextProvider } from './studentContext/StudentContext'
import { CalendarContextProvider } from './calendarContext/CalendarContext'
import { CycleSchoolarContextProvider } from './initCycleSchoolar/CycleSchoolarContext'
import { CareersContextProvider } from './careersContext/CareersContext'
import { CareersPlansContextProvider } from './careersContext/CareersPlansContext'
import { SubjectsContextProvider } from './subjectContext/SubjectsContext'
import { PlanMakerContextProvider } from './planMakerContext/PlanMakerContext'
import { ReinsInscrContextProvider } from './reins_inscrContext/ReinsInscrContext'
import { LoadScheduleContextProvider } from './loadScheduleContext/LoadScheduleContext'

export const ContentProvider = (props: any) => {
    return (
        <AuthProvider>
            <ModalsProvider>
                <StudentContextProvider>
                    <CalendarContextProvider>
                        <CycleSchoolarContextProvider>
                            <CareersContextProvider>
                                <CareersPlansContextProvider>
                                    <SubjectsContextProvider>
                                        <PlanMakerContextProvider>
                                            <ReinsInscrContextProvider>
                                                <LoadScheduleContextProvider>
                                                    {props.children}
                                                </LoadScheduleContextProvider>
                                            </ReinsInscrContextProvider>
                                        </PlanMakerContextProvider>
                                    </SubjectsContextProvider>
                                </CareersPlansContextProvider>
                            </CareersContextProvider>
                        </CycleSchoolarContextProvider>
                    </CalendarContextProvider>
                </StudentContextProvider>
            </ModalsProvider>
        </AuthProvider>
    )
}
