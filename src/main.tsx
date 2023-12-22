import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContentProvider } from './contexts/ContentProvider'
import { RouterProvider } from "react-router-dom";
import { routes } from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContentProvider>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={routes}/>
        <ToastContainer/>
      </DndProvider>
    </ContentProvider>
  </React.StrictMode>
)
