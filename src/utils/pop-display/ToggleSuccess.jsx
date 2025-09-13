// components/ToggleSuccess.jsx
const ToggleSuccess = ({ message, animateOut, offset = "bottom-24" }) => {
    if (!message) return null;

    return (
        <div
            className={`
                fixed ${offset} right-4 z-50 px-4 py-4 rounded-lg bg-cyan-100/70 backdrop-blur-sm  
                shadow-lg shadow-cyan-500/10 text-sm
                text-cyan-700 font-medium tracking-normal
                ${animateOut ? "animate-slideOutRight" : "animate-slideInRight"}
            `}
        >
            <div className="flex items-center gap-2.5">
                {/* Optional heart icon accent */}
                <div className="w-2 h-2 bg-rose-500/75 rounded-full"></div>
                <span className="text-cyan-600">{message}</span>
            </div>
            
            {/* Custom Animation Styles */}
            <style jsx="true">{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }

                .animate-slideInRight {
                    animation: slideInRight 0.4s ease-out forwards;
                }

                .animate-slideOutRight {
                    animation: slideOutRight 0.4s ease-in forwards;
                }
            `}</style>
        </div>
    );
};

export default ToggleSuccess;