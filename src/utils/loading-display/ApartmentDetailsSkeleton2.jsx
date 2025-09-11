import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ApartmentDetailsSkeleton2 = ({ cards }) => {
    return (
        Array(cards).fill(0).map((_, i) =>
            <div 
                key={i} 
                className='w-11/12 h-auto flex flex-col items-center justify-start mb-8 relative mt-4'
            >
                {/* Skeleton Container with fade effect */}
                <div className="relative w-full h-[310px] rounded-xl overflow-hidden">
                    <Skeleton height={300} borderRadius={12} />

                    {/* Fade overlay */}
                    <div className="absolute bottom-0 left-0 w-full h-2/4 pointer-events-none bg-gradient-to-t from-white to-transparent"></div>
                </div>
            </div>
        )
    );
};

export default ApartmentDetailsSkeleton2;
