import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ApartmentDetailsSkeleton2 = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 pl-0 pr-6 lg:pl-0 lg:pr-10 w-full mt-4 mb-8">
            {Array(cards).fill(0).map((_, i) => (
                <div 
                    key={i} 
                    className='w-full h-auto flex flex-col items-center justify-start relative'
                >
                    {/* Skeleton Container with fade effect */}
                    <div className="relative w-full h-[310px] rounded-xl overflow-hidden">
                        <Skeleton height={300} borderRadius={12} />

                        {/* Fade overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-2/4 pointer-events-none bg-gradient-to-t from-white to-transparent"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApartmentDetailsSkeleton2;