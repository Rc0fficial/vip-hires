'use client'
import DownArrowSvg from '@/components/Icons/DownArrowIcon.svg'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const JobNotification = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [allActive, setAllActive] = useState(false)
    const [newJobMatches, setNewJobMatches] = useState(false)
    const [applicationUpdates, setApplicationUpdates] = useState(false)
    const [jobRecommendations, setJobRecommendations] = useState(false)
    const [savedJobReminders, setSavedJobReminders] = useState(false)
    const [employerMessages, setEmployerMessages] = useState(false)

    const toggleAll = () => {
        const newState = !allActive
        setAllActive(newState)
        setNewJobMatches(newState)
        setApplicationUpdates(newState)
        setJobRecommendations(newState)
        setSavedJobReminders(newState)
        setEmployerMessages(newState)
    }

    return (
        <div className='border-b border-[#DCDCDC] '>
            {/* Header with click handler */}
            <div 
                className='flex justify-between items-center py-4 cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className='text-525 text-xl capitalize font-semibold'>job notifications</h1>
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
                            <h1 className={`${allActive ? "text-5d5" : "text-989"} text-xl capitalize font-semibold`}>
                                active all job notifications
                            </h1>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${allActive ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={toggleAll}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* New Job Matches */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${newJobMatches ? "text-5d5" : "text-989"} text-lg capitalize font-semibold`}>
                                    New Job Matches
                                </h1>
                                <h4 className='text-989 text-sm capitalize'>Get notified when new jobs match your preferences.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${newJobMatches ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setNewJobMatches(!newJobMatches)}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Application Updates */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${applicationUpdates ? "text-5d5" : "text-989"} text-lg capitalize font-semibold`}>
                                    Application Updates
                                </h1>
                                <h4 className='text-989 text-sm capitalize'>Receive updates when your application is viewed, shortlisted, or rejected.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${applicationUpdates ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setApplicationUpdates(!applicationUpdates)}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Job Recommendation Alerts */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${jobRecommendations ? "text-5d5" : "text-989"} text-lg capitalize font-semibold`}>
                                    Job Recommendation Alerts
                                </h1>
                                <h4 className='text-989 text-sm capitalize'>Get personalized job suggestions based on your skills.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${jobRecommendations ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setJobRecommendations(!jobRecommendations)}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Saved Job Reminders */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${savedJobReminders ? "text-5d5" : "text-989"} text-lg capitalize font-semibold`}>
                                    Saved Job Reminders
                                </h1>
                                <h4 className='text-989 text-sm capitalize'>Receive alerts before a saved job listing expires.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${savedJobReminders ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setSavedJobReminders(!savedJobReminders)}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Employer Messages */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${employerMessages ? "text-5d5" : "text-989"} text-lg capitalize font-semibold`}>
                                    Employer Messages
                                </h1>
                                <h4 className='text-989 text-sm capitalize'>Get notified when employers message you.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${employerMessages ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setEmployerMessages(!employerMessages)}
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

export default JobNotification