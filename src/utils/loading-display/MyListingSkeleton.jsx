import Skeleton from 'react-loading-skeleton';

const MyListingSkeleton = () => {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col">
        {/* NAVBAR SKELETON */}
        <div className="w-full h-18 flex flex-col pl-8 items-start justify-center bg-white">
            <Skeleton width={160} height={20} style={{ marginBottom: '4px' }} />
            <Skeleton width={224} height={16} />
        </div>

        {/* IMAGE SECTION SKELETON */}
        <div className="w-full h-[280px] md:h-[320px] lg:h-[360px]">
            <Skeleton width="100%" height={280} />
        </div>

        {/* ACTION BUTTONS SKELETON */}
        <div className="flex items-center gap-3 mb-4 mt-4 md:-mt-4 lg:-mt-12 justify-start ml-2 md:ml-4 lg:ml-6">
            <Skeleton width={180} height={40} />
        </div>

        {/* CONTENT SKELETON */}
        <div className="min-w-full grid grid-cols-1 gap-6">
        
            {/* Main Info Section */}
            <div className="lg:col-span-2 space-y-6">
                {/* Property Information */}
                <div className="bg-white px-3 md:px-4 lg:px-5 py-8">
                    <div className="text-center mb-8">
                        <Skeleton width={200} height={28} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {/* Property Title - Full Width */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-lg p-4 border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <Skeleton width={48} height={48} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Skeleton width={120} height={16} style={{ marginBottom: '8px' }} />
                                        <Skeleton width="80%" height={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Type and Location */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={60} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="70%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={80} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="90%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Full Address - Full Width */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-lg p-4 border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <Skeleton width={48} height={48} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Skeleton width={100} height={16} style={{ marginBottom: '8px' }} />
                                        <Skeleton width="95%" height={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Nearest Landmark and Size */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={140} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="75%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={40} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="60%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Bedrooms and Bathrooms */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={80} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="40%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={90} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="40%" height={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* Amenities Section */}
                <div className="bg-white px-3 md:px-4 lg:px-5 py-8">
                    <div className="text-center mb-8">
                        <Skeleton width={250} height={28} />
                    </div>
                    <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {/* Furnished Status */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={130} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="70%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Available Amenities */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={150} height={16} style={{ marginBottom: '16px' }} />
                                    <div className="flex flex-wrap gap-2">
                                        <Skeleton width={80} height={36} />
                                        <Skeleton width={100} height={36} />
                                        <Skeleton width={90} height={36} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
                {/* Pricing Section */}
                <div className="bg-white px-3 md:px-4 lg:px-5 py-8">
                    <div className="text-center mb-8">
                        <Skeleton width={100} height={28} />
                    </div>
                    <div className="space-y-6">
                        {/* Rent Price */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={80} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="80%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Payment Frequency */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={140} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="70%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Rent Duration */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={110} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="60%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Service Charge */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={120} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="75%" height={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* Contact Section */}
                <div className="bg-white px-3 md:px-4 lg:px-5 py-8">
                    <div className="text-center mb-8">
                        <Skeleton width={100} height={28} />
                    </div>
                    <div className='space-y-6'>
                        {/* Contact Name */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={110} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="70%" height={24} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Phone Number */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <Skeleton width={48} height={48} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Skeleton width={110} height={16} style={{ marginBottom: '8px' }} />
                                    <Skeleton width="80%" height={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default MyListingSkeleton;