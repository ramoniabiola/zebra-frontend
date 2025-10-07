import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-14 flex items-center justify-between bg-white px-6 fixed top-0 left-0 z-50">
      <Link to="/">
          <h1 
            className="text-[2rem] text-slate-900 font-extrabold cursor-pointer tracking-tight text-shadow-lg">zebr
            <span className="text-cyan-500">a</span>
          </h1>
      </Link>
    </nav>
  )
}

export default Navbar;