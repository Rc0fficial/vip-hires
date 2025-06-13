'use client'
import DraftPostCard from '@/components/common/DraftPostCard'
import PostCard from '@/components/common/PostCard'
import { fetchPosts } from '@/app/Store/ReduxSlice/postSlice';
import { updateProfileField } from '@/app/Store/ReduxSlice/updateProfileSlice';
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const DraftPostsPage = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.auth);
  const allPosts = useSelector(state => state.posts.posts);
  
  // Filter saved posts
  const savedPosts = allPosts?.filter(post => 
    userProfile?.posts?.some(savedPost => savedPost.documentId === post.documentId)
  ) || [];

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleUnsavePost = async (postId) => {
    try {
      await dispatch(updateProfileField({
        id: userProfile.documentId,
        fieldName: 'posts',
        value: { disconnect: [postId] }
      })).unwrap();
      
      dispatch(checkUserStatus());
      toast.success('Post removed from saved list');
    } catch (error) {
      console.error('Failed to unsave post:', error);
      toast.error('Failed to unsave post');
    }
  };
const savedPostIds = new Set(userProfile?.posts?.map(post => post.documentId) || []);
  return (
    <div>
      <h1 className='font-semibold capitalize md:text-2xl text-3d3'>Saved Posts</h1>

      {savedPosts.length > 0 ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
          {savedPosts.map((post) => {
            const isSaved = savedPostIds.has(post.documentId);
            return(
            <PostCard 
              key={post.documentId}
              title={post?.title}
              postDate={post?.postDate}
              job_categories={post?.job_categories}
              description={post?.description}
              saved={isSaved}
               lock={userProfile?.isPremium ? false : post?.isLocked}
              handleSavePost={() => handleUnsavePost(post.documentId)}
              btnTitle="Unsave"
            />
          )})}
        </div>
      ) : (
        <div className='flex flex-col items-center mt-10'>
          <img 
            src="/assets/draft-posts.gif" 
            alt="No saved posts" 
            className='h-full w-full max-w-[512px] max-h-[512px] mx-auto' 
          />
          <h1 className='text-center ant md:text-[32px] text-green capitalize mt-6'>
            No Saved Posts Yet
          </h1>
          <p className='text-gray mt-2 text-xs md:text-[16px] text-center max-w-md'>
            Save posts you're interested in to view them here
          </p>
        </div>
      )}
    </div>
  )
}

export default DraftPostsPage