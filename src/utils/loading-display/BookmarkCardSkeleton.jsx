import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BookmarkCardSkeleton = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-14 md:gap-4 lg:gap-4 px-0 w-full">
      {Array(cards).fill(0).map((_, i) => (
        <div
          key={i}
          className="w-full md:w-11/12 lg:w-11/12 flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm mb-6"
        >
          {/* ── IMAGE BLOCK ── */}
          <div className="p-2 pb-0">
            <div className="w-full h-[260px] rounded-2xl overflow-hidden">
              <Skeleton height={260} borderRadius={16} />
            </div>
          </div>
          {/* ── INFO BLOCK ── */}
          <div className="flex flex-col gap-1 p-4">
            {/* Title + location */}
            <div className="flex flex-col gap-2">
              <Skeleton width="65%" height={20} borderRadius={6} />
              <Skeleton width="45%" height={18} borderRadius={6} />   
            </div>
            {/* Time row */}
            <div className="flex items-center justify-end gap-1">
              <Skeleton width={60} height={14} borderRadius={5} />
            </div>
            {/* Price + View button row */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">  
              <Skeleton width={130} height={24} borderRadius={6} />
              <Skeleton width={80} height={32} borderRadius={999} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkCardSkeleton;