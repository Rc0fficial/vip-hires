'use client';
import { useEffect, useRef, useState } from "react";
import { PiBellBold } from "react-icons/pi";
import { CiGlobe, CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import BellIcon from "../Icons/BellIcon.svg";
import GlobeIcon from "../Icons/GlobeIcon.svg";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import UserIcon from "../Icons/UserIcon.svg";
import SettingIcon from "../Icons/SettingIcon.svg";
import SwitchAccountIcon from "../Icons/SwitchAccountIcon.svg";
import LogOutIcon from "../Icons/LogOutIcon";
import Notification from "./Notification";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const ishidden = pathname === "/login" || pathname === "/login/create-account";
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const dropdownRef = useRef(null);
    const [notificationMenu, setNotificationMenu] = useState(false);
    const menuRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // Define navigation links and their corresponding routes
    const navLinks = [
        { name: "Jobs", path: "/jobs" },
        { name: "Posts", path: "/posts" },
        { name: "Subscription", path: "/subscription" },
        { name: "Help & Support", path: "/help-support" },
    ];
   
    // Function to handle navigation
    const handleNavigation = (path) => {
        // router.push(path);
        setIsOpen(false); // Close mobile sidebar after navigation
    };
    

    return (
        <div className={`${ishidden ? "hidden" : "block"} bg-white/80 shadow-md px-6 md:px-10 sticky top-0 z-50`}>
            <nav className="flex items-center justify-between p-8 mx-auto">
                {/* Left Section */}
                <div className="flex items-center gap-20">
                    <Link href={'/'}><img src="/assets/logo.png" alt="logo" className="h-8 cursor-pointer -mb-2 w-auto" />
                    </Link>
                    {/* Desktop Navigation Links */}
                    <ul className="hidden xl:flex items-center gap-6 2xl:gap-8 text-gray">
                        {navLinks.map((link, index) => (
                            <li
                                key={index}
                                className={`hover:text-black text-xl font-medium cursor-pointer ${(link.path === "/jobs" && (pathname === "/jobs" || pathname.startsWith("/job/"))) ||
                                        (link.path !== "/jobs" && pathname === link.path)
                                        ? "text-green border-b-2"
                                        : "text-gray"
                                    }`}

                            >
                                <Link href={`${link.path}`}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <div className="relative hidden xl:block mont">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 h-12 w-full max-w-[240px] border border-[#0000001A] rounded-full focus:outline-none"
                        />
                        <CiSearch className="absolute left-3 top-[14px] text-gray" size={20} />
                    </div>
                    <div className="h-12 w-12 border border-[#1877F240] text-gray flex justify-center items-center rounded-full">
                        <GlobeIcon />
                    </div>
                    <Notification />
                    <div className="relative" ref={dropdownRef}>
                        {/* Profile Image */}
                        <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
                            <Image
                                src="/assets/profile.png" // Replace with actual profile image URL
                                alt="Profile"
                                width={45}
                                height={45}
                                className="rounded-full cursor-pointer"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isOpenMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-[300px] bg-white shadow-lg rounded-md border border-gray-200"
                            >
                                <ul className="text-sm">
                                    <li className="px-4 py-4 border-b border-[#29292929] text-525  hover:bg-gray-100 flex items-center gap-1">
                                        <UserIcon height={24} width={24} color={"#525252"} />
                                        <Link href="/profile">Profile</Link>
                                    </li>
                                    <li className="px-4 py-4 border-b border-[#29292929] text-525 hover:bg-gray-100 flex items-center">
                                        <SettingIcon height={24} width={24} color={"#525252"} />
                                        <Link href="/settings">Settings</Link>
                                    </li>
                                    <li className="px-4 py-4 border-b border-[#29292929] text-525 hover:bg-gray-100 flex items-center">
                                        <SwitchAccountIcon height={24} width={24} color={"#525252"} />
                                        <Link href="/">Switch Accounts</Link>
                                    </li>
                                    <li className="px-4 py-4 text-[#D31510] hover:bg-gray-100 flex items-center t">
                                        <LogOutIcon height={24} width={24} color={"#D31510"} />
                                        <Link href="/login">Log Out</Link>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>
                    {/* Mobile Menu Icon */}
                    <RxHamburgerMenu
                        size={24}
                        className="text-gray cursor-pointer xl:hidden"
                        onClick={() => setIsOpen(true)}
                    />
                </div>

                {/* Mobile Sidebar */}
                <div
                    className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
                        } transition-transform duration-300 ease-in-out p-5`}
                >
                    <div className="flex justify-end">
                        <AiOutlineClose
                            size={24}
                            className="text-gray-700 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                    <ul className="flex flex-col gap-6 mt-8 text-gray-600">
                        {navLinks.map((link, index) => (
                            <li
                                key={index}
                                className={`hover:text-black text-lg cursor-pointer ${pathname === link.path ? "text-black" : "text-gray-600"
                                    }`}
                                onClick={() => handleNavigation(link.path)}
                            >
                                <Link href={`${link.path}`} >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;