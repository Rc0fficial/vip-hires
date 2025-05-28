'use client'
import JobCard from '@/components/common/JobCard'
import React from 'react'

const JobDetail = ({ job }) => {
  // Helper function to render rich text content
  const renderRichText = (content) => {
    return content.map((item, index) => {
      if (item.type === 'paragraph') {
        return (
          <p key={index} className="text-989 tracking-[0.3px] text-xs md:text-[16px] leading-[25px] mb-4">
            {item.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        )
      } else if (item.type === 'list') {
        const ListTag = item.format === 'ordered' ? 'ol' : 'ul'
        return (
          <ListTag 
            key={index} 
            className={`${item.format === 'ordered' ? 'list-decimal' : 'list-disc'} pl-6 text-989 space-y-2 text-xs md:text-[16px]`}
          >
            {item.children.map((listItem, itemIndex) => (
              <li key={itemIndex}>
                {listItem.children.map((child, childIndex) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </li>
            ))}
          </ListTag>
        )
      }
      return null
    })
  }

  return (
    <>
      <div className='rounded-3xl h-fit bg-white py-10 px-4 md:px-12 shad'>
        {/* job description */}
        <div className='flex flex-col mb-4'>
          <h1 className='md:text-xl font-medium text-525 capitalize mb-4'>Job Description :</h1>
          {job?.jobDescription && renderRichText(job.jobDescription)}
        </div>

        {/* responsibilities and duties */}
        <div className="mb-6">
          <h2 className='md:text-xl font-medium text-525 capitalize mb-4'>
            Responsibilities And Duties :
          </h2>
          {job?.jobResponsibilities && renderRichText(job.jobResponsibilities)}
        </div>

        {/* Required Experience, Skills And Qualifications */}
        <div className="border-t border-dcd pt-6">
          <h2 className='md:text-xl font-medium text-525 capitalize mb-4'>
            Required Experience, Skills And Qualifications :
          </h2>
          {job?.jobRequirements && renderRichText(job.jobRequirements)}
        </div>
      </div>

      {/* Related jobs section - you might want to fetch actual related jobs */}
      <div className='rounded-3xl h-fit bg-white py-10 px-4 md:px-12 mt-6 shad grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {Array(2).fill(null).map((_, index) => (
          <JobCard key={index} saved={false} isDetail={true} />
        ))}
      </div>
    </>
  )
}

export default JobDetail