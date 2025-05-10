import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-between bg-white pl-8 fixed top-0 left-0 z-50">
      <Link to="/">
        <h1 
          className="text-4xl text-slate-900 font-extrabold cursor-pointer">zebr
          <span className="text-cyan-600">a</span>
        </h1>
      </Link>
    </nav>
  )
}

export default Navbar;