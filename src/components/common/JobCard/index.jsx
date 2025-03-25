'use client'
import HeartFilledIcon from '@/components/Icons/HeartFilledSvg'
import HeartIcon from '@/components/Icons/HeartIcon.svg'
import ShareIcon from '@/components/Icons/ShareIcon.svg'
import { useRouter } from 'next/navigation'
import React from 'react'

const JobCard = ({saved,isDetail}) => {
    const router = useRouter()

    return (
        <div className='p-4 lg:p-8 rounded-2xl shad  group hover:bg-green '>
            <div className='flex justify-between'>
                <div>
                    <h1 className='capitalize text-xl text-525 group-hover:text-white font-medium leading-[20px] '>ui/ux designer</h1>
                    <h3 className='capitalize  text-gray group-hover:text-white leading-[20px] mt-2'>Heliopolis, Cairo, Egypt</h3>
                    <h3 className='capitalize  text-gray group-hover:text-white leading-[20px] mt-2'>21/12/2025</h3>
                </div>
                {saved ? 
                <HeartFilledIcon className="fill-green cursor-pointer group-hover:fill-white"  height={32} width={32} />
                :    
            <HeartIcon className="fill-989 cursor-pointer group-hover:fill-white"  height={32} width={32} />
            }
            </div>
            {!isDetail &&
            <p className='capitalize  text-gray group-hover:text-white leading-[25px] mt-2 pb-4 border-b border-[#DCDCDC]'>Lorem ipsum dolor sit amet consectetur. Morbi sit tellus enim blandit diam risus eleifend vulputate sed. Semper ut pellentesque et ac eget odio bibendum sed adipiscing. Nec bibendum tristique tincidunt nulla. Pulvinar sem tellus viverra rhoncus accumsan et.</p>

            }
            <div className='flex items-center gap-2 mt-4'>
                <button className='capitalize   leading-[20px] rounded-full group-hover:bg-white py-1 px-3.5 bg-[#2198261A] border border-[#219826] text-[#219826]'>Remote</button>
                <button className='capitalize   leading-[20px] rounded-full group-hover:bg-white py-1 px-3.5 bg-[#4672CA1A] border border-[#4672CA] text-[#4672CA]'>Full Time</button>
                <button className='capitalize   leading-[20px] rounded-full group-hover:bg-white py-1 px-3.5 bg-[#CE92321A] border border-[#CE9232] text-[#CE9232]'>Senior</button>

            </div>

            <div className='flex items-center gap-4 mt-8'>
                <button onClick={()=>router.push('/job/1')} className='cursor-pointer py-2.5 rounded-md text-lg text-white group-hover:text-green group-hover:bg-white font-semibold bg-green px-6 flex-1'>Details</button>
                <button className='h-12 w-12 rounded-md text-lg cursor-pointer group-hover:border-white font-semibold border border-green   flex  justify-center items-center'><ShareIcon className="group-hover:stroke-white group-hover:fill-green fill-white  stroke-green"  height={24} width={24} /></button>

            </div>
        </div>
    )
}

export default JobCard
