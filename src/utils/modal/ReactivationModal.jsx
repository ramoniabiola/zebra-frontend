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
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
                {!isLoading && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        <X />
                    </button>
                )}

                <div className="text-center">
                    {isLoading && (
                        <>
                            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
                            </div>
                        
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Reactivating Your Apartment Listing
                            </h3>
                        
                            <p className="text-gray-600 mb-4">
                                Please wait while we restore your listing and make it available to potential tenants...
                            </p>
                        
                            <div className="text-sm text-gray-500">
                                Updating availability status and refreshing listing details...
                            </div>
                        </>
                    )}

                    {success && (
                        <>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        
                            <h3 className="text-xl font-semibold text-green-800 mb-2">
                                🎉 Apartment Successfully Reactivated!
                            </h3>
                        
                            <p className="text-gray-600 mb-4">
                                Great news! Your apartment listing is now active and visible to potential tenants. You should start receiving inquiries soon!
                            </p>
                        
                            <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700 mb-4">
                                Your listing will appear in search results and tenant recommendations immediately.
                            </div>
                        </>
                    )}

                    {error && (
                        <>
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                        
                            <h3 className="text-xl font-semibold text-red-800 mb-2">
                                Reactivation Failed
                            </h3>
                        
                            <p className="text-gray-600 mb-4">
                                We couldn't reactivate your apartment listing right now. This might be due to a temporary issue.
                            </p>
                        
                            {error && (
                                <div className="bg-red-50 p-3 rounded-lg text-sm text-red-700 mb-4">
                                    <strong>Error Details:</strong> {error}
                                </div>
                            )}

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={onRetry}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                                >
                                    Try Again
                                </button>
                          
                                <button
                                    onClick={onClose}
                                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
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