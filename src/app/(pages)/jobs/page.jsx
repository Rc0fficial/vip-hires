import JobCard from '@/components/common/JobCard'
import React from 'react'

const JobsPage = () => {
    return (
        <div className=''>
            <h1 className='font-semibold capitalize text-2xl text-3d3'>recommended jobs</h1>

            <div className='rounded-3xl bg-gradient-to-tr flex  items-center from-[rgb(3,98,71)] to-[#06C891]  px-6 mt-8 relative'>
                <img src="/assets/recommend.svg" alt="recommend" />
                <div>
                    <h1 className='text-xl  font-bold text-white'>Climb Higher in Your Career </h1>
                    <p className=' leading-[30px] text-white mr-3'>Others Are Getting Hired – Don’t Get Left Behind! Upgrade Now for Exclusive Job Matches and more opportunity </p>
                </div>
                <button className='px-6 py-2.5 rounded-md bgpwhite text-lg font-semibold bg-white text-nowrap'>Subscribe Now</button>
                <img src="/assets/cloud1.svg" alt="profile" className='absolute right-1/3 top-4' />
        <img src="/assets/cloud1.svg" alt="profile" className='absolute  right-4 top-4' />
        <img src="/assets/cloud2.svg" alt="profile" className='absolute  right-1/5 bottom-0' />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
                {Array(8).fill(null).map((_, index) => (
                    <JobCard key={index} />
                ))}
            </div>

        </div>
    )
}

export default JobsPage
