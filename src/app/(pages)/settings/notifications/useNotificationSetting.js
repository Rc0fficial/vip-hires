"use client"
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getNotificationSettings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${userId}?populate=notification_settings`);
    return response.data.notification_settings || null;
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    return null;
  }
};

export const updateNotificationSettings = async (settingsId, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/notification-settings/${settingsId}`,
      { data }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error updating notification settings:', error);
    throw error;
  }
};