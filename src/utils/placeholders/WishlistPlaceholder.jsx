import { HomeIcon } from '@heroicons/react/24/outline';
import { Heart } from 'lucide-react';

const WishlistPlaceholder = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-10 h-10 text-rose-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-pink-100 to-pink-300 rounded-full flex items-center justify-center shadow-md">
                    <HomeIcon className="w-4 h-4 text-pink-700" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Your Wishlist is Empty
            </h2>

            <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                Start exploring apartments and save your favorites here. 
                Your dream home is just a heart click away!
            </p>
        </div>
    );
};

export default WishlistPlaceholder;