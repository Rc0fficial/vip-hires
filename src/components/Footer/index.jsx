"use client"
import React from 'react'
import LinkedinIcon from '../Icons/LinkedinIcon.svg'
import FacecookIcon from '../Icons/FacebookIcon.svg'
import InstagramIcon from '../Icons/InstagramIcon'
import { usePathname } from 'next/navigation'

const Footer = ({ bg }) => {
    const pathname = usePathname()

    return (
        <div className={`py-8 ${pathname === "/login" ||
                pathname === "/login/register" ||
                pathname === "/login/reset-password" ||
                pathname === "/login/verify-email" ||
                pathname === "/login/new-password"
                ? "hidden" : ""
            } ${bg} border-t border-gray  md:px-10 w-screen overflow-hidden`}>
            <div className=' mx-auto px-6 flex justify-between flex-wrap gap-10 items-center'>
                <div className='flex justify-between w-full items-center'>

                    <div className='flex items-center gap-3'>
                        <h1 className='text-[32px] font-semibold mont text-green'>Pro</h1>
                        <img src="/assets/logoArrow.png" alt="" className='w-6 h-6' />
                    </div>
                    <div className='flex md:hidden items-center gap-2 md:gap-6'>
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='h-[45px] w-[45px] border-2 border-[#0A142F50] rounded-full flex justify-center items-center'
                        >
                            <LinkedinIcon color={"#0A142F"} height={13.5} width={13.5} />
                        </a>

                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='h-[45px] w-[45px] border-2 border-[#0A142F50] rounded-full flex justify-center items-center'
                        >
                            <FacecookIcon color={"#0A142F"} height={13.5} width={13.5} />
                        </a>

                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='h-[45px] w-[45px] border-2 border-[#0A142F50] rounded-full flex justify-center items-center'
                        >
                            <InstagramIcon color={"#0A142F"} height={13.5} width={13.5} />
                        </a>
                    </div>
                </div>
                <p className='text-sm md:text-[16px] text-centeer md:text-left'>© 2019 All rights reserved to applypro</p>

                <div className='hidden md:flex items-center gap-6'>
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='h-[45px] w-[45px] border-2 border-[#0A142F50] rounded-full flex justify-center items-center'
                    >
                        <LinkedinIcon color={"#0A142F"} height={13.5} width={13.5} />
                    </a>

                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='h-[45px] w-[45px] border-2 border-[#0A142F50] rounded-full flex justify-center items-center'
                    >
                        <FacecookIcon color={"#0A142F"} height={13.5} width={13.5} />
                    </a>

                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='h-[45px] w-[45px] border-2 border-[#0A142F50] rounded-full flex justify-center items-center'
                    >
                        <InstagramIcon color={"#0A142F"} height={13.5} width={13.5} />
                    </a>
                </div>

            </div>

        </div>
    )
}

export default Footer
