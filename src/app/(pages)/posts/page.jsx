'use client'
import { openModal } from '@/app/Store/ReduxSlice/modalSlice';
import Modal from '@/components/common/Modal';
import PostCard from '@/components/common/PostCard'
import StarIcon from '@/components/Icons/StarIcon';
import Link from 'next/link';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const Posts = () => {
    const dispatch = useDispatch()
    
    const handleOpenModal = () => dispatch(openModal());
    return (
        <div className=''>
            <div className='flex justify-between items-center gap-2'>
                <h1 className='font-semibold capitalize text-2xl text-3d3'>recommended jobs</h1>
                <Link href={"/create-post"}>
                <button className='py-2.5 cursor-pointer px-6 flex justify-center items-center gap-2 font-bold tex-lg rounded-md bg-green text-white'><StarIcon height={24} width={24} color={"#ffffff"} /> Create Similar Post</button>
                </Link>
            </div>

            <div className='rounded-3xl bg-gradient-to-tr flex  items-center from-[rgb(3,98,71)] to-[#06C891]  px-6 mt-8 relative'>
                <img src="/assets/post.svg" alt="recommend" />
                <div>
                    <h1 className='text-xl  font-bold text-white'>Stay Active, Stay Visible  </h1>
                    <p className=' leading-[30px] text-white mr-3'>You're missing out! Only 10 posts left this month – Boost Your Presence Now</p>
                </div>
                <button className='px-6 py-2.5 rounded-md text-green text-lg font-semibold bg-white text-nowrap'>Subscribe Now</button>
                <img src="/assets/post-profile1.svg" alt="profile" className='absolute right-1/3 top-4' />
                <img src="/assets/post-profile1.svg" alt="profile" className='absolute rotate-45 right-6 top-6' />
                <img src="/assets/post-profile2.svg" alt="profile" className='absolute  right-1/5 bottom-0' />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
                {Array(8).fill(null).map((_, index) => (
                    <PostCard key={index} handleOpenModal={handleOpenModal} btnTitle="Edit"/>
                ))}
            </div>



        </div>
    )
}

export default Posts
