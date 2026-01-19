import { useState, useEffect } from "react";
import Apartments from "../components/Apartments";
import Search from "../components/Search";
import { ArrowUp } from "lucide-react";




const Homepage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);


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

  return (
    <div className="relative w-full h-full flex flex-col"> 
      <Search />
      <Apartments />


      {/* Back to top button - Fixed on mobile, constrained on desktop */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 lg:bottom-10 z-20 right-5 lg:right-[390px] bg-gradient-to-t from-cyan-300 to-cyan-500 hover:bg-gradient-to-t hover:from-cyan-400 hover:to-cyan-600 text-white shadow-md p-2.5 rounded-lg transition cursor-pointer animate-slideUp"
        >
          <ArrowUp strokeWidth={3} className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
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
  )
}

export default Homepage;