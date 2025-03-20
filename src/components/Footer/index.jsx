"use client"
import React from 'react'
import LinkedinIcon from '../Icons/LinkedinIcon.svg'
import FacecookIcon from '../Icons/FacebookIcon.svg'
import InstagramIcon from '../Icons/InstagramIcon'
import { usePathname } from 'next/navigation'

const Footer = ({bg}) => {
const pathname = usePathname()

    return (
        <div className={`py-8 ${pathname ==="/login"&& "hidden"} ${bg} border-t border-gray px-6 md:px-10 lg:px-32`}>
            <div className='container mx-auto px-6 flex justify-between flex-wrap gap-10 items-center'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-[32px] font-semibold mont text-green'>Pro</h1>
                    <img src="/assets/logoArrow.png" alt="" className='w-6 h-6' />
                </div>
                <p className=''>© 2019 All rights reserved to applypro</p>

                <div className='flex items-center gap-6'>
                    <div className='h-[45px] w-[45px] border-2 border-[#0A142F50] rounded-full flex justify-center items-center '>
                        <LinkedinIcon color={"#0A142F"} height={13.5} width={13.5} />
                    </div>
                    <div className='h-[45px] w-[45px] border-2 border-[#0A142F50] rounded-full flex justify-center items-center '>
                        <FacecookIcon color={"#0A142F"} height={13.5} width={13.5} />
                    </div>
                    <div className='h-[45px] w-[45px] border-2 border-[#0A142F50] rounded-full flex justify-center items-center '>
                        <InstagramIcon color={"#0A142F"} height={13.5} width={13.5} />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Footer
