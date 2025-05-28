// features/jobs/jobsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  jobs: [],
  currentJob: null,
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

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jobs`);
  return response.data;
});

export const fetchJobById = createAsyncThunk('jobs/fetchJobById', async (jobId) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/jobs/${jobId}`);
  return response.data;
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCurrentJob(state) {
      state.currentJob = null;
      state.singleStatus = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      // For fetching all jobs
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload.data;
        state.pagination = action.payload.meta.pagination;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // For fetching single job
      .addCase(fetchJobById.pending, (state) => {
        state.singleStatus = 'loading';
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.singleStatus = 'succeeded';
        state.currentJob = action.payload.data;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.singleStatus = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearCurrentJob } = jobsSlice.actions;

export const selectAllJobs = (state) => state.jobs.jobs;
export const selectCurrentJob = (state) => state.jobs.currentJob;
export const getJobsStatus = (state) => state.jobs.status;
export const getSingleJobStatus = (state) => state.jobs.singleStatus;
export const getJobsError = (state) => state.jobs.error;
export const getJobsPagination = (state) => state.jobs.pagination;

export default jobsSlice.reducer;