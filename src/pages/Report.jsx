import { useEffect, useState } from "react";



const Report = () => {
    const [reason, setReason] = useState("");
    const [otherReason, setOtherReason] = useState("");
    const [comments, setComments] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you'd send to backend
        console.log({ reason, otherReason, comments, contactInfo });
        setSubmitted(true);
    };



  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
        <div className="w-full h-full flex flex-col items-center justify-start px-4 py-8 bg-white">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Report a Fraudulent Listing
            </h1>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 rounded-md shadow-sm space-y-8">
                    {/* Reason for Report */}
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            What’s wrong with the listing?
                        </label>
                        <select
                            className="w-full border border-gray-200 rounded-md p-2.5 text-sm cursor-pointer outline-none" 
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        >
                            <option value="">-- Select a reason --</option>
                            <option value="False Information">False Information</option>
                            <option value="Scam or Fraud">Scam or Fraud</option>
                            <option value="Suspicious Contact">Suspicious Contact Details</option>
                            <option value="Other">Other</option>
                        </select>
                        {reason === "Other" && (
                        <input
                            type="text"
                            placeholder="Please specify"
                            className="w-full mt-4 border border-gray-200 rounded-md p-3 outline-none   "
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                        />
                        )}
                    </div>
                    
                    {/* Additional Comments */}
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Additional Comments (optional)
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Provide more details about the issue"
                            className="w-full border text-sm border-gray-300 rounded-md p-3 outline-none"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </div>
                    
                    {/* Contact Info (optional) */}
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Your Contact Info
                        </label>
                        <input
                            type="text"
                            placeholder="Email or phone (in case we need to follow up)"
                            className="w-full text-sm border border-gray-300 rounded-md p-2.5 outline-none"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                        />
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-linear-65 from-cyan-400 to-cyan-600 text-white font-semibold py-3 rounded-md cursor-pointer"
                    >
                    Submit Report
                </button>
                </form>
            ) : (
                <div className="text-center mt-12">
                    <h2 className="text-2xl font-bold text-cyan-600 mb-3">Thank you!</h2>
                    <p className="text-gray-700">
                        Your report has been received. Our team will review it as soon as possible.
                    </p>
                </div>
            )}
        </div>
    </div>
  );
};

export default Report;
