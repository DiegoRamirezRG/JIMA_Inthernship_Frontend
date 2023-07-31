import React from 'react'
import { AuthProvider } from './authContext/AuthProvider'

export const ContentProvider = (props: any) => {
    return (
        <AuthProvider>
            {props.children}
        </AuthProvider>
    )
}
