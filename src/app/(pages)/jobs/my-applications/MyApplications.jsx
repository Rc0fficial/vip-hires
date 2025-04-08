'use client'
import CloseIcon from '@/components/Icons/CloseIcon.svg';
import EmailIcon from '@/components/Icons/EmailIcon.svg';
import FollowIcon from '@/components/Icons/FollowIcon.svg';
import OpenEmailIcon from '@/components/Icons/OpenEmailIcon.svg';
import DynamicTable from '@/components/Table';
import React from 'react'

const MyApplications = () => {
    const columns = [
        { header: 'Business Location', accessor: 'businessLocation' },
        { header: 'job location', accessor: 'jobLocation' },
        { header: 'Employment Type', accessor: 'employmentType' },
        { header: 'Status', accessor: 'status' },
        { header: 'Applied On', accessor: 'appliedOn' },
        { header: 'Actions', accessor: 'actions' },
      ];
    
      const data = [
        {
          businessLocation: 'UI/UX Designer',
          status: <span className="px-2 py-1 text-xs text-[#707070] bg-[#70707026] rounded-full">Applied</span>,
          jobLocation: 'Remote',
          employmentType: 'Full Time',
          appliedOn: '10-03-2025',
          actions:<span className="min-h-10 min-w-10 max-w-10 max-h-10 flex justify-center items-center bg-[#FF6B6B1A] rounded-full"><CloseIcon height={24} width={24} color={"#FF6B6B"} /></span>,
        },
        {
            businessLocation: 'Marketing Manager',
          status: <span className="px-2 py-1 text-xs text-[#17C653] bg-[#17C6531A] rounded-full">Submitted</span>,
          jobLocation: 'On-site	',
          employmentType: 'Part Time',
          appliedOn: '10-03-2025',
          actions:<span className="min-h-10 min-w-10 max-w-10 max-h-10 overflow-visible flex justify-center items-center bg-[#17C6531A] rounded-full"><FollowIcon height={24} width={24} color={"#17C653"} /></span>,
        },
        {
            businessLocation: 'Software Engineer',
          status: <span className="px-2 py-1 text-xs text-[#FF6B6B] bg-[#FF6B6B1A] rounded-full">Rejected</span>,
          jobLocation: 'Hybrid	',
          employmentType: 'Contract',
          appliedOn: '10-03-2025',
          actions:<span className="min-h-10 min-w-10 max-w-10 max-h-10 flex justify-center items-center bg-[#70707026] rounded-full"><OpenEmailIcon height={24} width={24} color={"#707070"} /></span>,
        },
      ];
  return (
    <>
       <h1 className='font-semibold capitalize text-2xl text-3d3'>My Applications</h1>
         <DynamicTable columns={columns} data={data} />
    </>
  )
}

export default MyApplications
