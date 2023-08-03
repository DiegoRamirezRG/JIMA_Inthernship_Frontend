import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LoginScreen } from '../screens/loginScreen/LoginScreen'
import { NotFoundScreen } from '../screens/notFoundScreen/NotFoundScreen'
import { MainScreen } from '../screens/mainScreen/MainScreen'
import { ProtectedRoute } from './protectedRoute/ProtectedRoute'
import { SettingsScreen } from '../screens/settingsScreen/SettingsScreen'
import { Admin_UserScreen } from '../screens/admin_UserScreen/Admin_UserScreen'


const generalRoutes = [
    {
        path: "/",
        element: <LoginScreen/>,
    },
    {
        path: "/home",
        element: <ProtectedRoute>
            <MainScreen/>
        </ProtectedRoute>,
    },
    {
        path: "/settings",
        element: <ProtectedRoute>
            <SettingsScreen/>
        </ProtectedRoute>,
    },
    {
        path: "*",
        element: <NotFoundScreen/>,
    }
]

const administrativeRoutes = [
    {
        path: "/admin_users",
        element: <ProtectedRoute>
            <Admin_UserScreen/>
        </ProtectedRoute>,
    }
]


export const routes = createBrowserRouter([
    ...generalRoutes,
    ...administrativeRoutes
])