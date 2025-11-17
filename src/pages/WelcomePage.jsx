import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, Phone, MapPinHouse, Smartphone, ArrowRight } from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: Zap,
      title: "Save Time",
      desc: "Eliminate endless manual searches and focus on properties that match your criteria",
      gradient: "from-cyan-50 to-white",
    },
    {
      icon: Phone,
      title: "Direct Contact",
      desc: "Connect directly with landlords or agents/agencies for quick responses",
      gradient: "from-blue-50 to-white",
    },
    {
      icon: MapPinHouse,
      title: "Location-Based",
      desc: "Search by specific budget friendly areas and neighborhoods across Nigeria",
      gradient: "from-indigo-50 to-white",
    },
    {
      icon: Smartphone,
      title: "Easy Access",
      desc: "Simple, intuitive platform accessible from any device",
      gradient: "from-sky-50 to-white",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-cyan-50 to-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-gray-200">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[1.8rem] font-extrabold cursor-pointer tracking-tight"
        >
          <span 
            className="text-[1.8rem] text-slate-900 font-extrabold cursor-pointer tracking-tight text-shadow-lg">zebr
            <span className="text-cyan-500">a</span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex gap-2"
        >
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:text-cyan-600 text-sm px-4 py-2 rounded-md transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-cyan-600 text-white hover:bg-cyan-700 text-sm px-4 py-2 rounded-md transition"
          >
            Register
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden pt-30 px-4 pb-12">
        {/* Background Animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 bg-cyan-100 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.15, 1, 1.15], rotate: [45, 0, 45] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 bg-blue-100 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center max-w-lg w-full"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-cyan-600 bg-clip-text text-transparent leading-tight px-2">
            Find Your Next Apartment with Ease
          </h1>

          <p className="text-base sm:text-lg mb-8 text-gray-600 leading-relaxed px-4">
            Connecting landlords, tenants, agents and agencies for a seamless renting experience.
          </p>

          <motion.div whileTap={{ scale: 0.95 }} className="px-4">
            <button
              onClick={() => navigate("/home")}
              className="bg-cyan-600 hover:bg-cyan-700 text-white sm:w-auto px-8 py-4 text-base rounded-full font-semibold shadow-md transition w-full flex items-center justify-center mx-auto gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="relative max-w-7xl mx-auto px-4"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto px-4">
              Experience the future of apartment hunting with our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="group relative">
                <div
                  className={`p-6 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-2xl border border-gray-100 transition-all duration-300 shadow-sm hover:shadow-md h-full`}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 relative overflow-hidden">
        {/* Animated background lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
              style={{
                top: `${15 + i * 15}%`,
                left: "-10%",
                right: "-10%",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: 1, 
                opacity: [0, 1, 1, 0],
                x: ["0%", "10%", "20%", "30%"]
              }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative text-center text-white max-w-lg mx-auto px-6"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            Ready to find or list your  apartment?
          </h3>
          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            Join thousands of happy tenants, landlords, agents and housing agencies today
          </p>
          <motion.div whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => navigate("/home")}
              className="bg-white text-gray-900 hover:bg-cyan-600 hover:text-white font-semibold rounded-full px-8 py-4 text-base shadow-md transition"
            >
              Get Started
            </button>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}
