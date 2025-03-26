'use client'
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import CameraIcon from "@/components/Icons/Camera.svg";
import { useRef, useState } from "react";


const FirstStep = ({ setStep }) => {
    const countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
    ];

    // State to store form data and image
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: "",
        city: "",
        email: "",
        phone: "",
        image: null, // Store image file
        imagePreview: null, // Store image preview URL
    });

    const fileInputRef = useRef(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file) // Create preview URL
            }));
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        console.log("Form Data:", formData);
        setStep("second"); // Move to next step
    };

    return (
        <>
            <h1 className='text-xl font-medium mb-8 text-3d3'>Personal Information</h1>
            <div className='grid grid-cols-4 gap-6'>
                {/* Image Upload Section */}
                <div className='col-span-1 '>
                    <div
                        className='flex justify-center mb-2 items-center bg-f2f h-[124px] rounded-lg cursor-pointer'
                        onClick={() => fileInputRef.current.click()} // Open file picker on click
                    >
                        {formData.imagePreview ? (
                            <img src={formData.imagePreview} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <CameraIcon />
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <div
                        className='border border-[#D7D7D7] rounded-lg h-[37px] flex justify-center items-center text-center mont text-sm text-[#A0A0A0] cursor-pointer'
                        onClick={() => fileInputRef.current.click()} // Open file picker when clicked
                    >
                        Upload Image
                    </div>
                </div>

                {/* Form Fields */}
                <div className='col-span-3 flex flex-col gap-4'>
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
                        value={formData.lastName}
                        onChange={handleInputChange}
                        type="text"
                        name="lastName"
                    />
                </div>
            </div>

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
                    options={countryOptions}
                    name="city"
                />
            </div>

            <InputField
                label="Email"
                placeholder="Enter Email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
            />

            <div className='flex flex-col gap-3'>
                <label htmlFor="phone" className='text-525 text-center leading-none'>Phone</label>
                <div className='flex gap-4'>
                    <div className='h-12 px-4 flex justify-center gap-2 items-center border-[0.5px] border-[#BDBDBD] rounded-md'>
                        <img src="/assets/flag.png" alt="Flag" />
                        <span className='text-sm text-[#989898]'>+02</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder='Enter Phone' 
                        className='h-12 px-4 flex-1 rounded-md border-[#BDBDBD] placeholder:text-[#989898] border-[0.5px]' 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <Button
                label="Next"
                onClick={handleSubmit}
                className="self-end bg-green text-white"
            />
        </>
    );
};

export default FirstStep;
