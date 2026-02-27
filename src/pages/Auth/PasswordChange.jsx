import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Lock, ArrowRight, Shield, Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PasswordChangeVerificationPage from "./PasswordChangeVerificationPage";
import { sendVerificationCodeApi } from "../../api/auth";


const PasswordChange = () => {
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [shakingFields, setShakingFields] = useState({});
    const [showVerificationPage, setShowVerificationPage] = useState(false);
    const navigate = useNavigate();

    const inputRefs = {
        email: useRef(null),
        newPassword: useRef(null),
        confirmPassword: useRef(null),
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (fieldErrors[e.target.name]) setFieldErrors((p) => ({ ...p, [e.target.name]: "" }));
        if (shakingFields[e.target.name]) setShakingFields((p) => ({ ...p, [e.target.name]: false }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid email address";
        if (!formData.newPassword.trim()) errors.newPassword = "New password is required";
        else if (formData.newPassword.length < 6) errors.newPassword = "New password must be at least 6 characters";
        if (!formData.confirmPassword.trim()) errors.confirmPassword = "Please confirm your password";
        else if (formData.newPassword !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
        return errors;
    };

    useEffect(() => {
        if (focusedField && inputRefs[focusedField]?.current) {
            const el = inputRefs[focusedField].current;
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
        }
    }, [focusedField, formData]);

    const sendVerificationCode = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await sendVerificationCodeApi({ email: formData.email });
            if (response.status >= 200 && response.status < 300) {
                setError(null);
                setIsLoading(false);
            } else {
                throw new Error(response.data.error);
            }
        } catch (err) {
          setIsLoading(false);
          setError(err.response?.data?.error || "Failed to send verification code, please try again");
        }
    };

    const handlePasswordChange = async (e) => {
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
        sendVerificationCode();
        setShowVerificationPage(true);
    };


    if (showVerificationPage) {
        return (
            <PasswordChangeVerificationPage
                formData={formData}
                sendVerificationCode={sendVerificationCode}
                sendVerificationCodeError={error}
                setSendVerificationCodeError={setError}
            />
        );  
    }

    /* ─── Input class helper ─── */
    const inputCls = (name, pl = "pl-10", pr = "pr-4") =>
        `w-full ${pl} ${pr} py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none placeholder:text-gray-300 ${
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

    const passwordsMatch =
        formData.newPassword && formData.confirmPassword &&
        formData.newPassword === formData.confirmPassword;
    const passwordsMismatch =
        formData.newPassword && formData.confirmPassword &&
        formData.newPassword !== formData.confirmPassword;



    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">

            {/* ── CARD ── */}
            <div className="w-full max-w-sm md:max-w-md lg:max-w-md bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">

                {/* Top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800" />

                <div className="px-7 pt-8 pb-7 flex flex-col gap-6">
                    {/* Back button */}
                    <button
                        onClick={() => navigate("/login")}
                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-cyan-700 transition-colors cursor-pointer w-fit"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Login
                    </button>

                    {/* Brand + heading */}
                    <div className="flex flex-col items-center gap-1.5">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-700 to-cyan-900 rounded-2xl flex items-center justify-center shadow-lg mb-1">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Change Password</h2>
                        <p className="text-xs text-gray-400 font-medium text-center">Enter your email and a new password to secure your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">

                        {/* Email */}
                        <div className={`flex flex-col gap-1.5 ${shakingFields.email ? "animate-shake" : ""}`}>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Registered Email</label>
                            <div className="relative">
                                <Mail className={iconCls("email")} />
                                <input
                                    ref={inputRefs.email}
                                    type="text"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField("")}
                                    className={inputCls("email")}
                                />
                            </div>
                            {fieldErrors.email && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.email}</p>}
                        </div>

                        {/* New Password */}
                        <div className={`flex flex-col gap-1.5 ${shakingFields.newPassword ? "animate-shake" : ""}`}>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">New Password</label>
                            <div className="relative">
                                <Lock className={iconCls("newPassword")} />
                                <input
                                    ref={inputRefs.newPassword}
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="Min. 6 characters"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("newPassword")}
                                    onBlur={() => setFocusedField("")}
                                    className={inputCls("newPassword", "pl-10", "pr-11")}
                                />
                                <button type="button" onMouseDown={(e) => { e.preventDefault(); setShowNewPassword(!showNewPassword); }}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-cyan-600 transition-colors">
                                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {fieldErrors.newPassword && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.newPassword}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className={`flex flex-col gap-1.5 ${shakingFields.confirmPassword ? "animate-shake" : ""}`}>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Confirm Password</label>
                            <div className="relative">
                                <Shield className={iconCls("confirmPassword")} />
                                <input
                                    ref={inputRefs.confirmPassword}
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Repeat new password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("confirmPassword")}
                                    onBlur={() => setFocusedField("")}
                                    className={inputCls("confirmPassword", "pl-10", "pr-11")}
                                />
                                <button type="button" onMouseDown={(e) => { e.preventDefault(); setShowConfirmPassword(!showConfirmPassword); }}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-cyan-600 transition-colors">
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {fieldErrors.confirmPassword && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.confirmPassword}</p>}
                        </div>

                        {/* Password match indicator */}
                        {(passwordsMatch || passwordsMismatch) && (
                            <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-2.5 rounded-xl border ${
                                passwordsMatch
                                    ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                                    : "text-red-600 bg-red-50 border-red-200"
                            }`}>
                                {passwordsMatch
                                    ? <><CheckCircle className="w-3.5 h-3.5" /> Passwords match</>
                                    : <><span className="text-base leading-none">✗</span> Passwords do not match</>
                                }
                            </div>
                        )}

                        {/* API error */}
                        {error && (
                            <div className="flex items-start gap-2 px-3.5 py-3 bg-red-50 border border-red-200 rounded-xl">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
                                <p className="text-xs text-red-700 font-medium leading-relaxed">{error}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            id="submit-btn"
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-1 flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 text-white py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg shadow-cyan-700/20 hover:shadow-xl hover:shadow-cyan-700/25 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {isLoading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Sending Code...</>
                            ) : (
                                <>Update Password <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>   
                    </form>
                    
                </div>
            </div>

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
        </div>
    );
};

export default PasswordChange;