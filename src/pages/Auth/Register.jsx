import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock, UserCheck, Loader2, X, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../hooks/auth";
import { useDispatch } from "react-redux";


const Register = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        phone_no: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const { registerUser, error, setSuccess, success, isLoading } = useRegisterUser();
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [shakingFields, setShakingFields] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inputRefs = {
        full_name: useRef(null),
        username: useRef(null),
        email: useRef(null),
        phone_no: useRef(null),
        password: useRef(null),
        confirmPassword: useRef(null),
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (fieldErrors[e.target.name]) setFieldErrors((p) => ({ ...p, [e.target.name]: "" }));
        if (shakingFields[e.target.name]) setShakingFields((p) => ({ ...p, [e.target.name]: false }));
    };

    const validateForm = () => {
        const errors = {};
        const requiredFields = ["full_name", "username", "email", "phone_no", "password", "confirmPassword", "role"];
        requiredFields.forEach((field) => {
            if (!formData[field].trim()) {
                errors[field] = field === "role" ? "Please select a role" : `${field.replace("_", " ")} is required`;
            }
        });
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid email address";
        if (formData.password && formData.password.length < 6) errors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
        return errors;
    };


    const handleUserRegistration = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            const shaking = {};
            Object.keys(errors).forEach((f) => (shaking[f] = true));
            setShakingFields(shaking);
            setTimeout(() => setShakingFields({}), 500);
            const btn = document.getElementById("submit-btn");
            btn?.classList.add("animate-shake");
            setTimeout(() => btn?.classList.remove("animate-shake"), 500);
            return;
        }
        setFieldErrors({});
        setShakingFields({});
        setShowSubmitModal(true);
        await registerUser(dispatch, formData);
    };


    useEffect(() => {
        if (focusedField && inputRefs[focusedField]?.current) {
            const el = inputRefs[focusedField].current;
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
        }
    }, [focusedField, formData]);


    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
                setShowSubmitModal(false);
                navigate("/login");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);


    /* ─── Shared input class helper ─── */
    const inputCls = (name, hasLeftIcon = true, hasRightIcon = false) =>
        `w-full ${hasLeftIcon ? "pl-10" : "pl-4"} ${hasRightIcon ? "pr-11" : "pr-4"} py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none placeholder:text-gray-300 ${
            fieldErrors[name]
            ? "border-red-300 bg-red-50 text-red-700"
            : focusedField === name
            ? "border-cyan-400 bg-white text-gray-800 ring-3 ring-cyan-100"
            : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
        }`;

    const iconCls = (name) =>
        `absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${
            fieldErrors[name] ? "text-rose-400" : focusedField === name ? "text-cyan-600" : "text-gray-300"
        }`;


    /* ─── Submit modal ─── */
    const SubmitModal = () => {
        if (!showSubmitModal) return null;
        return (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-stone-100 relative">
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl ${
                        success ? "bg-gradient-to-r from-emerald-400 to-emerald-600" :
                        error ? "bg-gradient-to-r from-red-400 to-red-600" :
                        "bg-gradient-to-r from-cyan-400 to-cyan-700"
                    }`} />

                    {!isLoading && (
                        <button onClick={() => setShowSubmitModal(false)} className="absolute top-5 right-5 text-gray-300 hover:text-gray-500 cursor-pointer transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    )}

                    <div className="flex flex-col items-center text-center gap-4 mt-2">
                        {isLoading && (
                            <>
                                <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Creating your account</h3>
                                    <p className="text-sm text-gray-400">Please wait a moment...</p>
                                </div>
                            </>
                        )}
                        {success && (
                            <>
                                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Account created! 🎉</h3>
                                    <p className="text-sm text-gray-400">Welcome aboard! Redirecting you to login...</p>
                                </div>
                            </>
                        )}  
                        {error && !isLoading && (
                            <>
                                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                                    <AlertCircle className="w-8 h-8 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Registration failed</h3>
                                    <p className="text-sm text-gray-400 mb-1">We couldn't create your account.</p>
                                    <p className="text-xs text-gray-500 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">{error}</p>
                                </div>
                                <button
                                    onClick={handleUserRegistration}
                                    className="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-md cursor-pointer"
                                >
                                    Try Again
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </ div>
        );    
    };


    return (
      <>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-12">
          {/* ── CARD ── */}
          <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">

            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800" />

            <div className="px-7 pt-8 pb-7 flex flex-col gap-6">
                {/* Brand */}
                <div className="flex flex-col items-center gap-1.5">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-shadow-lg">
                        zebr<span className="text-cyan-600">a</span>
                    </h1>
                    <p className="text-xs text-gray-400 font-medium">Join thousands finding their perfect home</p>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-lg font-bold text-gray-900">Create your account</h2>
                    <p className="text-sm text-gray-400 mt-0.5">Fill in your details below to get started</p>
                </div>

                {/* Form */}
                <form onSubmit={handleUserRegistration} className="flex flex-col gap-4">
                    {/* 2-col grid on md+ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className={`flex flex-col gap-1.5 ${shakingFields.full_name ? "animate-shake" : ""}`}>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                            <div className="relative">
                                <User className={iconCls("full_name")} />
                                <input ref={inputRefs.full_name} type="text" name="full_name" placeholder="John Doe" value={formData.full_name}
                                    onChange={handleChange} onFocus={() => setFocusedField("full_name")} onBlur={() => setFocusedField("")}
                                    className={inputCls("full_name")} 
                                />
                            </div>
                          {fieldErrors.full_name && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.full_name}</p>}
                        </div>

                        {/* Username */}
                        <div className={`flex flex-col gap-1.5 ${shakingFields.username ? "animate-shake" : ""}`}>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Username</label>
                            <div className="relative">
                                <UserCheck className={iconCls("username")} />
                                <input ref={inputRefs.username} type="text" name="username" placeholder="johndoe" value={formData.username}
                                    onChange={handleChange} onFocus={() => setFocusedField("username")} onBlur={() => setFocusedField("")}
                                    className={inputCls("username")} 
                                />
                            </div>
                            {fieldErrors.username && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.username}</p>}
                        </div>

                        {/* Email */}
                        <div className={`flex flex-col gap-1.5 ${shakingFields.email ? "animate-shake" : ""}`}>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
                            <div className="relative">
                                <Mail className={iconCls("email")} />
                                <input ref={inputRefs.email} type="text" name="email" placeholder="you@example.com" value={formData.email}
                                    onChange={handleChange} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField("")}
                                    className={inputCls("email")} 
                                />
                            </div>
                          {fieldErrors.email && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div className={`flex flex-col gap-1.5 ${shakingFields.phone_no ? "animate-shake" : ""}`}>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                            <div className="relative">
                                <Phone className={iconCls("phone_no")} />
                                <input ref={inputRefs.phone_no} type="text" name="phone_no" placeholder="+234 XXX XXX XXXX" value={formData.phone_no}
                                    onChange={handleChange} onFocus={() => setFocusedField("phone_no")} onBlur={() => setFocusedField("")}
                                    className={inputCls("phone_no")} 
                                />
                            </div>
                          {fieldErrors.phone_no && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.phone_no}</p>}
                        </div>

                        {/* Password */}
                        <div className={`flex flex-col gap-1.5 ${shakingFields.password ? "animate-shake" : ""}`}>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                            <div className="relative">
                                <Lock className={iconCls("password")} />
                                <input ref={inputRefs.password} type={showPassword ? "text" : "password"} name="password" placeholder="Min. 6 characters" value={formData.password}
                                    onChange={handleChange} onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField("")}
                                    className={inputCls("password", true, true)} />
                                <button type="button" onMouseDown={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-cyan-600 transition-colors">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                          {fieldErrors.password && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className={`flex flex-col gap-1.5 ${shakingFields.confirmPassword ? "animate-shake" : ""}`}>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Confirm Password</label>
                            <div className="relative">
                                <Lock className={iconCls("confirmPassword")} />
                                <input ref={inputRefs.confirmPassword} type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Repeat password" value={formData.confirmPassword}
                                    onChange={handleChange} onFocus={() => setFocusedField("confirmPassword")} onBlur={() => setFocusedField("")}
                                    className={inputCls("confirmPassword", true, true)} 
                                />
                                <button type="button" onMouseDown={(e) => { e.preventDefault(); setShowConfirmPassword(!showConfirmPassword); }}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-cyan-600 transition-colors">
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                          {fieldErrors.confirmPassword && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.confirmPassword}</p>}
                        </div>
                    </div>

                    {/* ── ROLE SELECTOR ── */}
                    <div className={`flex flex-col gap-2 ${shakingFields.role ? "animate-shake" : ""}`}>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Register as</label>
                        <div className="grid grid-cols-3 gap-2.5">
                            {[
                              { value: "tenant", label: "Tenant", desc: "Looking for a home" },
                              { value: "landlord", label: "Landlord", desc: "I own properties" },
                              { value: "agent", label: "Agent", desc: "I manage listings" },
                            ].map((r) => (
                                <label
                                    key={r.value}
                                    className={`relative flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                                        fieldErrors.role
                                            ? formData.role === r.value
                                            ? "border-rose-400 bg-rose-50"
                                            : "border-rose-200 hover:border-rose-300"
                                            : formData.role === r.value
                                            ? "border-cyan-500 bg-cyan-50/70 shadow-md shadow-cyan-100"
                                            : "border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-white"
                                    }`}
                                >
                                    <input type="radio" name="role" value={r.value} checked={formData.role === r.value} onChange={handleChange} className="sr-only" />
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                        formData.role === r.value ? "border-cyan-500 bg-cyan-500" : "border-stone-300"
                                    }`}>
                                        {formData.role === r.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <span className={`text-xs font-bold capitalize leading-none ${formData.role === r.value ? "text-cyan-700" : "text-gray-600"}`}>
                                        {r.label}
                                    </span>
                                    <span className="text-[10px] text-gray-400 text-center leading-tight hidden md:block">{r.desc}</span>
                                </label>
                            ))}
                        </div>
                        {fieldErrors.role && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.role}</p>}
                    </div>
                      
                    {/* Submit */}
                    <button
                        id="submit-btn"
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-1 flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 text-white py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg shadow-cyan-700/20 hover:shadow-xl hover:shadow-cyan-700/25 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {isLoading ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</>
                        ) : (
                            "Create Account →"
                        )}
                    </button>
                
                </form>

                {/* Divider + login link */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-stone-200" />
                    <span className="text-xs text-gray-400 font-medium">Have an account?</span>
                    <div className="flex-1 h-px bg-stone-200" />
                </div>
                <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 rounded-xl border-2 border-stone-200 text-sm font-bold text-gray-600 hover:border-cyan-300 hover:text-cyan-700 hover:bg-cyan-50/50 transition-all duration-200 cursor-pointer"
                >
                    Sign in instead
                </button>

            </div>
          </div>
        </div>

        <SubmitModal />

        <style jsx="true">{`
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            @keyframes slideDown {
                from { transform: translateY(-8px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-shake { animation: shake 0.5s ease-in-out; }
            .animate-slideDown { animation: slideDown 0.3s ease-out; }
        `}</style>
      </>
    );
};

export default Register;