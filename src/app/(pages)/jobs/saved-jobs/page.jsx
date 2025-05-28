'use client'
import { fetchJobs, getJobsError, getJobsStatus, selectAllJobs } from '@/app/Store/ReduxSlice/jobsSlice';
import JobCard from '@/components/common/JobCard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const SavedJobs = () => {
  const dispatch = useDispatch();
      const jobs = useSelector(selectAllJobs);
      const status = useSelector(getJobsStatus);
      const error = useSelector(getJobsError);
    const { user, isAuthenticated, userProfile } = useSelector((state) => state.auth);
      useEffect(() => {
          if (status === 'idle') {
              dispatch(fetchJobs());
          }
      }, [status, dispatch]);
  return (
    <div className=''>
            <h1 className='font-semibold capitalize md:text-2xl text-3d3'>saved jobs</h1>

           
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
                {Array(8).fill(null).map((_, index) => (
                  
                    <JobCard key={index} saved={true} />
                  ))}
                 
            </div>

        </div>
  )
}

export default SavedJobs
