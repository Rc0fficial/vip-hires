import Modal from "@/components/common/Modal";
import CloseIcon from "@/components/Icons/CloseIcon.svg";
import EditIcon from "@/components/Icons/EditIcon.svg";
import React, { useState } from "react"; // Replace with your actual icon component
const Skills = ({ skills, setSkills }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSkill, setNewSkill] = useState("");

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSave = () => {
        if (newSkill.trim() !== "") {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
        handleCloseModal();
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };
    return (
        <div className="rounded-2xl bg-white p-6">
            <h1 className="text-2xl font-semibold">Skills</h1>
            <div className="flex justify-between items-center">
                <p className='text-989 mb-6'>List your key skills to demonstrate your expertise and improve job matching accuracy.</p>
                <EditIcon onClick={handleOpenModal} color={"#707070"} height={32} width={32} />

            </div>
            <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                    <span key={index} className="flex w-fit capitalize justify-center items-center rounded-full  bg-green text-white py-2 px-6 gap-3">
                        {skill}
                    </span>
                ))}
            </div>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} id="Edit skills">
                <div>


                    {/* Add New Skill Input */}
                    <p className='text-sm mb-4 font-semibold text-525'>Skills</p>
                    <input
                        type="text"
                        className="w-full p-3 border focus outline-0 rounded border-bdb"
                        placeholder="Enter new skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                    />
                    {/* Existing Skills with Delete Button */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        {skills.map((skill, index) => (
                            <div key={index} className="flex w-fit capitalize justify-center font-medium items-center rounded-full  bg-green text-white py-2 px-6 gap-3">
                                <span>{skill}</span>
                                <CloseIcon onClick={() => handleDeleteSkill(index)} color={"#ffffff"} height={24} width={24} className="text-red-500 hover:text-red-700" />

                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Skills;
