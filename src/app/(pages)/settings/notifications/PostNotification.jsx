'use client'
import DownArrowSvg from '@/components/Icons/DownArrowIcon.svg'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updateNotificationSettings } from './useNotificationSetting'
import { useDispatch } from 'react-redux'
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice'

const PostNotification = ({ settings, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localSettings, setLocalSettings] = useState({
        allActive: false,
        newRecommendedPosts: false,
        postStatusUpdates: false,
        draftPostUpdates: false
    });

    const dispatch = useDispatch()
    // Initialize local state when settings prop changes
    useEffect(() => {
        if (settings) {
            setLocalSettings({
                allActive: settings.post?.activeAll || false,
                newRecommendedPosts: settings.post?.newRecommendedPosts || false,
                postStatusUpdates: settings.post?.submittedPostStatus || false,
                draftPostUpdates: settings.post?.draftPostUpdates || false
            });
        }
    }, [settings]);

    const toggleAll = async () => {
        const newState = !localSettings.allActive;
        const updatedSettings = {
            ...localSettings,
            allActive: newState,
            newRecommendedPosts: newState,
            postStatusUpdates: newState,
            draftPostUpdates: newState
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
            const postsSettings = {
                activeAll: updatedLocalSettings.allActive,
                newRecommendedPosts: updatedLocalSettings.newRecommendedPosts,
                submittedPostStatus: updatedLocalSettings.postStatusUpdates,
                draftPostUpdates: updatedLocalSettings.draftPostUpdates
            };
            
            const response = await updateNotificationSettings(settings.documentId, {
                post: postsSettings
            });
            
            onUpdate(prev => ({
                ...prev,
                post: postsSettings
            }));
            dispatch(checkUserStatus())
            return response;
        } catch (error) {
            console.error('Error saving post notification settings:', error);
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
                        <div className='flex justify-between gap-4 items-center py-4'>
                            <h1 className={`${localSettings.allActive ? "text-5d5" : "text-989"} md:text-xl capitalize font-semibold`}>
                                active all posts notifications
                            </h1>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.allActive ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={toggleAll}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* New Recommended Posts */}
                        <div className='flex justify-between gap-4 py-4'>
                            <div>
                                <h1 className={`${localSettings.newRecommendedPosts ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    New Recommended Posts
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Get notified when new recommended posts match your preferences.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.newRecommendedPosts ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => handleToggle('newRecommendedPosts')}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Submitted similar Post Status */}
                        <div className='flex justify-between gap-4 py-4'>
                            <div>
                                <h1 className={`${localSettings.postStatusUpdates ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    Submitted similar Post Status
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Receive updates when a submitted similar post is approved, rejected, or needs revision.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.postStatusUpdates ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => handleToggle('postStatusUpdates')}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Draft Post Updates */}
                        <div className='flex justify-between gap-4 py-4'>
                            <div>
                                <h1 className={`${localSettings.draftPostUpdates ? "text-5d5" : "text-989"} md:text-lg capitalize font-semibold`}>
                                    Draft Post Updates
                                </h1>
                                <h4 className='text-989 text-xs md:text-sm capitalize'>Get notified when your draft posts are saved or updated.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`min-w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${localSettings.draftPostUpdates ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => handleToggle('draftPostUpdates')}
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