import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import ApartmentDetails from "../components/ApartmentDetails";
import Search2 from "../components/Search2";
import { useGetApartments } from "../hooks/apartments";
import { useSelector } from "react-redux";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import { useEffect } from "react";



const SearchResults = () => {
    const { fetchApartments, isLoading, error } = useGetApartments()
    const apartments = useSelector((state) => state.apartments.list);
    
    useEffect(() => {
      fetchApartments();
      
    }, [fetchApartments]);

     
    const handleRetry = () => {
      fetchApartments();
    };

    // Error Display
    const ErrorDisplay = () => (
        <div className="text-center py-8">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Something went wrong
            </h3>
            <p className="text-gray-600 mb-4">
                {error?.message || "Failed to load apartments"}
            </p>
            <button
                onClick={handleRetry}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors"
            >
                Try Again
            </button>
        </div>
    );


    return (
        <div className="w-full h-full flex flex-col items-start justify-center">
            <Search2 />
            <div className="w-full h-full flex flex-col items-center justify-start mt-28">
                <h1 className="text-2xl text-center text-gray-600 font-semibold">Search results for "<b className="text-gray-800">Lekki</b>"</h1>
                <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
                   {error ? 
                        (
                            <ErrorDisplay />
                        ) : isLoading ? 
                        (
                            <ApartmentDetailsSkeleton cards={2} />
                        ) : apartments?.listings?.length > 0 ? 
                        (
                            apartments.listings.map((apartment) => (
                                <ApartmentDetails apartment={apartment} key={apartment._id} />
                            ))
                        ) : (
                        <p className="text-gray-500 text-sm">No apartments found.</p>
                    )}
                    {!error && !isLoading && apartments?.listings?.length > 0 && (
                        <div className="w-full h-full mt-12 flex flex-col items-center justify-center gap-24">
                            <button className="px-4 py-2 text-white text-lg font-bold border-8 border-double bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-full cursor-pointer focus:invisible">
                                Show more
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footerbar />
            <Footer />
        </div>
    )
}

export default SearchResults;