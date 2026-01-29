import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import useScreenSize from "../hooks/screenSize";

const Navbar = () => {
  const user = useSelector((state) => state.auth?.user);
  const { isDesktop } = useScreenSize();


  return (
    <nav className="w-full h-14 lg:h-18 flex items-center justify-between bg-white px-6 lg:border-b lg:border-slate-200 md:px-12 lg:px-20 lg:shadow-xs fixed top-0 left-0 z-50">
      {/* LOGO */}
      <Link to="/home">
          <h1 
            className="text-[2rem] md:text-[2.2rem] lg:text-[2.4rem] text-slate-900 font-extrabold cursor-pointer tracking-tight text-shadow-lg">zebr
            <span className="text-cyan-500">a</span>
          </h1>
      </Link>

      {/* USER AVATAR */}
      {user && isDesktop &&  (
        <div className="rounded-full bg-gradient-to-b from-cyan-300 to-cyan-500 p-1 mt-0.5">
          <div className="w-full h-full rounded-full bg-white p-1">
            {user.profile_picture ? (
              <img src={user.profile_picture} alt="avatar" className="w-10 h-10 rounded-full object-cover cursor-pointer" />
            ) : (
              <UserCircleIcon className="w-10 h-10 text-cyan-500 cursor-pointer" />
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;