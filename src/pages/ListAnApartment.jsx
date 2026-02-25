import { useNavigate } from "react-router-dom";
import { UserPlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HousePlus, X, UserX, LayoutDashboard, ArrowLeft, ChevronRight, BadgeCheck, Users, Megaphone } from "lucide-react";


const perks = [
    {
        icon: Users,
        label: "Massive Reach",
        color: "bg-cyan-100/80",
        iconColor: "text-cyan-600",
        description: "Connect with thousands of verified tenants actively searching across Nigeria.",
    },
    {
        icon: BadgeCheck,
        label: "Easy Listing",
        color: "bg-emerald-100/80",
        iconColor: "text-emerald-600",
        description: "Create detailed listings with photos, pricing, and amenities in just minutes.",
    },
    {
        icon: Megaphone,
        label: "Fill Vacancies Faster",
        color: "bg-amber-100/80",
        iconColor: "text-amber-600",
        description: "Reduce vacancy periods by reaching the right tenants at the right time.",
    },
];


const ListAnApartment = () => {
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const [showUnauthorizedDialog, setShowUnauthorizedDialog] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const userId = user?._id;
    const userRole = user?.role;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleNavigation = () => {
        if (!userId) {
            setShowAuthDialog(true);
        } else if (userRole === "tenant") {
            setShowUnauthorizedDialog(true);
        } else if (userRole === "landlord" || userRole === "agent") {
            navigate("/dashboard");
        } else {
            setShowUnauthorizedDialog(true);
        }
    };

    // ── AUTH DIALOG ──
    const AuthDialog = () => (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl">
                <button onClick={() => setShowAuthDialog(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
                    <X className="w-5 h-5" />
                </button>
                <div className="text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-700 to-cyan-800 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                        <HousePlus className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">List Your Vacant Apartment</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        Log in to access your dashboard and start listing your vacant properties to reach thousands of potential tenants.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => { setShowAuthDialog(false); navigate('/login'); }}
                            className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2.5 px-4 rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-md"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => { setShowAuthDialog(false); navigate('/register'); }}
                            className="w-full border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                        >
                            Create Account
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">Don't have an account? Create one to start listing your properties.</p>
                </div>
            </div>
        </div>
    );

    // ── UNAUTHORIZED DIALOG ──
    const UnauthorizedDialog = () => (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl">
                <button onClick={() => setShowUnauthorizedDialog(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
                    <X className="w-5 h-5" />
                </button>
                <div className="text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                        <UserX className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Access Not Authorized</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        Your current account is registered as a <span className="font-bold text-gray-700">Tenant</span>. Only landlords and agencies can list properties on this platform.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-left flex items-start gap-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-amber-800 font-semibold mb-0.5">Tenant Account Limitation</p>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                Tenant accounts are designed for browsing and applying for properties, not for listing them.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => { setShowUnauthorizedDialog(false); navigate('/register'); }}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-md text-sm"
                        >
                            Create Landlord / Agent Account
                        </button>
                        <button
                            onClick={() => setShowUnauthorizedDialog(false)}
                            className="w-full border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 cursor-pointer text-sm"
                        >
                            Continue as Tenant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <>
            <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col lg:pt-18">

                {/* ── NAVBAR ── */}
                <div className="w-full h-16 lg:h-20 flex items-center gap-2 px-3 md:px-6 bg-white border-b border-gray-100 sticky top-0 lg:top-18 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer text-gray-800"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-bold text-gray-900 text-xl md:text-2xl tracking-tight">List an Apartment</h1>
                </div>


                <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-16 flex flex-col gap-10 mt-8">

                    {/* ── HERO BANNER ── */}
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 px-6 py-10 md:px-10 md:py-12 shadow-xl">
                        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
                        <div className="absolute -bottom-14 -left-8 w-56 h-56 rounded-full bg-white/5" />
                        <div className="absolute top-6 right-24 w-10 h-10 rounded-full bg-cyan-500/40" />

                        <div className="relative z-10 flex items-start gap-5">
                            <div className="w-14 h-14 flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                                <HousePlus className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-300 mb-3 bg-white/10 px-3 py-1 rounded-full">
                                    For Landlords & Agencies
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
                                    Ready to list your vacant apartment?
                                </h2>
                                <p className="text-cyan-100/80 text-sm md:text-base leading-relaxed">
                                    Reach thousands of potential tenants across Nigeria. Fill vacancies faster with our simple, powerful platform.
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* ── PERKS ── */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Why List With Us</h2>
                            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                        </div>

                        <div className="flex flex-col gap-3">
                            {perks.map((perk, i) => {
                                const Icon = perk.icon;
                                return (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 p-4 md:p-5 group"
                                    >
                                        <div className={`w-11 h-11 flex-shrink-0 ${perk.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                                            <Icon className={`w-5 h-5 ${perk.iconColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 text-sm md:text-base mb-0.5">{perk.label}</h4>
                                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{perk.description}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-stone-300 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    {/* ── ACTION CARDS ── */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Get Started</h2>
                            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                        </div>

                        <div className="flex flex-col gap-4">

                            {/* Already registered */}
                            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                                <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <LayoutDashboard className="w-4 h-4 text-cyan-700" />
                                        <h3 className="font-semibold text-gray-950 text-base md:text-lg">Already Registered?</h3>
                                    </div>
                                    <span className="text-xs bg-cyan-50 text-cyan-700 border border-cyan-200 px-2.5 py-1 rounded-full font-semibold">
                                        Landlord / Agent
                                    </span>
                                </div>
                                <div className="p-5 md:p-6">
                                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5">
                                        Head straight to your dashboard to create and manage your property listings with ease.
                                    </p>
                                    <button
                                        onClick={handleNavigation}
                                        className="w-full flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer text-sm md:text-base"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Go to Dashboard
                                    </button>
                                </div>
                            </div>

                            {/* New user */}
                            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                                <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <UserPlusIcon className="w-4 h-4 text-emerald-600" />
                                        <h3 className="font-semibold text-gray-950 text-base md:text-lg">New User?</h3>
                                    </div>
                                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
                                        Free to Join
                                    </span>
                                </div>
                                <div className="p-5 md:p-6">
                                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5">
                                        Register as a Landlord or Agency and start publishing your vacant listings to thousands of active house-hunters.
                                    </p>
                                    <button
                                        onClick={() => navigate("/register")}
                                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer text-sm md:text-base"
                                    >
                                        <UserPlusIcon className="w-4 h-4" />
                                        Register Now
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {showAuthDialog && <AuthDialog />}
            {showUnauthorizedDialog && <UnauthorizedDialog />}
        </>
    );
};

export default ListAnApartment;