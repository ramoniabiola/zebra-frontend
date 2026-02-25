import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, FileWarning, MessageSquare, Phone, ChevronDown } from "lucide-react";


const reasons = [
    { value: "", label: "-- Select a reason --" },
    { value: "False Information", label: "False Information" },
    { value: "Scam or Fraud", label: "Scam or Fraud" },
    { value: "Suspicious Contact", label: "Suspicious Contact Details" },
    { value: "Other", label: "Other" },
];


const Report = () => {
    const [reason, setReason] = useState("");
    const [otherReason, setOtherReason] = useState("");
    const [comments, setComments] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ reason, otherReason, comments, contactInfo });
        setSubmitted(true);
    };


    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 flex flex-col lg:pt-18">

            {/* ── NAVBAR ── */}
            <div className="w-full h-16 lg:h-20 flex items-center gap-2 px-3 md:px-6 bg-white border-b border-gray-100 sticky top-0 lg:top-18 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer text-gray-800"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="font-bold text-gray-900 text-xl md:text-2xl tracking-tight">Report a Listing</h1>
            </div>


            <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-16 flex flex-col gap-10 mt-8">

                {!submitted ? (
                    <>
                        {/* ── HERO BANNER ── */}
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 px-6 py-10 md:px-10 md:py-12 shadow-xl">
                            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
                            <div className="absolute -bottom-14 -left-8 w-56 h-56 rounded-full bg-white/5" />
                            <div className="absolute top-6 right-24 w-10 h-10 rounded-full bg-rose-500/40" />

                            <div className="relative z-10 flex items-start gap-5">
                                <div className="w-14 h-14 flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                                    <AlertTriangle className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-rose-200 mb-3 bg-white/10 px-3 py-1 rounded-full">
                                        Safety & Trust
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
                                        Report a Fraudulent Listing
                                    </h2>
                                    <p className="text-rose-100/80 text-sm md:text-base leading-relaxed">
                                        Help us keep the platform safe. Your report will be reviewed by our team as soon as possible.
                                    </p>
                                </div>
                            </div>
                        </div>


                        {/* ── FORM ── */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* Reason for report */}
                            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
                                    <FileWarning className="w-4 h-4 text-rose-500" />
                                    <h3 className="font-semibold text-gray-950 text-base md:text-lg">What's wrong with the listing?</h3>
                                </div>
                                <div className="p-5 md:p-6 flex flex-col gap-4">
                                    <div className="relative">
                                        <select
                                            className="w-full appearance-none border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm md:text-base text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            required
                                        >
                                            {reasons.map((r) => (
                                                <option key={r.value} value={r.value}>{r.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>

                                    {reason === "Other" && (
                                        <input
                                            type="text"
                                            placeholder="Please specify your reason"
                                            className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                                            value={otherReason}
                                            onChange={(e) => setOtherReason(e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Additional comments */}
                            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-slate-500" />
                                        <h3 className="font-semibold text-gray-950 text-base md:text-lg">Additional Comments</h3>
                                    </div>
                                    <span className="text-xs bg-stone-100 text-slate-500 border border-stone-200 px-2.5 py-1 rounded-full font-medium">Optional</span>
                                </div>
                                <div className="p-5 md:p-6">
                                    <textarea
                                        rows={4}
                                        placeholder="Provide more details about the issue..."
                                        className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 resize-none"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Contact info */}
                            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                                <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-slate-500" />
                                        <h3 className="font-semibold text-gray-950 text-base md:text-lg">Your Contact Info</h3>
                                    </div>
                                    <span className="text-xs bg-stone-100 text-slate-500 border border-stone-200 px-2.5 py-1 rounded-full font-medium">Optional</span>
                                </div>
                                <div className="p-5 md:p-6">
                                    <input
                                        type="text"
                                        placeholder="Email or phone — in case we need to follow up"
                                        className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                                        value={contactInfo}
                                        onChange={(e) => setContactInfo(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-sm md:text-base"
                            >
                                <AlertTriangle className="w-4 h-4" />
                                Submit Report
                            </button>
                        </form>
                    </>
                ) : (

                    /* ── SUCCESS STATE ── */
                    <div className="flex flex-col gap-6">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 px-6 py-10 md:px-10 md:py-12 shadow-xl">
                            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
                            <div className="absolute -bottom-14 -left-8 w-56 h-56 rounded-full bg-white/5" />

                            <div className="relative z-10 flex items-start gap-5">
                                <div className="w-14 h-14 flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                                    <CheckCircle className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-200 mb-3 bg-white/10 px-3 py-1 rounded-full">
                                        Report Received
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-3">
                                        Thank you for reporting!
                                    </h2>
                                    <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
                                        Your report has been received. Our team will review it as soon as possible and take appropriate action.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 md:p-6 text-center">
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5">
                                Want to go back and keep browsing listings?
                            </p>
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center gap-2 mx-auto px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-sm md:text-base"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Go Back
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Report;