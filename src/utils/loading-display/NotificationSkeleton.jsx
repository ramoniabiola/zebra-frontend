import Skeleton from 'react-loading-skeleton';

const NotificationSkeleton = ({ cards = 1 }) => {
  return (
    <div className='w-full px-4  flex flex-col items-start justify-center gap-2 mt-8 mb-8'>
      {Array(cards).fill(0).map((_, i) => (
        <div
          key={i}
          className="w-full px-4 py-2  rounded-xl border border-gray-100 bg-gray-50"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {/* Title skeleton */}
              <div className="mb-1">
                <Skeleton width={120} height={14} borderRadius={3} />
              </div>
              
              {/* Message skeleton */}
              <div className="leading-4 mb-1">
                <Skeleton count={1} height={12} borderRadius={3} />
                <Skeleton width="60%" height={12} borderRadius={3}  />
              </div>
              
              {/* Timestamp skeleton */}
              <div>
                <Skeleton width={60} height={10} borderRadius={3} />
              </div>
            </div>
            
            {/* Unread indicator skeleton */}
            <div className="ml-4 flex-shrink-0">
              <Skeleton circle width={10} height={10} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;