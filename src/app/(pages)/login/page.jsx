import React from 'react'
import LoginLayout from './LoginLayout'
import Footer from '@/components/Footer'
import LinkedinIcon from '@/components/Icons/LinkedinIcon.svg'
import FacecookIcon from '@/components/Icons/FacebookIcon.svg'
import InstagramIcon from '@/components/Icons/InstagramIcon'

const LoginPage = () => {
  return (
    <div className=' flex flex-col justify-between relative'>
      <LoginLayout/>
      <div className={`py-8 absolute bottom-0 bg-[#FFFFFF1A] w-full border-t border-gray`}>
            <div className='container mx-auto px-6 md:px-10 lg:px-32 flex justify-between flex-wrap gap-10 items-center'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-[32px] font-semibold mont text-green'>Pro</h1>
                    <img src="/assets/logoArrow.png" alt="" className='w-6 h-6' />
                </div>
                <p className=''>© 2019 All rights reserved to applypro</p>

                <div className='flex items-center gap-6'>
                    <div className='h-[45px] w-[45px] border-2 border-[#ffffff50] rounded-full flex justify-center items-center '>
                        <LinkedinIcon color={"#ffffff"} height={13.5} width={13.5} />
                    </div>
                    <div className='h-[45px] w-[45px] border-2 border-[#ffffff50] rounded-full flex justify-center items-center '>
                        <FacecookIcon color={"#ffffff"} height={13.5} width={13.5} />
                    </div>
                    <div className='h-[45px] w-[45px] border-2 border-[#ffffff50] rounded-full flex justify-center items-center '>
                        <InstagramIcon color={"#ffffff"} height={13.5} width={13.5} />
                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}

export default LoginPage
