'use client'
import LogOutIcon from '@/components/Icons/LogOutIcon'
import React from 'react'

const LoggedInDevicesPage = () => {
    return (
        <>

            <div className={`col-span-2 rounded-3xl py-10 px-12 bg-white shad     `}>

                <h1 className='font-semibold capitalize md:text-2xl text-3d3'>logged in devices</h1>
                <h4 className='text-989 mb-6 text-xs md:text-[16px] mt-3'>View and manage the devices where your account is currently logged in to ensure your security.</h4>

                <div className='flex flex-col '>
                    <div className='flex justify-between items-center pb-6 border-b border-dcd mb-6'>
                        <div className='flex gap-3'>
                            <img src="/assets/window.png" alt="" className='md:h-[96px] md:w-[96px] h-[80px] w-[80px] rounded-full' />
                            <div>
                                <h1 className='md:text-2xl text-525 font-semibold mb-2'>Window</h1>
                                <p className='text-989 text-xs md:text-[16px]'>cairo , egypt</p>
                                <p className='text-989 text-xs md:text-[16px]'>last active 10 march , 12:06 PM</p>
                            </div>

                        </div>

                        <button className='text-ff6 md:text-lg font-medium flex justify-center items-center gap-3 px-8 py-1.5 rounded-full border border-ff6'><LogOutIcon height={24} width={24} color={'#FF6161'} /> Logout</button>

                    </div>
                    <div className='flex justify-between items-center pb-6 border-b border-dcd mb-6'>
                        <div className='flex gap-3'>
                            <img src="/assets/android.png" alt="" className='md:h-[96px] md:w-[96px] h-[80px] w-[80px] rounded-full' />
                            <div>
                                <h1 className='md:text-2xl text-525 font-semibold mb-2 capitalize'>android ( Huawei )</h1>
                                <p className='text-989 text-xs md:text-[16px]'>cairo , egypt</p>
                                <p className='text-989 text-xs md:text-[16px]'>last active 10 march , 12:06 PM</p>
                            </div>

                        </div>

                        <button className='text-ff6 md:text-lg font-medium flex justify-center items-center gap-3 px-8 py-1.5 rounded-full border border-ff6'><LogOutIcon height={24} width={24} color={'#FF6161'} /> Logout</button>

                    </div>
                    <div className='flex justify-between items-center  mb-6'>
                        <div className='flex gap-3'>
                            <img src="/assets/window.png" alt="" className='md:h-[96px] md:w-[96px] h-[80px] w-[80px] rounded-full' />
                            <div>
                                <h1 className='md:text-2xl text-525 font-semibold mb-2'>Window</h1>
                                <p className='text-989 text-xs md:text-[16px]'>cairo , egypt</p>
                                <p className='text-989 text-xs md:text-[16px]'>last active 10 march , 12:06 PM</p>
                            </div>

                        </div>

                        <button className='text-ff6 md;text-lg font-medium flex justify-center items-center gap-3 px-8 py-1.5 rounded-full border border-ff6'><LogOutIcon height={24} width={24} color={'#FF6161'} /> Logout</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LoggedInDevicesPage
