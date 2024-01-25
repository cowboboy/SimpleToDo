import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Tasks from './pages/Tasks';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <Error/>,
    children: [
      {
        path: "tasks",
        element: <Tasks/>
      },
      {
        index: true,
        element: <Home/>
      },
      {
        path: "auth",
        element: <Auth/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer autoClose={3000} position="bottom-left"/>
  </Provider>
)
