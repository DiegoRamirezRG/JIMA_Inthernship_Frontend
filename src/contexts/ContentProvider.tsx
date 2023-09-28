import React from 'react'
import { AuthProvider } from './authContext/AuthProvider'
import { CreateCareerContextProvider } from './modals_states/careerModal/createCareerContext'
import { ModalsProvider } from './modals_states/ModalsProvider'
import { StudentContextProvider } from './studentContext/StudentContext'
import { CalendarContextProvider } from './calendarContext/CalendarContext'

export const ContentProvider = (props: any) => {
    return (
        <AuthProvider>
            <ModalsProvider>
                <StudentContextProvider>
                    <CalendarContextProvider>
                        {props.children}
                    </CalendarContextProvider>
                </StudentContextProvider>
            </ModalsProvider>
        </AuthProvider>
    )
}
