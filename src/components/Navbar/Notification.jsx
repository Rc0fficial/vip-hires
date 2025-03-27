'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import BellIcon from '../Icons/BellIcon.svg';
const Notification = () => {
    const [notificationMenu, setNotificationMenu] = useState(false);
    const menuRef = useRef(null);

    // Sample notifications
    const notifications = [
        { id: 1, title: "Your subscription is about to expire, renew now", date: "February 26, 2023" },
        { id: 2, title: "Your application has been submitted successfully", date: "5 days ago" },
        { id: 3, title: "Payment received for your subscription", date: "March 1, 2023" },
    ];

    // Handle click outside to close
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setNotificationMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div ref={menuRef} className="relative  overflow-visible">
            {/* Bell Icon */}
            <div
                className="h-12 w-12 border border-[#1877F240] text-gray flex justify-center items-center rounded-full relative cursor-pointer"
                onClick={() => setNotificationMenu(!notificationMenu)}
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
                    className="absolute right-0 mt-2  w-[400px] bg-white shad rounded-lg overflow-hidden"
                >
                    <div className="p-4 border-b text-lg font-semibold">Notifications</div>
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.id} className="p-4 border-b last:border-none hover:bg-gray-100">
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className="text-xs text-gray-500">{notification.date}</p>
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
