'use client'
import { useState } from "react";
import { PiBellBold } from "react-icons/pi";
import { CiGlobe, CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import BellIcon from "../Icons/BellIcon.svg";
import GlobeIcon from "../Icons/GlobeIcon.svg";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = ["Jobs", "Posts", "Subscription", "Help & Support"];

    return (

        <div className="bg-white shadow-md px-6 md:px-10 lg:px-32 ">
            <nav className="flex items-center justify-between p-4   container mx-auto">
                <div className="flex items-center gap-20">

                    {/* Left Section */}
                    <img src="/assets/logo.png" alt="logo" className="h-6 w-auto" />

                    {/* Desktop Navigation Links */}
                    <ul className="hidden xl:flex items-center gap-6 text-gray">
                        {navLinks.map((link, index) => (
                            <li key={index} className="hover:text-black text-xl font-medium cursor-pointer">
                                {link}
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

                    <GlobeIcon/>
                    </div>
                    <div className="h-12 w-12 border border-[#1877F240] text-gray flex justify-center items-center rounded-full relative">
                    <BellIcon/>
                    <div className="absolute w-[14px] h-[14px] rounded-full mont text-[9px] text-white bg-[#FF6B6B] flex justify-center items-center right-2 top-2">
                        2
                    </div>
                    </div>
                    <Image
                        src="/assets/profile.png" // Replace with actual profile image URL
                        alt="Profile"
                        width={45}
                        height={45}
                        className="rounded-full cursor-pointer"
                    />
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
                            <li key={index} className="hover:text-black text-lg cursor-pointer">
                                {link}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
