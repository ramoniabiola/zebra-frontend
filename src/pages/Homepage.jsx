import Apartments from "../components/Apartments";
import Footerbar from "../components/Footerbar";
import Navbar from "../components/Navbar";
import Search from "../components/Search";


const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col"> 
        <Navbar />
        <Search />
        <Apartments />
        <Footerbar />
    </div>
  )
}

export default Homepage;