import { ExclamationTriangleIcon, HomeIcon, MapIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import ApartmentDetails from "./ApartmentDetails";
import { useGetApartments } from "../hooks/apartments";
import { useSelector, useDispatch } from "react-redux";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import { ArrowUp, RotateCcw } from "lucide-react";
import ApartmentDetailsSkeleton2 from "../utils/loading-display/ApartmentDetailsSkeleton2";
import { clearApartmentsError } from "../redux/apartmentSlice";


const Apartments = () => {
  const [activeTab, setActiveTab] = useState("new"); // default active
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const observerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const { fetchApartments, isLoading, error } = useGetApartments();
  const { list: apartments, hasMore } = useSelector((state) => state.apartments);
  const dispatch = useDispatch();

  const limit = 5;

  // Map tab → backend sort
  const sortMap = {
    new: "recent",
    apartments: "random",
    "top-locations": "popular",
  };

  // Reset page when activeTab changes
  useEffect(() => {
    setPage(1);
  }, [activeTab]);


  // Fetch whenever page or tab changes
  useEffect(() => {
    if (!page || error) return;

    fetchApartments({
      sortBy: sortMap[activeTab],
      page,
      limit,
    });
  }, [page, activeTab, fetchApartments, error]);


  // Infinite scroll observer → only updates page
  useEffect(() => {
    if (!hasMore || isLoading || error) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, isLoading, error]);


  // Scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const handleRetry = () => {
    dispatch(clearApartmentsError());

    fetchApartments({
      sortBy: sortMap[activeTab],
      page,
      limit,
    });
  };


  const tabs = [
    { id: "new", label: "New", icon: <SparklesIcon className="w-6 h-6" /> },
    { id: "apartments", label: "Apartments", icon: <HomeIcon className="w-6 h-6" /> },
    { id: "top-locations", label: "Top Locations", icon: <MapIcon className="w-6 h-6" /> },
  ];


  // Error Display
  const ErrorDisplay = () => (
    <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-48 mb-48">
      <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-4">
        {error || "Failed to load apartments"}
      </p>
      <button
        onClick={handleRetry}
        className="px-3 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
  

  return (
    <div className="h-full min-w-full flex flex-col items-start justify-center">
      {/* APARTMENT LISTING OPTIONS */}
      <div className="fixed top-34 z-30 h-20 w-full flex items-center justify-around bg-white shadow-md py-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            onMouseEnter={() => setHovered(tab.id)}
            onMouseLeave={() => setHovered(null)}
            className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-200
              ${activeTab === tab.id ? "text-slate-800" : "text-slate-500 hover:text-slate-700"}
            `}
          >
            {tab.icon}
            <h2 className="text-md font-semibold relative mt-1">
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute -bottom-[10px] left-0 w-full h-[3px] bg-slate-800 rounded-full"></span>
              )}
              {hovered === tab.id && (
                <span
                  className={`absolute -bottom-[10px] left-0 w-full h-[3px] ${
                    activeTab !== tab.id ? "bg-slate-200" : "bg-slate-700"
                  } transition-all duration-200 rounded-full`}
                ></span>
              )}
            </h2>
          </div>
        ))}
      </div>

      {/* APARTMENT LISTINGS */}
      <div className="mt-[12rem] min-w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
        {error && page === 1 ? (
          <ErrorDisplay />
        ) : isLoading && page === 1 ? (
          <ApartmentDetailsSkeleton cards={4} />
        ) : apartments?.length > 0 ? (
          <>
            {apartments?.map((apartment, idx) => (
              <ApartmentDetails key={`${apartment._id}-${idx}`} apartment={apartment} />
            ))}

            {/* Infinite scroll trigger */}
            <div ref={observerRef} className="h-10 w-full"></div>

            {isLoading && page > 1 && (
              <ApartmentDetailsSkeleton2 cards={1} />
            )}

            {error && page > 1 && (
              <div className="w-full flex flex-col items-center py-4">
                <ExclamationTriangleIcon className="w-10 h-10 text-red-500 mx-auto mb-2" />
                <h3 className="text-md font-semibold text-gray-800 mb-1">
                  Something went wrong
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {error || "Failed to load apartments"}
                </p>
                <button
                  onClick={handleRetry}
                  className="px-3 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            )}
          </>
        ) : ( 
          <p className="text-gray-500 text-sm">No apartments found.</p>
        )}
      </div>

      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 z-20 right-4 bg-gradient-to-t from-cyan-300 to-cyan-500 hover:bg-gradient-to-t hover:from-cyan-400 hover:to-cyan-600 text-white shadow-md p-3 rounded-lg transition animate-slideUp cursor-pointer"
        >
          <ArrowUp strokeWidth={3} className="w-5 h-5" />
        </button>
      )}


      {/* Custom Styles */}
      <style jsx="true">{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(40px); opacity: 0; }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default Apartments;
