import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-between bg-white pl-8 fixed top-0 left-0 z-50">
      <Link to="/">
        <h1 
          className="text-3xl text-slate-900 font-extrabold cursor-pointer">T
          <span className="text-cyan-600">o-</span>Let
        </h1>
      </Link>
    </nav>
  )
}

export default Navbar;