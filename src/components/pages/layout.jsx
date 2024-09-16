import { Outlet } from "react-router-dom";
import Nav from "../nav";
import { memo } from "react";

const Layout = () => {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default memo(Layout);
