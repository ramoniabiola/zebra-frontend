import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';

const MyListingsPlaceholder = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-16 px-4 mt-20">
            <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center shadow-lg">
                    <HomeIcon className="w-10 h-10 text-slate-700" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center shadow-md">
                    <PlusIcon className="w-4 h-4 text-neutral-800" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                No Listings Yet
            </h2>

            <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                Ready to share your space? Create your first apartment listing 
                and start connecting with potential tenants today!
            </p>
        </div>
    );
};

export default MyListingsPlaceholder;