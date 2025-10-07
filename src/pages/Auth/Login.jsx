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
  const [shakingFields, setShakingFields] = useState({}); // Track which fields shoulds
  const { login, error, isLoading } = useLogin(); 
 
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear field error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors(prev => ({...prev, [e.target.name]: ""}));
    }

    // Clear shaking state when user starts typing
    if (shakingFields[e.target.name]) {
      setShakingFields(prev => ({...prev, [e.target.name]: false}));
    }
  };


  // Validation function
  const validateForm = () => {
    const errors = {};
    const requiredFields = ['email', 'password'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        errors[field] = `${field.replace('_', ' ')} is required`;   
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  }


  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if(Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      
      // Set shaking state for fields with errors
      const newShakingFields = {};
      Object.keys(errors).forEach(field => {
        newShakingFields[field] = true;
      });
      setShakingFields(newShakingFields);
      
      // Clear shaking state after animation completes
      setTimeout(() => {
        setShakingFields({});
      }, 500);
      
      // Shake animation for submit button
      const submitBtn = document.getElementById('submit-btn');
      submitBtn?.classList.add('animate-shake');
      setTimeout(() => submitBtn?.classList.remove('animate-shake'), 500);
      
      return;
    }
       
    setFieldErrors({});
    setShakingFields({});

    // Perform login action
    await login(dispatch, formData);
    
  }

  // Create refs for each input field
  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
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
  }, [focusedField, formData]); 
  



  const InputField = ({ icon: Icon, type, name, placeholder, value, required = false }) => {
    const hasError = fieldErrors[name];
    const shouldShake = shakingFields[name];
        
    return (
      <div className={`relative group ${shouldShake ? 'animate-shake' : ''}`}>
        <div className="relative">
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 z-10 ${
              hasError ? 'text-rose-500' :
              focusedField === name ? 'text-cyan-500' : 'text-gray-400'
            }`}
          >
            <Icon size={18} />
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
            className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
              hasError 
                ? 'border-rose-500 shadow-md shadow-rose-500/20' 
                : focusedField === name 
                  ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
                  : 'border-gray-200 hover:border-gray-300'
              } placeholder-gray-400`}
            />
          </div>
          {hasError && (
            <p className={`text-rose-500 text-xs mt-1 ${shouldShake ? 'animate-slideDown' : ''}`}>{hasError}</p>
          )}
      </div>
    );
  };

  const PasswordField = ({ name, placeholder, value, show, setShow }) => {
    const hasError = fieldErrors[name];
    const shouldShake = shakingFields[name];

    return (
      <div className={`relative group ${shouldShake ? 'animate-shake' : ''}`}>
        <div className="relative">
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 z-10 ${
              hasError ? 'text-rose-500' :
              focusedField === name ? 'text-cyan-500' : 'text-gray-400'
            }`}
          >
            <Lock size={18} />
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
            className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
              hasError 
                ? 'border-rose-500 shadow-md shadow-rose-500/20' 
                : focusedField === name 
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
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {hasError && (
          <p className={`text-rose-500 text-xs mt-1 ${shouldShake ? 'animate-slideDown' : ''}`}>{hasError}</p>
        )}
      </div>
    );
  };
  

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-10">
      {/* App Name   */}
      <h1 
        className="text-[2rem] text-slate-900 font-extrabold cursor-pointer text-center mb-2 tracking-tight text-shadow-lg">zebr
        <span className="text-cyan-600">a</span>
      </h1>

      {/* Welcome message */}
      <h2 className="text-lg text-center font-semibold text-gray-400 tracking-widest">Welcome back to zebra!</h2>
      <h3 className="text-xs text-center font-normal italic text-gray-400 mb-8">The hub of property renting...</h3>
            
      {/* Form */}
      <form className="space-y-6 max-w-md mx-auto w-full">
        <InputField
          icon={Mail}
          type="text"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          required
        />
        
        <PasswordField 
          name="password"
          type="password"
          placeholder="********"
          value={formData.password}
          show={showPassword}
          setShow={setShowPassword}
        />
        {error && <p className='text-rose-600 -mt-3'>{error}</p>} {/* Display the error if it exists */}
        {/* Forgot Password */}
        <div className="flex justify-end">
          <span onClick={() => navigate("/change-password")} className="text-sm font-medium text-cyan-600 hover:text-cyan-700 cursor-pointer transition-colors duration-300 hover:underline">
            Forgot Password?
          </span>
        </div>
         {/* Submit Button */}
        <button
          id="submit-btn"
          type="submit"
          onClick={handleLogin}
          disabled={isLoading} // Disable button while loading
          className="w-full bg-linear-65 from-cyan-400 to-cyan-600 hover:bg-linear-65 hover:from-cyan-500 hover:to-cyan-700 text-white py-3 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow-cyan-500/25 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 flex items-center justify-center space-x-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 text-white animate-spin" />
              <span>Logging In...</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </button>
      </form>

      {/* Register Link */}
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors duration-300 hover:underline cursor-pointer">
            Create one
          </span>
        </p>
      </div>

      {/* Custom Styles */}
      <style jsx="true">{
        `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          @keyframes slideDown {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};


export default Login;
