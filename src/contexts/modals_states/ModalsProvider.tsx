import React from 'react'
import { CreateCareerContextProvider } from './careerModal/createCareerContext'
import { DeleteConfirmContextProvider } from './deleteConfimModal/deleteConfirmMContext'
import { ShiftModalContextProvider } from './shiftModal/shiftModalContext'
import { CreateGradeProvider } from './gradeModal/gradeModal'
import { CreateGroupModalProvider } from './groupModal/groupModal'

export const ModalsProvider = (props: any) => {
    return (
        <CreateCareerContextProvider>
            <DeleteConfirmContextProvider>
                <ShiftModalContextProvider>
                    <CreateGradeProvider>
                        <CreateGroupModalProvider>
                            {props.children}
                        </CreateGroupModalProvider>
                    </CreateGradeProvider>
                </ShiftModalContextProvider>
            </DeleteConfirmContextProvider>
        </CreateCareerContextProvider>
    )
}
