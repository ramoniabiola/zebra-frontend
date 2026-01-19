import Skeleton from 'react-loading-skeleton';

const ApartmentDetailsSkeleton = ({ cards }) => {
  return (
    <div className="mt-[2.5rem] lg:mt-[3rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20 lg:gap-24 pl-0 pr-6 lg:pl-0 lg:pr-10 w-full">
      {Array(cards).fill(0).map((_, i) => (
        <div key={i} className='w-full h-auto flex flex-col items-center justify-start relative'>
          <div className='w-full h-[310px] rounded-xl'>
            <Skeleton height={300} borderRadius={12} />
          </div>
          <div className='w-full mt-2 gap-1 flex flex-col text-left'>
            <Skeleton width="80%" count={2} borderRadius={4} />
            <Skeleton width="50%" borderRadius={4} />
          </div>
          <div className="w-full flex items-center justify-between mt-2 pt-4 px-1.5 lg:px-2 border-t border-gray-100">
            <Skeleton width={100} borderRadius={4} />
            <Skeleton width={60} borderRadius={4} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApartmentDetailsSkeleton;