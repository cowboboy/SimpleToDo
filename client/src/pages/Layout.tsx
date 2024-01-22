import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
    return (
      <div>
        <h1>Hello</h1>
        <div>
          <Outlet/>
          <p>kfsa</p>
        </div>
      </div>
    );
}

export default Layout