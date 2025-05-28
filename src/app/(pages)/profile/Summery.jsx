'use client'
import { updateProfileField } from "@/app/Store/ReduxSlice/updateProfileSlice";
import Modal from "@/components/common/Modal";
import EditIcon from "@/components/Icons/EditIcon.svg";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

const Summary = ({ userProfile }) => {  
  const dispatch = useDispatch();
  const [summary, setSummary] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize with user's current summary
  useEffect(() => {
    if (userProfile?.summary) {
      setSummary(userProfile.summary);
      setIsEditing(true);
    }
  }, [userProfile]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = async () => {
    try {
      await dispatch(updateProfileField({
        id: userProfile.documentId,
        fieldName: 'summary',
        value: summary
      })).unwrap();
      
      setIsEditing(true);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to update summary:', error);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 lg:p-10">
      <h1 className="capitalize md:text-[28px] font-semibold text-3d3">Summary</h1>
      <div className='flex justify-between gap-4 items-start'>
        <p className='text-989 text-xs md:text-[16px] mb-6'>
          Highlight your experience, skills, and career goals to showcase your expertise to potential employers.
        </p>
        <button onClick={handleOpenModal}>
          <EditIcon color="#707070" height={32} width={32} />
        </button>
      </div>

      {isEditing ? (
        <p className="text-lg text-344 tracking-[0.3px] leading-[36px]">
          {summary}
        </p>
      ) : (
        <div className="text-center">
          <img src="/assets/summary.png" alt="Add summary" className="h-[190px] w-[214px] mx-auto" />
          <h1 className='text-center ant md:text-[32px] text-green'>Add a Summary</h1>
          <p className='text-gray mt-2 text-xs md:text-[16px] text-center'>
            Give employers a quick snapshot of your skills and experience. A strong summary increases your chances of landing the perfect job
          </p>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSave} 
        id="Edit Summary"
        title={isEditing ? "Edit Summary" : "Add Summary"}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Write a brief overview of your professional background and key qualifications.
          </p>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={10}
            placeholder="Example: Experienced web developer with 5+ years building responsive applications using React and Node.js..."
          />
          <p className="text-xs text-gray-500">
            {summary.length}/500 characters
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Summary;