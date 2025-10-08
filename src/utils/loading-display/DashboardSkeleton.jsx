import Skeleton from 'react-loading-skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 mt-2 gap-4 mb-12 px-2">
      {/* Skeleton for each card */}
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg shadow bg-stone-100 animate-pulse">
          <div className="flex flex-col gap-3">
            {/* Number skeleton */}
            <div className="text-xl font-bold font-sans">
              <Skeleton height={28} width={30} borderRadius={6} />
            </div>
            {/* Label skeleton */}
            <div className="">
              <Skeleton height={12} width={85} borderRadius={3} />
            </div>
          </div>
          <div className="items-center mb-4">
            {/* Icon skeleton */}
            <Skeleton height={35} width={35} borderRadius={6} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSkeleton;