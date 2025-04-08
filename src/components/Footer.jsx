import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";




const Footer = () => {
  return (
    <footer className="w-full h-full bg-stone-100 flex flex-col text-stone-900 items-start justify-center px-6 pt-4 pb-24 gap-8">
        <div className="w-full flex flex-col gap-2">
            <h1 
                className="text-4xl text-slate-900 font-extrabold cursor-pointer pt-1">zebr
                <span className="text-cyan-600">a</span>
            </h1>
            <p className="text-lg font-normal italic text-stone-600">"Making apartment renting seamless and easy..."</p>
        </div>

        {/* Quick Links */}
        <div className="w-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-lg">
                <li className="hover:underline"><a href="#">Browse Apartment Listings</a></li>
                <li className="hover:underline"><a href="#">How It Works</a></li>
                <li className="hover:underline"><a href="#">List An Apartment (for landlords/agents)</a></li>
                <li className="hover:underline"><a href="#">Contact Support</a></li>
                <li className="hover:underline"><a href="#">FAQs / Help Center</a></li>
           </ul> 
           <hr className="w-11/12 text-stone-300 mt-8" />
        </div>

        {/* Contact */}
        <div className="w-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-lg">
                <li>+234 808 011 7388</li>
                <li>ramoniabiola61@gmail.com</li>
                <li>Lagos, Nigeria.</li>
            </ul>
            <hr className="w-11/12 text-stone-300 mt-8" />
        </div>

        {/* Legal */}
        <div className="w-full flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-lg">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline">Report a Scam</a></li>
            </ul>
            <hr className="w-11/12 text-stone-200 mt-8" />
        </div>

         {/* Social Icons */}
        <div className="flex space-x-6">
            <a href="#"><FaFacebookF className="text-2xl cursor-pointer" /></a>    
            <a href="#"><FaTwitter className="text-2xl cursor-pointer" /></a>
            <a href="#"><FaInstagram className="text-2xl cursor-pointer" /></a>
            <a href="#"><FaLinkedinIn className="text-2xl cursor-pointer" /></a>
        </div>
        <div className="text-center mt-8 text-md">
            © {new Date().getFullYear()} Landlords & Tenants Inc. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer; 