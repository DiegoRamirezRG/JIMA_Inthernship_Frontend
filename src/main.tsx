import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContentProvider } from './contexts/ContentProvider'
import { RouterProvider } from "react-router-dom";
import { routes } from './routes/Routes';
import { ToastContainer } from 'react-toastify';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContentProvider>
      <RouterProvider router={routes}/>
      <ToastContainer/>
    </ContentProvider>
  </React.StrictMode>
)
