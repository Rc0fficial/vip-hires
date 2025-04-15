import DraftPostCard from '@/components/common/DraftPostCard'
import PostCard from '@/components/common/PostCard'
import React from 'react'

const DraftPostsPage = () => {
  return (
    <div>
      <h1 className='font-semibold capitalize md:text-2xl text-3d3'>draft posts</h1>
      {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
                {Array(6).fill(null).map((_, index) => (
                    <DraftPostCard key={index} btnTitle="Edit" saved={true}  />
                  ))}
                  <DraftPostCard  btnTitle="Edit" saved={true} col_span="col-span-2"  />
            </div> */}
      <img src="/assets/draft-posts.gif" alt="" className='h-full w-full max-w-[512px] mah-h-[512px] mx-auto' />


      <h1 className='text-center ant md:text-[32px] text-green capitalize'>no draft !</h1>
      <p className='text-gray mt-2 text-xs md:text-[16px] text-center capitalize'>no draft have been found yet !!</p>
    </div>
  )
}

export default DraftPostsPage
