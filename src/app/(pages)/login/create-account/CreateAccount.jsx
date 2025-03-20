'use client'
import Button from '@/components/common/Button';
import InputField from '@/components/common/InputField';
import SelectField from '@/components/common/SelectField';
import CameraIcon from '@/components/Icons/Camera.svg'
import SearchIcon from '@/components/Icons/SearchIcon.svg';
import UploadIcon from '@/components/Icons/UploadIcon.svg';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateAccount = () => {

    const [step, setStep] = useState("first")
    return (
        <div className='bg-bggreen  overflow-y-auto py-12 px-6 '>
            <div className='w-full max-w-[862px]  mx-auto flex flex-col justify-center items-center '>
                <div className='flex items-center '>
                    <div onClick={() => setStep("first")} className='cursor-pointer h-12 w-12 rounded-full bg-green flex items-center justify-center mont text-2xl font-medium text-white'>1</div>
                    <hr className={`${(step === "second" || step === "third") ? "border-green" : "border-e5e"} border-t-6  w-[100px]`} />
                    <div onClick={() => setStep("second")} className={`cursor-pointer  h-12 w-12 rounded-full ${(step === "second" || step === "third") ? "bg-green text-white" : "bg-e5e text-525"} flex items-center justify-center mont text-2xl font-medium `}>2</div>
                    <hr className={`border-t-6 ${(step === "third") ? "border-green" : "border-e5e"} w-[100px]`} />
                    <div onClick={() => setStep("third")} className={`cursor-pointer ${(step === "third") ? "bg-green text-white" : "bg-e5e text-525"} h-12 w-12 rounded-full  flex items-center justify-center mont text-2xl font-medium `}>3</div>
                </div>

                <div className='pt-8 pb-8 bg-white mt-6 px-10 rounded-3xl shad w-full  flex flex-col gap-4'>
                    {step === "first" &&
                        <FirstStep setStep={setStep} />
                    }
                    {step === "second" &&
                        <SecondStep setStep={setStep} />
                    }
                    {step === "third" &&
                        <ThirdStep setStep={setStep} />
                    }


                </div>

            </div>
        </div>
    )
}

export default CreateAccount

const FirstStep = ({ setStep }) => {
    const countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
    ];
    return (
        <>
            <h1 className='text-xl font-medium mb-8 text-3d3'>Personal Information</h1>
            <div className='grid grid-cols-4 gap-6'>
                <div className='col-span-1 '>
                    <div className='flex justify-center mb-2 items-center bg-f2f h-[124px] rounded-lg'>
                        <CameraIcon />

                    </div>
                    <div className='border border-[#D7D7D7] rounded-lg h-[37px]  flex justify-center items-center text-center mont text-sm text-[#A0A0A0]'>
                        Upload Image
                    </div>
                </div>
                <div className='col-span-3 flex flex-col gap-4'>
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

            </div>
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
            <Button
                label="Next"
                onClick={() => setStep("second")}
                // disabled={true}
                className="self-end bg-green text-white" // Override background color for disabled state
            />
        </>
    )
}


