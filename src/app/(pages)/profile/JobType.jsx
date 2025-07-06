'use client'
import { updateProfileField } from '@/app/Store/ReduxSlice/updateProfileSlice';
import CheckboxButton from '@/components/common/CheckBoxButton';
import Modal from '@/components/common/Modal';
import EditIcon from '@/components/Icons/EditIcon.svg';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const JobType = ({ userProfile }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobTypeOptions, setJobTypeOptions] = useState([
        { label: 'remotely', value: 'Remote', selected: false },
        { label: 'on site', value: 'on_site', selected: false },
        { label: 'hybrid', value: 'Hybrid', selected: false }
    ]);

    // Initialize with user's current preferences
    useEffect(() => {
        if (userProfile?.preferedWork) {
            setJobTypeOptions(prev => 
                prev.map(option => ({
                    ...option,
                    selected: userProfile.preferedWork.includes(option.value)
                }))
            );
        }
    }, [userProfile]);

    const handleOptionChange = (value, isSelected) => {
        setJobTypeOptions(prev =>
            prev.map(option =>
                option.value === value ? { ...option, selected: isSelected } : option
            )
        );
    };

    const handleOpenModal = () => setIsModalOpen(true);
    
    const handleCloseModal = () => {
        // Reset to user's original preferences when closing without saving
        setJobTypeOptions(prev => 
            prev.map(option => ({
                ...option,
                selected: userProfile.preferedWork.includes(option.value)
            }))
        );
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        // Prepare the updated preferedWork array
        const updatedPreferedWork = jobTypeOptions
            .filter(option => option.selected)
            .map(option => option.value);

        try {
            await dispatch(updateProfileField({
                id: userProfile.documentId,
                fieldName: 'preferedWork',
                value: updatedPreferedWork
            })).unwrap();
            
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to update job preferences:', error);
            // Revert to original state on error
            handleCloseModal();
        }
    };

    // Get current active options for display
    const activeOptions = jobTypeOptions
        .filter(option => option.selected)
        .map(option => option.label);

    return (
        <div className='rounded-2xl bg-white p-4 lg:p-10'>
            <h1 className='capitalize md:text-[28px] font-semibold text-3d3'>Preferred Job Type</h1>
            <div className='flex justify-between gap-4 items-start'>
                <p className='text-989 mb-6 text-xs md:text-[16px]'>
                    Specify your preferred work environment—remote, on-site, or hybrid—to find the best job fit.
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
                <p className='text-gray-500'>No preferences selected</p>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                id="Edit Job Type"
                title="Edit Preferred Job Types"
            >
                <div className='flex flex-col gap-4'>
                    <p className='text-gray-600 mb-2'>Select your preferred job types:</p>
                    <div className='flex flex-wrap gap-4'>
                        {jobTypeOptions.map(option => (
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

export default JobType;