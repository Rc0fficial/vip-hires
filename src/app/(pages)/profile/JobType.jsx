'use client'
import CheckboxButton from '@/components/common/CheckBoxButton';
import Modal from '@/components/common/Modal';
import EditIcon from '@/components/Icons/EditIcon.svg'
import React, { useState } from 'react'

const JobType = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobTypeOptions, setJobTypeOptions] = useState([
        { label: 'remotely', selected: true },
        { label: 'on site', selected: true },
        { label: 'hybrid', selected: true }
    ]);
    const [activeOptions, setActiveOptions] = useState(['remotely', 'on site', 'hybrid']);

    const handleOptionChange = (label, isSelected) => {
        setJobTypeOptions(prev => 
            prev.map(option => 
                option.label === label ? { ...option, selected: isSelected } : option
            )
        );
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        // Reset to last saved options when closing without saving
        setJobTypeOptions(prev => 
            prev.map(option => ({
                ...option,
                selected: activeOptions.includes(option.label)
            }))
        );
        setIsModalOpen(false);
    };
    
    const handleSave = () => {
        // Update active options based on current selections
        const selected = jobTypeOptions
            .filter(option => option.selected)
            .map(option => option.label);
        setActiveOptions(selected);
        setIsModalOpen(false);
    };

    return (
        <div className='rounded-2xl bg-white p-4 lg:p-10'>
            <h1 className='capitalize md:text-[28px] font-semibold text-3d3 '>Preferred Job Type</h1>
            <div className='flex justify-between gap-6'>
                <p className='text-989 mb-6 text-xs md:text-[16px]'>
                    Specify your preferred work environment—remote, on-site, or hybrid—to find the best job fit.
                </p>
                <EditIcon 
                    onClick={handleOpenModal} 
                    color={"#707070"} 
                    height={32} 
                    width={32} 
                    className="cursor-pointer "
                />
            </div>
            
            <div className='flex flex-wrap gap-4'>
                {activeOptions.map(option => (
                    <button 
                        key={option}
                        className='flex w-fit capitalize text-sm md:text-[16px] justify-center items-center rounded-full bg-green text-white py-2 px-6 gap-3'
                    >
                        {option}
                    </button>
                ))}
            </div>
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSave} 
                id="Edit Job Type"
            >
                <div className='flex flex-col gap-4'>
                    <p className='text-gray-600 mb-2'>Select your preferred job types:</p>
                    <div className='flex flex-wrap gap-4'>
                        {jobTypeOptions.map(option => (
                            <CheckboxButton
                                key={option.label}
                                label={option.label}
                                defaultSelected={option.selected}
                                onChange={(isSelected) => handleOptionChange(option.label, isSelected)}
                            />
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default JobType;