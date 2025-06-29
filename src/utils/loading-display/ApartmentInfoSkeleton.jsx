import Skeleton from 'react-loading-skeleton';


const ApartmentInfoSkeleton = () => {
    return (
        <div className="h-full w-full overflow-hidden flex flex-col">
            {/* NAVBAR SKELETON */}
            <div className="w-full h-20 flex flex-col pl-8 items-start justify-center bg-white">
                <Skeleton width={160} height={20} style={{ marginBottom: '4px' }} />
                <Skeleton width={224} height={16} />
            </div>

            {/* IMAGE SECTION SKELETON */}
            <div className="w-full h-[280px] mb-4">
                <Skeleton width="100%" height={280} />
            </div>

            {/* CONTENT SKELETON */}
            <div className="bg-white w-full flex flex-col ml-4 gap-4 mb-8">
                {/* Title Section */}
                <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                        <Skeleton width={96} height={32} borderRadius={8} />
                        <Skeleton width={94} height={32} borderRadius={8} />
                    </div>
                    <Skeleton width={320} height={24} style={{ marginBottom: '8px' }} />
                    <Skeleton width={192} height={18} style={{ marginBottom: '4px' }} />
                    <Skeleton width={256} height={16} />
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-3 gap-1.5 mb-4 mr-7">
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
                <div className="mb-8">
                    <Skeleton width={128} height={20} style={{ marginBottom: '8px' }} />
                    <Skeleton width={160} height={28} style={{ marginBottom: '16px' }} />
                    <div className="mr-7">
                        <Skeleton width="100%" height={36} borderRadius={8} />
                    </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                    <div className="flex justify-center mr-8 mb-6">
                      <Skeleton width={192} height={24} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mr-7">
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="flex items-center gap-3 py-4 px-2 bg-gray-50 rounded-2xl">
                                <Skeleton circle width={40} height={40} />
                                <Skeleton width={80} height={16} />
                            </div>
                        ))}
                    </div>  
              </div>

              {/* Contact Info */}
                <div className="mb-8 mr-6">
                    <div className="flex justify-center mb-6">
                      <Skeleton width={128} height={24} />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 py-4 pl-4 pr-24 bg-gray-50 rounded-2xl">
                          <Skeleton circle width={48} height={48} />
                            <div>
                                <Skeleton width={128} height={20} style={{ marginBottom: '4px' }} />
                                <Skeleton width={112} height={16} />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 py-4 pl-4 pr-24 bg-gray-50 rounded-2xl">
                          <Skeleton circle width={48} height={48} />
                            <div>
                                <Skeleton width={144} height={20} style={{ marginBottom: '4px' }} />
                                <Skeleton width={96} height={16} />
                            </div>
                        </div>
                    </div>
                </div>

              {/* Report Button */}
                <div className="pt-6 mr-6">
                    <Skeleton width="100%" height={48} borderRadius={8} />
                </div>
            </div> 
        </div>
    );
};

export default ApartmentInfoSkeleton;