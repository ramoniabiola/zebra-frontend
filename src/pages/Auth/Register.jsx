import { useState } from "react";

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate + Submit to backend later
        console.log(formData);
    };

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 py-6">

            {/* App Name / Logo */}
            <h1 
              className="text-5xl text-slate-900 font-extrabold text-center mb-4">zebr
              <span className="text-cyan-600">a</span>
            </h1>

            {/* Welcome Message */}
            <h2 className="text-xl font-semibold text-gray-500 mb-6">
                Create Your Account
            </h2>

            {/* Form */}
            <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg p-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

                {/* Password */}
               
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                

                {/* Confirm Password */}
               
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                

                {/* Role Selector */}
                <div className="w-full flex flex-col gap-2 mt-2">
                    <label className="font-medium  text-gray-700">Register as:</label>
                    <div className="flex gap-4">
                        {["tenant", "landlord", "agent"].map((roleOption) => (
                            <label key={roleOption} className="flex items-center gap-1 text-gray-800 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value={roleOption}
                                    checked={formData.role === roleOption}
                                    onChange={handleChange}
                                />
                                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-linear-65 from-cyan-400 to-cyan-600 text-white py-3.5 rounded-md text-lg font-semibold cursor-pointer"
                >
                  Register
                </button>
            </form>

            {/* Already have an account? */}
            <p className="text-base text-gray-600 mt-6">
                Already have an account?{" "}
                <span className="text-cyan-500 font-semibold text-lg hover:underline cursor-pointer">
                    Login
                </span>
            </p>
        </div>
    );
};

export default Register;
