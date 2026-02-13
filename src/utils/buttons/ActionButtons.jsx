import { CheckCircle, X, Loader2 } from 'lucide-react';

const ActionButtons = ({ 
    editMode, 
    onSave, 
    onCancel, 
    isLoading = false, 
    disabled = false,
    saveLabel = "Reactivate Listing" 
}) => {
    if (editMode) {
        return (
            <div className="flex items-center justify-center gap-4 lg:gap-8">
                <button 
                    onClick={onSave}
                    disabled={isLoading || disabled}
                    className={`flex items-center gap-1 px-3 py-2 text-sm lg:text-base rounded-lg transition-all duration-200 shadow-sm focus:invisible cursor-pointer ${
                        isLoading || disabled
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 animate-spin" />
                            {saveLabel.replace('Reactivate', 'Reactivating')}...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                            {saveLabel}
                        </>
                    )}
                </button>
                <button 
                    onClick={onCancel}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm lg:text-base rounded-lg hover:bg-gray-200 transition-all duration-200 cursor-pointer focus:invisible disabled:opacity-50"
                >
                    <X className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    Cancel
                </button>
            </div>
        );
    }
};  

export default ActionButtons;