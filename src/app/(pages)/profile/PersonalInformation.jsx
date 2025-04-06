'use client'
import InputField from '@/components/common/InputField'
import Modal from '@/components/common/Modal'
import SelectField from '@/components/common/SelectField'
import BehanceIcon from '@/components/Icons/BehanceIcon.svg'
import CameraIcon from '@/components/Icons/Camera.svg'
import CameraIcon2 from '@/components/Icons/CameraIcon2.svg'
import DribbbleIcon from '@/components/Icons/DribbbleIcon.svg'
import EditIcon from '@/components/Icons/EditIcon.svg'
import EmailIcon from '@/components/Icons/EmailIcon.svg'
import GithupIcon from '@/components/Icons/GithupIcon.svg'
import KaggleIcon from '@/components/Icons/KaggleIcon.svg'
import LinkedinIcon from '@/components/Icons/LinkedinIcon.svg'
import LinkIcon from '@/components/Icons/LinkIcon.svg'
import LocationIcon from '@/components/Icons/LocationIcon.svg'
import MediumIcon from '@/components/Icons/MediumIcon.svg'
import PhoneIcon from '@/components/Icons/PhoneIcon.svg'
import PhotoIcon from '@/components/Icons/PhotoIcon.svg'
import StackOverflowIcon from '@/components/Icons/StackOverflowIcon.svg'
import UrlIcon from '@/components/Icons/UrlIcon.svg'
import React, { useState } from 'react'

const PersonalInformation = () => {
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
    return (
        <div className='col-span-1 sticky top-[150px] rounded-3xl bg-white p-10 h-fit '>
            <div className='pb-10 border-b border-[#B0B0B0] group mb-10 relative'>
                <span onClick={handleInfoOpenModal} className='absolute cursor-pointer top-0 right-0 hidden group-hover:block'><EditIcon color={"#707070"} height={32} width={32} /></span>
                <img onClick={handleOpenModal} src="/assets/profile2.png" alt="" className='mb-10 mx-auto w-[200px] h-[200px] rounded-full' />
                <h1 className='capitalize text-[28px] font-medium text-center text-3d3'>mohamed ali</h1>
                <p className='capitalize text-[#B0B0B0] text-xl  text-center'>ui/ux designer</p>
            </div>
            <div  className='flex items-center gap-2.5 mb-4'>
                <EmailIcon color={"#989898"} height={24} width={24} />
                <h1 className='text-989 text-sm '>Email :</h1>
                <h2 className='text-sm text-525 capitalize'>email@gmail.com</h2>

            </div>
            <div  className='flex items-center gap-2.5 mb-13'>
                <PhoneIcon color={"#989898"} height={24} width={24} />
                <h1 className='text-989 text-sm '>phone :</h1>
                <h2 className='text-sm text-525 capitalize'>+020123456789</h2>

            </div>
            <div  className='flex items-center gap-2.5 mb-4'>
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
                <div className='flex justify-between items-center'>
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

export default PersonalInformation
