import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "tenant",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate + Submit to backend later
        console.log(formData);
    };

    
    // Create refs for each input field
    const inputRefs = {
        full_name: useRef(null),
        username: useRef(null),
        email: useRef(null),
        phone: useRef(null),
        password: useRef(null),
        confirmPassword: useRef(null),
    };

    // Effect to maintain focus when focusedField changes
    useEffect(() => {
        if (focusedField && inputRefs[focusedField]?.current) {
            const inputElement = inputRefs[focusedField].current;
            inputElement.focus();
            
            // Set cursor to end of text
            const length = inputElement.value.length;
            inputElement.setSelectionRange(length, length);
        }
    }, [focusedField, formData]); // Re-run when formData changes to maintain focus


    const InputField = ({ icon: Icon, type, name, placeholder, value, required = false }) => {
        return (
            <div className="relative group">
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === name ? 'text-cyan-500' : 'text-gray-400'
                }`}>
                    <Icon size={20} />
                </div>
                <input
                    ref={inputRefs[name]}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField("")}
                    required={required}
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
                        focusedField === name 
                            ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
                            : 'border-gray-200 hover:border-gray-300'
                    } placeholder-gray-400`}
                />
            </div>
        );
    };

    const PasswordField = ({ name, placeholder, value, show, setShow }) => {
        return (
            <div className="relative group">
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === name ? 'text-cyan-500' : 'text-gray-400'
                }`}>
                    <Lock size={20} />
                </div>
                <input
                    ref={inputRefs[name]}
                    type={show ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField("")}
                    required
                    className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
                        focusedField === name 
                            ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
                            : 'border-gray-200 hover:border-gray-300'
                    } placeholder-gray-400`}
                />
                <button
                    type="button"
                    onMouseDown={(e) => {
                        e.preventDefault(); // Prevent input from losing focus
                        setShow(!show);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-500 transition-colors duration-300"
                >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        );
    };

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 py-6">
            {/* App Name / Logo */}
            <h1 
              className="text-4xl text-slate-900 font-extrabold text-center mb-4">zebr
              <span className="text-cyan-600">a</span>
            </h1>

            {/* Welcome Message */}
            <h2 className="text-2xl font-bold text-center text-gray-600 mb-2">Create Your Account</h2>
            <p className="text-gray-600 text-center text-sm">Join thousands of users finding their perfect home</p>

            {/* Form */}
            <div className="w-full max-w-md space-y-6 mt-8" onSubmit={handleSubmit}>
                <InputField
                    icon={User}
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    required
                />

                <InputField
                    icon={UserCheck}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    required
                />
                <InputField
                    icon={Mail}
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    required
                />
                <InputField
                    icon={Phone}
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                />
                <PasswordField
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    show={showPassword}
                    setShow={setShowPassword}
                />
                <PasswordField
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    show={showConfirmPassword}
                    setShow={setShowConfirmPassword}
                />

                {/* Role Selector */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Register as:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {["tenant", "landlord", "agent"].map((roleOption) => (
                            <label 
                                key={roleOption} 
                                className={`relative flex flex-col items-center p-4  rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                    formData.role === roleOption
                                        ? 'border-cyan-500 bg-cyan-50 shadow-md'
                                        : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value={roleOption}
                                    checked={formData.role === roleOption}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 mb-2 transition-all duration-300 ${
                                    formData.role === roleOption
                                        ? 'border-cyan-500 bg-cyan-500'
                                        : 'border-gray-300'
                                }`}>
                                    {formData.role === roleOption && (
                                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                    )}
                                </div>
                                <span className={`text-sm font-medium capitalize ${
                                    formData.role === roleOption ? 'text-cyan-700' : 'text-gray-600'
                                }`}>
                                    {roleOption}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-3.5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-101 shadow-lg hover:shadow-xl cursor-pointer"
                >
                    Create Account
                </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-8 mb-24">
                <p className="text-gray-600">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors duration-300 hover:underline cursor-pointer">
                        Sign in here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;