import Skeleton from 'react-loading-skeleton';
import useScreenSize from '../../hooks/screenSize';


const ApartmentInfoSkeleton = () => {
    const { isDesktop, isTablet } = useScreenSize();

    const skeletonImageHeight = isDesktop ? "360px" : isTablet ? "320px" : "280px";

    return (
        <div className="h-full w-full overflow-hidden flex flex-col">
            {/* NAVBAR SKELETON */}
            <div className="w-full h-18 flex items-center justify-between px-4 md:px-6 lg:px-6 bg-white">
                <div className="flex items-center gap-4 md:gap-5 lg:gap-5">
                    <Skeleton width={24} height={24} borderRadius={8} />

                    <div className='flex flex-col items-start mt-1'>
                        <Skeleton width={160} height={18} style={{ marginBottom: '4px' }} />
                        <Skeleton width={224} height={14} />
                    </div>
                </div>
            </div>

            {/* IMAGE SECTION SKELETON */}
            <div className="w-full">
                <Skeleton
                    width="100%" 
                    height={skeletonImageHeight} 
                />
            </div>

            {/* CONTENT SKELETON */}
            <div className="bg-gradient-to-br from-gray-50 to-white w-full px-2 md:px-3 lg:px-4 mt-4">
                {/* Title Section */}
                <div className="bg-white px-4 py-4 lg:px-6 lg:py-6 rounded-2xl border border-gray-100">
                    <div className="flex gap-3 mb-4">
                        <Skeleton width={96} height={30} borderRadius={8} />
                        <Skeleton width={94} height={30} borderRadius={8} />
                    </div>
                    <Skeleton width={320} height={22} style={{ marginBottom: '8px' }} />
                    <Skeleton width={192} height={16} style={{ marginBottom: '4px' }} />
                    <Skeleton width={256} height={14} />
                </div>

                {/* Property Stats */}
                <div className="min-w-full grid grid-cols-3 gap-2 mt-4 px-2 md:px-4 lg:px-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-2xl text-center">
                            <div className="flex justify-center mb-2">
                                <Skeleton width={32} height={32} />
                            </div>
                            <div className="flex justify-center mb-1">
                                <Skeleton width={32} height={24} />
                            </div>
                            <div className="flex justify-center">
                                <Skeleton width={64} height={16} />
                            </div>
                        </div>
                    ))}
                </div> 

                {/* Price Section */}
                <div className="bg-white px-4 py-4 mt-4 md:mt-5 lg:mt-6 lg:px-6 lg:py-6 rounded-2xl border border-gray-100">
                    <Skeleton width={128} height={16} style={{ marginBottom: '8px' }} />
                    <Skeleton width={160} height={24} style={{ marginBottom: '16px' }} />
                    <div className="">
                        <Skeleton width="100%" height={30} borderRadius={8} />
                    </div>
                </div>

                {/* Amenities */}
                <div className="bg-white px-4 py-4 lg:py-6 mt-4 md:mt-5 lg:mt-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-center mb-6">
                      <Skeleton width={192} height={20} />
                    </div>
                    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="flex items-center gap-3 py-4 px-2 bg-gray-50 rounded-2xl">
                                <Skeleton circle width={40} height={40} />
                                <Skeleton width={80} height={16} />
                            </div>
                        ))}
                    </div>  
              </div>

              {/* Contact Info */}
                <div className="bg-white px-4 py-4 mt-4 md:mt-5 lg:mt-6 lg:px-6 lg:py-6 rounded-2xl border border-gray-100 mb-8">
                    <div className="flex justify-center mb-6">
                      <Skeleton width={128} height={20} />
                    </div>
                    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
                        <div className="flex items-center gap-4 py-4 px-4 bg-gray-50 rounded-2xl">
                          <Skeleton circle width={48} height={48} />
                            <div>
                                <Skeleton width={128} height={20} style={{ marginBottom: '4px' }} />
                                <Skeleton width={112} height={16} />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 py-4 px-4 bg-gray-50 rounded-2xl">
                          <Skeleton circle width={48} height={48} />
                            <div>
                                <Skeleton width={144} height={20} style={{ marginBottom: '4px' }} />
                                <Skeleton width={96} height={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default ApartmentInfoSkeleton;