const SecondStep = ({ setStep }) => {
    const countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
    ];
    return (
        <>
            <h1 className='text-xl font-medium mb-8 text-3d3'>Professional Information</h1>
            <div className='flex flex-col gap-6 h-full max-h-[570px] overflow-y-auto'>


                <div className='flex flex-col gap-3'>
                    <label htmlFor="Phone" className='text-525  leading-none'>Add Resume</label>
                    <div className=' h-[56px] px-3 bg-[#F6F6F6] rounded-md flex justify-center gap-2  items-center'>
                        <div className='h-10 px-4 flex justify-center gap-2 bg-white items-center border-[0.5px] border-[#BDBDBD] rounded-md'>
                            <UploadIcon /> <span className='text-sm text-[#989898]'>Upload CV</span>
                        </div>
                        <input type="text" placeholder='No File Choosen' className='h-12 px-4 flex-1 rounded-md  placeholder:text-[#989898] ' disabled name="" id="" />
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <InputField
                        label="Job Title"
                        placeholder="Enter Job Title"
                        type="text"
                        // value={formData.lastName}
                        // onChange={handleInputChange}
                        name="email"
                    />
                    <InputField
                        label="Years Of Experiencce"
                        placeholder="Enter Years Of Experiencce"
                        type="text"
                        // value={formData.lastName}
                        // onChange={handleInputChange}
                        name="email"
                    />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <SelectField
                        label="Job Category"
                        // value={formData.country}
                        // onChange={handleInputChange}
                        options={countryOptions}
                        name="categoryy"
                    />
                    <SelectField
                        label="Sub Category"
                        // value={formData.country}
                        // onChange={handleInputChange}
                        options={countryOptions}
                        name="sub"
                    />
                </div>


                <div className='flex flex-col gap-3'>
                    <h1 className='text-525 leading-none capitalize'>When are you available to work?</h1>
                    <div className='flex gap-2.5'>
                        <div className='h-[44px] px-4 text-[#989898] rounded-full border border-[#BDBDBD] flex justify-center items-center'>immediately</div>
                        <div className='h-[44px] px-4 text-[#989898] rounded-full border border-[#BDBDBD] flex justify-center items-center'>Within a month</div>
                        <div className='h-[44px] px-4 text-[#989898] rounded-full border border-[#BDBDBD] flex justify-center items-center'>Partially available</div>
                    </div>

                </div>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-525 leading-none capitalize'>what employment type you prefer ?</h1>
                    <div className='flex gap-2.5'>
                        <div className='h-[44px] px-4 text-[#989898] rounded-full border border-[#BDBDBD] flex justify-center items-center'>full time</div>
                        <div className='h-[44px] px-4 text-[#989898] rounded-full border border-[#BDBDBD] flex justify-center items-center'>part time</div>
                        <div className='h-[44px] px-4 text-[#989898] rounded-full border border-[#BDBDBD] flex justify-center items-center'>freelancing</div>
                    </div>

                </div>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-525 leading-none capitalize'>what employment type you prefer ?</h1>
                    <div className='flex gap-2.5'>
                        <div className='h-[44px] px-4 text-[#989898] rounded-full border border-[#BDBDBD] flex justify-center items-center'>full time</div>
                        <div className='h-[44px] px-4 text-[#989898] rounded-full border border-[#BDBDBD] flex justify-center items-center'>part time</div>
                        <div className='h-[44px] px-4 text-[#989898] rounded-full border border-[#BDBDBD] flex justify-center items-center'>freelancing</div>
                    </div>

                </div>
            </div>
            <div className='flex justify-between items-center mt-4'>

                <Button
                    label="Back"
                    onClick={() => setStep("first")}
                    // disabled={true}
                    className="border-green bg-white border text-green" // Override background color for disabled state
                />
                <Button
                    label="Next"
                    onClick={() => setStep("third")}
                    // disabled={true}
                    className="bg-green text-white" // Override background color for disabled state
                />
            </div>
        </>
    )
}

const ThirdStep = ({ setStep }) => {
    const skills = [
        "wireframing",
        "react",
        "product mangment",
        "ui/ux design",
        "digital markting",
        "node js",
        "data analysis",
        "java script",
        "angiler",
        "python",
        "C#",
        ".net",
        "DevOpp",
        "Next",
    ]
    const router = useRouter()
    return (
        <>
        <div>

            <h1 className='text-xl font-medium mb-2 text-3d3'>Professional Information</h1>
            <p className='capitalize text-525 mb-10 '>select at least 3 skills</p>
        </div>
            <div className='border-[#0000001A] border py-3 px-4 flex items-center gap-2  rounded-md'>
                <SearchIcon />
                <input type="text" className='border-none outline-0  focus:outline-0 placeholder:text-[#939393] flex-1' placeholder='Search' />
            </div>
            <div className='border border-[#BDBDBD] rounded-md p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-h-[484px] overflow-y-auto'>
                {skills.map((skill, i) => (
                    <div className='border border-[#BDBDBD] bg-[#FAFAFA] p-4 rounded-md mont text-sm text-[#888888]'>

                        {skill}
                    </div>
                ))}

            </div>
            <div className='flex justify-between items-center mt-4'>

                <Button
                    label="Back"
                    onClick={() => setStep("second")}
                    // disabled={true}
                    className="border-green bg-white border text-green" // Override background color for disabled state
                />
                <Button
                    label="Start"
                    onClick={() => router.push('/')}
                    // disabled={true}
                    className="bg-green text-white" // Override background color for disabled state
                />
            </div>
        </>
    )
}