const NoteSkeleton = () => (
  <div className='space-y-4 w-full'>
    {[...Array(6)].map((_, index) => (
      <div key={index} className='bg-secondary rounded-xl p-4 animate-pulse border border-tertiary'>
        <div className='h-6 bg-primary rounded-lg w-3/4 mb-3'></div>
        <div className='h-4 bg-primary rounded-lg w-full mb-2'></div>
        <div className='h-3 bg-primary rounded-lg w-1/2'></div>
      </div>
    ))}
  </div>
);

export default NoteSkeleton;
