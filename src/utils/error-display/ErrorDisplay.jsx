import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { RotateCcw } from 'lucide-react';

const ErrorDisplay = ({ message, onRetry }) => (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center py-8">
        <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Something went wrong
        </h3>
        <p className="text-gray-600 text-base mb-4">
            {message || "Failed to fetch listing"}
        </p>
        <button
            onClick={onRetry}
            className="px-3 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm tracking-widest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5 focus:invisible cursor-pointer"
        >
            <RotateCcw className="w-4 h-4" />
            Retry
        </button>
    </div>
);

export default ErrorDisplay;