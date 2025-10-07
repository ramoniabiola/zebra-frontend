import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const Footer = () => {
    const navigate = useNavigate();
    
  return (
    <footer className="w-full h-full bg-slate-50 flex flex-col text-slate-900 items-start justify-center px-6 pt-4 pb-20 gap-8">
        <div className="w-full flex flex-col gap-2">
            <h1 
                className="text-[1.8rem] text-slate-900 font-extrabold pt-1 tracking-tight text-shadow-lg">zebr
                <span className="text-cyan-500">a</span>
            </h1>
            <p className="text-base font-normal italic text-slate-600">"Making a seamless and easy apartment renting experience..."</p>
        </div>

        {/* Quick Links */}
        <div className="w-full flex flex-col">
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
                <li onClick={() => navigate("/AboutUs")} className="hover:underline cursor-pointer">How It Works</li>
                <li onClick={() => navigate("/list-an-apartment")} className="hover:underlinev cursor-pointer">List a Vacant Apartment (for landlords/agencies)</li>
                <li onClick={() => navigate("/support")} className="hover:underline cursor-pointer">FAQs / Help Center</li>
           </ul> 
           <hr className="w-11/12 text-stone-200 mt-8" />
        </div>

        {/* Contact */}
        <div className="w-full flex flex-col">
            <h3 className="text-base font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
                <li>+234 808 011 7388</li>
                <li>ramoniabiola61@gmail.com</li>
                <li>Lagos, Nigeria.</li>
            </ul>
            <hr className="w-11/12 text-stone-200 mt-8" />
        </div>

        {/* Legal */}
        <div className="w-full flex flex-col">
            <h3 className="text-base font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                <li onClick={() => navigate("/report")} className="hover:underline cursor-pointer">Report a Scam</li>
            </ul>
            <hr className="w-11/12 text-stone-200 mt-8" />
        </div>

         {/* Social Icons */}
        <div className="flex space-x-6">
            <a href="#"><FaFacebookF className="text-lg cursor-pointer" /></a>    
            <a href="#"><FaTwitter className="text-lg cursor-pointer" /></a>
            <a href="#"><FaInstagram className="text-lg cursor-pointer" /></a>
            <a href="#"><FaLinkedinIn className="text-lg cursor-pointer" /></a>
        </div>
        <div className="text-center mt-8 text-xs text-slate-600 w-full">
            © {new Date().getFullYear()} Landlords & Tenants Inc. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer; 