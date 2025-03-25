'use client'
import React from 'react'
import AppliedJobGraph from './AppliedJobsGraph'
import SubmittedApplicatinGraph from './SubmittedApplicationGraph'

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

      </div>
    </div>
  )
}

export default MyApplicationsPage
