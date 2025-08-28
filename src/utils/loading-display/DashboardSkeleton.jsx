import Skeleton from 'react-loading-skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {/* Skeleton for each card */}
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col items-center justify-center py-3 px-4">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-stone-200 shadow-lg">
              <Skeleton width={22} height={22} borderRadius="0.50rem" />
            </div>
          </div>
          <div className="">
            <div className="flex justify-center">
              <Skeleton height={12} width={80} />
            </div>
            <div className="flex justify-center"> 
              <Skeleton height={20} width={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSkeleton;