import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import { ArrowLeftIcon, BadgeDollarSign, Home, MapPinHouse, Search, Smartphone, Zap } from "lucide-react";
import { useEffect } from "react";


const AboutUs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    

    return (
        <div className="max-w-4xl h-full flex flex-col items-start justify-start mx-auto"> 
            <div className="w-full h-full flex flex-col items-start justify-center gap-4 mb-8">

                {/* HEADING AND BACK ICON */}
                <div className="w-full h-16 flex items-center justify-start gap-2 px-2 pt-2 bg-white">
                    <div 
                        className="w-12 h-12  mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                    <ArrowLeftIcon className="w-5 h-5" />
                    </div>
                    <h1 className="font-bold text-gray-900 text-2xl">How It Works</h1>
                </div>

                {/* SUB HEADING */}
                <div className="w-full px-1">
                    <div className="px-2 py-2">
                        <p className="text-slate-700 opacity-90 font-semibold text-base leading-relaxed text-center">
                            Revolutionizing apartment hunting and renting process in Nigeria by connecting landlords, housing agencies and tenants seamlessly
                        </p>
                    </div>
                </div>


                {/* STEPS- CARD */}
                <div className="w-full px-4 space-y-6 mt-8">
                    {/* Step 1 */}
                    <div className="border-b border-gray-200 pb-6">
                        <div className="flex items-start gap-4 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-b from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-full flex items-center justify-center text-cyan-600 font-bold text-base shadow-lg">
                                1
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">Browse Available Apartments</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm ml-14">
                            Search through our extensive database of vacant apartments across Nigeria. Filter by location, budget, and preferences to find properties that match your specific needs.
                        </p>
                    </div>

                     {/* Step 2 */}
                    <div className="border-b border-gray-200 pb-6">
                        <div className="flex items-start gap-4 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-b from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-full flex items-center justify-center text-cyan-600 font-bold text-base shadow-lg">
                                2
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">View Detailed Information</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm ml-14">
                             Access comprehensive apartment details including photos, specifications, pricing, and location information. Each listing provides everything you need to make an informed decision.
                        </p>
                    </div>

                     {/* Step 3 */}
                    <div className="border-b border-gray-200 pb-6">
                        <div className="flex items-start gap-4 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-b from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-full flex items-center justify-center text-cyan-600 font-bold text-base shadow-lg">
                                3
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">Contact Directly</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm ml-14">
                            Connect instantly with landlords or agents through the provided contact information. No middlemen, no delays – direct communication for faster apartment hunting.
                        </p>
                    </div>

                     {/* Step 4 */}
                    <div className="border-b border-gray-200 pb-6">
                        <div className="flex items-start gap-4 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-b from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-full flex items-center justify-center text-cyan-600 font-bold text-base shadow-lg">
                                4
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-1">Schedule & Secure</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm ml-14">
                            Arrange viewings, negotiate terms, and secure your ideal apartment. Our platform facilitates the connection – you handle the final arrangements directly with property owners/managers.
                        </p>
                    </div>
                </div>

                {/* USER TYPES */}
                <div className="w-full px-4 space-y-6 mt-10">
                    <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Who Can Use Our Platform?</h2>
                    <div className="space-y-8">
                        {/* Landlords & Agents */}
                        <div className="p-2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-300 border-2 border-emerald-200  rounded-full flex items-center justify-center shadow-lg">
                                   <Home className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">For Landlords & Agencies</h3>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                List your vacant properties and reach thousands of potential tenants across Nigeria. Expand your reach beyond traditional methods and fill vacancies faster with our user-friendly platform.
                            </p>
                        </div>

                        {/* House Hunters */}
                        <div className="p-2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-300 border-2 border-orange-200 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                                    <Search className="w-6 h-6 text-amber-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">For House Hunters</h3>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Skip the stress of manual apartment hunting. Browse verified listings, compare options, and find your perfect home within your budget and preferred location – all from your device.
                            </p>
                        </div>
                    </div>
                </div>


                {/* BENEFITS */}
                <div className="w-full px-4 mt-10">
                    <div className="">
                        <h2 className="text-xl font-bold text-gray-900 text-center mb-8">Why Choose Our Platform?</h2>
                        
                        <div className="grid grid-cols-2 gap-6">
                            {/* Save Time */}
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-300 border-2 border-rose-200  rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <Zap className="w-5 h-5 text-rose-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Save Time</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Eliminate endless manual searches and focus on properties that match your criteria
                                </p>
                            </div>

                            {/* Budget-Friendly */}
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-300 border-2 border-violet-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                   <BadgeDollarSign className="w-5 h-5 text-violet-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Budget-Friendly</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Filter by price range to find apartments within your budget
                                </p>
                            </div>

                            {/* Location-Based */}
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-300 border-2 border-teal-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <MapPinHouse className="w-5 h-5 text-teal-600"  />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Location-Based</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Search by specific areas and neighborhoods across Nigeria
                                </p>    
                            </div>

                            {/* Easy Access */}
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-sky-300 border-2 border-sky-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <Smartphone  className="w-5 h-5 text-sky-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Easy Access</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Simple, intuitive platform accessible from any device
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footerbar />
            <Footer />
        </div>
    )
}

export default AboutUs;