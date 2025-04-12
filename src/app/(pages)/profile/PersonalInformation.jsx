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

const PersonalInformation = ({handleOpenModal,handleInfoOpenModal}) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    // const handleOpenModal = () => setIsModalOpen(true);
    // const handleInfoOpenModal = () => setIsInfoModalOpen(true);
    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    //     setIsInfoModalOpen(false);
    // }
    // const handleSave = () => handleCloseModal();
    // const countryOptions = [
    //     { value: 'us', label: 'United States' },
    //     { value: 'ca', label: 'Canada' },
    //     { value: 'uk', label: 'United Kingdom' },
    //     { value: 'au', label: 'Australia' },
    // ];
    return (
        <div className='col-span-1 mt-[150px] lg:mt-0 lg:sticky top-[150px] rounded-3xl bg-white p-4 mb-6 lg:mb-0 lg:p-10 h-fit '>
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

           
        </div>
    )
}

export default PersonalInformation
