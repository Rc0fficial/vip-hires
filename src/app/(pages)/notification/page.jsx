import React from 'react'

const NotificationPage = () => {
    const notifications = [
        { id: 1, title: "Your subscription is about to expire, renew now", date: "February 26, 2023", read: true },
        { id: 2, title: "your application have submetted successfully ", date: "5 days ago", read: false },
        { id: 2, title: "Your subscription is about to expire, renew your subscription now", date: "5 days ago", read: true },
        { id: 2, title: "Your subscription is about to expire, renew now", date: "5 days ago", read: false },
        { id: 3, title: "Your subscription is about to expire, renew your subscription now", date: "March 1, 2023", read: true },
        { id: 2, title: "Your application has been submitted successfully", date: "5 days ago", read: false },
        { id: 3, title: "Your subscription is about to expire, renew your subscription now", date: "March 1, 2023", read: true },
        { id: 2, title: "Your subscription is about to expire, renew now", date: "5 days ago", read: false },
    ];
  return (
    <div className='pr-4'>
      <div className="  w-full mx-auto max-w-full "  >
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.id} className={`px-4 py-5 border-gray border-b last:border-none flex gap-3 ${notification.read ? "":"bg-[#EDEEF1]"} `}>
                                    <div className='h-12 min-w-12 flex bg-white border rounded-full border-gray justify-center items-center'>
                                        <img src="/assets/logoArrow.png" alt="logo" className='h-6 w-6' />
                                    </div>
                                    <div>

                                        <p className="text-gray font-medium text-xs md:text-[16px]"><span className='font-bold text-3d3 mr-2'>ApplyPro</span>{notification.title}</p>
                                        <p className="text-xs text-gray-500">{notification.date}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-center text-gray-500">No new notifications</p>
                        )}
                    </div>
    </div>
  )
}

export default NotificationPage
