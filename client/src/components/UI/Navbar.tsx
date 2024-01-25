import { FC } from "react"
import cl from "./Navbar.module.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useAppDispatch } from "../../store/hooks"
import { logout } from "../../store/userSlice"

const Navbar: FC = () => {
    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    
    return (
        <div className={cl.navbar}>
            <div className={cl.navbar__title}>
                <Link to="/">ToDo</Link>
            </div>
            <div className={cl.navbar__links}>
                <Link to="/tasks">Tasks</Link>
                {
                    isAuth ?
                        (
                            <button onClick={() => dispatch(logout())}>Logout</button>
                        )
                        :
                        (
                            <Link to="/auth">Login</Link>
                        )
                }
            </div>
        </div>
    )
}

export default Navbar