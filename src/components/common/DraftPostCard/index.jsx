'use client'
import CopyIcon from '@/components/Icons/CopyIcon.svg'
import HeartIcon from '@/components/Icons/HeartIcon.svg'
import React from 'react'
import TrashIcon from '@/components/Icons/TrashIcon.svg'

const DraftPostCard = ({saved,isDetail,handleOpenModal,col_span}) => {
   

  return (
    <div className={`p-4 lg:p-8 rounded-2xl shad ${col_span} group hover:bg-green `}>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <div>

                    <h1 className='capitalize text-xl text-525 group-hover:text-white font-medium leading-[20px] '>ui/ux designer</h1>
                    
                    <h3 className='capitalize  text-gray group-hover:text-white leading-[20px] mt-2'>21/12/2025</h3>
                    </div>
                </div>
                <span className='cursor-pointer'>

               
                <TrashIcon className="cursor-pointer "  height={32} width={32} />
                </span>
               
            </div>
            {!isDetail &&
            <p className='capitalize  text-gray group-hover:text-white group-hover:border group-hover:border-white leading-[25px] mt-2 p-3 rounded-md border border-[#EFEFEF]'>Excited to announce our latest project launch! Looking forward to the amazing possibilities ahead. #Innovation #Technology</p>

            }
            <div className='flex flex-wrap gap-4 mt-6 mb-1'>

            <h1 className='py-1 px-2 rounded-full border border-219 w-fit text-219 group-hover:text-white group-hover:border-white '>Use the same tone & writing style</h1>
            <h1 className='py-1 px-2 rounded-full border border-219 w-fit text-219 group-hover:text-white group-hover:border-white '>Use similar visuals/media elements</h1>
            </div>
            

            <div className='flex items-center gap-4 mt-8'>
                <button onClick={handleOpenModal} className='py-2.5 cursor-pointer rounded-md text-lg text-white group-hover:text-green group-hover:bg-white font-semibold bg-green px-6 flex-1'>Edit</button>
                <button className='h-12 cursor-pointer w-12 rounded-md text-lg group-hover:border-white font-semibold border border-green   flex  justify-center items-center'><CopyIcon className="group-hover:stroke-white group-hover:fill-green fill-white  stroke-green"  height={24} width={24} /></button>

            </div>

        </div>
  )
}

export default DraftPostCard
