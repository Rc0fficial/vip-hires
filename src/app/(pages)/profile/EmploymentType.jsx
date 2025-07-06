'use client'
import { updateProfileField } from '@/app/Store/ReduxSlice/updateProfileSlice';
import CheckboxButton from '@/components/common/CheckBoxButton';
import Modal from '@/components/common/Modal';
import EditIcon from '@/components/Icons/EditIcon.svg';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const EmploymentType = ({ userProfile }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employmentOptions, setEmploymentOptions] = useState([
        { label: 'full time', value: 'full_time', selected: false },
        { label: 'part time', value: 'part_time', selected: false },
        { label: 'Freelancing', value: 'freelancing', selected: false }
    ]);

    // Initialize with user's current preferences
    useEffect(() => {
        if (userProfile?.employmentType) {
            setEmploymentOptions(prev => 
                prev.map(option => ({
                    ...option,
                    selected: userProfile.employmentType.includes(option.value)
                })))
        }
    }, [userProfile]);

    const handleOptionChange = (value, isSelected) => {
        setEmploymentOptions(prev =>
            prev.map(option =>
                option.value === value ? { ...option, selected: isSelected } : option
            )
        );
    };

    const handleOpenModal = () => setIsModalOpen(true);
    
    const handleCloseModal = () => {
        // Reset to user's original preferences when closing without saving
        setEmploymentOptions(prev => 
            prev.map(option => ({
                ...option,
                selected: userProfile.employmentType.includes(option.value)
            }))
        );
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        // Prepare the updated employmentType array
        const updatedEmploymentType = employmentOptions
            .filter(option => option.selected)
            .map(option => option.value);

        try {
            await dispatch(updateProfileField({
                id: userProfile.documentId,
                fieldName: 'employmentType',
                value: updatedEmploymentType
            })).unwrap();
            
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to update employment type:', error);
            // Revert to original state on error
            handleCloseModal();
        }
    };

    // Get current active options for display
    const activeOptions = employmentOptions
        .filter(option => option.selected)
        .map(option => option.label);

    return (
        <div className='rounded-2xl bg-white p-4 lg:p-10'>
            <h1 className='capitalize md:text-[28px] font-semibold text-3d3'>Employment Type</h1>
            <div className='flex justify-between gap-4 items-start'>
                <p className='text-989 mb-6 text-xs md:text-[16px]'>
                    Select your preferred employment types to help recruiters find the right opportunities for you.
                </p>
                <button onClick={handleOpenModal}>
                    <EditIcon 
                        color="#707070" 
                        height={32} 
                        width={32} 
                        className="cursor-pointer"
                    />
                </button>
            </div>

            {activeOptions.length > 0 ? (
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
            ) : (
                <p className='text-gray-500'>No employment types selected</p>
            )}
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSave} 
                id="Edit Employment Type"
                title="Edit Employment Types"
            >
                <div className='flex flex-col gap-4'>
                    <p className='text-gray-600 mb-2'>Select your preferred employment types:</p>
                    <div className='flex flex-wrap gap-4'>
                        {employmentOptions.map(option => (
                            <CheckboxButton
                                key={option.value}
                                label={option.label}
                                defaultSelected={option.selected}
                                onChange={(isSelected) => handleOptionChange(option.value, isSelected)}
                            />
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EmploymentType;