'use client'
import CheckboxButton from '@/components/common/CheckBoxButton';
import Modal from '@/components/common/Modal';
import EditIcon from '@/components/Icons/EditIcon.svg'
import React, { useState } from 'react'
const JobType = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleStateChange = (newState) => {
        console.log("CheckboxButton state changed:", newState);
    };
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSave = () => handleCloseModal();
    return (
        <div className='rounded-2xl bg-white p-10 f'>

            <h1 className='capitalize text-[28px] font-semibold text-3d3'>Preferred Job Type  </h1>
            <div className='flex justify-between gap-6'>

                <p className='text-989 mb-6'>Specify your preferred work environment—remote, on-site, or hybrid—to find the best job fit.</p>
                <EditIcon onClick={handleOpenModal} color={"#707070"} height={32} width={32} />
            </div>
            <div className='flex flex-wrap gap-4'>

                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                    remotely
                </button>
                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                    on site
                </button>
                <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

                    hybrid
                </button>

            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} id="Edit Employment Type">
                <div className='flex flex-wrap gap-4'>

                    <CheckboxButton
                        label="remotely"
                        defaultSelected={true} // Initial state
                        onChange={handleStateChange} // Callback for state changes
                    />
                    <CheckboxButton
                        label="on site"
                        defaultSelected={true} // Initial state
                        onChange={handleStateChange} // Callback for state changes
                    />
                    <CheckboxButton
                        label="hybrid"
                        defaultSelected={true} // Initial state
                        onChange={handleStateChange} // Callback for state changes
                    />

                </div>
            </Modal>
        </div>
    )
}

export default JobType
