import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const ResponsiveNavbar = () => {
    const location = useLocation();

    const isHome = location.pathname === "/home";

    return (
        <>
            {/* Desktop: always show */}
            <div className="hidden lg:block">
                <Navbar />
            </div>
        
            {/* Mobile & Tablet: show only on homepage */}
            {isHome && (
                <div className="block lg:hidden">
                  <Navbar />
                </div>
            )}
        </>
    );
};

export default ResponsiveNavbar;
