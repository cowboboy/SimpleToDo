import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Tasks from './pages/Tasks';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { useAppDispatch } from './store/hooks';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/userSlice';
import {useEffect} from 'react'
import { ProtectedRoot } from './components/ProtectedRoot';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <Error/>,
      children: [
        {
          path: "tasks",
          element: (
            <ProtectedRoot>
                <Tasks/>
            </ProtectedRoot>
          )
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

export const App = () => {
    const dispatch = useAppDispatch()
    const checkAuth = async () => {
        const token = localStorage.getItem("token")
        try {
            if (token) {
                const user = await AuthService.getMe()

                if (user) {
                    dispatch(login({name: user.name, token}))
                } else {
                    dispatch(logout())
                }
            }
            
        } catch (err) {
        }
        
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <RouterProvider router={router} />
    )
}