'use client'
import DownArrowSvg from '@/components/Icons/DownArrowIcon.svg'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PostNotification = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [allActive, setAllActive] = useState(false)
    const [newRecommendedPosts, setNewRecommendedPosts] = useState(true)
    const [postStatusUpdates, setPostStatusUpdates] = useState(true)
    const [draftPostUpdates, setDraftPostUpdates] = useState(true)

    const toggleAll = () => {
        const newState = !allActive
        setAllActive(newState)
        setNewRecommendedPosts(newState)
        setPostStatusUpdates(newState)
        setDraftPostUpdates(newState)
    }

    return (
        <div className='border-b border-[#DCDCDC] '>
            {/* Header with click handler */}
            <div 
                className='flex justify-between items-center py-4 cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className='text-525 md:text-xl capitalize font-semibold'>posts notifications</h1>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <DownArrowSvg height={40} width={40} color={"#525252"} />
                </motion.div>
            </div>

            {/* Animated content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                    >
                        {/* active all notifications */}
                        <div className='flex justify-between items-center py-4'>
                            <h1 className={`${allActive ? "text-5d5" : "text-989"} md:text-xl capitalize font-semibold`}>
                                active all posts notifications
                            </h1>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${allActive ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={toggleAll}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* New Recommended Posts */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${newRecommendedPosts ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    New Recommended Posts
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Get notified when new recommended posts match your preferences.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${newRecommendedPosts ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setNewRecommendedPosts(!newRecommendedPosts)}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Submitted similar Post Status */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${postStatusUpdates ? "text-5d5" : "text-989"}  md:text-lg capitalize font-semibold`}>
                                    Submitted similar Post Status
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Receive updates when a submitted similar post is approved, rejected, or needs revision.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${postStatusUpdates ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setPostStatusUpdates(!postStatusUpdates)}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Draft Post Updates */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${draftPostUpdates ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    Draft Post Updates
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Get notified when your draft posts are saved or updated.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${draftPostUpdates ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setDraftPostUpdates(!draftPostUpdates)}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PostNotification