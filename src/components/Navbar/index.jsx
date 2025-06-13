'use client';
import { useEffect, useRef, useState } from "react";
import { CiRepeat, CiSearch, } from "react-icons/ci";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Image from "next/image";
import GlobeIcon from "../Icons/GlobeIcon.svg";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import UserIcon from "../Icons/UserIcon.svg";
import SettingIcon from "../Icons/SettingIcon.svg";
import SwitchAccountIcon from "../Icons/SwitchAccountIcon.svg";
import LogOutIcon from "../Icons/LogOutIcon";
import Notification from "./Notification";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiFileText, FiHome } from "react-icons/fi";
import { LuBadgeCheck, LuBriefcase } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus, logout } from "@/app/Store/ReduxSlice/authSlice";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const ishidden = pathname === "/login" || pathname === "/login/create-account";
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const dropdownRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [size, setSize] = useState({ width: 21, height: 20 });
    const [openJobs, setOpenJobs] = useState(false);
    const [openPosts, setOpenPosts] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const router = useRouter()
    const updateSize = () => {
        const isLarge = window.innerWidth <= 1024;
        setSize(isLarge ? { width: 24, height: 24 } : { width: 21, height: 20 });
    };

    useEffect(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    const { user, isAuthenticated,userProfile } = useSelector((state) => state.auth);
    // console.log(user, isAuthenticated)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(checkUserStatus())

    }, [])

    
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
                { name: "My Applications", path: "/posts/my-applications" },
                { name: "Saved Posts", path: "/posts/draft-posts" }
            ]
        },
        { name: "Subscription", path: "/subscription" },
        { name: "Help & Support", path: "/help-support" },
    ];

    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    const handleLogout =()=>{
        dispatch(logout())
        router.push('/login')
    }
const handleProfileEnter=()=>{
    if(isAuthenticated){
        setIsOpenMenu(true)
    }
}

