'use client'
import Button from '@/components/common/Button';
import InputField from '@/components/common/InputField';
import SelectField from '@/components/common/SelectField';
import BehanceIcon from '@/components/Icons/BehanceIcon.svg';
import DribbbleIcon from '@/components/Icons/DribbbleIcon.svg';
import GithupIcon from '@/components/Icons/GithupIcon.svg';
import KaggleIcon from '@/components/Icons/KaggleIcon.svg';
import LinkedinIcon from '@/components/Icons/LinkedinIcon.svg';
import MediumIcon from '@/components/Icons/MediumIcon.svg';
import StackOverflowIcon from '@/components/Icons/StackOverflowIcon.svg';
import UploadIcon from '@/components/Icons/UploadIcon.svg';
import UrlIcon from '@/components/Icons/UrlIcon.svg';
import React, { useRef, useState } from 'react';

const SecondStep = ({ setStep }) => {
    const countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
    ];

    const jobCategories = [
        { value: 'it', label: 'Information Technology' },
        { value: 'finance', label: 'Finance' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'education', label: 'Education' },
    ];

    const socialPlatforms = [
        { name: 'linkedin', icon: LinkedinIcon, label: 'LinkedIn' },
        { name: 'behance', icon: BehanceIcon, label: 'Behance' },
        { name: 'dribbble', icon: DribbbleIcon, label: 'Dribbble' },
        { name: 'medium', icon: MediumIcon, label: 'Medium' },
        { name: 'github', icon: GithupIcon, label: 'GitHub' },
        { name: 'stackoverflow', icon: StackOverflowIcon, label: 'Stack Overflow' },
        { name: 'kaggle', icon: KaggleIcon, label: 'Kaggle' },
        { name: 'website', icon: UrlIcon, label: 'Website' }
    ];

    const [formData, setFormData] = useState({
        jobTitle: "",
        yearsOfExperience: "",
        jobCategory: "",
        subCategory: "",
        availability: [],
        employmentType: [],
        workPreference: [],
        cvFile: null,
        cvFileName: "No File Chosen",
        socialLinks: {}
    });

    const [activeSocialPlatform, setActiveSocialPlatform] = useState(null);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCvUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a PDF or Word document');
                return;
            }

            setFormData(prev => ({
                ...prev,
                cvFile: file,
                cvFileName: file.name
            }));
        }
    };

    const handleCheckboxSelect = (field, value) => {
        setFormData(prev => {
            const currentValues = prev[field];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            
            return {
                ...prev,
                [field]: newValues
            };
        });
    };

    const handleSocialLinkChange = (platform, value) => {
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    const handleSocialIconClick = (platform) => {
        setActiveSocialPlatform(activeSocialPlatform === platform ? null : platform);
    };

    const handleSubmit = () => {
        console.log("Professional Info:", formData);
        setStep("third");
    };

    return (
        <>
            <h1 className='text-xl font-medium mb-8 text-3d3'>Professional Information</h1>
            <div className='flex flex-col gap-6 h-full max-h-[570px] overflow-y-auto'>

                {/* CV Upload Section */}
                <div className='flex flex-col gap-3'>
                    <label htmlFor="cvUpload" className='text-525 leading-none'>Add Resume</label>
                    <div className='h-[56px] px-3 bg-[#F6F6F6] rounded-md flex justify-center gap-2 items-center'>
                        <div 
                            className='h-10 px-4 flex justify-center gap-2 bg-white items-center border-[0.5px] border-[#BDBDBD] rounded-md cursor-pointer'
                            onClick={() => fileInputRef.current.click()}
                        >
                            <UploadIcon /> 
                            <span className='text-sm text-[#989898]'>Upload CV</span>
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden"
                            id="cvUpload"
                            accept=".pdf,.doc,.docx"
                            onChange={handleCvUpload}
                        />
                        <input 
                            type="text" 
                            placeholder='No File Chosen' 
                            className='h-12 px-4 flex-1 rounded-md placeholder:text-[#989898] bg-transparent' 
                            disabled 
                            value={formData.cvFileName}
                        />
                    </div>
                    <p className='text-xs text-[#A0A0A0]'>Accepted formats: PDF, DOC, DOCX</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <InputField
                        label="Job Title"
                        placeholder="Enter Job Title"
                        type="text"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        name="jobTitle"
                    />
                    <InputField
                        label="Years Of Experience"
                        placeholder="Enter Years Of Experience"
                        type="text"
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                        name="yearsOfExperience"
                    />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <SelectField
                        label="Job Category"
                        value={formData.jobCategory}
                        onChange={handleInputChange}
                        options={jobCategories}
                        name="jobCategory"
                    />
                    <SelectField
                        label="Sub Category"
                        value={formData.subCategory}
                        onChange={handleInputChange}
                        options={countryOptions}
                        name="subCategory"
                    />
                </div>

                {/* Availability - Checkbox style */}
                <div className='flex flex-col gap-3'>
                    <h1 className='text-525 leading-none capitalize'>When are you available to work?</h1>
                    <div className='flex gap-2.5 flex-wrap'>
                        {['immediately', 'Within a month', 'Partially available'].map((option) => (
                            <div 
                                key={option}
                                className={`h-[44px] px-4 rounded-full border border-[#BDBDBD] cursor-pointer flex justify-center items-center ${
                                    formData.availability.includes(option)
                                        ? 'bg-green text-white' 
                                        : 'text-[#989898] hover:text-white hover:bg-green'
                                }`}
                                onClick={() => handleCheckboxSelect('availability', option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Employment Type - Checkbox style */}
                <div className='flex flex-col gap-3'>
                    <h1 className='text-525 leading-none capitalize'>What employment type you prefer?</h1>
                    <div className='flex gap-2.5 flex-wrap'>
                        {['Full time', 'Part time', 'Freelancing'].map((option) => (
                            <div 
                                key={option}
                                className={`h-[44px] px-4 rounded-full border border-[#BDBDBD] cursor-pointer flex justify-center items-center ${
                                    formData.employmentType.includes(option)
                                        ? 'bg-green text-white' 
                                        : 'text-[#989898] hover:text-white hover:bg-green'
                                }`}
                                onClick={() => handleCheckboxSelect('employmentType', option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Work Preference - Checkbox style */}
                <div className='flex flex-col gap-3'>
                    <h1 className='text-525 leading-none capitalize'>Do you prefer work?</h1>
                    <div className='flex gap-2.5 flex-wrap'>
                        {['Remotely', 'On Site', 'Hybrid'].map((option) => (
                            <div 
                                key={option}
                                className={`h-[44px] px-4 rounded-full border border-[#BDBDBD] cursor-pointer flex justify-center items-center ${
                                    formData.workPreference.includes(option)
                                        ? 'bg-green text-white' 
                                        : 'text-[#989898] hover:text-white hover:bg-green'
                                }`}
                                onClick={() => handleCheckboxSelect('workPreference', option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account links */}
                <div className='flex justify-between items-center'>
                    <h1 className='text-525 text-lg capitalize'>account link</h1>
                    <div className='flex items-center gap-4'>
                        {socialPlatforms.map((platform) => (
                            <div 
                                key={platform.name}
                                className={`h-8 w-8 rounded-full flex justify-center items-center cursor-pointer ${
                                    formData.socialLinks[platform.name] || activeSocialPlatform === platform.name
                                        ? 'bg-green' 
                                        : 'bg-bdb'
                                }`}
                                onClick={() => handleSocialIconClick(platform.name)}
                            >
                                <platform.icon 
                                    color="#ffffff" 
                                    height={20} 
                                    width={20} 
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Link Input - Only shows when a platform is selected */}
                {activeSocialPlatform && (
                    <InputField
                        label={socialPlatforms.find(p => p.name === activeSocialPlatform)?.label || 'Social Link'}
                        placeholder={`Enter ${socialPlatforms.find(p => p.name === activeSocialPlatform)?.label || ''} link`}
                        type="url"
                        value={formData.socialLinks[activeSocialPlatform] || ''}
                        onChange={(e) => handleSocialLinkChange(activeSocialPlatform, e.target.value)}
                        name={`socialLink_${activeSocialPlatform}`}
                    />
                )}
            </div>

            <div className='flex justify-between items-center mt-4'>
                <Button
                    label="Back"
                    onClick={() => setStep("first")}
                    className="border-green bg-white border text-green"
                />
                <Button
                    label="Next"
                    onClick={handleSubmit}
                    className="bg-green text-white"
                />
            </div>
        </>
    )
}

export default SecondStep;