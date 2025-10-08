import { EyeSlashIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

const MyDeactivatedListingsPlaceholder = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-16 px-4 mt-20">
            <div className="relative mb-8">
                <div className="w-18 h-18 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center shadow-lg">
                    <ArchiveBoxIcon className="w-8 h-8 text-gray-700" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-neutral-100 to-neutral-300 rounded-full flex items-center justify-center shadow-md">
                    <EyeSlashIcon className="w-3.5 h-3.5 text-neutral-800" />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-3">
                No Deactivated Listings
            </h2>

            <p className="text-gray-600 text-sm mb-8 max-w-md leading-relaxed">
                Your deactivated listings will appear here. These are listings you've 
                temporarily hidden from public view as it is currently not available for rentage but can be reactivated 
                anytime the apartment is vacant.
            </p>
        </div>
    );
};

export default MyDeactivatedListingsPlaceholder;