import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LoginScreen } from '../screens/loginScreen/LoginScreen'
import { NotFoundScreen } from '../screens/notFoundScreen/NotFoundScreen'
import { MainScreen } from '../screens/mainScreen/MainScreen'
import { ProtectedRoute } from './protectedRoute/ProtectedRoute'
import { SettingsScreen } from '../screens/settingsScreen/SettingsScreen'
import { Admin_UserScreen } from '../screens/admin_UserScreen/Admin_UserScreen'
import { Admin_UserCreateScree } from '../screens/admin_UserCreateScreen/Admin_UserCreateScree'
import { Admin_UserEditScreen } from '../screens/admin_UserEditScreen/Admin_UserEditScreen'
import { Admin_School_Cycle } from '../screens/admin_School_Cycle/Admin_School_Cycle'
import { Admin_CalendarScreen } from '../screens/admin_calendarScreen/Admin_CalendarScreen'


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
    },
    {
        path: "/admin_users/create",
        element: <ProtectedRoute>
            <Admin_UserCreateScree/>
        </ProtectedRoute>,
    },
    {
        path: "/admin_users/edit/:userId",
        element: <ProtectedRoute>
            <Admin_UserEditScreen/>
        </ProtectedRoute>
    },
    {
        path: "/admin_cycle",
        element: <ProtectedRoute>
            <Admin_School_Cycle/>
        </ProtectedRoute>
    },
    {
        path: "/admin_calendar",
        element: <ProtectedRoute>
            <Admin_CalendarScreen/>
        </ProtectedRoute>
    }
]


export const routes = createBrowserRouter([
    ...generalRoutes,
    ...administrativeRoutes
])