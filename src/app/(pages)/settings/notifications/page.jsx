'use client'
import React, { useEffect, useState } from 'react'
import GeneralNotifications from './GeneralNotifications'
import JobNotification from './JobNotification'
import PostNotification from './PostNotification'
import { useSelector } from 'react-redux'

const NotificationPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userProfile,user } = useSelector((state) => state.auth);
 useEffect(() => {
    const fetchSettings = async () => {
      if (userProfile?.id) {
        
        setSettings(userProfile.notification_setting);
        setLoading(false);
      }
    };

    fetchSettings();
  }, [userProfile]);
console.log(userProfile)
console.log(user)
  
 if (loading) return <div>Loading...</div>;
  if (!settings) return <div>Error loading notification settings</div>;
  return (
    <div className={`col-span-2 rounded-3xl py-10 px-4 md:px-12 bg-white shadow`}>
      <h1 className='font-semibold capitalize md:text-2xl text-3d3'>notifications</h1>
      <GeneralNotifications 
        settings={settings} 
        onUpdate={setSettings} 
      />
      <JobNotification 
        settings={settings} 
        onUpdate={setSettings} 
      />
      <PostNotification 
        settings={settings} 
        onUpdate={setSettings} 
      />
    </div>
  )
}

export default NotificationPage