import { useState } from "react";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-10">
            {/* App Name */}
            <h1 
              className="text-5xl text-slate-900 font-extrabold text-center mb-4">zebr
              <span className="text-cyan-600">a</span>
            </h1>

            {/* Welcome message */}
            <p className="typewriter text-center text-gray-700 mb-8 text-lg font-bold">
              Welcome back to Zebra!
            </p>

            {/* Form */}
            <form className="space-y-4 max-w-md mx-auto w-full">
                {/* Email */}
                <div className="space-y-4">
                    <label  className="block text-lg font-bold text-gray-700">
                      Email 
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg text-lg font-semibold text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="you@example.com"
                    />
                </div>

                {/* Password */}
                <div className="space-y-4">
                    <label htmlFor="password" className="block text-lg font-bold text-gray-700">
                      Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="********"
                    />
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end text-lg font-bold text-gray-600 cursor-pointer">
                    <span className="text-midnight-blue hover:underline">
                      Forgot Password?
                    </span>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-linear-65 from-cyan-400 to-cyan-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-cyan-800 cursor-pointer"
                >
                  Login
                </button>

                {/* Link to Register */}
                <p className="text-center text-lg text-gray-600 mt-2">
                    Don't have an account?{" "}
                    <span  className="text-cyan-500 font-medium hover:underline cursor-pointer">
                      Create one
                    </span>
                </p>
            </form>
        </div>
    );
};


export default Login;
