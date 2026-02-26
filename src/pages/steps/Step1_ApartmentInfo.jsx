import { FileText, Home, MapPin, Navigation, Landmark, ChevronDown } from "lucide-react";


const fieldConfig = [
  {
    id: "title",
    name: "title",
    label: "Listing Title",
    required: true,
    type: "text",
    placeholder: "e.g., Beautiful 2BR Apartment in VI",
    icon: FileText,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-100/80",
  },
  {
    id: "location",
    name: "location",
    label: "Location (City / Area)",
    required: true,
    type: "text",
    placeholder: "e.g., Victoria Island, Lagos",
    icon: MapPin,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-100/80",
  },
  {
    id: "apartment_address",
    name: "apartment_address",
    label: "Full Apartment Address",
    required: true,
    type: "text",
    placeholder: "e.g., 123 Ahmadu Bello Way, VI",
    icon: Navigation,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100/80",
  },
  {
    id: "nearest_landmark",
    name: "nearest_landmark",
    label: "Nearest Landmark",
    required: false,
    type: "text",
    placeholder: "e.g., Near Shoprite",
    icon: Landmark,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100/80",
  },
];

const apartmentTypes = [
  "self-contained",
  "1-bedroom",
  "2-bedroom",
  "3-bedroom",
  "4-bedroom",
  "5-bedroom",
  "semi-detached-duplex",
  "duplex",
  "studio",
  "mini-flat",
  "shared-apartment",
];


const Step1_ApartmentInfo = ({ formData, handleChange, errors }) => {
  return (
    <div className="flex flex-col gap-5">

      {/* ── SECTION HEADER ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 px-5 py-7 md:px-7 shadow-lg">
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-6 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute top-4 right-20 w-8 h-8 rounded-full bg-cyan-500/40" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-md">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-cyan-300 mb-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
              Step 1 of 4
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">Apartment Information</h2>
            <p className="text-cyan-100/70 text-xs md:text-sm mt-0.5">Tell us the basic details about your property</p>
          </div>
        </div>
      </div>


      {/* ── APARTMENT TYPE ── */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-100/80 flex items-center justify-center flex-shrink-0">
            <Home className="w-3.5 h-3.5 text-violet-600" />
          </div>
          <h3 className="font-semibold text-gray-950 text-base md:text-lg">Apartment Type <span className="text-rose-500">*</span></h3>
        </div>
        <div className="p-5 md:p-6">
          <div className="relative">
            <select
              name="apartment_type"
              value={formData.apartment_type}
              onChange={handleChange}
              className={`w-full appearance-none border rounded-xl px-4 py-3 text-sm md:text-base font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                errors?.apartment_type
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
              }`}
            >
              <option value="">Select Apartment Type</option>
              {apartmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          {errors?.apartment_type && (
            <p className="mt-2 text-xs text-red-600 font-medium">{errors.apartment_type}</p>
          )}
        </div>
      </div>


      {/* ── TEXT INPUT FIELDS ── */}
      {fieldConfig.map(({ id, name, label, required, type, placeholder, icon: Icon, iconColor, iconBg }) => (
        <div key={id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-950 text-base md:text-lg">
                {label} {required && <span className="text-rose-500">*</span>}
              </h3>
            </div>
            {!required && (
              <span className="text-xs bg-stone-100 text-slate-500 border border-stone-200 px-2.5 py-1 rounded-full font-medium flex-shrink-0">
                Optional
              </span>
            )}
          </div>
          <div className="p-5 md:p-6">
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full border rounded-xl px-4 py-3 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 ${
                errors?.[name]
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
              }`}
            />
            {errors?.[name] && (
              <p className="mt-2 text-xs text-red-600 font-medium">{errors[name]}</p>
            )}
          </div>
        </div>
      ))}

    </div>
  );
};

export default Step1_ApartmentInfo;