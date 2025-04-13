'use client'
import CopyIcon from '@/components/Icons/CopyIcon.svg'
import HeartFilledIcon from '@/components/Icons/HeartFilledSvg'
import HeartIcon from '@/components/Icons/HeartIcon.svg'
import LockIcon from '@/components/Icons/LockIcon.svg'
import TrashIcon from '@/components/Icons/TrashIcon.svg'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Modal from '../Modal'

const PostCard = ({ saved, isDetail, handleOpenModal, lock, text }) => {
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div 
            className={`p-4 lg:p-8 rounded-2xl shad relative ${lock ? 'bg-green text-white' : ' '}`}
            onMouseEnter={() => lock && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <img 
                        src="/assets/profile2.png" 
                        alt="profile" 
                        className='h-16 w-16 rounded-full hidden lg:block'
                    />
                    <div>
                        <h1 className={`capitalize lg:text-xl font-medium leading-[20px] ${lock ? 'text-white' : 'text-525 '}`}>
                            ui/ux designer
                        </h1>
                        <h3 className={`capitalize text-sm md:text-[16px] leading-[20px] mt-2 ${lock ? 'text-white' : 'text-gray '}`}>
                            21/12/2025
                        </h3>
                    </div>
                </div>
                {saved ? 
                    <TrashIcon 
                        className={`cursor-pointer ${lock ? 'text-white' : ''}`}  
                        height={32} 
                        width={32} 
                    />
                    :    
                    <HeartIcon 
                        className={`cursor-pointer ${lock ? 'fill-white' : 'fill-989 '}`}  
                        height={32} 
                        width={32} 
                    />
                }
            </div>
            
            {!isDetail &&
                <p className={`capitalize leading-[25px] mt-2 p-3 rounded-md border ${
                    lock 
                        ? 'text-white border-white' 
                        : 'text-gray border-[#EFEFEF]  '
                }`}>
                    Excited to announce our latest project launch! Looking forward to the amazing possibilities ahead. #Innovation #Technology
                </p>
            }
            
            <div className='flex items-center gap-4 mt-8'>
                <button 
                    onClick={handleOpenModal} 
                    className={`py-2.5 cursor-pointer rounded-md text-lg font-semibold px-6 flex-1 ${
                        lock 
                            ? 'bg-white text-green' 
                            : 'bg-green text-white '
                    }`}
                >
                    {lock ? 'Details' : 'Edit'}
                </button>
                <button className={`h-12 w-12 cursor-pointer rounded-md text-lg font-semibold border flex justify-center items-center ${
                    lock 
                        ? 'border-white' 
                        : 'border-green '
                }`}>
                    <CopyIcon 
                        className={`${
                            lock 
                                ? 'stroke-white fill-green' 
                                : 'fill-white stroke-green '
                        }`}  
                        height={24} 
                        width={24} 
                    />
                </button>
            </div>

            {/* Lock overlay */}
            {lock && isHovered && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-blur">
                    
                    
                    <p className="text-white flex gap-4 items-center text-xl max-w-[319px] font-semibold mb-4 text-start">
                    <LockIcon height={56} width={56} />    {text || 'Subscribe now to unlock more posts'}
                    </p>
                    <button 
                        className="bg-white text-green rounded-full py-2.5 px-6 text-lg font-semibold hover:bg-gray-100 transition-colors"
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

export default PostCard