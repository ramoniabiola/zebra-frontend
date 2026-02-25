import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const tenantFaqs = [
  {
    question: "How do I search for available apartments?",
    answer: "Use the search bar on the homepage or explore listings by location and apartment type.",
  },
  {
    question: "How do I save an apartment to my wishlist?",
    answer: "Click the heart icon on any apartment listing to add it to your wishlist.",
  },
  {
    question: "How do I contact a landlord or agent?",
    answer: "Open the apartment info page, scroll down and copy the Contact Information to send a message or call directly.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer: "Click 'Forgot Password' on the login page and follow the steps to reset your password via email.",
  },
  {
    question: "How do I report a fraudulent apartment listing?",
    answer: "Open the apartment info page and click the 'Report Listing' button to send a notification to our team.",
  },
];

const landlordFaqs = [
  {
    question: "How do I list an apartment?",
    answer: "Go to your dashboard and click 'Create New Listing', then fill in all the necessary details.",
  },
  {
    question: "Can I deactivate a listing?",
    answer: "Yes, navigate to your dashboard, click on any of your listings and use the 'Deactivate Listing' button to deactivate it.",
  },
  {
    question: "Can I reactivate a listing?",
    answer: "Yes, go to your dashboard, click the Deactivated Listings tab, open the listing you want to restore, then click the 'Reactivate' button.",
  },
];


const SupportPage = () => {
  const [activeTab, setActiveTab] = useState("Tenant");
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = activeTab === "Tenant" ? tenantFaqs : landlordFaqs;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col lg:pt-18">

      {/* ── NAVBAR ── */}
      <div className="w-full h-16 lg:h-20 flex items-center gap-2 px-3 md:px-6 bg-white border-b border-gray-100 sticky top-0 lg:top-18 z-20">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-gray-900 text-xl md:text-2xl tracking-tight">Support & FAQ</h1>
      </div>


      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-16 flex flex-col gap-10 mt-8">

        {/* ── HERO BANNER ── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 px-6 py-10 md:px-10 md:py-12 shadow-xl">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-14 -left-8 w-56 h-56 rounded-full bg-white/5" />
          <div className="absolute top-6 right-24 w-10 h-10 rounded-full bg-cyan-500/40" />

          <div className="relative z-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-300 mb-4 bg-white/10 px-3 py-1 rounded-full">
              Help Center
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">
              How can we help you today?
            </h2>
            <p className="text-cyan-100/80 text-sm md:text-base leading-relaxed">
              Browse frequently asked questions below or reach out to our support team for further assistance.
            </p>
          </div>
        </div>


        {/* ── TAB SWITCHER ── */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-1.5 flex gap-1.5">
          {["Tenant", "Landlord / Agencies"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setOpenIndex(null); }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm md:text-base font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-cyan-700 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700 hover:bg-stone-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>


        {/* ── FAQ ACCORDION ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              {activeTab === "Tenant" ? "Tenant" : "Landlord"} Questions
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
            <span className="text-xs font-semibold bg-stone-200 text-slate-600/70 px-2.5 py-1 rounded-full">
              {faqs.length} total
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
                    isOpen ? "border-cyan-200 shadow-md" : "border-stone-200 hover:border-stone-300 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        isOpen ? "bg-cyan-700" : "bg-stone-100 group-hover:bg-stone-200"
                      }`}>
                        <HelpCircle className={`w-4 h-4 transition-colors duration-200 ${isOpen ? "text-white" : "text-slate-500"}`} />
                      </div>
                      <span className={`font-semibold text-sm md:text-base transition-colors duration-200 ${
                        isOpen ? "text-cyan-700" : "text-gray-800"
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`w-7 h-7 flex-shrink-0 ml-3 flex items-center justify-center rounded-full transition-all duration-200 ${
                      isOpen ? "bg-cyan-100 text-cyan-700" : "bg-stone-100 text-slate-400"
                    }`}>
                      {isOpen
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                      }
                    </div>
                  </button>

                  {/* Answer panel */}
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                    <div className="px-5 pb-5 pt-1 border-t border-stone-100">
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed pl-11">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* ── CONTACT SUPPORT CTA ── */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-950 text-lg md:text-xl">Still need help?</h3>
          </div>
          <div className="p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our support team is ready to assist you with any questions not covered above.
            </p>
            <button className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white text-sm md:text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5">
              <Mail className="w-4 h-4" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;