'use client'
import React from 'react'
import AppliedJobGraph from './AppliedJobsGraph'
import SubmittedApplicatinGraph from './SubmittedApplicationGraph'

const MyApplicationsPage = () => {
  return (
    <div>
      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2'>
          <AppliedJobGraph/>

        </div>
        <div className='col-span-1'>
        <SubmittedApplicatinGraph/>

        </div>

      </div>
    </div>
  )
}

export default MyApplicationsPage
