import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Tasks from './pages/Tasks';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <Error/>,
    children: [
      {
        path: "tasks",
        element: <Tasks/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
