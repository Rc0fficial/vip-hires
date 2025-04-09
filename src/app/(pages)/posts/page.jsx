'use client'
import { openModal } from '@/app/Store/ReduxSlice/modalSlice';
import Modal from '@/components/common/Modal';
import PostCard from '@/components/common/PostCard'
import StarIcon from '@/components/Icons/StarIcon';
import Image from 'next/image';
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
                <Image
                    src="/assets/post.svg"
                    alt="recommend"
                    width={253}
                    height={189}
                    className="w-[253px] h-[189px]"
                />
                <div>
                    <h1 className='text-xl  font-bold text-white'>Stay Active, Stay Visible  </h1>
                    <p className=' leading-[30px] text-white mr-3'>You're missing out! Only 10 posts left this month – Boost Your Presence Now</p>
                </div>
                <button className='px-6 py-2.5 rounded-md text-green text-lg font-semibold bg-white text-nowrap'>Subscribe Now</button>
                <Image
                    src="/assets/post-profile1.svg"
                    alt="profile"
                    width={28}
                    height={29}
                    className="absolute right-1/3 top-4 w-[28px] h-[29px]"
                />

               
                <Image
                    src="/assets/post-profile1.svg"
                    alt="profile"
                    width={41}
                    height={41}
                    className="absolute rotate-45 right-6 top-6 w-[41px] h-[41px]"
                />

               
                <Image
                    src="/assets/post-profile2.svg"
                    alt="profile"
                    width={107}
                    height={41}
                    className="absolute right-1/5 bottom-0 w-[107px] h-[41px]"
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
                {Array(8).fill(null).map((_, index) => (
                    <PostCard key={index} handleOpenModal={handleOpenModal} btnTitle="Edit" />
                ))}
                <PostCard
                    saved={false}
                    isDetail={false}
                    //   handleOpenModal={handleEdit} 
                    lock={true}
                    text="Subscribe now to unlock 5 more posts"
                />
            </div>
            {/* <img src="/assets/posts.gif" alt="" className='h-full w-full max-w-[512px] mah-h-[512px] mx-auto'/>


            <h1 className='text-center ant text-[32px] text-green'>We're Crafting Your Perfect Posts</h1>
<p className='text-gray mt-2 text-center max-w-[640px] mx-auto'>We’re preparing personalized posts for you based on your interests and job field. Stay tuned , great opportunities are on the way</p> */}

        </div>
    )
}

export default Posts
