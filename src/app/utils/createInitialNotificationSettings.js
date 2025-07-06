// src/services/notificationSettings.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// Add this new function to your existing service file
export const createInitialNotificationSettings = async (userId) => {
  try {
    const initialSettings = {
      general: {
        activeAll: false,
        accountUpdates: false,
        subscriptionBilling: false,
        systemAnnouncements: false
      },
      job: {
        activeAll: false,
        newJobMatches: false,
        applicationUpdates: false,
        jobRecommendations: false,
        savedJobReminders: false,
        employerMessages: false
      },
      post: {
        activeAll: false,
        newRecommendedPosts: false,
        submittedPostStatus: false,
        draftPostUpdates: false
      },
      profile: userId
    };

    const response = await axios.post(
      `${API_URL}/api/notification-settings`,
      { data: initialSettings }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating initial notification settings:', error);
    throw error;
  }
};