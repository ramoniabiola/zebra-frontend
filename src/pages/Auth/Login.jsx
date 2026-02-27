import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useLogin } from "../../hooks/auth";
import { useDispatch } from "react-redux";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [shakingFields, setShakingFields] = useState({});
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
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
    if (!formData.password.trim()) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleLogin = async (e) => {
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
    await login(dispatch, formData);
  };

  useEffect(() => {
    if (focusedField && inputRefs[focusedField]?.current) {
      const el = inputRefs[focusedField].current;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }, [focusedField, formData]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">

      {/* ── CARD ── */}
      <div className="w-full max-w-sm md:max-w-md lg:max-w-md bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">

        {/* Card top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800" />

        <div className="px-7 pt-8 pb-7 flex flex-col gap-6">

          {/* Brand */}
          <div className="flex flex-col items-center gap-1.5 mb-1 mt-4">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-shadow-lg">
              zebr<span className="text-cyan-600">a</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium">The hub of property renting in Nigeria</p>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-900">Welcome back 👋</h2>
            <p className="text-sm text-gray-400 mt-0.5">Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* Email */}
            <div className={`flex flex-col gap-1.5 ${shakingFields.email ? "animate-shake" : ""}`}>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
              <div className="relative">
                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${
                  fieldErrors.email ? "text-rose-400" : focusedField === "email" ? "text-cyan-600" : "text-gray-300"
                }`} />
                <input
                  ref={inputRefs.email}
                  type="text"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none placeholder:text-gray-300 ${
                    fieldErrors.email
                      ? "border-red-300 bg-red-50 text-red-700"
                      : focusedField === "email"
                      ? "border-cyan-400 bg-white text-gray-800 ring-3 ring-cyan-100"
                      : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
                  }`}
                />
              </div>
              {fieldErrors.email && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div className={`flex flex-col gap-1.5 ${shakingFields.password ? "animate-shake" : ""}`}>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                <span
                  onClick={() => navigate("/change-password")}
                  className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 cursor-pointer hover:underline transition-colors"
                >
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${
                  fieldErrors.password ? "text-rose-400" : focusedField === "password" ? "text-cyan-600" : "text-gray-300"
                }`} />
                <input
                  ref={inputRefs.password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none placeholder:text-gray-300 ${
                    fieldErrors.password
                      ? "border-red-300 bg-red-50 text-red-700"
                      : focusedField === "password"
                      ? "border-cyan-400 bg-white text-gray-800 ring-3 ring-cyan-100"
                      : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
                  }`}
                />
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-cyan-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-xs text-red-600 font-medium animate-slideDown">{fieldErrors.password}</p>}
            </div>

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
              className="w-full mt-1 flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 text-white py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg shadow-cyan-700/20 hover:shadow-xl hover:shadow-cyan-700/25 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</>
              ) : (
                <>Login <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-gray-400 font-medium">New here?</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Register link */}
          <button
            onClick={() => navigate("/register")}
            className="w-full py-3 rounded-xl border-2 border-stone-200 text-sm font-bold text-gray-600 hover:border-cyan-300 hover:text-cyan-700 hover:bg-cyan-50/50 transition-all duration-200 cursor-pointer"
          >
            Create an account
          </button>

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

export default Login;