const handleProfileClick =()=>{
if(!isAuthenticated){
    router.push('/login')
}
}
console.log(userProfile)
    return (
        <div className={`${ishidden ? "hidden" : "block"} bg-white/80 shadow-md  md:px-10 sticky top-0 z-50`}>
            <nav className="flex items-center justify-between  p-6 mx-auto">
                {/* Mobile Menu Icon */}
                <FaBars
                    size={24}
                    className="text-green cursor-pointer xl:hidden"
                    onClick={() => setIsOpen(true)}
                />
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
                                className={`relative nav-dropdown-trigger hover:text-5d5 text-xl font-medium cursor-pointer ${(link.path === "/jobs" &&
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
                    <div className="relative hidden lg:block mont">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 h-12 w-full max-w-[240px] border border-[#0000001A] rounded-full focus:outline-none"
                        />
                        <CiSearch className="absolute left-3 top-[14px] text-gray" size={20} />
                    </div>
                    <div className="h-12 w-12 border hidden border-[#1877F240] text-gray lg:flex justify-center items-center rounded-full">
                        <GlobeIcon />
                    </div>
                    <Notification divClass={'lg:border'} iconHeight={size.height} iconWidth={size.height} />
                    <div className="relative hidden lg:block" ref={dropdownRef}>
                        {/* Profile Image */}
                        <button onMouseEnter={handleProfileEnter} onClick={handleProfileClick}>
                            <Image
                                src={userProfile?.profileImage?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${userProfile?.profileImage?.url}` : "/assets/profile.png" }
                                alt="Profile"
                                width={45}
                                height={45}
                                className="rounded-full h-12 w-12 cursor-pointer object-center"
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
                                        <li onClick={() => setIsOpenMenu(false)} className="px-4 cursor-pointer py-4 border-b border-[#29292929] text-525 hover:bg-gray-100 flex items-center gap-1">
                                            <UserIcon height={24} width={24} color={"#525252"} />
                                            Profile
                                        </li>
                                    </Link>
                                    <Link href="/settings">
                                        <li onClick={() => setIsOpenMenu(false)} className="px-4 cursor-pointer py-4 border-b border-[#29292929] text-525 hover:bg-gray-100 flex items-center">
                                            <SettingIcon height={24} width={24} color={"#525252"} />
                                            Settings
                                        </li>
                                    </Link>
                                    <Link href="/">
                                        <li onClick={() => setIsOpenMenu(false)} className="px-4 cursor-pointer py-4 border-b border-[#29292929] text-525 hover:bg-gray-100 flex items-center">
                                            <SwitchAccountIcon height={24} width={24} color={"#525252"} />
                                            Switch Accounts
                                        </li>
                                    </Link>
                                  
                                        <li onClick={() => {setIsOpenMenu(false),handleLogout()}} className="px-4 cursor-pointer py-4 text-[#D31510] hover:bg-gray-100 flex items-center">
                                            <LogOutIcon height={24} width={24} color={"#D31510"} />
                                            Log Out
                                        </li>
                                   
                                </ul>
                            </motion.div>
                        )}
                    </div>

                </div>

                {isOpen ? (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="-inset-0 bg-black/30 fixed top-0 h-screen w-screen z-40"
                    />
                ) : null}

                {/* Mobile Sidebar */}
                <div
                    className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${isOpen ? '-translate-x-0' : '-translate-x-full'
                        } transition-transform duration-300 ease-in-out pl-5 z-50`}
                >
                    {/* Top Profile Section */}
                    <Link href={'/profile'}>
                        <div className="border border-green rounded-md p-2 mr-5 mt-12 bg-[#EBFEF5] flex items-center gap-2 mb-6">
                            <img
                                src="/assets/profile.png"
                                alt="Profile"
                                className="h-10 w-10 rounded-full"
                            />
                            <div>
                                <h1 className="font-medium text-sm text-black">Mohamed Ali</h1>
                                <h1 className="font-medium text-xs text-[#5D5D5D]">UI/UX Designer</h1>
                            </div>
                        </div>
                    </Link>

                    {/* Sidebar Links */}
                    <ul className="space-y-6">
                        <li onClick={() => setIsOpen(false)} className={`${pathname === "/" ? "border-r-4 border-green text-green" : "text-5d5"}`}>
                            <Link href="/" className="flex items-center gap-3 ">
                                <FiHome size={18} /> Home
                            </Link>
                        </li>

                        <li className={``}>
                            <button
                                onClick={() => {
                                    setOpenJobs(!openJobs);
                                    setOpenPosts(false);
                                    setOpenSetting(false);
                                }}
                                className={`flex items-center gap-6 w-full ${pathname.startsWith("/jobs") ? " text-green border-r-4" : "text-5d5"} `}
                            >
                                <span className="flex items-center gap-3">
                                    <LuBriefcase size={18} /> Jobs
                                </span>
                                {openJobs ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                            </button>
                            {openJobs && (
                                <ul className="pl-7 mt-2 space-y-4 text-xs text-5d5">
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/jobs" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/jobs">• Recommended Jobs</Link>
                                    </li>
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/jobs/my-applications" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/jobs/my-applications">• My Application</Link>
                                    </li>
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/jobs/saved-jobs" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/jobs/saved-jobs">• Saved Jobs</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <button
                                onClick={() => {
                                    setOpenPosts(!openPosts);
                                    setOpenJobs(false);
                                    setOpenSetting(false);
                                }}
                                className={`flex items-center gap-6 w-full ${pathname.startsWith("/posts") ? " text-green border-r-4" : "text-5d5"} `}
                            >
                                <span className="flex items-center gap-3">
                                    <FiFileText size={18} /> Posts
                                </span>
                                {openPosts ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                            </button>
                            {openPosts && (
                                <ul className="pl-7 mt-2 space-y-4 text-sm text-5d5">
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/posts/" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/posts/">• Recommended Posts</Link>
                                    </li>
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/posts/my-applications" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/posts/my-applications">• My Application</Link>
                                    </li>
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/posts/draft-posts" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/posts/draft-posts">• Saved Posts</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li onClick={() => setIsOpen(false)}>
                            <Link href="/subscription" className="flex items-center gap-3 text-5d5">
                                <LuBadgeCheck size={18} /> Subscription
                            </Link>
                        </li>
                        <li onClick={() => setIsOpen(false)}>
                            <Link href="/help-support" className="flex items-center gap-3 text-5d5">
                                <AiOutlineExclamationCircle size={18} /> Help & Support
                            </Link>
                        </li>
                        <li onClick={() => setIsOpen(false)}>
                            <Link href="/language" className="flex items-center gap-3 text-5d5">
                                <GlobeIcon height={20} width={20} color={"#5d5d5d"} /> Language
                            </Link>
                        </li>
                        <li className={``}>
                            <button
                                onClick={() => {
                                    setOpenSetting(!openSetting);
                                    setOpenJobs(false);
                                    setOpenPosts(false);
                                }}
                                className={`flex items-center gap-6 w-full ${pathname.startsWith("/settings") ? " text-green border-r-4" : "text-5d5"} `}
                            >
                                <span className="flex items-center gap-3">
                                    <SettingIcon height={26} width={26} color={`${pathname.startsWith("/settings") ? "#009969" : "#5d5d5d"}`} /> Setting
                                </span>
                                {openSetting ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                            </button>
                            {openSetting && (
                                <ul className="pl-7 mt-2 space-y-4 text-xs text-5d5">
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/settings" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/settings">• Sign In & Security</Link>
                                    </li>
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/settings/subscription" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/settings/subscription">• Subscription Setting</Link>
                                    </li>
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/settings/notifications" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/settings/notifications">• Notifications</Link>
                                    </li>
                                    <li onClick={() => setIsOpen(false)} className={`${pathname === "/settings/payments" ? " text-green" : "text-5d5"}`}>
                                        <Link href="/settings/payments">• Payment Setting </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>

                    {/* Bottom Section */}
                    <div className="absolute bottom-5 left-5 space-y-3 w-[calc(100%-2.5rem)]">
                        <Link href="/switch" className="flex items-center gap-3 text-5d5">
                            <SwitchAccountIcon height={24} width={24} /> Switch Account
                        </Link>
                        <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-red-500">
                            <LogOutIcon height={24} width={24} /> Log Out
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;