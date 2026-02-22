import Skeleton from 'react-loading-skeleton';
import useScreenSize from '../../hooks/screenSize';


const ApartmentInfoSkeleton = () => {
    const { isDesktop, isTablet } = useScreenSize();

    const skeletonImageHeight = isDesktop ? "360px" : isTablet ? "320px" : "280px";

    return (
        <div className="h-full w-full overflow-hidden flex flex-col">

            {/* NAVBAR SKELETON */}
            <div className="w-full h-18 flex items-center justify-between px-2 md:px-4 lg:px-6 bg-white">
                <div className="flex items-center gap-3">
                    <Skeleton  width={24} height={24} borderRadius={8}  />
                    <div className="flex flex-col items-start gap-1 mt-1">
                        <Skeleton width={160} height={16} borderRadius={4} />
                        <Skeleton width={220} height={14}  borderRadius={4} />
                    </div>
                </div>
            </div>

            {/* IMAGE SECTION SKELETON */}
            <div className="w-full">
                <Skeleton width="100%" height={skeletonImageHeight} />
            </div>

            {/* CONTENT SKELETON */}
            <div className="bg-gradient-to-br from-gray-50 to-white w-full px-2 md:px-24 lg:px-32 pt-2 md:pt-3 lg:pt-4">

                {/* Title and Location Card */}
                <div className="bg-white px-4 py-5 lg:px-6 lg:py-6 rounded-2xl border border-stone-200 shadow-md">
                    {/* Badges */}
                    <div className="flex gap-2 mb-3 md:mb-4 lg:mb-5">
                        <Skeleton width={96} height={30} borderRadius={100} />
                        <Skeleton width={94} height={30} borderRadius={100} />
                    </div>
                    {/* Title */}
                    <Skeleton width="75%" height={28} style={{ marginBottom: '16px' }} />
                    {/* Location row */}
                    <div className="flex items-center gap-2 mb-2">
                        <Skeleton width={32} height={32} borderRadius={12} />
                        <Skeleton width={180} height={18} />
                    </div>
                    {/* Address */}
                    <div className="pl-9">
                        <Skeleton width={240} height={16} style={{ marginBottom: '8px' }} />
                        <Skeleton width={180} height={16} />
                    </div>
                </div>

                {/* Property Stats */}
                <div className="min-w-full grid grid-cols-3 gap-3 md:gap-4 lg:gap-4 mt-4 md:mt-5 lg:mt-6 px-2 md:px-4 lg:px-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl border border-stone-200 shadow-md p-4 md:p-5 flex flex-col items-center text-center">
                            <Skeleton width={40} height={40} borderRadius={12} style={{ marginBottom: '10px' }} />
                            <Skeleton width={32} height={26} style={{ marginBottom: '8px' }} />
                            <Skeleton width={72} height={16} />
                        </div>
                    ))}
                </div>

                {/* Rental Price Card */}
                <div className="bg-white rounded-2xl border mt-4 md:mt-5 lg:mt-6 border-stone-200 shadow-md overflow-hidden">
                    {/* Header bar */}
                    <div className="bg-stone-200 py-3 md:py-4 px-5 md:px-6">
                        <Skeleton width={120} height={16} baseColor="#c7c7c7" highlightColor="#d4d4d4" />
                    </div>
                    <div className="px-5 py-4 md:px-6 md:py-5 lg:px-6 lg:py-8">
                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-2 md:mb-3">
                            <Skeleton width={180} height={36} />
                            <Skeleton width={60} height={18} />
                        </div>
                        <Skeleton width={130} height={16} style={{ marginBottom: '16px' }} />
                        {/* Service charge row */}
                        <div className="flex items-center justify-between bg-stone-100 px-4 py-3 rounded-xl border border-stone-200">
                            <Skeleton width={130} height={18} />
                            <Skeleton width={90} height={22} />
                        </div>
                    </div>
                </div>

                {/* Amenities Card */}
                <div className="bg-white rounded-2xl border mt-4 md:mt-5 lg:mt-6 border-stone-200 shadow-md overflow-hidden">
                    <div className="px-5 py-4 md:py-5 md:px-6 border-b border-stone-200 flex items-center justify-between">
                        <Skeleton width={180} height={20} />
                        <Skeleton width={56} height={26} borderRadius={100} />
                    </div>
                    <div className="p-4 md:p-5 grid grid-cols-2 md:grid-cols-3 gap-2.5">
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 p-4 rounded-xl bg-stone-100/60 border border-stone-200">
                                <Skeleton width={40} height={40} borderRadius={12} className="flex-shrink-0" />
                                <Skeleton width={80} height={16} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Information Card */}
                <div className="bg-white rounded-2xl border mt-4 md:mt-5 lg:mt-6 mb-8 border-stone-200 shadow-md overflow-hidden">
                    <div className="px-5 py-4 md:py-5 md:px-6 border-b border-stone-200">
                        <Skeleton width={180} height={20} />
                    </div>
                    <div className="p-4 md:p-5 lg:p-5 space-y-4">
                        {/* Agent card */}
                        <div className="flex items-center gap-4 p-4 bg-stone-100/60 rounded-xl border border-stone-200">
                            <Skeleton circle width={48} height={48} className="flex-shrink-0" />
                            <div>
                                <Skeleton width={140} height={20} style={{ marginBottom: '6px' }} />
                                <Skeleton width={110} height={16} />
                            </div>
                        </div>
                        {/* Phone card */}
                        <div className="flex items-center gap-3 p-4 bg-stone-100/60 rounded-xl border border-stone-200">
                            <Skeleton circle width={48} height={48} className="flex-shrink-0" />
                            <div className="flex-1">
                                <Skeleton width={150} height={20} style={{ marginBottom: '6px' }} />
                                <Skeleton width={110} height={16} />
                            </div>
                            <Skeleton width={80} height={36} borderRadius={12} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ApartmentInfoSkeleton;