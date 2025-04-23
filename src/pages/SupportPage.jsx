import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import Footer from "../components/Footer";

const tenantFaqs = [
  { 
    question: "How do I search for available apartments?", 
    answer: "Use the search bar on the homepage or explore listings by location, price range, and apartment type." 
  },
  { 
    question: "How do I save an apartment to my wishlist?", 
    answer: "Click the heart icon on any apartment listing to add it to your wishlist." 
  },
  { 
    question: "How do I contact a landlord or agent?", 
    answer: "Open the apartment info page and click the 'Contact' button to send a message or call directly." 
  },
  { 
    question: "I forgot my password. What should I do?", 
    answer: "Click 'Forgot Password' on the login page and follow the steps to reset your password via email." 
  },
  { 
    question: "How do I report a fraudulent Apartment Listing", 
    answer: "Open the apartment info page and click the 'Report Listing' button to send a message of Notification" 
  }
];

const landlordFaqs = [
  { 
    question: "How do I list an apartment?", 
    answer: "Go to your dashboard and click 'Add New Apartment', then fill in all necessary details." 
  },
  { 
    question: "Can I edit or remove a listing?", 
    answer: "Yes, navigate to your dashboard and use the edit or delete options for your listings." 
  },  
];

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState("Tenant");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = activeTab === "Tenant" ? tenantFaqs : landlordFaqs;

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <div className="w-full h-full px-4 py-8 bg-white flex flex-col items-center justify-start">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Support & FAQ</h1>

        {/* Tab Switcher */}
        <div className="w-full flex items-center justify-center gap-11 mb-16">
          {["Tenant", "Landlord / Agent"].map(tab => (
            <span
              key={tab}
              onClick={() => { setActiveTab(tab); setOpenIndex(null); }}
              className={`relative px-1 cursor-pointer rounded-md text-lg font-semibold transition-all
              ${activeTab === tab ? "text-cyan-600" : "text-gray-500 hover:text-gray-600"}`}
            >
              {tab}
              {activeTab === tab && (    
                <span className="absolute -bottom-[12px] left-0 w-full h-1  bg-cyan-600 rounded-t-full"></span>
              )}  
            </span>
          ))}
        </div>


        {/* FAQ Accordion */}
        <div className="w-full max-w-2xl">  
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6 border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 text-left text-lg font-medium text-gray-700 hover:bg-gray-200 transition cursor-pointer"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-gray-600 text-md bg-white border-t rounded-b-lg border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))} 
        </div>

        {/* Contact Support Box */}
        <div className="mt-12 w-full max-w-2xl bg-cyan-50 border border-sky-200 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-cyan-700 mb-2">Still need help?</h2>
          <p className="text-gray-600 mb-4">Feel free to contact our support team for further assistance.</p>
          <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-lg rounded-md font-medium cursor-pointer">
            Contact Support
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupportPage;
