import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LoginScreen } from '../screens/loginScreen/LoginScreen'
import { NotFoundScreen } from '../screens/notFoundScreen/NotFoundScreen'
import { MainScreen } from '../screens/mainScreen/MainScreen'


const generalRoutes = [
    {
        path: "/",
        element: <LoginScreen/>,
    },
    {
        path: "/home",
        element: <MainScreen/>,
    },
    {
        path: "*",
        element: <NotFoundScreen/>,
    }
]


export const routes = createBrowserRouter([
    ...generalRoutes
])