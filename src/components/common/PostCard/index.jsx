'use client'
import CopyIcon from '@/components/Icons/CopyIcon.svg'
import HeartFilledIcon from '@/components/Icons/HeartFilledSvg'
import HeartIcon from '@/components/Icons/HeartIcon.svg'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Modal from '../Modal'
import TrashIcon from '@/components/Icons/TrashIcon.svg'

const PostCard = ({saved,isDetail,handleOpenModal}) => {
    const router = useRouter()

  return (
    <div className='p-4 lg:p-8 rounded-2xl shad  group hover:bg-green '>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <img src="/assets/profile2.png" alt="profile" className='h-16 w-16 rounded-full ' />
                    <div>

                    <h1 className='capitalize text-xl text-525 group-hover:text-white font-medium leading-[20px] '>ui/ux designer</h1>
                    
                    <h3 className='capitalize  text-gray group-hover:text-white leading-[20px] mt-2'>21/12/2025</h3>
                    </div>
                </div>
                {saved ? 
                <TrashIcon className="cursor-pointer "  height={32} width={32} />
                :    
            <HeartIcon className="fill-989 group-hover:fill-white cursor-pointer"  height={32} width={32} />
            }
            </div>
            {!isDetail &&
            <p className='capitalize  text-gray group-hover:text-white group-hover:border group-hover:border-white leading-[25px] mt-2 p-3 rounded-md border border-[#EFEFEF]'>Excited to announce our latest project launch! Looking forward to the amazing possibilities ahead. #Innovation #Technology</p>

            }
            

            <div className='flex items-center gap-4 mt-8'>
                <button onClick={handleOpenModal} className='py-2.5 cursor-pointer rounded-md text-lg text-white group-hover:text-green group-hover:bg-white font-semibold bg-green px-6 flex-1'>Edit</button>
                <button className='h-12 w-12 cursor-pointer rounded-md text-lg group-hover:border-white font-semibold border border-green   flex  justify-center items-center'><CopyIcon className="group-hover:stroke-white group-hover:fill-green fill-white  stroke-green"  height={24} width={24} /></button>

            </div>

        </div>
  )
}

export default PostCard
