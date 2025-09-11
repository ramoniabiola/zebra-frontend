import { HomeIcon } from '@heroicons/react/24/outline';
import { Search } from 'lucide-react';

const SearchPlaceholder = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-100 to-fuchsia-200 rounded-full flex items-center justify-center shadow-lg">
                    <Search className="w-10 h-10 text-fuchsia-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-violet-100 to-violet-300 rounded-full flex items-center justify-center shadow-md">
                    <HomeIcon className="w-4 h-4 text-violet-700 " />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Ready to Find Your Perfect Home?
            </h2>

            <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                Use the search bar above to discover amazing apartments in your preferred location. 
                Start your journey to finding the ideal place to call home.
            </p>
        </div>
    );
};

export default SearchPlaceholder;