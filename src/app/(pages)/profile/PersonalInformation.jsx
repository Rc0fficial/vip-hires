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

const PersonalInformation = ({ handleOpenModal, handleInfoOpenModal, userProfile }) => {
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

    const getImageUrl = () => {
        if (!userProfile?.profileImage) return "/assets/profile2.png";

        // Check for thumbnail first
        if (userProfile.profileImage.formats?.thumbnail?.url) {
            return `${strapiBaseUrl}${userProfile.profileImage.formats.thumbnail.url}`;
        }

        // Fallback to full image
        if (userProfile.profileImage.url) {
            return `${strapiBaseUrl}${userProfile.profileImage.url}`;
        }

        // Default fallback
        return "/assets/profile2.png";
    };
    console.log(userProfile)
    return (
        <div className='col-span-1 mt-[150px] lg:mt-0 lg:sticky top-[150px] rounded-3xl bg-white p-4 mb-6 lg:mb-0 lg:p-10 h-fit '>
            <div className='pb-10 border-b border-[#B0B0B0] group mb-10 relative'>
                <span onClick={handleInfoOpenModal} className='absolute cursor-pointer top-0 right-0 lg:hidden group-hover:block'><EditIcon color={"#707070"} height={32} width={32} /></span>
                <img
                    onClick={handleOpenModal}
                    src={

                        `${process.env.NEXT_PUBLIC_STRAPI_URL}${userProfile?.profileImage?.url}` ||
                        "/assets/profile2.png"
                    }
                    alt="Profile"
                    className='mb-10 mx-auto w-[200px] h-[200px] rounded-full object-cover cursor-pointer'
                />
                <h1 className='capitalize md:text-[28px] font-medium text-center text-3d3'>{userProfile?.firstName} {userProfile?.lastName}</h1>
                <p className='capitalize text-[#B0B0B0] text-sm md:text-xl  text-center'>{userProfile?.subCategory}</p>
            </div>
            <div className='flex items-center gap-2.5 mb-4'>
                <EmailIcon color={"#989898"} height={24} width={24} />
                <h1 className='text-989 text-sm '>Email :</h1>
                <h2 className='text-sm text-525 capitalize'>{userProfile?.email}</h2>

            </div>
            <div className='flex items-center gap-2.5 mb-4'>
                <PhoneIcon color={"#989898"} height={24} width={24} />
                <h1 className='text-989 text-sm '>phone :</h1>
                <h2 className='text-sm text-525 capitalize'>{userProfile?.phoneNumber}</h2>

            </div>
            <div className='flex items-center gap-2.5 mb-4'>
                <LocationIcon color={"#989898"} height={24} width={24} />
                <h1 className='text-989 text-sm '>country :</h1>
                <h2 className='text-sm text-525 capitalize'>{userProfile?.country}</h2>

            </div>
            <div className='flex items-center gap-2.5 mb-4'>
                <LocationIcon color={"#989898"} height={24} width={24} />
                <h1 className='text-989 text-sm '>city :</h1>
                <h2 className='text-sm text-525 capitalize'>{userProfile?.city}</h2>

            </div>
            <div className='flex items-center gap-2.5 mb-4'>
                <LinkIcon color={"#989898"} height={24} width={24} />
                <h1 className='text-989 text-sm '>linked social :</h1>
                <h2 className='text-sm text-525 capitalize'></h2>

            </div>
            <div className='gap-5 flex items-center'>
                {/* LinkedIn */}
                {userProfile?.socialLinks?.linkedin && (
                    <a
                        href={userProfile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-green cursor-pointer hover:bg-green-dark transition'
                    >
                        <LinkedinIcon color="#ffffff" height={20} width={20} />
                    </a>
                )}

                {/* Behance */}
                {userProfile?.socialLinks?.behance && (
                    <a
                        href={userProfile.socialLinks.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-green cursor-pointer hover:bg-green-dark transition'
                    >
                        <BehanceIcon color="#ffffff" height={20} width={20} />
                    </a>
                )}

                {/* Medium */}
                {userProfile?.socialLinks?.medium && (
                    <a
                        href={userProfile.socialLinks.medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-green cursor-pointer hover:bg-green-dark transition'
                    >
                        <MediumIcon color="#ffffff" height={20} width={20} />
                    </a>
                )}

                {/* Stack Overflow */}
                {userProfile?.socialLinks?.stackoverflow && (
                    <a
                        href={userProfile.socialLinks.stackoverflow}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-green cursor-pointer hover:bg-green-dark transition'
                    >
                        <StackOverflowIcon color="#ffffff" height={20} width={20} />
                    </a>
                )}

                {/* GitHub */}
                {userProfile?.socialLinks?.github && (
                    <a
                        href={userProfile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-green cursor-pointer hover:bg-green-dark transition'
                    >
                        <GithupIcon color="#ffffff" height={20} width={20} />
                    </a>
                )}

                {/* Dribbble */}
                {userProfile?.socialLinks?.dribbble && (
                    <a
                        href={userProfile.socialLinks.dribbble}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-green cursor-pointer hover:bg-green-dark transition'
                    >
                        <DribbbleIcon color="#ffffff" height={20} width={20} />
                    </a>
                )}

                {/* Kaggle */}
                {userProfile?.socialLinks?.kaggle && (
                    <a
                        href={userProfile.socialLinks.kaggle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-green cursor-pointer hover:bg-green-dark transition'
                    >
                        <KaggleIcon color="#ffffff" height={20} width={20} />
                    </a>
                )}

                {/* Website */}
                {userProfile?.socialLinks?.website && (
                    <a
                        href={userProfile.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-green cursor-pointer hover:bg-green-dark transition'
                    >
                        <UrlIcon color="#ffffff" height={20} width={20} />
                    </a>
                )}
            </div>


        </div>
    )
}

export default PersonalInformation
