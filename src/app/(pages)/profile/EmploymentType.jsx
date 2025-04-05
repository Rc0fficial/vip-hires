'use client'
import CheckboxButton from '@/components/common/CheckBoxButton';
import Modal from '@/components/common/Modal';
import EditIcon from '@/components/Icons/EditIcon.svg'
import React, { useState } from 'react'

const EmploymentType = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);
        const handleStateChange = (newState) => {
            console.log("CheckboxButton state changed:", newState);
        };
        const handleOpenModal = () => setIsModalOpen(true);
        const handleCloseModal = () => setIsModalOpen(false);
        const handleSave = () => handleCloseModal();
  return (
    <div className='rounded-2xl bg-white p-10 f'>

    <h1 className='capitalize text-[28px] font-semibold text-3d3'>employment type  </h1>
    <div className='flex justify-between '>

        <p className='text-989 mb-6'>Indicate when you're ready to start your next opportunity so recruiters can match you accordingly.</p>
        <EditIcon onClick={handleOpenModal} color={"#707070"} height={32} width={32} />
    </div>
    <div className='flex flex-wrap gap-4'>

        <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

            full time
        </button>
        <button className='flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3'>

            part time
        </button>

    </div>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} id="Edit Employment Type">
                <div className='flex flex-wrap gap-4'>

                    <CheckboxButton
                        label="full time"
                        defaultSelected={true} // Initial state
                        onChange={handleStateChange} // Callback for state changes
                    />
                    <CheckboxButton
                        label="part time"
                        defaultSelected={true} // Initial state
                        onChange={handleStateChange} // Callback for state changes
                    />
                    <CheckboxButton
                        label="Freelancing"
                        defaultSelected={false} // Initial state
                        onChange={handleStateChange} // Callback for state changes
                    />

                </div>
            </Modal>
</div>
  )
}

export default EmploymentType
