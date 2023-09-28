import React from 'react'
import { CreateCareerContextProvider } from './careerModal/createCareerContext'
import { DeleteConfirmContextProvider } from './deleteConfimModal/deleteConfirmMContext'
import { ShiftModalContextProvider } from './shiftModal/shiftModalContext'
import { CreateGradeProvider } from './gradeModal/gradeModal'
import { CreateGroupModalProvider } from './groupModal/groupModal'
import { ConfirmCustomEnrollModalProvider } from './confirmCustomEnrollModal/confirmCustomEnrollModal'

export const ModalsProvider = (props: any) => {
    return (
        <CreateCareerContextProvider>
            <DeleteConfirmContextProvider>
                <ShiftModalContextProvider>
                    <CreateGradeProvider>
                        <CreateGroupModalProvider>
                            <ConfirmCustomEnrollModalProvider>
                                {props.children}
                            </ConfirmCustomEnrollModalProvider>
                        </CreateGroupModalProvider>
                    </CreateGradeProvider>
                </ShiftModalContextProvider>
            </DeleteConfirmContextProvider>
        </CreateCareerContextProvider>
    )
}
