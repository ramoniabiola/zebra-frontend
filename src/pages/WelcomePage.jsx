import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Phone, MapPinHouse, Smartphone, ArrowRight, Home, Building2, Key, Shield } from "lucide-react";

export default function WelcomePage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();


  const features = [
    {
      icon: Zap,
      title: "Save Time",
      desc: "Eliminate endless manual searches and focus on properties that match your criteria",
    },
    {
      icon: Phone,
      title: "Direct Contact",
      desc: "Connect directly with landlords or agents/agencies for quick responses",
    },
    {
      icon: MapPinHouse,
      title: "Location-Based",
      desc: "Search by specific budget friendly areas and neighborhoods across Nigeria",
    },
    {
      icon: Smartphone,
      title: "Easy Access",
      desc: "Simple, intuitive platform accessible from any device",
    },
  ];

  const stats = [
    { icon: Home, value: "5,000+", label: "Active Listings" },
    { icon: Building2, value: "1,200+", label: "Partner Agencies" },
    { icon: Key, value: "15,000+", label: "Happy Tenants" },
    { icon: Shield, value: "100%", label: "Verified Properties" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="h-14 lg:h-18 flex justify-between items-center px-4 lg:px-18 py-4 bg-white/95 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-sm">
        <h1 className="text-[2rem] md:text-[2.4rem] font-extrabold cursor-pointer tracking-tight">
          <span className="text-slate-900">zebr</span>
          <span className="text-cyan-500">a</span>
        </h1>

        <div className="flex gap-3">
          <button 
            className="text-gray-700 hover:text-cyan-600 text-sm lg:text-base px-4 py-2 rounded-lg transition font-medium"
            onClick={() => navigate("/login")}>
            Login
          </button>
          <button 
            onClick={() => navigate("/register")}
            className="bg-cyan-600 text-white hover:bg-cyan-700 text-sm lg:text-base px-4 py-1 lg:px-5 lg:py-2 rounded-lg transition font-medium shadow-md"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=900&fit=crop"
            alt="Modern apartment building"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-cyan-900/60"></div>
          
          {/* Animated accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-20">
          <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30">
            <span className="text-cyan-300 text-sm font-semibold">Welcome to the Future of Apartment Hunting</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
              Apartment Today
            </span>
          </h1>

          <p className="text-lg sm:text-xl mb-10 text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Connecting landlords, tenants, agents and agencies for a seamless renting experience across Nigeria.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="bg-cyan-500 hover:bg-cyan-600 text-white w-full sm:w-auto px-8 py-4 text-base lg:text-lg rounded-lg font-semibold shadow-xl transition flex items-center justify-center gap-2 group"
              onClick={() => navigate("/home")}
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white w-full sm:w-auto px-8 py-4 text-base lg:text-lg rounded-lg font-semibold transition"
              onClick={() => navigate("/list-an-apartment")}
            >
              List Your Property
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <stat.icon className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Zebra?
            </h2>
            <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
              Experience the future of apartment hunting with our comprehensive platform designed for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative text-center text-white max-w-3xl mx-auto px-6">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h3>
          <p className="text-gray-300 mb-10 text-lg leading-relaxed">
            Join thousands of happy tenants, landlords, agents and housing agencies today. Start your journey to finding the perfect rental property.
          </p>
          <button 
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg px-10 py-5 text-lg shadow-xl transition inline-flex items-center gap-2 group"
            onClick={() => navigate("/home")}
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-extrabold mb-2">
            <span className="text-white">zebr</span>
            <span className="text-cyan-500">a</span>
          </h1>
          <p className="text-gray-400 text-sm italic mb-6">
            "Making a seamless and easy apartment renting experience..."
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Landlords & Tenants Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}