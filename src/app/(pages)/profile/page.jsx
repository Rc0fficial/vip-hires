'use client'
import AddIcon from '@/components/Icons/AddIcon.svg'
import BehanceIcon from '@/components/Icons/BehanceIcon.svg'
import DownloadIcon from '@/components/Icons/DownloadIcon.svg'
import EditIcon from '@/components/Icons/EditIcon.svg'
import EmailIcon from '@/components/Icons/EmailIcon.svg'
import LinkedinIcon from '@/components/Icons/LinkedinIcon.svg'
import LinkIcon from '@/components/Icons/LinkIcon.svg'
import LocationIcon from '@/components/Icons/LocationIcon.svg'
import CameraIcon2 from '@/components/Icons/CameraIcon2.svg'
import MediumIcon from '@/components/Icons/MediumIcon.svg'
import PhoneIcon from '@/components/Icons/PhoneIcon.svg'
import PhotoIcon from '@/components/Icons/PhotoIcon.svg'
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
import InputField from '@/components/common/InputField'
import SelectField from '@/components/common/SelectField'
import DribbbleIcon from '@/components/Icons/DribbbleIcon.svg'
import GithupIcon from '@/components/Icons/GithupIcon.svg'
import KaggleIcon from '@/components/Icons/KaggleIcon.svg'
import UrlIcon from '@/components/Icons/UrlIcon.svg'

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleInfoOpenModal = () => setIsInfoModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsInfoModalOpen(false);
    }
    const handleSave = () => handleCloseModal();
    const countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
    ];
    const profileCompletionItems = [
        {
            text: "Add 5+ skills to complete your profile",
            bonus: "+10%",
            flexCol: true // Only the first item has flex-col on mobile
        },
        {
            text: "Add Education information complete your profile",
            bonus: "+10%"
        },
        {
            text: "Certifications & Courses complete your profile",
            bonus: "+10%"
        },
        {
            text: "Upload a resume to increase profile completeness by",
            bonus: "+25%"
        }
    ];
    return (
        <div className='bg-bggreen relative '>
            <img src="/assets/cover.png" alt="" className='w-screen     z-0  object-center -mt-[120px]' />
            <div className='bg-bggreen   px-4 md:px-10  mx-auto  z-20 -mt-30'>
                <div className='w-full   top-[120px] mx-auto grid grid-cols-1  gap-0 lg:gap-10 lg:grid-cols-3 mb-6'>
                    <PersonalInformation
                        handleOpenModal={handleOpenModal}
                        handleInfoOpenModal={handleInfoOpenModal}

                    />
                    <div className='col-span-2  h-fit  flex flex-col gap-6  '>

                        {/* profile completeness score */}
                        <div className='rounded-2xl bg-white p-4 lg:p-10 '>

                            <h1 className='capitalize md:text-[28px]  font-semibold text-3d3 '>profile completeness score</h1>
                            <p className='text-989 text-xs md:text-[16px] mb-6'>Track your progress and complete your profile by adding missing details to increase your chances of getting noticed.</p>
                            <div className='p-4 shad rounded-md mb-8 '>
                                <h1 className='text-5d5 mb-4 '>Your progress</h1>
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
                                {profileCompletionItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`flex justify-between flex-col md:flex-row  items-center w-full md:text-lg text-5d5`}
                                    >
                                        <span className='flex items-center gap-3'>
                                            <div className='w-1.5 h-1.5 bg-5d5 rounded-full'></div>
                                            {item.text}
                                            <span className='text-green mr-4'>{item.bonus}</span>
                                        </span>
                                        <button className='h-[44px] w-[88px] flex items-center justify-center border border-green rounded-md gap-2 font-semibold md:font-bold'>
                                            <AddIcon color={"#009969"} height={24} width={24} /> Add
                                        </button>
                                    </li>
                                ))}
                            </ul>

                        </div>
                        {/* summery */}

                        <Summary summary={summary} setSummary={setSummary} />
                        {/* reesume */}
                        <ResumeSection />
                        {/* skills */}
                        <Skills skills={skills} setSkills={setSkills} />
                        {/* availability  */}
                        <Availability />
                        {/* employemnt type */}
                        <EmploymentType />
                        {/* prefere job type */}
                        <JobType />

                        {/* Education */}
                        <Education />
                    </div>
                </div>
            </div>

            {/* profile change model */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} id="Edit Profile Picture">
                <img src="/assets/profile2.png" alt="" className='mb-10  mx-auto w-[200px] h-[200px] rounded-full' />

                <div className='flex justify-center items-center gap-8 pb-10 border-b border-[#DCDCDC]'>
                    <button className='w-full max-w-[160px] px-2.5 py-2.5 text-nowrap flex gap-2 justify-center items-center border-2 border-green rounded-md'><CameraIcon2 color={"#525252"} height={20} width={20} />Take Photo</button>
                    <button className='w-full max-w-[160px] px-2.5 py-2.5 text-nowrap flex gap-2 justify-center items-center border-2 border-green rounded-md '><PhotoIcon color={"#525252"} height={20} width={20} /> Upload Photo</button>
                </div>
            </Modal>
            <Modal isOpen={isInfoModalOpen} onClose={handleCloseModal} onSave={handleSave} id="Profile Picture">

                <div className='flex flex-col  gap-6 border-b pb-6 border-[#DCDCDC]'>

                    <div className=' grid grid-cols-1 lg:grid-cols-2 items-center w-full gap-4'>
                        <InputField
                            label="First Name"
                            placeholder="Enter First Name"
                            // value={formData.firstName}
                            // onChange={handleInputChange}
                            type="text"
                            name="firstName"
                        />
                        <InputField
                            label="Last Name"
                            placeholder="Enter Last Name"
                            type="text"
                            // value={formData.lastName}
                            // onChange={handleInputChange}
                            name="lastName"
                        />
                    </div>
                    <InputField
                        label="job tittle"
                        placeholder="Enter job tittle"
                        // value={formData.firstName}
                        // onChange={handleInputChange}
                        labelClass={"text-center"}
                        type="text"
                        name="job tittle"
                    />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <SelectField
                            label="Country"
                            // value={formData.country}
                            // onChange={handleInputChange}
                            options={countryOptions}
                            name="country"
                        />
                        <SelectField
                            label="City"
                            // value={formData.country}
                            // onChange={handleInputChange}
                            options={countryOptions}
                            name="city"
                        />
                    </div>

                    <InputField
                        label="Email"
                        placeholder="Enter Email"
                        type="text"
                        labelClass={"text-center"}
                        // value={formData.lastName}
                        // onChange={handleInputChange}
                        name="email"
                    />
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="Phone" className='text-525 text-center leading-none'>Phone</label>
                        <div className='flex gap-4'>
                            <div className='h-12 px-4 flex justify-center gap-2 items-center border-[0.5px] border-[#BDBDBD] rounded-md'>
                                <img src="/assets/flag.png" alt="" /> <span className='text-sm text-[#989898]'>+02</span>
                            </div>
                            <input type="text" placeholder='Enter Name' className='h-12 px-4 flex-1 rounded-md border-[#BDBDBD] placeholder:text-[#989898] border-[0.5px]' name="" id="" />
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <h1 className='text-525 text-lg  capitalize'>account link</h1>

                    <div className='flex items-center gap-4'>

                        <div className='bg-green h-8 w-8 rounded-full flex justify-center items-center'>


                            <LinkedinIcon color={"#ffffff"} height={20} width={20} />
                        </div>
                        <div className='bg-green h-8 w-8 rounded-full flex justify-center items-center'>


                            <BehanceIcon color={"#ffffff"} height={20} width={20} />
                        </div>
                        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-bdb'>
                            <DribbbleIcon color={"#525252"} height={20} width={20} />
                        </div>
                        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-green'>
                            <MediumIcon color={"#ffffff"} height={20} width={20} />
                        </div>
                        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-bdb'>
                            <GithupIcon color={"#ffffff"} height={20} width={20} />

                        </div>
                        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-green'>
                            <StackOverflowIcon color={"#ffffff"} height={20} width={20} />
                        </div>
                        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-bdb'>
                            <KaggleIcon color={"#ffffff"} height={20} width={20} />

                        </div>
                        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-bdb'>
                            <UrlIcon color={"#ffffff"} height={20} width={20} />

                        </div>
                    </div>
                </div>

            </Modal>

        </div>
    )
}

export default ProfilePage
