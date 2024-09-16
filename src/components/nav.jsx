import { useNavigate } from "react-router-dom";
import Cart from "./cart";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky inset-x-0 top-0 flex h-14 items-center justify-between bg-[rgba(0,0,0,.15)] px-6 dark:bg-white/20">
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
