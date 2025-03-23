import Modal from "@/components/common/Modal";
import EditIcon from "@/components/Icons/EditIcon.svg";
import React, { useState } from "react"; // Replace with your actual icon component

const Summary = ({ summary, setSummary }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSave = () => handleCloseModal();
  return (
    <div className="rounded-2xl bg-white p-6">
     
        <h1 className="capitalize text-[28px] font-semibold text-3d3">Summary</h1>
        <div className='flex justify-between '>
        <p className='text-989 mb-6'>Highlight your experience, skills, and career goals to showcase your expertise to potential employers.</p>
        <button onClick={handleOpenModal}>
          <EditIcon color={"#707070"} height={32} width={32} />
        </button>
        </div>
    
      <p className="text-lg text-344 tracking-[0.3px] leading-[36px]">{summary}</p>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} id="Summery">
        <textarea
          className="w-full text-lg text-344 tracking-[0.3px] leading-[36px] p-2 h-[356px] border border-gray rounded"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
        />
      </Modal>
    </div>
  );
};

export default Summary;
