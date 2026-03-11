import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ApartmentDetailsSkeleton2 = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-14 md:gap-10 lg:gap-14 md:pl-0 md:pr-6 lg:pl-0 lg:pr-10 w-full mt-4 mb-8">
            {Array(cards).fill(0).map((_, i) => (
                <div 
                    key={i} 
                    className='w-full h-auto flex flex-col items-center justify-start relative'
                >
                    {/* Skeleton Container with fade effect */}
                    <div className="relative w-full flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-50">
                        {/* ── IMAGE BLOCK with padding (matches p-2 pb-0) ── */}
                        <div className="p-2 pb-0">
                            <div className="w-full h-[260px] rounded-xl overflow-hidden">
                                <Skeleton height={260} borderRadius={16} />
                            </div>
                        </div>

                        {/* Fade overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-3/4 pointer-events-none bg-gradient-to-t from-white to-transparent"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApartmentDetailsSkeleton2;