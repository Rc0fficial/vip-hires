'use client'
import { countryData } from '@/app/utils/countries'
import InputField from '@/components/common/InputField'
import Modal from '@/components/common/Modal'
import SelectField from '@/components/common/SelectField'
import BehanceIcon from '@/components/Icons/BehanceIcon.svg'
import DribbbleIcon from '@/components/Icons/DribbbleIcon.svg'
import GithupIcon from '@/components/Icons/GithupIcon.svg'
import KaggleIcon from '@/components/Icons/KaggleIcon.svg'
import LinkedinIcon from '@/components/Icons/LinkedinIcon.svg'
import MediumIcon from '@/components/Icons/MediumIcon.svg'
import StackOverflowIcon from '@/components/Icons/StackOverflowIcon.svg'
import UrlIcon from '@/components/Icons/UrlIcon.svg'
import PhoneInputField from '@/components/PhoneInputField'
import React, { useState, useEffect } from 'react'

// Import your country data (or define it here if it's not too large)

const UserInfoForm = ({ userProfile,formData,setFormData,activeSocialField ,setActiveSocialField,cityOptions,setCityOptions,countryOptions,handleInputChange,handleSelectChange,handleSocialLinkChange,toggleSocialField,getSocialIconColor,getSocialIconBg}) => {
    

    
    

    

   

  
  

  

    console.log(formData)

   

    return (
    

        <form>
            <div className='flex flex-col gap-6 border-b pb-6 border-[#DCDCDC]'>
                <div className='grid grid-cols-1 lg:grid-cols-2 items-center w-full gap-4'>
                    <InputField
                        label="First Name"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        type="text"
                        name="firstName"
                    />
                    <InputField
                        label="Last Name"
                        placeholder="Enter Last Name"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        name="lastName"
                    />
                </div>

                <InputField
                    label="Job Title"
                    placeholder="Enter job title"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    type="text"
                    name="jobTitle"
                />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <SelectField
                        label="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        options={countryOptions}
                        name="country"
                    />
                    <SelectField
                        label="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        options={cityOptions}
                        name="city"
                        disabled={!formData.country}
                    />
                </div>

                <InputField
                    label="Email"
                    placeholder="Enter Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                />

                <PhoneInputField
                    value={formData.phoneNumber}
                    onChange={(value) => setFormData(prev => ({ ...prev, phoneNumber: value }))}
                    label="Phone"
                    className="w-full"
                />
            </div>

            <div className='flex justify-between gap-4 flex-col md:flex-row mt-3'>
                <h1 className='text-525 text-lg capitalize'>Account Links</h1>

                <div className='flex items-center flex-wrap gap-4'>
                    
                    <button
                        type="button"
                        className={`h-8 w-8 rounded-full flex justify-center items-center ${getSocialIconBg('linkedin')}`}
                        onClick={() => toggleSocialField('linkedin')}
                    >
                        <LinkedinIcon color={getSocialIconColor('linkedin')} height={20} width={20} />
                    </button>

                    
                    <button
                        type="button"
                        className={`h-8 w-8 rounded-full flex justify-center items-center ${getSocialIconBg('behance')}`}
                        onClick={() => toggleSocialField('behance')}
                    >
                        <BehanceIcon color={getSocialIconColor('behance')} height={20} width={20} />
                    </button>

                    
                    <button
                        type="button"
                        className={`h-8 w-8 rounded-full flex justify-center items-center ${getSocialIconBg('dribbble')}`}
                        onClick={() => toggleSocialField('dribbble')}
                    >
                        <DribbbleIcon color={getSocialIconColor('dribbble')} height={20} width={20} />
                    </button>

                   
                    <button
                        type="button"
                        className={`h-8 w-8 rounded-full flex justify-center items-center ${getSocialIconBg('medium')}`}
                        onClick={() => toggleSocialField('medium')}
                    >
                        <MediumIcon color={getSocialIconColor('medium')} height={20} width={20} />
                    </button>

                   
                    <button
                        type="button"
                        className={`h-8 w-8 rounded-full flex justify-center items-center ${getSocialIconBg('github')}`}
                        onClick={() => toggleSocialField('github')}
                    >
                        <GithupIcon color={getSocialIconColor('github')} height={20} width={20} />
                    </button>

                    
                    <button
                        type="button"
                        className={`h-8 w-8 rounded-full flex justify-center items-center ${getSocialIconBg('stackoverflow')}`}
                        onClick={() => toggleSocialField('stackoverflow')}
                    >
                        <StackOverflowIcon color={getSocialIconColor('stackoverflow')} height={20} width={20} />
                    </button>

                    
                    <button
                        type="button"
                        className={`h-8 w-8 rounded-full flex justify-center items-center ${getSocialIconBg('kaggle')}`}
                        onClick={() => toggleSocialField('kaggle')}
                    >
                        <KaggleIcon color={getSocialIconColor('kaggle')} height={20} width={20} />
                    </button>

                    
                    <button
                        type="button"
                        className={`h-8 w-8 rounded-full flex justify-center items-center ${getSocialIconBg('website')}`}
                        onClick={() => toggleSocialField('website')}
                    >
                        <UrlIcon color={getSocialIconColor('website')} height={20} width={20} />
                    </button>
                </div>
                 </div>
                 {activeSocialField === 'website' && (
                        <InputField
                            placeholder="Enter Website URL"
                            value={formData.socialLinks.website}
                            onChange={handleSocialLinkChange}
                            className="w-full"
                        />
                    )}
                 {activeSocialField === 'kaggle' && (
                        <InputField
                            placeholder="Enter Kaggle URL"
                            value={formData.socialLinks.kaggle}
                            onChange={handleSocialLinkChange}
                            className="w-full"
                        />
                    )}
                 {activeSocialField === 'stackoverflow' && (
                        <InputField
                            placeholder="Enter StackOverflow URL"
                            value={formData.socialLinks.stackoverflow}
                            onChange={handleSocialLinkChange}
                            className="w-full"
                        />
                    )}
                  {activeSocialField === 'github' && (
                        <InputField
                            placeholder="Enter GitHub URL"
                            value={formData.socialLinks.github}
                            onChange={handleSocialLinkChange}
                            className="w-full"
                        />
                    )}
                  {activeSocialField === 'medium' && (
                        <InputField
                            placeholder="Enter Medium URL"
                            value={formData.socialLinks.medium}
                            onChange={handleSocialLinkChange}
                            className="w-full"
                        />
                    )}
                 {activeSocialField === 'dribbble' && (
                        <InputField
                            placeholder="Enter Dribbble URL"
                            value={formData.socialLinks.dribbble}
                            onChange={handleSocialLinkChange}
                            className="w-full"
                        />
                    )}
                {activeSocialField === 'linkedin' && (
                        <InputField
                            placeholder="Enter LinkedIn URL"
                            value={formData.socialLinks.linkedin}
                            onChange={handleSocialLinkChange}
                            className="w-full"
                        />
                    )}{activeSocialField === 'behance' && (
                        <InputField
                            placeholder="Enter Behance URL"
                            value={formData.socialLinks.behance}
                            onChange={handleSocialLinkChange}
                            className="w-full"
                        />
                    )}
           
        </form>
     

    )
}

export default UserInfoForm