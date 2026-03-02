import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const ReactivationModal = ({ 
    show, 
    onClose, 
    isLoading, 
    success, 
    error, 
    onRetry 
}) => {
    if(!show) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl">
                {!isLoading && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                <div className="text-center">
                    {isLoading && (
                        <>
                            <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                                <Loader2 className="w-7 h-7 text-sky-600 animate-spin" />
                            </div>
                        
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Reactivating Your Apartment Listing
                            </h3>
                        
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Please wait while we restore your listing and make it available to potential tenants...
                            </p>
                        </>
                    )}

                    {success && (
                        <>
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                                <CheckCircle className="w-7 h-7 text-green-600" />
                            </div>
                        
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                🎉 Apartment Successfully Reactivated!
                            </h3>
                        
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Great news! Your apartment listing is now active and visible to potential tenants. You should start receiving inquiries soon!
                            </p>
                        </>
                    )}

                    {error && (
                        <>
                            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                                <AlertCircle className="w-7 h-7 text-red-600" />
                            </div>
                        
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Reactivation Failed
                            </h3>
                        
                            <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                We couldn't reactivate your apartment listing right now. This might be due to a temporary issue.
                            </p>
                        
                            {error && (
                                <div className="text-xs text-gray-400 mb-4">
                                    <strong>Error Details:</strong> {error}
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={onRetry}
                                    className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2.5 px-4 rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-md"
                                >
                                    Try Again
                                </button>
                          
                                <button
                                    onClick={onClose}
                                    className="w-full border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};  

export default ReactivationModal;