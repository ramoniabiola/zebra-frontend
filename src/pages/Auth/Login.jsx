import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useLogin } from "../../hooks/auth";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";



const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { login, error, isLoading } = useLogin();
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();

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
  }, [focusedField, formData]); // Re-run when formData changes to maintain focus
  


  const InputField = ({ icon: Icon, type, name, placeholder, value, required = false }) => (
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
        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
          focusedField === name 
            ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
            : 'border-gray-200 hover:border-gray-300'
        }placeholder-gray-400`}
      />
    </div>
  );

  const PasswordField = ({ name, placeholder, value, show, setShow }) => (
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
        className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
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
  
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-10">
      {/* App Name   */}
      <h1 
        className="text-4xl text-slate-900 font-extrabold text-center mb-4">zebr
        <span className="text-cyan-600">a</span>
      </h1>

      {/* Welcome message */}
      <h2 className="text-xl text-center font-bold text-gray-600 mb-1">Welcome back to Zebra!</h2>
      <p className=" text-center text-gray-600 mb-8">Sign in to your account to continue</p>
            
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
          type="button"
          onClick={handleLogin}
          disabled={isLoading} // Disable button while loading
          className="w-full bg-linear-65 from-cyan-400 to-cyan-600 hover:bg-linear-65 hover:from-cyan-500 hover:to-cyan-700 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow-cyan-500/25 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 flex items-center justify-center space-x-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <ClipLoader
              color="#ffffff" 
              loading={true}
              size={24} 
            />
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
    </div>
  );
};


export default Login;
