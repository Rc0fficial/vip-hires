'use client'
import {Suspense, useEffect} from'react'
import HeartIcon from '@/components/Icons/HeartIcon.svg'
import LinkIcon from '@/components/Icons/LinkIcon.svg'
import UrlIcon from '@/components/Icons/UrlIcon.svg'
import React from 'react'
import JobDetail from './JobDetail'
import LocationIcon from '@/components/Icons/LocationIcon.svg'
import JobLocationIcon from '@/components/Icons/JobLocationIcon.svg'
import EmploymentTypeIcon from '@/components/Icons/EmploymentTypeIcon.svg'
import ExpierenceLvlIcon from '@/components/Icons/ExpierenceLvlIcon.svg'
import SalaryIcon from '@/components/Icons/SalaryIcon.svg'
import TimeIcon from '@/components/Icons/TimeIcon.svg'
import Notify from '@/components/common/Notify'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentJob, fetchJobById, getJobsError, getSingleJobStatus, selectCurrentJob } from '@/app/Store/ReduxSlice/jobsSlice'

const JobDetailPage = () => {
     const { jobId } = useParams();
  const dispatch = useDispatch();
  const job = useSelector(selectCurrentJob);
  const status = useSelector(getSingleJobStatus);
  const error = useSelector(getJobsError);

  useEffect(() => {
    dispatch(fetchJobById(jobId));
    
    return () => {
      dispatch(clearCurrentJob());
    };
  }, [jobId, dispatch]);
  console.log(job)

    return (
        <Suspense fallback={"Loading..."}>

       
        <div className="bg-bggreen">
            <div className="bg-bggreen overflow-y-auto px-4  md:px-16  mx-auto ">
                <div className="w-full mx-auto grid grid-cols-1 gap-0 md:gap-10 py-10 lg:grid-cols-3">
                    <div className="col-span-1 full flex flex-col justify-between ">
                        <div className='h-fit bg-white p-4 md:p-10 rounded-3xl shad'>

                            <div className='flex justify-between pb-4 border-b border-dcd mb-4'>

                                <h1 className='capitalize md:text-2xl text-3d3 group-hover:text-white font-medium leading-[20px] '>{job?.jobTitle}</h1>
                                <HeartIcon className="fill-989 " height={32} width={32} />

                            </div>
                            <div className="space-y-5 text-gray-700 text-xs md:text-[16px]">
                                <p className='text-525 capitalize flex items-center gap-2'>
                                    <LocationIcon className="fill-989 " height={24} width={24} />
                                    <span className=" text-989">Location :</span> {job?.location}
                                </p>
                                <p className='text-525 capitalize flex items-center gap-2 text-xs md:text-[16px]'>
                                    <JobLocationIcon className="fill-989 " height={24} width={24} />
                                    <span className=" text-989">job location :</span>  {job?.preferredWork?.join(', ') || 'Not specified'}
                                </p>
                                <p className='text-525 capitalize flex items-center gap-2 text-xs md:text-[16px]'>
                                    <EmploymentTypeIcon className="fill-989 " height={24} width={24} />
                                    <span className=" text-989">employment type :</span> {job?.employmentType?.join(', ') || 'Not specified'}
                                </p>
                                <p className='text-525 capitalize flex items-center gap-2 text-xs md:text-[16px]'>
                                    <ExpierenceLvlIcon className="fill-989 " height={24} width={24} />
                                    <span className=" text-989 capitalize">experience level :</span>  {job?.experienceLevel?.join(', ') || 'Not specified'}
                                </p>
                                <p className='text-525 capitalize flex items-center gap-2 text-xs md:text-[16px]'>
                                    <SalaryIcon className="fill-989 " height={24} width={24} />
                                    <span className=" text-989">salary :</span> {job?.salary}
                                </p>
                                <p className='text-525 capitalize flex items-center gap-2 text-xs md:text-[16px]'>
                                    <TimeIcon className="fill-989 " height={24} width={24} />
                                    <span className=" text-989">post date :</span> {job?.postDate}
                                </p>

                            </div>
                            <div className='flex items-center gap-4 mt-8'>
                                <button className='py-2.5 capitalize rounded-md md:text-lg text-white group-hover:text-green group-hover:bg-white font-semibold bg-green px-6 flex-1'>apply on my behalf</button>
                                <button className='h-12 w-12 rounded-md capitalize md:text-lg group-hover:border-white font-semibold border border-green   flex  justify-center items-center'><UrlIcon className="group-hover:stroke-white group-hover:fill-green fill-white  stroke-green" color={"#009969"} height={24} width={24} /></button>

                            </div>

                            <button className='border border-ff6 text-ff6 cap mt-5 py-2.5 px-6 text-center w-full rounded-md' >Not Interested</button>
                        </div>
                        <Notify className={"-mb-10"}/>
                    </div>
                    <div className="col-span-2 mt-6 md:mt-0">
                        <JobDetail job={job} />
                    </div>
                </div>
            </div>
        </div>
        </Suspense>
    )
}

export default JobDetailPage
