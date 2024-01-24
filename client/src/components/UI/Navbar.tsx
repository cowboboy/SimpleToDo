import { FC } from "react"
import cl from "./Navbar.module.css"
import { Link } from "react-router-dom"

const Navbar: FC = () => {
    return (
        <div className={cl.navbar}>
            <div className={cl.navbar__title}>
                <Link to="/">ToDo</Link>
            </div>
            <div className={cl.navbar__links}>
                <Link to="/tasks">Tasks</Link>
                <Link to="/auth">Login</Link>
            </div>
        </div>
    )
}

export default Navbar