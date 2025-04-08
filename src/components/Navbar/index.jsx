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
    const [openDropdown, setOpenDropdown] = useState(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenMenu(false);
            }
            if (!event.target.closest('.nav-dropdown-trigger')) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Define navigation links and their corresponding routes
    const navLinks = [
        {
            name: "Jobs",
            path: "/jobs",
            dropdown: [
                { name: "Recommended Jobs", path: "/jobs/" },
                { name: "My Applications", path: "/jobs/my-applications" },
                { name: "Saved Jobs", path: "/jobs/saved-jobs" }
            ]
        },
        {
            name: "Posts",
            path: "/posts",
            dropdown: [
                { name: "Recommended Posts", path: "/posts/" },
                { name: "My Applications", path: "/posts/" },
                { name: "Saved Posts", path: "/posts/draft-posts" }
            ]
        },
        { name: "Subscription", path: "/subscription" },
        { name: "Help & Support", path: "/help-support" },
    ];

    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    const handleNavigation = (path) => {
        setIsOpen(false); // Close mobile sidebar after navigation
    };

    return (
        <div className={`${ishidden ? "hidden" : "block"} bg-white/80 shadow-md px-6 md:px-10 sticky top-0 z-50`}>
            <nav className="flex items-center justify-between p-8 mx-auto">
                {/* Left Section */}
                <div className="flex items-center gap-20">
                    <Link href={'/'}>
                        <img src="/assets/logo.png" alt="logo" className="h-8 cursor-pointer -mb-2 w-auto" />
                    </Link>
                    {/* Desktop Navigation Links */}
                    <ul className="hidden xl:flex items-center gap-6 2xl:gap-8 text-gray">
                        {navLinks.map((link, index) => (
                            <li
                                key={index}
                                className={`relative nav-dropdown-trigger hover:text-black text-xl font-medium cursor-pointer ${(link.path === "/jobs" &&
                                        (pathname === "/jobs" || pathname.startsWith("/jobs/") || pathname.startsWith("/job/"))) ||
                                        (link.path === "/posts" &&
                                            (pathname === "/posts" || pathname.startsWith("/posts/"))) ||
                                        (link.path !== "/jobs" && link.path !== "/posts" && pathname === link.path)
                                        ? 'text-green'
                                        : ''
                                    }`}
                            >
                                {link.dropdown ? (
                                    <>
                                        <div
                                            className="flex items-center gap-1"
                                            onMouseEnter={() => toggleDropdown(link.name)}
                                        >
                                            {link.name}

                                        </div>

                                        <AnimatePresence>
                                            {openDropdown === link.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-0 mt-2 w-[240px] bg-white shadow-lg rounded-md border border-gray-200 z-50"
                                                >
                                                    <ul className="py-1" onMouseLeave={() => setOpenDropdown(null)}>
                                                        {link.dropdown.map((item, idx) => (
                                                            <li key={idx} onClick={() => setOpenDropdown(null)}>
                                                                <Link
                                                                    href={item.path}
                                                                    className={`block px-4 py-[18px] text-sm text-[#707070] ${idx !== link.dropdown.length - 1 ? "border-b border-dcd" : ""
                                                                        }`}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link href={link.path}>
                                        {link.name}
                                    </Link>
                                )}
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
                    <div className="relative"  ref={dropdownRef}>
                        {/* Profile Image */}
                        <button onMouseEnter={() => setIsOpenMenu(true)}>
                            <Image
                                src="/assets/profile.png"
                                alt="Profile"
                                width={45}
                                height={45}
                                className="rounded-full cursor-pointer"
                            />
                        </button>

                        {/* Profile Dropdown Menu */}
                        {isOpenMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-[300px] bg-white shadow-lg rounded-md border border-gray-200"
                            >
                                <ul className="text-sm" onMouseLeave={() => setIsOpenMenu(false)}>
                                <Link href="/profile">
                                    <li onClick={()=>setIsOpenMenu(false)} className="px-4 cursor-pointer py-4 border-b border-[#29292929] text-525 hover:bg-gray-100 flex items-center gap-1">
                                        <UserIcon height={24} width={24} color={"#525252"} />
                                       Profile
                                    </li>
                                    </Link>
                                    <Link href="/settings">
                                    <li onClick={()=>setIsOpenMenu(false)} className="px-4 cursor-pointer py-4 border-b border-[#29292929] text-525 hover:bg-gray-100 flex items-center">
                                        <SettingIcon height={24} width={24} color={"#525252"} />
                                        Settings
                                    </li>
                                    </Link>
                                    <Link href="/">
                                    <li onClick={()=>setIsOpenMenu(false)} className="px-4 cursor-pointer py-4 border-b border-[#29292929] text-525 hover:bg-gray-100 flex items-center">
                                        <SwitchAccountIcon height={24} width={24} color={"#525252"} />
                                        Switch Accounts
                                    </li>
                                    </Link>
                                    <Link href="/login">
                                    <li onClick={()=>setIsOpenMenu(false)} className="px-4 cursor-pointer py-4 text-[#D31510] hover:bg-gray-100 flex items-center">
                                        <LogOutIcon height={24} width={24} color={"#D31510"} />
                                        Log Out
                                    </li>
                                    </Link>
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
                        } transition-transform duration-300 ease-in-out p-5 z-50`}
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
                            >
                                {link.dropdown ? (
                                    <div className="flex flex-col">
                                        <div
                                            className="flex items-center justify-between"
                                            onClick={() => toggleDropdown(link.name)}
                                        >
                                            <span>{link.name}</span>
                                            <svg
                                                className={`w-4 h-4 ml-1 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {openDropdown === link.name && (
                                            <div className="pl-4 mt-2 flex flex-col gap-2">
                                                {link.dropdown.map((item, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={item.path}
                                                        className="text-gray-600 hover:text-black"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link href={link.path} onClick={() => setIsOpen(false)}>
                                        {link.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;