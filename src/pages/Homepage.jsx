import Apartments from "../components/Apartments";
import Navbar from "../components/Navbar";
import Search from "../components/Search";


const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col"> 
        <Navbar />
        <Search />
        <Apartments />
    </div>
  )
}

export default Homepage;