import { RotateCcw, CheckCircle, X, Loader2 } from 'lucide-react';

const ActionButtons = ({ 
    editMode, 
    onEdit, 
    onSave, 
    onCancel, 
    isLoading = false, 
    disabled = false,
    saveLabel = "Reactivate Listing" 
}) => {
    if (editMode) {
        return (
            <div className="flex items-center gap-3 ml-12">
                <button 
                    onClick={onSave}
                    disabled={isLoading || disabled}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 shadow-sm focus:invisible cursor-pointer ${
                        isLoading || disabled
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {saveLabel.replace('Reactivate', 'Reactivating')}...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-4 h-4" />
                            {saveLabel}
                        </>
                    )}
                </button>
                <button 
                    onClick={onCancel}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 cursor-pointer focus:invisible disabled:opacity-50"
                >
                    <X className="w-4 h-4" />
                    Cancel
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 justify-start ml-2">
            <button 
                onClick={onEdit}
                className="flex items-center font-semibold gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm cursor-pointer focus:invisible"
            >
                <RotateCcw strokeWidth={2} className="w-4 h-4" />
                Reactivate Listing
            </button>
        </div>
    );
};  

export default ActionButtons;