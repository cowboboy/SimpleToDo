import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import "../styles/Layout.css"

const Layout: FC = () => {
    return (
      <div className="wrapper">
        <div className="content">
          <Navbar></Navbar>
          <div>
            <Outlet/>
            <p>kfsa</p>
          </div>
        </div>
      </div>
    );
}

export default Layout