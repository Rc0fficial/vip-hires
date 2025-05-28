import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to Check User Status
export const checkUserStatus = createAsyncThunk(
  "auth/checkUserStatus",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token available");

    try {
      // Fetch User Data
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[profile][populate][job_category]=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = userResponse.data;
      let userProfile = {};

      // Fetch Profile Data
      try {
        const profileResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/profiles?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = profileResponse.data?.data;
        userProfile = profileData.length > 0 ? profileData[0] : {};
      } catch (profileError) {
        console.warn("Profile not found or failed to fetch:", profileError);
      }

      return { user, userProfile };
    } catch (error) {
      console.error("Error checking user status:", error);
      return rejectWithValue("Failed to authenticate");
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userProfile: {},
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.userProfile = {};
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userProfile = action.payload.userProfile;
        state.isAuthenticated = true;
      })
      .addCase(checkUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.userProfile = {};
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
