const AdvertCards = () => {
    return (
        <div className="bg-white border-l h-screen border-gray-200 px-4">
            <div className="flex flex-col gap-4 pt-8">
                {/* Ad Card 1 */}
                <div className="w-full h-72 border border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                    <span className="text-gray-400 text-lg font-medium">Ad</span>
                </div>

                {/* Ad Card 2 */}
                <div className="w-full h-72 border border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                    <span className="text-gray-400 text-lg font-medium">Ad</span>
                </div> 
            </div>
        </div>
    );
};

export default AdvertCards;