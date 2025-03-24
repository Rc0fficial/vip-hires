import DraftPostCard from '@/components/common/DraftPostCard'
import PostCard from '@/components/common/PostCard'
import React from 'react'

const DraftPostsPage = () => {
  return (
    <div>
      <h1 className='font-semibold capitalize text-2xl text-3d3'>draft posts</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
                {Array(6).fill(null).map((_, index) => (
                    <DraftPostCard key={index} btnTitle="Edit" saved={true}  />
                  ))}
                  <DraftPostCard  btnTitle="Edit" saved={true} col_span="col-span-2"  />
            </div>
    </div>
  )
}

export default DraftPostsPage
