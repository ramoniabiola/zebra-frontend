import Skeleton from 'react-loading-skeleton';

const ApartmentDetailsSkeleton = ({ cards }) => {
  return (
    Array(cards).fill(0).map((_, i) =>
      <div key={i} className='w-11/12 h-auto flex flex-col items-center justify-start mb-8 relative mt-12'>
        <div className='w-full h-[310px] rounded-xl'>
          <Skeleton height={300} borderRadius={12} />
        </div>
        <div className='w-full mt-2 gap-1 flex flex-col text-left'>
          <Skeleton width={260} count={2} borderRadius={4}  />
          <Skeleton  width={150}  borderRadius={4}/>
        </div>
      </div>
    )
  );
};

export default ApartmentDetailsSkeleton;