import React from 'react'
import { CreateCareerContextProvider } from './careerModal/createCareerContext'
import { DeleteConfirmContextProvider } from './deleteConfimModal/deleteConfirmMContext'
import { ShiftModalContextProvider } from './shiftModal/shiftModalContext'

export const ModalsProvider = (props: any) => {
    return (
        <CreateCareerContextProvider>
            <DeleteConfirmContextProvider>
                <ShiftModalContextProvider>
                    {props.children}
                </ShiftModalContextProvider>
            </DeleteConfirmContextProvider>
        </CreateCareerContextProvider>
    )
}
