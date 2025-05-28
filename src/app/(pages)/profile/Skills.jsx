'use client'
import { updateProfileField } from "@/app/Store/ReduxSlice/updateProfileSlice";
import Modal from "@/components/common/Modal";
import CloseIcon from "@/components/Icons/CloseIcon.svg";
import EditIcon from "@/components/Icons/EditIcon.svg";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

const Skills = ({ userProfile }) => {
    const dispatch = useDispatch();
    const [newSkill, setNewSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initialize with user's current skills
    useEffect(() => {
        if (userProfile?.skills) {
            setSkills(userProfile.skills);
        }
    }, [userProfile]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSave = async () => {
        if (newSkill.trim() !== "") {
            const updatedSkills = [...skills, newSkill.trim()];
            
            try {
                await dispatch(updateProfileField({
                    id: userProfile.documentId,
                    fieldName: 'skills',
                    value: updatedSkills
                })).unwrap();
                
                setSkills(updatedSkills);
                setNewSkill("");
                handleCloseModal();
            } catch (error) {
                console.error('Failed to update skills:', error);
            }
        } else {
            handleCloseModal();
        }
    };

    const handleDeleteSkill = async (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        
        try {
            await dispatch(updateProfileField({
                id: userProfile.id,
                fieldName: 'skills',
                value: updatedSkills
            })).unwrap();
            
            setSkills(updatedSkills);
        } catch (error) {
            console.error('Failed to delete skill:', error);
        }
    };

    return (
        <div className="rounded-2xl bg-white p-4 lg:p-10">
            <h1 className="md:text-2xl font-semibold">Skills</h1>
            <div className="flex justify-between gap-4 items-start">
                <p className='text-989 mb-6 text-xs md:text-[16px]'>
                    List your key skills to demonstrate your expertise and improve job matching accuracy.
                </p>
                <button onClick={handleOpenModal}>
                    <EditIcon color="#707070" height={32} width={32} />
                </button>
            </div>

            {skills.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {skills.map((skill, index) => (
                        <span 
                            key={index} 
                            className="flex w-fit text-sm md:text-[16px] capitalize justify-center items-center rounded-full bg-green text-white py-2 px-6 gap-3"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No skills added yet</p>
            )}

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSave} 
                id="Edit skills"
                title="Edit Skills"
            >
                <div>
                    <p className='text-sm mb-4 font-semibold text-525'>Add New Skill</p>
                    <input
                        type="text"
                        className="w-full p-3 border focus:outline-none rounded border-bdb"
                        placeholder="Enter new skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && newSkill.trim() !== "") {
                                handleSave();
                            }
                        }}
                    />

                    <p className='text-sm mt-6 mb-4 font-semibold text-525'>Your Skills</p>
                    <div className="flex flex-wrap gap-4">
                        {skills.map((skill, index) => (
                            <div 
                                key={index} 
                                className="flex w-fit capitalize justify-center font-medium items-center rounded-full bg-green text-white py-2 px-6 gap-3"
                            >
                                <span>{skill}</span>
                                <CloseIcon 
                                    onClick={() => handleDeleteSkill(index)} 
                                    color="#ffffff" 
                                    height={24} 
                                    width={24} 
                                    className="cursor-pointer hover:opacity-80" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Skills;