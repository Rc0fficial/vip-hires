'use client'
import CheckboxButton from '@/components/common/CheckBoxButton';
import InputField from '@/components/common/InputField';
import Modal from '@/components/common/Modal';
import SelectField from '@/components/common/SelectField';
import AddIcon from '@/components/Icons/AddIcon.svg';
import EditIcon from '@/components/Icons/EditIcon.svg'
import React, { useState } from 'react'
const Education = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSave = () => handleCloseModal();

    const countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
    ];
    return (
        <div className='rounded-2xl bg-white p-10 f'>

            <h1 className='capitalize text-[28px] font-semibold text-3d3'>education </h1>
            <div className='flex justify-between  gap-6 items-start'>

                <p className='text-989 mb-6'>Showcase your academic background, degrees, and achievements to strengthen your profile.</p>
                <div className='flex items-center gap-4'>
                    <AddIcon onClick={handleOpenModal} color={"#707070"} height={24} width={24} />
                    <EditIcon onClick={handleOpenModal} color={"#707070"} height={32} width={32} />
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-6'>
                    <div className='h-[108px] shad flex justify-center items-center w-[108px] rounded-full'>
                        <img src="/assets/uniLogo.png" alt="" />
                    </div>
                    <div>
                        <h1 className='capitalize text-lg leading-[36px] text-525 font-medium'>ain shams universty</h1>
                        <p className='text-989 text-sm capitalize leading-[36px]'>Bachelor of Commerce - BCom, Accounting</p>
                        <p className='capitalize text-989 text-sm leading-[36px]'>grade : good</p>
                    </div>

                </div>
                <h1 className='capitalize text-989 text-sm leading-[36px]'>( 2018 - 2021 )</h1>

            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} id="Education">
                <div className='flex flex-col gap-6'>

                    <InputField
                        label="University/Institution Name"
                        placeholder="Enter Name"
                        // value={formData.firstName}
                        // onChange={handleInputChange}
                        type="text"
                        name="name"
                    />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <SelectField
                            label="Field of Study"
                            // value={formData.country}
                            // onChange={handleInputChange}
                            options={countryOptions}
                            name="country"
                        />
                        <SelectField
                            label="Degree "
                            // value={formData.country}
                            // onChange={handleInputChange}
                            options={countryOptions}
                            name="city"
                        />
                    </div>
                    <InputField
                        label="University/Institution Name"
                        placeholder="Enter Name"
                        // value={formData.firstName}
                        // onChange={handleInputChange}
                        type="text"
                        name="name"
                    />
                </div>
            </Modal>
        </div>
    )
}

export default Education
