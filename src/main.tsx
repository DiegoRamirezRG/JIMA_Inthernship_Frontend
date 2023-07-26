import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContentProvider } from './contexts/ContentProvider'
import { RouterProvider } from "react-router-dom";
import { routes } from './routes/Routes';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContentProvider>
      <RouterProvider router={routes}/>
    </ContentProvider>
  </React.StrictMode>
)
