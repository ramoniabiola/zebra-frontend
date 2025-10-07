import { HomeIcon } from '@heroicons/react/24/outline';
import { Heart } from 'lucide-react';

const WishlistPlaceholder = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-18 h-18 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-8 h-8 text-rose-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-pink-100 to-pink-300 rounded-full flex items-center justify-center shadow-md">
                    <HomeIcon className="w-3.5 h-3.5 text-pink-700" />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-3">
                Your Wishlist is Empty
            </h2>

            <p className="text-gray-600 text-sm mb-8 max-w-md leading-relaxed">
                Start exploring apartments and save your favorites here. 
                Your dream home is just a heart click away!
            </p>
        </div>
    );
};

export default WishlistPlaceholder;