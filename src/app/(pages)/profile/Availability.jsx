'use client'
import CheckboxButton from '@/components/common/CheckBoxButton';
import Modal from '@/components/common/Modal';
import EditIcon from '@/components/Icons/EditIcon.svg'
import React, { useState } from 'react'

const Availability = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availabilityOptions, setAvailabilityOptions] = useState([
        { label: 'immediately', selected: true },
        { label: 'Within a month', selected: false },
        { label: 'Partially available', selected: false }
    ]);
    const [activeOptions, setActiveOptions] = useState(['immediately']);

    const handleOptionChange = (label, isSelected) => {
        setAvailabilityOptions(prev => 
            prev.map(option => 
                option.label === label ? { ...option, selected: isSelected } : option
            )
        );
        
        setActiveOptions(prev => 
            isSelected 
                ? [...prev, label]
                : prev.filter(opt => opt !== label)
        );
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    
    const handleSave = () => {
        // Filter only selected options
        const selected = availabilityOptions
            .filter(option => option.selected)
            .map(option => option.label);
        setActiveOptions(selected);
        handleCloseModal();
    };

    return (
        <div className='rounded-2xl bg-white p-4 lg:p-10'>
            <h1 className='capitalize md:text-[28px] font-semibold text-3d3 '>Availability</h1>
            <div className='flex justify-between'>
                <p className='text-989 mb-6 text-xs md:text-[16px]'>
                    Indicate when you're ready to start your next opportunity so recruiters can match you accordingly.
                </p>
                <EditIcon 
                    onClick={handleOpenModal} 
                    color={"#707070"} 
                    height={32} 
                    width={32} 
                    className="cursor-pointer"
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
                id="Edit Availability"
            >
                <div className='flex flex-wrap gap-4'>
                    {availabilityOptions.map(option => (
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

export default Availability;