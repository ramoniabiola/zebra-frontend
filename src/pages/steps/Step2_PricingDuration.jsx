import { BadgeDollarSign, CalendarClock, Clock, Landmark, ChevronDown } from "lucide-react";


const Step2_PricingDuration = ({ formData, handleChange, errors }) => {


    return (
        <div className="flex flex-col gap-5">
            {/* ── SECTION HEADER ── */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 px-5 py-7 md:px-7 shadow-lg">
                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
                <div className="absolute -bottom-10 -left-6 w-40 h-40 rounded-full bg-white/5" />
                <div className="absolute top-4 right-20 w-8 h-8 rounded-full bg-cyan-500/40" />

                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-md">
                        <BadgeDollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-cyan-300 mb-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
                            Step 2 of 4
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">Pricing & Duration</h2>
                        <p className="text-cyan-100/70 text-xs md:text-sm mt-0.5">Set your rental price and terms</p>
                    </div>
                </div>
            </div>
        

            {/* ── RENT PRICE ── */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-100/80 flex items-center justify-center flex-shrink-0">
                        <BadgeDollarSign className="w-3.5 h-3.5 text-cyan-600" />
                    </div>
                    <h3 className="font-semibold text-gray-950 text-base md:text-lg">
                        Rent Price <span className="text-rose-500">*</span>
                    </h3>
                </div>
                <div className="p-5 md:p-6">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm pointer-events-none">₦</span>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0"
                            className={`w-full pl-8 pr-4 py-3 border rounded-xl text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 ${
                                errors?.price
                                ? "border-red-300 bg-red-50 text-red-700"
                                : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
                            }`}
                        />
                    </div>
                    {errors?.price && (
                        <p className="mt-2 text-xs text-red-600 font-medium">{errors.price}</p>
                    )}
                </div>
            </div>
            
            
            {/* ── PAYMENT FREQUENCY ── */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-violet-100/80 flex items-center justify-center flex-shrink-0">
                        <CalendarClock className="w-3.5 h-3.5 text-violet-600" />
                    </div>
                    <h3 className="font-semibold text-gray-950 text-base md:text-lg">
                        Payment Frequency <span className="text-rose-500">*</span>
                    </h3>
                </div>
                <div className="p-5 md:p-6">
                    <div className="relative">
                        <select
                            name="payment_frequency"
                            value={formData.payment_frequency}
                            onChange={handleChange}
                            className={`w-full appearance-none border rounded-xl px-4 py-3 text-sm md:text-base font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                                errors?.payment_frequency
                                ? "border-red-300 bg-red-50 text-red-700"
                                : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
                            }`}
                        >
                            <option value="">Select Payment Frequency</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors?.payment_frequency && (
                        <p className="mt-2 text-xs text-red-600 font-medium">{errors.payment_frequency}</p>
                    )}
                </div>
            </div>
            
            
            {/* ── MINIMUM DURATION ── */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100/80 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <h3 className="font-semibold text-gray-950 text-base md:text-lg">
                        Minimum Duration <span className="text-rose-500">*</span>
                    </h3>
                </div>
                <div className="p-5 md:p-6">
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 1 Year, 6 Months"
                        className={`w-full border rounded-xl px-4 py-3 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 ${
                            errors?.duration
                            ? "border-red-300 bg-red-50 text-red-700"
                            : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
                        }`}
                    />
                    {errors?.duration && (
                      <p className="mt-2 text-xs text-red-600 font-medium">{errors.duration}</p>
                    )}
                </div>
            </div>
              
            
            {/* ── SERVICE CHARGE ── */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100/80 flex items-center justify-center flex-shrink-0">
                            <Landmark className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <h3 className="font-semibold text-gray-950 text-base md:text-lg">Service Charge</h3>
                    </div>
                    <span className="text-xs bg-stone-100 text-slate-500 border border-stone-200 px-2.5 py-1 rounded-full font-medium flex-shrink-0">
                        Optional
                    </span>
                </div>
                <div className="p-5 md:p-6">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm pointer-events-none">₦</span>
                        <input
                            type="number"
                            name="service_charge"
                            value={formData.service_charge}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full pl-8 pr-4 py-3 border border-stone-200 bg-stone-50 rounded-xl text-sm md:text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-stone-300 transition-all duration-200 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
}   

export default Step2_PricingDuration;