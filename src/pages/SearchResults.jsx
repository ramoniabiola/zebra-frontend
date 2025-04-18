import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import ApartmentDetails from "../components/ApartmentDetails";
import { data } from "../utils/Data"


const SearchResults = () => {


    return (
        <div className="w-full h-full flex flex-col items-start justify-center">
            <Navbar />
            <Search />
            <div className="w-full h-full flex flex-col items-center justify-start mt-38">
                <h1 className="text-2xl text-center text-gray-800 font-semibold">Search Results for "<b>Lekki</b>"</h1>
                <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
                    {data.map((item) => (
                      <ApartmentDetails item={item} key={item.id} />
                    ))}
                    <div className="w-full h-full mt-8 flex flex-col items-center justify-center gap-16">
                      <hr className="w-11/12 text-stone-200" />
                      <button className="px-8 py-4 text-white text-xl font-bold bg-cyan-600 rounded-lg hover:bg-cyan-700 cursor-pointer">Show more</button>
                    </div>
                </div>
            </div>
            <Footerbar />
            <Footer />
        </div>
    )
}

export default SearchResults;