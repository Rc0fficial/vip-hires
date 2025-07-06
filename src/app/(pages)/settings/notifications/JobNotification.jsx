'use client'
import DownArrowSvg from '@/components/Icons/DownArrowIcon.svg'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { updateNotificationSettings } from './useNotificationSetting'
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice'

const JobNotification = ({ settings, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localSettings, setLocalSettings] = useState({
        allActive: false,
        newJobMatches: false,
        applicationUpdates: false,
        jobRecommendations: false,
        savedJobReminders: false,
        employerMessages: false
    });
const dispatch = useDispatch()
    // Initialize local state when settings prop changes
    useEffect(() => {
        if (settings) {
            setLocalSettings({
                allActive: settings.job?.activeAll || false,
                newJobMatches: settings.job?.newJobMatches || false,
                applicationUpdates: settings.job?.applicationUpdates || false,
                jobRecommendations: settings.job?.jobRecommendations || false,
                savedJobReminders: settings.job?.savedJobReminders || false,
                employerMessages: settings.job?.employerMessages || false
            });
        }
    }, [settings]);

    const toggleAll = async () => {
        const newState = !localSettings.allActive;
        const updatedSettings = {
            ...localSettings,
            allActive: newState,
            newJobMatches: newState,
            applicationUpdates: newState,
            jobRecommendations: newState,
            savedJobReminders: newState,
            employerMessages: newState
        };
        
        setLocalSettings(updatedSettings);
        await saveSettings(updatedSettings);
    };

    const handleToggle = async (field) => {
        const updatedSettings = {
            ...localSettings,
            [field]: !localSettings[field]
        };
        
        // If turning off a specific setting, ensure "allActive" is also turned off
        if (updatedSettings[field] === false && updatedSettings.allActive === true) {
            updatedSettings.allActive = false;
        }
        
        setLocalSettings(updatedSettings);
        await saveSettings(updatedSettings);
    };

    const saveSettings = async (updatedLocalSettings) => {
        try {
            const jobSettings = {
                activeAll: updatedLocalSettings.allActive,
                newJobMatches: updatedLocalSettings.newJobMatches,
                applicationUpdates: updatedLocalSettings.applicationUpdates,
                jobRecommendations: updatedLocalSettings.jobRecommendations,
                savedJobReminders: updatedLocalSettings.savedJobReminders,
                employerMessages: updatedLocalSettings.employerMessages
            };
            
            const response = await updateNotificationSettings(settings.documentId, {
                job: jobSettings
            });
            
            onUpdate(prev => ({
                ...prev,
                job: jobSettings
            }));
            dispatch(checkUserStatus())
            return response;
        } catch (error) {
            console.error('Error saving job notification settings:', error);
            // Revert local state on error
            setLocalSettings({
                ...localSettings
            });
        }
    };

    return (
        <div className='border-b border-[#DCDCDC] '>
            {/* Header with click handler */}
            <div 
                className='flex justify-between items-center py-4 cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className='text-525 md:text-xl capitalize font-semibold'>job notifications</h1>
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
                        <div className='flex justify-between items-center gap-4 py-4'>
                            <h1 className={`${localSettings.allActive ? "text-5d5" : "text-989"} md:text-xl capitalize font-semibold`}>
                                active all job notifications
                            </h1>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.allActive ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={toggleAll}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* New Job Matches */}
                        <div className='flex justify-between gap-4 py-4'>
                            <div>
                                <h1 className={`${localSettings.newJobMatches ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    New Job Matches
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Get notified when new jobs match your preferences.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.newJobMatches ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => handleToggle('newJobMatches')}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Application Updates */}
                        <div className='flex justify-between gap-4 py-4'>
                            <div>
                                <h1 className={`${localSettings.applicationUpdates ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    Application Updates
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Receive updates when your application is viewed, shortlisted, or rejected.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.applicationUpdates ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => handleToggle('applicationUpdates')}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Job Recommendation Alerts */}
                        <div className='flex justify-between gap-4 py-4'>
                            <div>
                                <h1 className={`${localSettings.jobRecommendations ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    Job Recommendation Alerts
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Get personalized job suggestions based on your skills.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.jobRecommendations ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => handleToggle('jobRecommendations')}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Saved Job Reminders */}
                        <div className='flex justify-between gap-4 py-4'>
                            <div>
                                <h1 className={`${localSettings.savedJobReminders ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    Saved Job Reminders
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Receive alerts before a saved job listing expires.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.savedJobReminders ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => handleToggle('savedJobReminders')}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Employer Messages */}
                        <div className='flex justify-between gap-4 py-4'>
                            <div>
                                <h1 className={`${localSettings.employerMessages ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    Employer Messages
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Get notified when employers message you.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.employerMessages ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => handleToggle('employerMessages')}
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