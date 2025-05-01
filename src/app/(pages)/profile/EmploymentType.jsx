'use client'
import CheckboxButton from '@/components/common/CheckBoxButton';
import Modal from '@/components/common/Modal';
import EditIcon from '@/components/Icons/EditIcon.svg'
import React, { useState } from 'react'

const EmploymentType = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employmentOptions, setEmploymentOptions] = useState([
        { label: 'full time', selected: true },
        { label: 'part time', selected: true },
        { label: 'Freelancing', selected: false }
    ]);
    const [activeOptions, setActiveOptions] = useState(['full time', 'part time']);

    const handleOptionChange = (label, isSelected) => {
        setEmploymentOptions(prev => 
            prev.map(option => 
                option.label === label ? { ...option, selected: isSelected } : option
            )
        );
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    
    const handleSave = () => {
        // Update active options based on current selections
        const selected = employmentOptions
            .filter(option => option.selected)
            .map(option => option.label);
        setActiveOptions(selected);
        handleCloseModal();
    };

    return (
        <div className='rounded-2xl bg-white p-4 lg:p-10'>
            <h1 className='capitalize md:text-[28px] font-semibold text-3d3'>Employment Type</h1>
            <div className='flex justify-between gap-4 items-start'>
                <p className='text-989 mb-6 text-xs md:text-[16px]'>
                    Select your preferred employment types to help recruiters find the right opportunities for you.
                </p>
                <button onClick={handleOpenModal}>

                <EditIcon 
                    onClick={handleOpenModal} 
                    color={"#707070"} 
                    height={32} 
                    width={32} 
                    className="cursor-pointer"
                    />
                    </button>
            </div>
            
            <div className='flex flex-wrap gap-4'>
                {activeOptions.map(option => (
                    <button 
                        key={option}
                        className='flex w-fit text-sm md:text-[16px] capitalize justify-center items-center rounded-full bg-green text-white py-2 px-6 gap-3'
                    >
                        {option}
                    </button>
                ))}
            </div>
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSave} 
                id="Edit Employment Type"
            >
                <div className='flex flex-wrap gap-4'>
                    {employmentOptions.map(option => (
                        <CheckboxButton
                            key={option.label}
                            label={option.label}
                            defaultSelected={option.selected}
                            onChange={(isSelected) => handleOptionChange(option.label, isSelected)}
                        />
                    ))}
                </div>
            </Modal>
        </div>
    )
}

export default EmploymentType;