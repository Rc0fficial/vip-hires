'use client'
import AddIcon from '@/components/Icons/AddIcon.svg'
import BehanceIcon from '@/components/Icons/BehanceIcon.svg'
import DownloadIcon from '@/components/Icons/DownloadIcon.svg'
import EditIcon from '@/components/Icons/EditIcon.svg'
import EmailIcon from '@/components/Icons/EmailIcon.svg'
import LinkedinIcon from '@/components/Icons/LinkedinIcon.svg'
import LinkIcon from '@/components/Icons/LinkIcon.svg'
import LocationIcon from '@/components/Icons/LocationIcon.svg'
import MediumIcon from '@/components/Icons/MediumIcon.svg'
import PhoneIcon from '@/components/Icons/PhoneIcon.svg'
import StackOverflowIcon from '@/components/Icons/StackOverflowIcon.svg'
import UploadIcon from '@/components/Icons/UploadIcon.svg'
import ViewIcon from '@/components/Icons/ViewIcon.svg'
import React, { useState } from 'react'
import Summary from './Summery'
import Modal from '@/components/common/Modal'
import Skills from './Skills'
import CloseIcon from '@/components/Icons/CloseIcon.svg'
import Availability from './Availability'
import EmploymentType from './EmploymentType'
import JobType from './JobType'
import Education from './Education'
import PersonalInformation from './PersonalInformation'
import ResumeSection from './Resume'

const ProfilePage = () => {

    const [summary, setSummary] = useState(
        "Obviously IM Web Developer. Web Developer with over 3 years of experience. Experienced with all stages of the development cycle for dynamic web projects. The as opposed to using Content here, content here, making it look like readable English. Data Structures and Algorithms are the heart of programming. Initially most of the developers do not realize its importance but when you will start your career in software development, you will find your code is either taking too much time or taking too much space."
    );
    const [skills, setSkills] = useState([
        "Wireframe",
        "User Experience Research",
        "Design",
        "User Interface",
        "Design Thinking",
        "Brainstorming",
    ]);
   
    return (
        <div className='bg-bggreen relative '>
            <img src="/assets/cover.png" alt="" className='w-screen     z-0  object-center -mt-[112px]' />
            <div className='bg-bggreen   px-12 md:px-10  mx-auto  z-20 -mt-30'>
                <div className='w-full   top-[120px] mx-auto grid grid-cols-1  gap-10 lg:grid-cols-3 mb-6'>
                   <PersonalInformation/>
                    <div className='col-span-2  h-fit  flex flex-col gap-6  '>

                        {/* profile completeness score */}
                        <div className='rounded-2xl bg-white p-10 '>

                            <h1 className='capitalize text-[28px] font-semibold text-3d3 '>profile completeness score</h1>
                            <p className='text-989 mb-6'>Track your progress and complete your profile by adding missing details to increase your chances of getting noticed.</p>
                            <div className='p-4 shad rounded-md mb-8 '>
                                <h1 className='text-5d5 mb-4'>Your progress</h1>
                                <h3 className='text-2xl font-medium text-green mb-3'>70% to complete</h3>

                                <div className="relative w-full h-5 bg-gray-300 rounded-full ">
                                    <div className="absolute top-0 left-0 h-4 bg-green rounded-full" style={{ width: '70%' }}></div>
                                    <div className="absolute top-1/2 left-[10%] w-2 h-2 bg-white border-2 border-green rounded-full transform -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-[30%] w-2 h-2 bg-white border-2 border-green rounded-full transform -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-[50%] w-2 h-2 bg-white border-2 border-green rounded-full transform -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-[70%] w-2 h-2 bg-green rounded-full transform -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-[90%] w-2 h-2 bg-[#E0E0E0] rounded-full transform -translate-y-1/2"></div>
                                </div>


                            </div>
                            <ul className='list-disc space-y-5'>
                                <li className='flex justify-between items-center w-full text-lg text-5d5'> <span className=' flex items-center gap-3'><div className='w-1.5 h-1.5 bg-5d5 rounded-full'></div>Add 5+ skills to complete your profile <span className='text-green'>+10%</span></span> <button className='h-[44px] w-[88px] flex items-center justify-center border border-green rounded-md gap-2 font-bold'><AddIcon color={"#009969"} height={24} width={24} /> Add</button></li>
                                <li className='flex justify-between items-center w-full text-lg text-5d5'> <span className=' flex items-center gap-3'><div className='w-1.5 h-1.5 bg-5d5 rounded-full'></div>Add Education information  complete your profile<span className='text-green'>+10%</span></span> <button className='h-[44px] w-[88px] flex items-center justify-center border border-green rounded-md gap-2 font-bold'><AddIcon color={"#009969"} height={24} width={24} /> Add</button></li>
                                <li className='flex justify-between items-center w-full text-lg text-5d5'> <span className=' flex items-center gap-3'><div className='w-1.5 h-1.5 bg-5d5 rounded-full'></div>Certifications & Courses complete your profile <span className='text-green'>+10%</span></span> <button className='h-[44px] w-[88px] flex items-center justify-center border border-green rounded-md gap-2 font-bold'><AddIcon color={"#009969"} height={24} width={24} /> Add</button></li>
                                <li className='flex justify-between items-center w-full text-lg text-5d5'> <span className=' flex items-center gap-3'><div className='w-1.5 h-1.5 bg-5d5 rounded-full'></div>Upload a resume to increase profile completeness by  <span className='text-green'>+25%</span></span> <button className='h-[44px] w-[88px] flex items-center justify-center border border-green rounded-md gap-2 font-bold'><AddIcon color={"#009969"} height={24} width={24} /> Add</button></li>
                            </ul>

                        </div>
                        {/* summery */}

                        <Summary summary={summary} setSummary={setSummary} />
                        {/* reesume */}
                        <ResumeSection/>
                        {/* skills */}
                        <Skills skills={skills} setSkills={setSkills} />
                        {/* availability  */}
                       <Availability/>
                        {/* employemnt type */}
                       <EmploymentType/>
                        {/* prefere job type */}
                        <JobType/>

                        {/* Education */}
                        <Education/>
                    </div>
                </div>
            </div>
          
        </div>
    )
}

export default ProfilePage
