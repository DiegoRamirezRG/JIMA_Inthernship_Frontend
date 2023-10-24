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
                                            {props.children}
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
