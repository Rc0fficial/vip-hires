'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DownArrowSvg from '@/components/Icons/DownArrowIcon.svg';
import ShareIcon from '@/components/Icons/ShareIcon.svg';
import SendIconSvg from '@/components/Icons/SendIconSvg';

const Notify = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" bottom-4 right-4 z-50">
      {/* Minimized Chat Notification */}
      
        
      

      {/* Animated Expanded Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-box"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[380px] bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/profile.png"
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="font-semibold">Sarah Amr</h1>
                  <p className="text-xs text-[#7F7F7F]">Applypro Employee</p>
                </div>
              </div>
              <button onClick={toggleChat} className="flex justify-center items-center  rounded-full bg-[#F5F5F5]">
                <DownArrowSvg height={24} width={24} color={"#707070"} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-4">
              <div className="text-gray-700 bg-[#F5F5F5] p-3 rounded-xl w-fit">
                Hello and thanks for getting in touch with us! What can we help you with today?
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="shad px-4 py-2 rounded-full text-sm">Where are you located?</div>
                <div className="shad px-4 py-2 rounded-full text-sm">How else can I contact you?</div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-dcd p-2 flex items-center">
              <input
                type="text"
                placeholder="Ask a question..."
                className="flex-1 p-2 outline-none text-sm"
              />
              <button className="p-2">
              <SendIconSvg height={18} width={20} color={"#7F7F7F"} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`${className} bg-green cursor-pointer p-4 mt-4 mr-auto rounded-xl w-full max-w-[380px] flex justify-between items-center`}
          onClick={toggleChat}
        >
          <div className="flex items-center gap-2">
            <img
              src="/assets/profile.png"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-white font-bold">Sarah Amr</h1>
              <p className="text-xs text-white">Applypro Employee</p>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full text-green-600 bg-white flex justify-center items-center font-bold">
            2
          </div>
        </div>
    </div>
  );
};

export default Notify;
