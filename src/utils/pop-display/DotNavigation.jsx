


const DotNavigation = ({ apartment, totalImages, currentImg, setCurrentImg }) => {
    return (
        <div className="absolute bottom-3.5 left-1/2 transform -translate-x-1/2 flex gap-1.5 max-w-[120px] overflow-hidden">
            {(() => {
                const maxVisibleDots = 5;

                // If total images <= 5, show all dots
                if (totalImages <= maxVisibleDots) {
                    return apartment.uploadedImages.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                              index === currentImg
                                ? "bg-white scale-110"
                                : "bg-white opacity-50 hover:opacity-75"
                            }`}
                            onClick={() => setCurrentImg(index)}
                        ></div>
                    ));
                }

                // For more than 5 images, implement scrolling logic
                let startIndex = 0;

                if (currentImg >= 2 && currentImg < totalImages - 2) {
                    // Current image is in the middle, center it
                    startIndex = currentImg - 2;
                } else if (currentImg >= totalImages - 2) {
                    // Near the end, show last 5 dots
                    startIndex = totalImages - maxVisibleDots;
                }
                // For currentImg < 2, startIndex stays 0 (show first 5)

                const endIndex = Math.min(startIndex + maxVisibleDots, totalImages);
                const visibleDots = apartment.uploadedImages.slice(startIndex, endIndex);

                return (
                    <div className="flex gap-1.5 transition-transform duration-300 ease-in-out">
                        {/* Show indicator for hidden dots on the left */}
                        {startIndex > 0 && (
                            <div className="flex items-center">
                                <div className="w-1 h-1 rounded-full bg-white opacity-30"></div>
                            </div>
                        )}

                        {visibleDots.map((_, index) => {
                            const realIndex = startIndex + index;
                        
                            return (
                                <div
                                    key={realIndex}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                        realIndex === currentImg
                                          ? "bg-white scale-110 shadow-lg"
                                          : "bg-white opacity-50 hover:opacity-75 hover:scale-105"
                                    }`}
                                    onClick={() => setCurrentImg(realIndex)}
                                ></div>
                            );
                        })}

                        {/* Show indicator for hidden dots on the right */}
                        {endIndex < totalImages && (
                            <div className="flex items-center">
                                <div className="w-1 h-1 rounded-full bg-white opacity-30"></div>
                            </div>
                        )}
                    </div>
                );
            })()}
        </div>
    )
}

export default DotNavigation