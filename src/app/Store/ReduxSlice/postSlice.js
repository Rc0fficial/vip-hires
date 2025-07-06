// features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  currentPost: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  singleStatus: 'idle',
  error: null,
  pagination: {
    page: 1,
    pageSize: 25,
    pageCount: 1,
    total: 0
  }
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?populate=*`);
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts/${postId}`);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.currentPost = null;
      state.singleStatus = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      // For fetching all jobs
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.data;
        state.pagination = action.payload.meta.pagination;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // For fetching single job
      .addCase(fetchPostById.pending, (state) => {
        state.singleStatus = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.singleStatus = 'succeeded';
        state.currentPost = action.payload.data;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.singleStatus = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearCurrentPost } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;
export const selectCurrentPost = (state) => state.posts.currentPost;
export const getPostsStatus = (state) => state.posts.status;
export const getSinglePostStatus = (state) => state.posts.singleStatus;
export const getPostsError = (state) => state.posts.error;
export const getPostsPagination = (state) => state.posts.pagination;

export default postsSlice.reducer;