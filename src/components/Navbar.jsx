import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-14 lg:h-18 flex items-center justify-between bg-white px-6 lg:border-b lg:border-slate-200 md:px-12 lg:px-18 lg:shadow-xs fixed top-0 left-0 z-50">
      <Link to="/home">
          <h1 
            className="text-[2rem] md:text-[2.2rem] lg:text-[2.4rem] text-slate-900 font-extrabold cursor-pointer tracking-tight text-shadow-lg">zebr
            <span className="text-cyan-500">a</span>
          </h1>
      </Link>
    </nav>
  )
}

export default Navbar;