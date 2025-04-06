'use client'
import HeartFilledIcon from '@/components/Icons/HeartFilledSvg'
import HeartIcon from '@/components/Icons/HeartIcon.svg'
import LockIcon from '@/components/Icons/LockIcon.svg'
import ShareIcon from '@/components/Icons/ShareIcon.svg'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const JobCard = ({ saved, isDetail, lock,text }) => {
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div 
            className={`p-4 lg:p-8 rounded-2xl shad relative ${lock ? 'bg-green text-white' : ''}`}
            onMouseEnter={() => lock && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main card content - remains exactly the same as before */}
            <div>
                <div className='flex justify-between'>
                    <div>
                        <h1 className={`capitalize text-xl text-525 font-medium leading-[20px] ${lock ? 'text-white' : ''}`}>
                            ui/ux designer
                        </h1>
                        <h3 className={`capitalize text-gray leading-[20px] mt-2 ${lock ? 'text-white' : ''}`}>
                            Heliopolis, Cairo, Egypt
                        </h3>
                        <h3 className={`capitalize text-gray leading-[20px] mt-2 ${lock ? 'text-white' : ''}`}>
                            21/12/2025
                        </h3>
                    </div>
                    {saved ? 
                        <HeartFilledIcon 
                            className={`cursor-pointer ${lock ? 'fill-white' : 'fill-green'}`}  
                            height={32} 
                            width={32} 
                        />
                        :    
                        <HeartIcon 
                            className={`cursor-pointer ${lock ? 'fill-white' : 'fill-989'}`}  
                            height={32} 
                            width={32} 
                        />
                    }
                </div>
                {!isDetail &&
                    <p className={`capitalize text-gray leading-[25px] mt-2 pb-4 border-b ${lock ? 'text-white border-white' : 'border-[#DCDCDC]'}`}>
                        Lorem ipsum dolor sit amet consectetur. Morbi sit tellus enim blandit diam risus eleifend vulputate sed. Semper ut pellentesque et ac eget odio bibendum sed adipiscing. Nec bibendum tristique tincidunt nulla. Pulvinar sem tellus viverra rhoncus accumsan et.
                    </p>
                }
                <div className='flex items-center gap-2 mt-4'>
                    <button className={`capitalize leading-[20px] rounded-full py-1 px-3.5 border ${lock ? 'bg-white text-green border-white' : 'bg-[#2198261A] border-[#219826] text-[#219826] group-hover:bg-white'}`}>
                        Remote
                    </button>
                    <button className={`capitalize leading-[20px] rounded-full py-1 px-3.5 border ${lock ? 'bg-white text-[#4672CA] border-white' : 'bg-[#4672CA1A] border-[#4672CA] text-[#4672CA] group-hover:bg-white'}`}>
                        Full Time
                    </button>
                    <button className={`capitalize leading-[20px] rounded-full py-1 px-3.5 border ${lock ? 'bg-white text-[#CE9232] border-white' : 'bg-[#CE92321A] border-[#CE9232] text-[#CE9232] group-hover:bg-white'}`}>
                        Senior
                    </button>
                </div>

                <div className='flex items-center gap-4 mt-8'>
                    <button 
                        onClick={() => router.push('/job/1')} 
                        className={`cursor-pointer py-2.5 rounded-md text-lg font-semibold px-6 flex-1 ${lock ? 'bg-white text-green' : 'bg-green text-white group-hover:text-green group-hover:bg-white'}`}
                    >
                        Details
                    </button>
                    <button className={`h-12 w-12 rounded-md text-lg cursor-pointer font-semibold border flex justify-center items-center ${lock ? 'border-white' : 'border-green group-hover:border-white'}`}>
                        <ShareIcon 
                            className={`${lock ? 'stroke-white fill-green' : 'fill-white stroke-green group-hover:stroke-white group-hover:fill-green'}`}  
                            height={24} 
                            width={24} 
                        />
                    </button>
                </div>
            </div>

            {/* Overlay that only appears on hover for locked cards */}
            {lock && isHovered && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-blur">
                    <LockIcon height={100} width={100}  />
                    <p className="text-white text-xl max-w-[319px] font-semibold mb-4 text-center">
                        {text}
                    </p>
                    <button 
                        className="bg-white text-green rounded-full py-2.5 px-6  text-lg font-semibold hover:bg-gray-100 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation()
                            // Add your subscription logic here
                            console.log('Subscribe clicked')
                        }}
                    >
                        Subscribe Now
                    </button>
                </div>
            )}
        </div>
    )
}

export default JobCard