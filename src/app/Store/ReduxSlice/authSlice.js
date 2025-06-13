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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=*`,
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
        // console.log(user)
        // console.log(profileData)

        // Find the profile that matches the user's ID (skip index 0 if needed)
        if (profileData && profileData.length > 0) {
          // Option 1: Skip index 0 if needed (uncomment if required)
          // const filteredProfiles = profileData.filter((_, index) => index !== 0);
          // userProfile = filteredProfiles.find(p => p.attributes.user?.data?.id === user.id) || {};

          // Option 2: Directly find the user's profile (recommended)
          userProfile = profileData.find(p => p?.users_permissions_user?.id === user?.id) || {};
        }
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