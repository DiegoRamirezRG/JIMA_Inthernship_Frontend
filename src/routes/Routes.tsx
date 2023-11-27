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
import { DetailedAssigmnetScreen } from '../screens/teacher_screens/detailedAssingmentScreen/DetailedAssigmnetScreen'
import { student } from '../models/userTypesModels/UserTypesModel';
import { ScheduleScreen } from '../screens/student_screens/scheduleScreen/ScheduleScreen'
import { ClassesScreen } from '../screens/student_screens/classesScreen/ClassesScreen'
import { DetailedClassScreen } from '../screens/student_screens/detailedClassScreen/DetailedClassScreen'
import { AssigmentScreen } from '../screens/student_screens/assigmentScreen/AssigmentScreen'
import { GradesScreen } from '../screens/student_screens/gradesScreen/GradesScreen'
import { ClassGradesScreen } from '../screens/student_screens/classGradesScreen/ClassGradesScreen'
import { AssigmentsToDoScreen } from '../screens/student_screens/assigmentsToDoScreen/AssigmentsToDoScreen'


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
    {
        path: "/teacher/classes/:classId/:assignId",
        element: <ProtectedRoute>
                    <DetailedAssigmnetScreen/>
                </ProtectedRoute>
    },
]

const studentRoutes = [
    {
        path: "/student/calendar",
        element: <ProtectedRoute>
                    <Admin_CalendarScreen/>
                </ProtectedRoute>
    },
    {
        path: "/student/schedule",
        element: <ProtectedRoute>
                    <ScheduleScreen/>
                </ProtectedRoute>
    },
    {
        path: "/student/classes",
        element: <ProtectedRoute>
                    <ClassesScreen/>
                </ProtectedRoute>
    },
    {
        path: "/student/classes/:classId",
        element: <ProtectedRoute>
                    <DetailedClassScreen/>
                </ProtectedRoute>
    },
    {
        path: "/student/classes/:classId/grades",
        element: <ProtectedRoute>
                    <ClassGradesScreen/>
                </ProtectedRoute>
    },
    {
        path: "/student/classes/:classId/:assignId",
        element: <ProtectedRoute>
                    <AssigmentScreen/>
                </ProtectedRoute>
    },
    {
        path: "/student/grades",
        element: <ProtectedRoute>
                    <GradesScreen/>
                </ProtectedRoute>
    },
    {
        path: "/student/todo",
        element: <ProtectedRoute>
                    <AssigmentsToDoScreen/>
                </ProtectedRoute>
    },
]

export const routes = createBrowserRouter([
    ...generalRoutes,
    ...administrativeRoutes,
    ...teacherRoutes,
    ...studentRoutes,
])