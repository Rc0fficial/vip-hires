import JobCard from '@/components/common/JobCard'
import React from 'react'

const JobDetail = () => {
    return (
        <>
        <div className='rounded-3xl h-fit  bg-white py-10 px-4 md:px-12  shad'>
            {/* job description */}
            <div className='flex flex-col mb-4'>

                <h1 className='md:text-xl font-medium text-525 capitalize mb-4'>Job Description :</h1>
                <p className='text-989 tracking-[0.3px] text-xs md:text-[16px] leading-[25px] pb-4 border-dcd border-b'>One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized.<br />
                    This means that Lorem Ipsum cannot accurately represent, for example, German, in which all nouns are capitalized. Thus, Lorem Ipsum has only limited suitability as a visual filler for German texts. If the fill text is intended to illustrate the characteristics of different typefaces.
                    It sometimes makes sense to select texts containing the various letters and symbols specific to the output language.</p>
            </div>

            {/* responsibilities and duties  */}
            <div className="mb-6">
                <h2 className='md:text-xl font-medium text-525 capitalize mb-4'>
                    Responsibilities And Duties :
                </h2>
                <p className="text-989 mb-4 text-xs md:text-[16px]">
                    It sometimes makes sense to select texts containing the various
                    letters and symbols specific to the output language.
                </p>
                <ul className="list-disc pl-6 text-989 space-y-2 text-xs md:text-[16px]">
                    <li>Participate in requirements analysis</li>
                    <li>Write clean, scalable code using C# and .NET frameworks</li>
                    <li>Test and deploy applications and systems</li>
                    <li>Revise, update, refactor and debug code</li>
                    <li>Improve existing software</li>
                    <li>
                        Develop documentation throughout the software development life
                        cycle (SDLC)
                    </li>
                    <li>Serve as an expert on applications and provide technical support</li>
                </ul>
            </div>

            {/* Required Experience, Skills And Qualifications */}
            <div className="border-t border-dcd pt-6 ">
                <h2 className='md:text-xl font-medium text-525 capitalize mb-4'>
                    Required Experience, Skills And Qualifications :
                </h2>
                <ul className="list-disc pl-6 text-xs md:text-[16px] text-989 space-y-2">
                    <li>Proven experience as a .NET developer or application developer</li>
                    <li>
                        Good understanding of SQL and relational databases, specifically
                        Microsoft SQL Server
                    </li>
                    <li>
                        Experience designing, developing, and creating RESTful web services
                        and APIs
                    </li>
                    <li>Basic knowledge of agile process and practices</li>
                    <li>Good understanding of object-oriented programming</li>
                    <li>Good understanding of concurrent programming</li>
                    <li>
                        Sound knowledge of application architecture and design
                    </li>
                    <li>Excellent problem-solving and analytical skills</li>
                </ul>
            </div>
        </div>
<div className='rounded-3xl h-fit  bg-white py-10 px-4 md:px-12 mt-6 shad grid grid-cols-1 lg:grid-cols-2 gap-6'>

{Array(2).fill(null).map((_, index) => (
                    <JobCard key={index} saved={false}  isDetail={true} />
                ))}
</div>
        </>
    )
}

export default JobDetail
