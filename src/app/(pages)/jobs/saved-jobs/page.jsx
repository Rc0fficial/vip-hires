import JobCard from '@/components/common/JobCard'
import React from 'react'

const SavedJobs = () => {
  return (
    <div className=''>
            <h1 className='font-semibold capitalize text-2xl text-3d3'>saved jobs</h1>

           
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
                {Array(8).fill(null).map((_, index) => (
                  
                    <JobCard key={index} saved={true} />
                  ))}
                 
            </div>

        </div>
  )
}

export default SavedJobs
