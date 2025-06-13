'use client'
import { fetchJobs, getJobsError, getJobsStatus, selectAllJobs } from '@/app/Store/ReduxSlice/jobsSlice';
import { updateProfileField } from '@/app/Store/ReduxSlice/updateProfileSlice';
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice';
import JobCard from '@/components/common/JobCard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Image from 'next/image';

const SavedJobs = () => {
  const dispatch = useDispatch();
  const allJobs = useSelector(selectAllJobs);
  const status = useSelector(getJobsStatus);
  const error = useSelector(getJobsError);
  const { userProfile } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  // Filter to get only saved jobs
  const savedJobs = allJobs?.filter(job => 
    userProfile?.jobs?.some(savedJob => savedJob.documentId === job.documentId)
  ) || [];

  const handleUnsaveJob = async (jobId) => {
    try {
      await dispatch(updateProfileField({
        id: userProfile.documentId,
        fieldName: 'jobs',
        value: {
          disconnect: [jobId]
        }
      })).unwrap();
      
      dispatch(checkUserStatus());
      toast.success('Job removed from saved list');
    } catch (error) {
      console.error('Failed to unsave job:', error);
      toast.error('Failed to unsave job');
    }
  };
 const savedJobIds = new Set(userProfile?.jobs?.map(job => job.documentId) || []);
  return (
    <div className=''>
      <h1 className='font-semibold capitalize md:text-2xl text-3d3'>saved jobs</h1>

      {savedJobs.length > 0 ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
          {savedJobs.map((job) => {
            const isSaved = savedJobIds.has(job.documentId);
            return(
            <JobCard
              key={job.documentId}
              title={job.jobTitle}
              employmentType={job?.employmentType}
              experienceLevel={job?.employmentType}
              preferredWork={job?.preferredWork}
              id={job?.documentId}
              lock={userProfile?.isPremium ? false : job?.isLocked}
              postDate={job?.postDate}
              saved={isSaved}
              handleSaveJob={() => handleUnsaveJob(job.documentId)}
            />
          )})}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center mt-10'>
          <Image
            src="/assets/jobs.gif" // Replace with your empty state image
            alt="No saved jobs"
            width={300}
            height={300}
            className="mb-6"
          />
          <h2 className='text-xl font-semibold text-gray-700'>No saved jobs yet</h2>
          <p className='text-gray-500 mt-2'>Save jobs you're interested in to view them here</p>
        </div>
      )}
    </div>
  )
}

export default SavedJobs