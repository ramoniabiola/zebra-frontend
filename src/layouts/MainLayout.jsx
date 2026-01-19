import { Outlet } from "react-router-dom";
import ResponsiveNavbar from "../layouts/ResponsiveNavbar";
import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import FooterbarDesktop from "../components/FooterbarDesktop";
import AdvertCards from "../components/AdvertCards";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top Navbar - Full width on all screens */}
            <ResponsiveNavbar />
        
            {/* MOBILE LAYOUT: Stack everything vertically */}
            <div className="lg:hidden flex flex-col flex-1">
                {/* Main Content */}
                <main className="flex-1">
                    <Outlet />
                </main>
                
                {/* Mobile Bottom Navigation */}
                <Footerbar />
                
                {/* Footer */}
                <Footer />
            </div>

            {/* DESKTOP LAYOUT: Fixed left sidebar + scrollable content */}
            <div className="hidden lg:block flex-1">
                {/* LEFT SIDEBAR - Fixed FooterbarDesktop */}
                <aside className="fixed left-0 top-18 h-screen w-[355px] overflow-y-auto">
                    <FooterbarDesktop />
                </aside>

                {/* MAIN CONTENT + RIGHT SIDEBAR */}
                <div className="ml-[355px] mr-[355px]">
                    {/* Center Content Area */}
                    <div className="min-w-[314px] mx-auto">
                        <main className="min-w-0">
                            <Outlet />
                        </main>
                        
                        {/* Footer - Full width below content */}
                        <Footer />
                    </div>
                </div>

                {/* RIGHT SIDEBAR - Scrollable Adverts */}
                <aside className="fixed right-0 top-18 h-screen w-[355px] overflow-y-auto">
                    <AdvertCards />
                </aside>
            </div>
        </div>
    );
};

export default MainLayout;