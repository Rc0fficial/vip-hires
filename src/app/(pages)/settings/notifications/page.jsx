'use client'
import React from 'react'
import GeneralNotifications from './GeneralNotifications'
import JobNotification from './JobNotification'
import PostNotification from './PostNotification'

const NotificationPage = () => {
  return (
    <>
    
    <div className={`col-span-2 rounded-3xl py-10 px-12 bg-white shad     `}>
<h1 className='font-semibold capitalize text-2xl text-3d3'>notifications</h1>
<GeneralNotifications/>

<JobNotification/>
<PostNotification/>


    </div>
      
    </>
  )
}

export default NotificationPage
