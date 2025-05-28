'use client'
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice'
import { fetchJobs, getJobsError, getJobsStatus, selectAllJobs } from '@/app/Store/ReduxSlice/jobsSlice'
import { updateProfileField } from '@/app/Store/ReduxSlice/updateProfileSlice'
import JobCard from '@/components/common/JobCard'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const JobsPage = () => {
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

    
const handleSaveJob = async (job) => {
  try {
    // First check if the job is already saved to prevent duplicates
    const isAlreadySaved = userProfile?.savedJobs?.some(
      savedJob => savedJob.documentId === job.documentId
    );

    if (isAlreadySaved) {
      // Optionally show a message that job is already saved
      return;
    }

    // Prepare the update payload in the required format
    const updatePayload= {
      
        
          connect: [
            ...(userProfile?.savedJobs?.map(job => job.documentId) || []), // Existing IDs
            job.documentId // New ID to add
          ]
  
     
    };

    await dispatch(updateProfileField({
      id: userProfile.documentId,
      fieldName: 'jobs', // Make sure this matches your Strapi model
      value: updatePayload
    })).unwrap();

    // Refresh the jobs list and user profile
    dispatch(fetchJobs());
    dispatch(checkUserStatus());
    
    // Optionally show success notification
  } catch (error) {
    console.error('Failed to save job:', error);
    // Optionally show error notification to user
  }
};

    return (
        <div className=''>
            <h1 className='font-semibold capitalize md:text-2xl text-3d3'>recommended jobs</h1>

            <div className='rounded-3xl bg-gradient-to-tr flex  items-center  from-[rgb(3,98,71)] to-[#06C891]  px-6 mt-8 relative'>
                <Image
                    src="/assets/recommend.svg"
                    alt="recommend"
                    width={250}
                    height={190}
                    className="w-[250px] h-[190px]"
                />
                <div>
                    <h1 className='text-xl  font-bold text-white'>Climb Higher in Your Career </h1>
                    <p className=' leading-[30px] text-white mr-3'>Others Are Getting Hired – Don’t Get Left Behind! Upgrade Now for Exclusive Job Matches and more opportunity </p>
                </div>
                <button className='px-6 py-2.5 rounded-md bgpwhite text-lg font-semibold bg-white text-nowrap'>Subscribe Now</button>
                <Image
                    src="/assets/cloud1.svg"
                    alt="profile"
                    width={38}
                    height={18}
                    className="absolute right-1/3 top-4 w-[38px] h-[18px]"
                />


                <Image
                    src="/assets/cloud1.svg"
                    alt="profile"
                    width={38}
                    height={18}
                    className="absolute right-4 top-4 w-[38px] h-[18px]"
                />


                <Image
                    src="/assets/cloud2.svg"
                    alt="profile"
                    width={24}
                    height={16}
                    className="absolute right-1/5 bottom-0 w-[24px] h-[16px]"
                />
            </div>
            {jobs?.length > 0 ?
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
                    {jobs?.map((job, index) => (
                        <JobCard
                            key={index}

                            title={job.jobTitle}
                            employmentType={job?.employmentType}
                            experienceLevel={job?.employmentType}
                            preferredWork={job?.preferredWork}
                            id={job?.documentId}
                            lock={job?.isLocked}
                            postDate={job?.postDate}
                            handleSaveJob ={()=>handleSaveJob(job)}
                        />
                    ))}
                    {/* <JobCard lock={true} text={"Subscribe now to unlock 10 more jobs"} /> */}
                </div>
                :
                <>
                    <img src="/assets/jobs.gif" alt="" className='h-full w-full max-w-[512px] mah-h-[512px] mx-auto ' />

                    <h1 className='text-center ant md:text-[32px] text-green'>Your Next Big Opportunity is Loading...</h1>
                    <p className='text-gray mt-2 text-xs md:text-[16px] text-center max-w-[640px] mx-auto'>We're analyzing your qualifications to find the best job matches for you. Please hold tight – opportunities that fit your skills are on the way</p>
                </>
            }
        </div>
    )
}

export default JobsPage
