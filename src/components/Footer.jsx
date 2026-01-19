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
    <footer className="w-full bg-slate-50 text-slate-900 px-6 py-8 lg:py-12 lg:border-t lg:border-t-slate-100">
        <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Brand Section */}
                <div className="flex flex-col gap-2 lg:gap-3 md:col-span-2 lg:col-span-1">
                    <h1 className="text-[1.8rem] lg:text-[2.1rem] text-slate-900 font-extrabold tracking-tight text-shadow-lg">
                        zebr<span className="text-cyan-500">a</span>
                    </h1>
                    <p className="text-base lg:text-lg font-normal italic text-slate-600">
                        "Making a seamless and easy property renting experience..."
                    </p>
                    
                    {/* Social Icons - Desktop */}
                    <div className="hidden md:flex space-x-6 mt-4">
                        <a href="#" aria-label="Facebook"><FaFacebookF className="text-xl cursor-pointer hover:text-cyan-500 transition" /></a>    
                        <a href="#" aria-label="Twitter"><FaTwitter className="text-xl cursor-pointer hover:text-cyan-500 transition" /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram className="text-xl cursor-pointer hover:text-cyan-500 transition" /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedinIn className="text-xl cursor-pointer hover:text-cyan-500 transition" /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col">
                    <h3 className="text-base lg:text-lg font-semibold mb-4 text-slate-800">Quick Links</h3>
                    <ul className="space-y-3 lg:space-y-4 text-sm lg:text-base text-slate-600">
                        <li onClick={() => navigate("/AboutUs")} className="hover:underline  cursor-pointer transition">How It Works</li>
                        <li onClick={() => navigate("/list-an-apartment")} className="hover:underline cursor-pointer transition">List a Vacant Apartment</li>
                        <li onClick={() => navigate("/support")} className="hover:underline cursor-pointer transition">FAQs / Help Center</li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="flex flex-col">
                    <h3 className="text-base lg:text-lg font-semibold mb-4 text-slate-800">Contact</h3>
                    <ul className="space-y-3 lg:space-y-4 text-sm lg:text-base text-slate-600">
                        <li>+234 808 011 7388</li>
                        <li>ramoniabiola61@gmail.com</li>
                        <li>Lagos, Nigeria.</li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="flex flex-col">
                    <h3 className="text-base lg:text-lg font-semibold mb-4 text-slate-800">Legal</h3>
                    <ul className="space-y-3 lg:space-y-4 text-sm lg:text-base text-slate-600">
                        <li><a href="#" className="hover:underline  transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline transition">Terms & Conditions</a></li>
                        <li onClick={() => navigate("/report")} className="hover:underline cursor-pointer transition">Report a Scam</li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-8 border-slate-200" />

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                {/* Social Icons - Mobile Only */}
                <div className="flex space-x-6 md:hidden">
                    <a href="#" aria-label="Facebook"><FaFacebookF className="text-lg cursor-pointer hover:text-cyan-500 transition" /></a>    
                    <a href="#" aria-label="Twitter"><FaTwitter className="text-lg cursor-pointer hover:text-cyan-500 transition" /></a>
                    <a href="#" aria-label="Instagram"><FaInstagram className="text-lg cursor-pointer hover:text-cyan-500 transition" /></a>
                    <a href="#" aria-label="LinkedIn"><FaLinkedinIn className="text-lg cursor-pointer hover:text-cyan-500 transition" /></a>
                </div>

                {/* Copyright */}
                <div className="text-xs lg:text-sm text-slate-500 md:mx-auto pb-12 md:pb-12 lg:pb-0">
                    © {new Date().getFullYear()} Landlords & Tenants Inc. All rights reserved.
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer;