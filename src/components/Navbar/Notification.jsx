'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import BellIcon from '../Icons/BellIcon.svg';
const Notification = () => {
    const [notificationMenu, setNotificationMenu] = useState(false);
    const menuRef = useRef(null);

    // Sample notifications
    const notifications = [
        { id: 1, title: "Your subscription is about to expire, renew now", date: "February 26, 2023", read: true },
        { id: 2, title: "your application have submetted successfully ", date: "5 days ago", read: false },
        { id: 2, title: "Your subscription is about to expire, renew your subscription now", date: "5 days ago", read: true },
        { id: 2, title: "Your subscription is about to expire, renew now", date: "5 days ago", read: false },
        { id: 3, title: "Your subscription is about to expire, renew your subscription now", date: "March 1, 2023", read: true },
        { id: 2, title: "Your application has been submitted successfully", date: "5 days ago", read: false },
        { id: 3, title: "Your subscription is about to expire, renew your subscription now", date: "March 1, 2023", read: true },
        { id: 2, title: "Your subscription is about to expire, renew now", date: "5 days ago", read: false },
    ];

       // Handle click outside to close
       useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setNotificationMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    // Toggle notification menu on click (works for all devices)
    const handleClick = () => {
        setNotificationMenu(!notificationMenu);
    };

    // Show on hover (only for large screens)
    const handleMouseEnter = () => {
        if (window.innerWidth >= 768) {
            setNotificationMenu(true);
        }
    };

    // Hide on mouse leave (only for large screens)
    const handleMouseLeave = () => {
        if (window.innerWidth >= 768) {
            setNotificationMenu(false);
        }
    };

    return (
        <div ref={menuRef} className="md:relative static  overflow-visible">
            {/* Bell Icon */}
            <div
                className="h-12 w-12 border border-[#1877F240] text-gray flex justify-center items-center rounded-full relative cursor-pointer"
                onClick={handleClick} // Always works on click
                onMouseEnter={handleMouseEnter} // Only works on large screens
            >
                <BellIcon height={20} width={21} stroke={"#C7C7C7"} />
                {notifications.length > 0 && (
                    <div className="absolute w-[14px] h-[14px] rounded-full text-[9px] text-white bg-[#FF6B6B] flex justify-center items-center right-2 top-2">
                        {notifications.length}
                    </div>
                )}
            </div>

            {/* Notification Dropdown */}

            {notificationMenu && (
                <motion.div

                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-[320px] md:w-[582px] bg-white shad rounded-lg overflow-hidden"
                >

                    <div className="max-h-[700px] overflow-y-auto w-full"  onMouseLeave={handleMouseLeave}>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.id} className={`px-6 py-5 border-gray border-b last:border-none flex gap-3 ${notification.read ? "":"bg-[#EDEEF1]"} `}>
                                    <div className='h-12 min-w-12 flex bg-white border rounded-full border-gray justify-center items-center'>
                                        <img src="/assets/logoArrow.png" alt="logo" className='h-6 w-6' />
                                    </div>
                                    <div>

                                        <p className="text-gray font-medium"><span className='font-bold text-3d3 mr-2'>ApplyPro</span>{notification.title}</p>
                                        <p className="text-xs text-gray-500">{notification.date}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-center text-gray-500">No new notifications</p>
                        )}
                    </div>
                </motion.div>
            )}

        </div>
    )
}

export default Notification
