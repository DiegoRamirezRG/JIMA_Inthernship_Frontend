import React from 'react'
import { AuthProvider } from './authContext/AuthProvider'
import { CreateCareerContextProvider } from './modals_states/careerModal/createCareerContext'
import { ModalsProvider } from './modals_states/ModalsProvider'

export const ContentProvider = (props: any) => {
    return (
        <AuthProvider>
            <ModalsProvider>
                {props.children}
            </ModalsProvider>
        </AuthProvider>
    )
}
