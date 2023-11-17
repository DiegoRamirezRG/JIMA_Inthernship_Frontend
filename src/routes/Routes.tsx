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
import { Admin_InitCycleScreen } from '../screens/admin_InitCycleScreen/Admin_InitCycleScreen'
import { GroupsScreen } from '../screens/teacher_screens/groupsScreen/GroupsScreen'
import { SchedulesScreen } from '../screens/teacher_screens/schedulesScreen/SchedulesScreen'
import { DetailedGroupScreen } from '../screens/teacher_screens/detailedGroupScreen/DetailedGroupScreen'


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
    },
    {
        path: "/admin_cycle/init",
        element: <ProtectedRoute>
            <Admin_InitCycleScreen/>
        </ProtectedRoute>
    }
]

const teacherRoutes = [
    {
        path: "/teacher/classes",
        element: <ProtectedRoute>
                    <GroupsScreen/>
                </ProtectedRoute>
    },
    {
        path: "/teacher/classes/:classId",
        element: <ProtectedRoute>
                    <DetailedGroupScreen/>
                </ProtectedRoute>
    },
    {
        path: "/teacher/schedules",
        element: <ProtectedRoute>
                    <SchedulesScreen/>
                </ProtectedRoute>
    },
    {
        path: "/teacher/calendar",
        element: <ProtectedRoute>
                    <Admin_CalendarScreen/>
                </ProtectedRoute>
    },
]

export const routes = createBrowserRouter([
    ...generalRoutes,
    ...administrativeRoutes,
    ...teacherRoutes,
])