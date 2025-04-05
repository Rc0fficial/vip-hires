'use client'
import DownArrowSvg from '@/components/Icons/DownArrowIcon.svg'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GeneralNotifications = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [allActive, setAllActive] = useState(false)
    const [accountUpdates, setAccountUpdates] = useState(false)
    const [subscriptionReminders, setSubscriptionReminders] = useState(false)
    const [systemAnnouncements, setSystemAnnouncements] = useState(false)

    const toggleAll = () => {
        const newState = !allActive
        setAllActive(newState)
        setAccountUpdates(newState)
        setSubscriptionReminders(newState)
        setSystemAnnouncements(newState)
    }

    return (
        <div className='border-b border-[#DCDCDC] '>
            {/* Header with click handler */}
            <div 
                className='flex justify-between items-center py-4 cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className='text-525 text-xl capitalize font-semibold'>general notifications</h1>
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
                                active all general settings
                            </h1>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${allActive ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={toggleAll}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* Account updates */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${accountUpdates ? "text-5d5" : "text-989"} text-lg capitalize font-semibold`}>
                                    Account updates
                                </h1>
                                <h4 className='text-989 text-sm capitalize'>Get alerts for password changes, security issues, and login activity.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${accountUpdates ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setAccountUpdates(!accountUpdates)}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* subscription and billing */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${subscriptionReminders ? "text-5d5" : "text-989"} text-lg capitalize font-semibold`}>
                                    Subscription and billing reminders
                                </h1>
                                <h4 className='text-989 text-sm capitalize'>Stay informed on renewals, payments, and billing issues.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${subscriptionReminders ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setSubscriptionReminders(!subscriptionReminders)}
                            >
                                <div className='h-4 w-4 rounded-full bg-white'></div>
                            </div>
                        </div>

                        {/* system announcement */}
                        <div className='flex justify-between py-4'>
                            <div>
                                <h1 className={`${systemAnnouncements ? "text-5d5" : "text-989"} text-lg capitalize font-semibold`}>
                                    System announcements and feature updates
                                </h1>
                                <h4 className='text-989 text-sm capitalize'>Get notified about new features and important changes.</h4>
                            </div>
                            {/* toggle button */}
                            <div 
                                className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer ${systemAnnouncements ? 'bg-green justify-end' : 'bg-dcd justify-start'}`}
                                onClick={() => setSystemAnnouncements(!systemAnnouncements)}
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

export default GeneralNotifications