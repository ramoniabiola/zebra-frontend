import { useState } from "react";


const PasswordChange = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 

    // const handlePasswordChange = () => {
        // if (newPassword !== confirmPassword) {
        //   alert("Passwords do not match!");
        //   return;
        // }
        // Trigger password update API here later
        // console.log("Password updated:", { currentPassword, newPassword });
    // };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
            {/* App Name */}
            <h1 
               className="text-4xl text-slate-900 font-extrabold text-center mb-4">zebr
               <span className="text-cyan-600">a</span>
            </h1>

            {/* Password Change Fields */}
            <div className="w-11/12 max-w-md">
                <h2 className="text-xl text-center font-bold mb-8 text-gray-600">Change Your Password</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-lg text-gray-700 font-medium mb-1">New Password</label>
                        <input type="password" className="w-full p-2.5 border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg text-gray-700 font-medium mb-1">Confirm New Password</label>
                        <input type="password" className="w-full p-2.5 border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500" />
                    </div>
                    <button type="submit" className="w-full bg-linear-65 from-cyan-400 to-cyan-600 text-white font-semibold py-3 px-4 rounded hover:bg-cyan-700 cursor-pointer">
                        Update Password
                    </button>
                </form>
            </div>
        </div>  
    );
};

export default PasswordChange;