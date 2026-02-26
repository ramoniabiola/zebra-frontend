import Skeleton from "react-loading-skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="w-full px-2 md:px-4 lg:px-4 flex flex-col mt-2 md:mt-4 lg:mt-4 mb-4 gap-4">
      
      {/* Overview Header Skeleton */}
      <div className="flex items-center gap-3">
        <Skeleton height={16} width={90} />
        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
        <Skeleton height={20} width={70} borderRadius={999} />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl md:rounded-2xl lg:rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
          >
            {/* Top bar */}
            <div className="h-[3px] w-full bg-stone-200" />

            <div className="px-3 py-2 md:px-5 md:py-4 lg:px-5 lg:py-4">
              
              {/* Icon + Trend */}
              <div className="flex items-start justify-between mb-2">
                <Skeleton height={32} width={36} borderRadius={12} />
                <Skeleton height={14} width={50} borderRadius={999} />
              </div>

              {/* Value */}
              <div className="mb-1">
                <Skeleton height={18} width={50} />
              </div>

              {/* Label */}
              <Skeleton height={10} width={100} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;