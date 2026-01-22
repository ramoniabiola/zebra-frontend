import { AlertCircle, X } from 'lucide-react';

const ErrorAlert = ({ message, onClose }) => (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
            <p className="text-sm lg:text-base text-red-700 font-medium">{message}</p>
        </div>
        {onClose && (
            <button onClick={onClose} className="text-red-400 hover:text-red-600">
                <X className="w-4 h-4" />
            </button>
        )}
    </div>
);

export default ErrorAlert;