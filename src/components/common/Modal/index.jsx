"use client"
import CloseIcon from "@/components/Icons/CloseIcon.svg";
import React from "react";

const Modal = ({ id, isOpen, onClose, onSave, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 left-0  bg-black/50 top-0 z-50 flex justify-center items-center ">
      <div className="bg-white p-6 mx-4 rounded-lg w-full max-w-[800px]">
        <div className=" flex justify-between items-center mb-6">

        <h2 className="capitalize text-[28px] font-semibold text-3d3 "> {id}</h2>
        <span className="cursor-pointer">
        <CloseIcon onClick={onClose} color={"#707070"} height={32} width={32} />

        </span>
        </div>
        
        {children} {/* Content (Textarea/Input) is passed from parent component */}

        <div className="flex justify-between gap-2 mt-8">
          <button
            className="px-4 py-2 border cursor-pointer border-green text-green text-lg font-semibold w-full max-w-[200px] rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2.5 bg-green cursor-pointer text-white w-full max-w-[200px] rounded-md text-lg font-semibold"
            onClick={onSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
