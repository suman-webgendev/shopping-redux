import { useNavigate } from "react-router-dom";
import Cart from "./cart";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky left-0 right-0 top-0 z-[1000] flex h-[8vh] items-center justify-between bg-[rgba(0,0,0,.15)] px-6 dark:bg-white/20">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <img src="/logo.svg" alt="logo" className="h-12" />
      </div>
      <div>
        <Cart />
      </div>
    </nav>
  );
};

export default Nav;
