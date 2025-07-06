'use client'
import { updateProfileField } from '@/app/Store/ReduxSlice/updateProfileSlice';
import CheckboxButton from '@/components/common/CheckBoxButton';
import Modal from '@/components/common/Modal';
import EditIcon from '@/components/Icons/EditIcon.svg';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Availability = ({ userProfile }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availabilityOptions, setAvailabilityOptions] = useState([
        { label: 'immediately', value: 'immediately', selected: false },
        { label: 'Within a month', value: 'within_a_month', selected: false },
        { label: 'Partially available', value: 'partially_available', selected: false }
    ]);

    // Initialize with user's current availability
    useEffect(() => {
        if (userProfile?.availability) {
            setAvailabilityOptions(prev => 
                prev.map(option => ({
                    ...option,
                    selected: userProfile.availability.includes(option.value)
                }))
            );
        }
    }, [userProfile]);

    const handleOptionChange = (value, isSelected) => {
        setAvailabilityOptions(prev =>
            prev.map(option =>
                option.value === value ? { ...option, selected: isSelected } : option
            )
        );
    };

    const handleOpenModal = () => setIsModalOpen(true);
    
    const handleCloseModal = () => {
        // Reset to user's original availability when closing without saving
        setAvailabilityOptions(prev => 
            prev.map(option => ({
                ...option,
                selected: userProfile.availability.includes(option.value)
            }))
        );
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        // Prepare the updated availability array (only one selection allowed)
        const updatedAvailability = availabilityOptions
            .filter(option => option.selected)
            .map(option => option.value);

        try {
            await dispatch(updateProfileField({
                id: userProfile.documentId,
                fieldName: 'availability',
                value: updatedAvailability
            })).unwrap();
            
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to update availability:', error);
            // Revert to original state on error
            handleCloseModal();
        }
    };

    // Get current active options for display
    const activeOptions = availabilityOptions
        .filter(option => option.selected)
        .map(option => option.label);

    return (
        <div className='rounded-2xl bg-white p-4 lg:p-10'>
            <h1 className='capitalize md:text-[28px] font-semibold text-3d3'>Availability</h1>
            <div className='flex justify-between gap-4 items-start'>
                <p className='text-989 mb-6 text-xs md:text-[16px]'>
                    Indicate when you're ready to start your next opportunity so recruiters can match you accordingly.
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
                            className='flex w-fit capitalize text-sm md:text-[16px] justify-center items-center rounded-full bg-green text-white py-2 px-6 gap-3'
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <p className='text-gray-500'>No availability selected</p>
            )}

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSave} 
                id="Edit Availability"
                title="Edit Availability"
            >
                <div className='flex flex-col gap-4'>
                    <p className='text-gray-600 mb-2'>Select your availability status:</p>
                    <div className='flex flex-wrap gap-4'>
                        {availabilityOptions.map(option => (
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
    );
};

export default Availability;