import { MagnifyingGlassIcon, HomeIcon } from '@heroicons/react/24/outline';

const SearchPlaceholder = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center shadow-lg">
                    <MagnifyingGlassIcon className="w-10 h-10 text-cyan-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-300 rounded-full flex items-center justify-center shadow-md">
                    <HomeIcon className="w-4 h-4 text-blue-800" />
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