import React from 'react';

function SectionSkeleton({ count = 6 }) {
  return (
    <div className='grid md:grid-cols-3 grid-cols-1 gap-6 mb-5'>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='animate-pulse rounded-xl border border-blue-100 bg-white p-4 shadow-sm'
        >
          <div className='h-36 w-full rounded-lg bg-blue-100/70' />
          <div className='mt-4 h-4 w-3/4 rounded bg-blue-100/70' />
          <div className='mt-2 h-3 w-1/2 rounded bg-blue-100/70' />
          <div className='mt-4 flex items-center justify-between'>
            <div className='h-8 w-20 rounded bg-blue-100/70' />
            <div className='h-8 w-8 rounded-full bg-blue-100/70' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SectionSkeleton;
