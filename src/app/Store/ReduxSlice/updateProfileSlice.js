// features/profile/profileSlice.js
import { getAuthHeaders } from '@/app/utils/authHeader';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: null,
  loading: false,
  error: null,
  lastUpdated: null
};

// Async thunk for updating profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/profiles/${id}`,
        { data: updateData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating single field
export const updateProfileField = createAsyncThunk(
  'profile/updateField',
  async ({ id, fieldName, value }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/profiles/${id}`,
        { data: { [fieldName]: value } },
         {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return { fieldName, value, updatedData: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {
    // Synchronous reducers if needed
    resetProfileState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Update Profile Cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      
      // Update Field Cases
      .addCase(updateProfileField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileField.fulfilled, (state, action) => {
        if (state.data) {
          state.data.attributes = {
            ...state.data.attributes,
            [action.payload.fieldName]: action.payload.value
          };
        }
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateProfileField.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;