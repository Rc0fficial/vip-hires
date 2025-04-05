'use client'
import React from 'react'
import AppliedJobGraph from './AppliedJobsGraph'
import SubmittedApplicatinGraph from './SubmittedApplicationGraph'
import MyApplications from './MyApplications'

const MyApplicationsPage = () => {
  return (
    <div>
      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 h-full max-h-[320px]'>
          <AppliedJobGraph/>

        </div>
        <div className='col-span-1 h-full max-h-[320px]'>
        <SubmittedApplicatinGraph/>

        </div>
        <div className='col-span-3  w-auto h-full bg-white rounded-3xl p-5 shad xl:p-8'>
        <MyApplications/>

        </div>
      </div>
    </div>
  )
}

export default MyApplicationsPage
