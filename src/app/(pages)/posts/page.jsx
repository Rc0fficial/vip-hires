'use client'
import { openModal } from '@/app/Store/ReduxSlice/modalSlice';
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from '@/app/Store/ReduxSlice/postSlice';
import { updateProfileField } from '@/app/Store/ReduxSlice/updateProfileSlice';
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice';
import Modal from '@/components/common/Modal';
import PostCard from '@/components/common/PostCard'
import StarIcon from '@/components/Icons/StarIcon';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts);
    const status = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);
    const { userProfile } = useSelector((state) => state.auth);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const handleOpenModal = () => dispatch(openModal());

    const handleSavePost = async (post) => {
        try {
            const isAlreadySaved = userProfile?.posts?.some(
                savedPost => savedPost.documentId === post.documentId
            );
    
            if (isAlreadySaved) {
                // Unsaving the post
                await dispatch(updateProfileField({
                    id: userProfile.documentId,
                    fieldName: 'posts',
                    value: { disconnect: [post.documentId] }
                })).unwrap();
                toast.success("Post removed from saved list");
            } else {
                // Saving the post
                await dispatch(updateProfileField({
                    id: userProfile.documentId,
                    fieldName: 'posts',
                    value: { 
                        connect: [
                            ...(userProfile?.posts?.map(post => post.documentId) || []),
                            post.documentId
                        ] 
                    }
                })).unwrap();
                toast.success("Post saved successfully");
            }
    
            dispatch(checkUserStatus());
        } catch (error) {
            console.error('Failed to update saved posts:', error);
            toast.error(error.message || "Failed to update saved posts");
        }
    };
const savedPostIds = new Set(userProfile?.posts?.map(post => post.documentId) || []);
    return (
        <div className=''>
            <div className='flex justify-between items-center flex-col md:flex-row gap-2'>
                <h1 className='font-semibold capitalize md:text-2xl text-3d3'>recommended posts</h1>
                <Link href={"/create-post"}>
                    <button className='py-2.5 cursor-pointer px-6 flex justify-center items-center gap-2 font-bold text-sm md:text-lg rounded-md bg-green text-white'>
                        <StarIcon height={24} width={24} color={"#ffffff"} /> Create Similar Post
                    </button>
                </Link>
            </div>

            {/* ... (your existing banner code remains the same) ... */}

            {posts?.length > 0 ? (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
                    {posts.map((post) => {

                        const isSaved = savedPostIds.has(post.documentId);
                        return(
                        <PostCard 
                            key={post.documentId} 
                            handleOpenModal={handleOpenModal} 
                            btnTitle="Edit"
                            lock={userProfile?.isPremium ? false : post?.isLocked}
                            title={post?.title}
                            postDate={post?.postDate}
                            job_categories={post?.job_categories}
                            description={post?.description}
                            saved={isSaved}
                            handleSavePost={() => handleSavePost(post)}
                        />
                    )})}
                </div>
            ) : (
                <>
                    <img src="/assets/posts.gif" alt="" className='h-full w-full max-w-[512px] mah-h-[512px] mx-auto' />
                    <h1 className='text-center ant text-[32px] text-green'>We're Crafting Your Perfect Posts</h1>
                    <p className='text-gray mt-2 text-center max-w-[640px] mx-auto'>
                        We're preparing personalized posts for you based on your interests and job field. 
                        Stay tuned, great opportunities are on the way
                    </p>
                </>
            )}
        </div>
    )
}

export default Posts