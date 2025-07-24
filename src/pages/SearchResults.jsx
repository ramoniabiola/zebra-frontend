import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import ApartmentDetails from "../components/ApartmentDetails";
import Search2 from "../components/Search2";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useLocation } from 'react-router-dom';
import { fetchApartmentBySearchApi } from "../api/apartments";
import SearchPlaceholder from "../utils/placeholders/SearchPlaceholder";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};


const SearchResults = () => {
    const query = useQuery().get('q')
    const [apartments, setApartments] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    


    const getApartments = async () => {
        setIsLoading(true);
        setError(null)
    
        try{
            const response = await fetchApartmentBySearchApi(query);
            if(response.status >= 200 && response.status < 300) {
                setApartments(response.data);
                setError(null);
                setIsLoading(false);
            } else {
            // If the response status is not in the success range, handle the error
            throw new Error(response.data.error);
          }
        }catch(error){
             setIsLoading(false);
            if (error.response?.status === 404) {
              // 404 - Not Found
              setError(`Apartments "${query}" not found...`);
            } else {
              // 500 - Internal Server Error (or any other error)
              setError(error.response?.data?.message || 'Internal server error');
            }
            
        }
    }
    
    useEffect(() => {
        if (query) {
            setApartments([]); // clear existing result before re-invoking the fetchproducts function if the search action has previously been invoked.
            getApartments();     
        }  
    }, [query]);

     
    const handleRetry = () => {
      getApartments();
    };


    // Error Display
    const ErrorDisplay = () => (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-24 mb-24">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Something went wrong
            </h3>
            <p className="text-gray-600 mb-4">
                {error}
            </p>
            <button
                onClick={handleRetry}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors cursor-pointer"
            > 
                Try Again
            </button>
        </div>
    );



    return (
        <div className="w-full h-full flex flex-col items-start justify-center">
            <Search2 />
            <div className="w-full px-2 h-full flex flex-col items-center justify-start mt-28">
                <h1 
                    className={`${query ? 'text-xl text-center text-gray-600 font-semibold' : 'hidden'}`}>
                    Search results for "<b className="text-gray-800">{query}</b>"
                </h1>
                <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
                   {error ? 
                        (
                            <ErrorDisplay />
                        ) : isLoading ? 
                        (
                            <ApartmentDetailsSkeleton cards={3} />
                        ) : apartments?.length > 0 ? 
                        (
                            apartments?.map((apartment) => (
                                <ApartmentDetails apartment={apartment} key={apartment._id} />
                            ))
                        ) : (
                            <SearchPlaceholder />
                        )
                    }
                    {!error && !isLoading && apartments?.length > 0 && (
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