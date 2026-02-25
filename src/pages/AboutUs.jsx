import { useNavigate } from "react-router-dom";
import { BadgeDollarSign, Home, MapPinHouse, Search, Smartphone, Zap, ChevronRight, ArrowLeft } from "lucide-react";
import { useEffect } from "react";


const steps = [
    {
        number: "01",
        title: "Browse Available Apartments",
        description: "Search through our extensive database of vacant apartments across Nigeria. Filter by location, budget, and preferences to find properties that match your specific needs.",
    },
    {
        number: "02",
        title: "View Detailed Information",
        description: "Access comprehensive apartment details including photos, specifications, pricing, and location. Each listing provides everything you need to make an informed decision.",
    },
    {
        number: "03",
        title: "Contact Directly",
        description: "Connect instantly with landlords or agents through the provided contact information. No middlemen, no delays — direct communication for faster apartment hunting.",
    },
    {
        number: "04",
        title: "Schedule & Secure",
        description: "Arrange viewings, negotiate terms, and secure your ideal apartment. Our platform facilitates the connection — you handle final arrangements directly with property owners.",
    },
];

const userTypes = [
    {
        icon: Home,
        label: "Landlords & Agencies",
        color: "from-emerald-400 to-teal-500",
        lightBg: "bg-emerald-50",
        lightBorder: "border-emerald-100",
        iconColor: "text-emerald-600",
        description: "List your vacant properties and reach thousands of potential tenants across Nigeria. Expand your reach beyond traditional methods and fill vacancies faster.",
    },
    {
        icon: Search,
        label: "Potential Tenants",
        color: "from-amber-400 to-orange-500",
        lightBg: "bg-amber-50",
        lightBorder: "border-amber-100",
        iconColor: "text-amber-600",
        description: "Skip the stress of manual apartment hunting. Browse verified listings, compare options, and find your perfect home within your budget and preferred location.",
    },
];

const benefits = [
    {
        icon: Zap,
        label: "Save Time",
        color: "from-rose-400 to-pink-500",
        lightBg: "bg-rose-100/80",
        iconColor: "text-rose-500",
        description: "Eliminate endless manual searches and focus only on properties that truly match your criteria.",
    },
    {
        icon: BadgeDollarSign,
        label: "Budget-Friendly",
        color: "from-violet-400 to-purple-500",
        lightBg: "bg-violet-100/80",
        iconColor: "text-violet-500",
        description: "Filter by price range to discover apartments comfortably within your budget.",
    },
    {
        icon: MapPinHouse,
        label: "Location-Based",
        color: "from-teal-400 to-cyan-500",
        lightBg: "bg-teal-100/80",
        iconColor: "text-teal-500",
        description: "Search by specific areas and neighborhoods across every state in Nigeria.",
    },
    {
        icon: Smartphone,
        label: "Easy Access",
        color: "from-sky-400 to-blue-500",
        lightBg: "bg-sky-100/80",
        iconColor: "text-sky-500",
        description: "A simple, intuitive platform designed to be accessible from any device, anywhere.",
    },
];


const AboutUs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);




    

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col lg:pt-18">
            {/* ── NAVBAR ── */}
            <div className="w-full h-16 lg:h-20 flex items-center gap-2 px-3 md:px-6 lg:px-6 bg-white border-b border-gray-100 sticky top-0 lg:top-18 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer text-gray-800"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="font-bold text-gray-900 text-xl md:text-2xl lg:text-2xl tracking-tight">How It Works</h1>
            </div>


            <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-16 flex flex-col gap-10 mt-8">
                {/* ── HERO SECTION ── */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 px-6 py-10 md:px-10 md:py-12 shadow-xl">
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
                    <div className="absolute -bottom-14 -left-8 w-56 h-56 rounded-full bg-white/5" />
                    <div className="absolute top-6 right-24 w-10 h-10 rounded-full bg-cyan-500/40" />

                    <div className="relative z-10">
                        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-300 mb-4 bg-white/10 px-3 py-1 rounded-full">
                            Nigeria's Apartment Platform
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
                            Connecting landlords, agencies & tenants — seamlessly.
                        </h2>
                        <p className="text-cyan-100/80 text-sm md:text-base leading-relaxed">
                            We're revolutionizing the apartment hunting and renting process across Nigeria by making it faster, smarter, and entirely stress-free.
                        </p>
                    </div>
                </div>


                {/* ── HOW IT WORKS STEPS ── */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 tracking-tight">The Process</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                    </ div>

                    <div className="flex flex-col gap-4">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                            >
                                <div className="flex items-stretch">
                                    {/* Number accent bar */}
                                    <div className="flex flex-col items-center justify-center px-5 bg-gradient-to-b from-cyan-700 to-cyan-800 min-w-[64px]">
                                        <span className="text-white font-black text-lg md:text-xl lg:text-xl tracking-tight leading-none">{step.number}</span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-4 md:p-5">
                                        <h3 className="font-semibold text-gray-900 text-base md:text-lg lg:text-lg mb-1.5 group-hover:text-cyan-700 transition-colors duration-200">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm md:text-base lg:text-base leading-relaxed">{step.description}</p>
                                    </div>
                                    {/* Chevron */}
                                    <div className="flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <ChevronRight className="w-4 h-4 text-cyan-500" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* ── WHO CAN USE ── */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 tracking-tight">Who It's For</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {userTypes.map((type, i) => {
                            const Icon = type.icon;
                            return (
                                <div
                                    key={i}
                                    className={`rounded-2xl border ${type.lightBorder} ${type.lightBg} p-5 md:p-6 flex gap-4 shadow-sm hover:shadow-md transition-all duration-300`}
                                >
                                <div className={`w-12 h-12 flex-shrink-0 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center shadow-md`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base md:text-lg lg:text-lg mb-1.5">For {type.label}</h3>
                                    <p className="text-gray-600 text-sm md:text-base lg:text-base leading-relaxed">{type.description}</p>
                                </div>
                              </div>
                            );
                        })}
                    </div>
                </div>


                {/* ── BENEFITS ── */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Why Choose Us</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {benefits.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md p-4 md:p-5 flex flex-col gap-3 transition-all duration-300 group"
                                >
                                    <div className={`w-10 h-10 ${b.lightBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                                        <Icon className={`w-5 h-5 ${b.iconColor}`} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1">{b.label}</h4>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{b.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* ── FOOTER CTA ── */}
                <div className="rounded-2xl bg-white border border-stone-200 shadow-sm px-6 py-7 text-center">
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                        Ready to find your next home? <span className="text-cyan-700 font-semibold">Start browsing listings</span> or list your property today — it only takes a few minutes.
                    </p>
                </div>                  
            </div>
        </div>
    );
};



export default AboutUs;