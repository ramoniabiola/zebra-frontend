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
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Change Your Password</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <input type="password" className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                        <input type="password" className="w-full p-2 border rounded" />
                    </div>
                    <button type="submit" className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700">
                        Update Password
                    </button>
                </form>
            </div>
        </div>  
    );
};

export default PasswordChange;