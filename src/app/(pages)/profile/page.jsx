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
import React from 'react'

const ProfilePage = () => {
    return (
        <div className='bg-bggreen relative '>
            <img src="/assets/cover.png" alt="" className='w-screen     z-0  object-center -mt-[112px]' />
            <div className='bg-bggreen  overflow-y-auto px-12 md:px-16 lg:px-38 z-20 -mt-60'>
                <div className='w-full   mx-auto grid grid-cols-1  gap-10 lg:grid-cols-3 items-center mb-6'>
                    <div className='col-span-1 rounded-3xl bg-white p-10 h-fit '>
                        <div className='pb-10 border-b border-[#B0B0B0] mb-10'>
                            <img src="/assets/profile2.png" alt="" className='mb-10 mx-auto' />
                            <h1 className='capitalize text-[28px] font-medium text-center text-3d3'>mohamed ali</h1>
                            <p className='capitalize text-[#B0B0B0] text-xl  text-center'>ui/ux designer</p>
                        </div>
                        <div className='flex items-center gap-2.5 mb-4'>
                            <EmailIcon color={"#989898"} height={24} width={24} />
                            <h1 className='text-989 text-sm '>Email :</h1>
                            <h2 className='text-sm text-525 capitalize'>email@gmail.com</h2>

                        </div>
                        <div className='flex items-center gap-2.5 mb-13'>
                            <PhoneIcon color={"#989898"} height={24} width={24} />
                            <h1 className='text-989 text-sm '>phone :</h1>
                            <h2 className='text-sm text-525 capitalize'>+020123456789</h2>

                        </div>
                        <div className='flex items-center gap-2.5 mb-4'>
                            <LocationIcon color={"#989898"} height={24} width={24} />
                            <h1 className='text-989 text-sm '>country :</h1>
                            <h2 className='text-sm text-525 capitalize'>egypt</h2>

                        </div>
                        <div className='flex items-center gap-2.5 mb-4'>
                            <LocationIcon color={"#989898"} height={24} width={24} />
                            <h1 className='text-989 text-sm '>city :</h1>
                            <h2 className='text-sm text-525 capitalize'>cairo</h2>

                        </div>
                        <div className='flex items-center gap-2.5 mb-4'>
                            <LinkIcon color={"#989898"} height={24} width={24} />
                            <h1 className='text-989 text-sm '>linked social :</h1>
                            <h2 className='text-sm text-525 capitalize'></h2>

                        </div>
                        <div className='gap-5 flex items-center'>
                            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-bdb'>
                                <LinkedinIcon color={"#525252"} height={20} width={20} />
                            </div>
                            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-bdb'>
                                <BehanceIcon color={"#525252"} height={20} width={20} />
                            </div>
                            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-bdb'>
                                <MediumIcon color={"#525252"} height={20} width={20} />
                            </div>
                            <div className='w-8 h-8 flex justify-center items-center rounded-full bg-bdb'>
                                <StackOverflowIcon color={"#525252"} height={20} width={20} />
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2  h-fit mt-5 flex flex-col gap-6'>
                        <div className='rounded-2xl bg-white p-10'>

                            <h1 className='capitalize text-[28px] font-semibold text-3d3'>profile completeness score</h1>
                            <p className='text-989 mb-6'>Track your progress and complete your profile by adding missing details to increase your chances of getting noticed.</p>
                            <div className='p-4 shad rounded-md mb-8'>
                                <h1 className='text-5d5 mb-4'>Your progress</h1>
                                <h3 className='text-2xl font-medium text-green mb-3'>70% to complete</h3>

                                <div className="relative w-full h-5 bg-gray-300 rounded-full">
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

                        <div className='rounded-2xl bg-white p-10 f'>

                            <h1 className='capitalize text-[28px] font-semibold text-3d3'>summery </h1>
                            <div className='flex justify-between '>

                                <p className='text-989 mb-6'>Highlight your experience, skills, and career goals to showcase your expertise to potential employers.</p>
                                <EditIcon color={"#707070"} height={32} width={32} />
                            </div>
                            <p className='text-lg text-344 tracking-[0.3px] leading-[36px]'>Obviously IM Web Developer. Web Developer with over 3 years of experience. Experienced with all stages of the development cycle for dynamic web projects. The as opposed to using Content here, content here, making it look like readable English.<br />
                                Data Structures and Algorithms are the heart of programming. Initially most of the developers do not realize its importance but when you will start your career in software development, you will find your code is either taking too much time or taking too much space.</p>
                        </div>

                        <div className='rounded-2xl bg-white p-10 f'>

                            <h1 className='capitalize text-[28px] font-semibold text-3d3'>Resume </h1>
                            <div className='flex justify-between '>

                                <p className='text-989 mb-6'>Upload your CV to help recruiters understand your background and qualifications at a glance.</p>
                                {/* <EditIcon  color={"#707070"} height={32} width={32}/> */}
                            </div>
                            <div className='rounded-md shad flex items-center '>
                                <div className='w-[200px] h-[197px] bg-bdb'>
                                    <img src="/assets/resume.png" alt="" className='mx-auto' />
                                </div>
                                <div className='flex-1 py-6 px-4 flex justify-between flex-col h-full'>
                                    <div className='flex justify-between mb-9'>
                                        <div>
                                            <h1 className='capitalize text-[28px] font-semibold text-3d3'>Resume </h1>
                                            <p className='text-989 '>154.03 KB</p>
                                        </div>
                                        <p className='text-989 '>31/5/2023</p>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <button className='flex w-full justify-center items-center rounded-full border border-green text-green py-2 px-6 gap-3'>
                                            <ViewIcon color={"#009969"} height={24} width={24} />
                                            Preview
                                        </button>
                                        <button className='flex w-full justify-center items-center rounded-full border border-green text-green py-2 px-6 gap-3'>
                                            <DownloadIcon color={"#009969"} height={24} width={24} />
                                            Download
                                        </button>
                                        <button className='flex w-full justify-center items-center rounded-full border border-green text-green py-2 px-6 gap-3'>
                                            <UploadIcon color={"#009969"} height={24} width={24} />
                                            Upload
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className='rounded-2xl bg-white p-10 f'>

                            <h1 className='capitalize text-[28px] font-semibold text-3d3'>skills </h1>
                            <div className='flex justify-between '>

                                <p className='text-989 mb-6'>List your key skills to demonstrate your expertise and improve job matching accuracy.</p>
                                <EditIcon color={"#707070"} height={32} width={32} />
                            </div>
                            <div className='flex flex-wrap gap-4'>

                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    wireframe
                                </button>
                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    user experince research
                                </button>
                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    design
                                </button>
                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    user interface
                                </button>
                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    design thinking
                                </button>
                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    brains storming
                                </button>
                            </div>
                        </div>

                        <div className='rounded-2xl bg-white p-10 f'>

                            <h1 className='capitalize text-[28px] font-semibold text-3d3'>availability  </h1>
                            <div className='flex justify-between '>

                                <p className='text-989 mb-6'>Indicate when you're ready to start your next opportunity so recruiters can match you accordingly.</p>
                                <EditIcon color={"#707070"} height={32} width={32} />
                            </div>
                            <div className='flex flex-wrap gap-4'>

                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    immediately
                                </button>
                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    Within a month
                                </button>

                            </div>
                        </div>
                        <div className='rounded-2xl bg-white p-10 f'>

                            <h1 className='capitalize text-[28px] font-semibold text-3d3'>employment type  </h1>
                            <div className='flex justify-between '>

                                <p className='text-989 mb-6'>Indicate when you're ready to start your next opportunity so recruiters can match you accordingly.</p>
                                <EditIcon color={"#707070"} height={32} width={32} />
                            </div>
                            <div className='flex flex-wrap gap-4'>

                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    full time
                                </button>
                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    part time
                                </button>

                            </div>
                        </div>
                        <div className='rounded-2xl bg-white p-10 f'>

                            <h1 className='capitalize text-[28px] font-semibold text-3d3'>Preferred Job Type  </h1>
                            <div className='flex justify-between '>

                                <p className='text-989 mb-6'>Specify your preferred work environment—remote, on-site, or hybrid—to find the best job fit.</p>
                                <EditIcon color={"#707070"} height={32} width={32} />
                            </div>
                            <div className='flex flex-wrap gap-4'>

                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    remotely
                                </button>
                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    on site
                                </button>
                                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                                    hybrid
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage
