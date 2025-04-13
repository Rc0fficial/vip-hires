'use client'
import RepeatArrowIcon from '@/components/Icons/RepeatArrowIcon.svg'
import DynamicTable from '@/components/Table';
import React, { useState } from 'react'

const SubscriptionSettingPage = () => {
    const [isAutoSubscribe, setIsAutoSubscribe] = useState(true);

    const toggleAutoSubscribe = () => {
        setIsAutoSubscribe(!isAutoSubscribe);
    };
    const columns = [
        { header: 'Subscription Plan', accessor: 'plan' },
        { header: 'Status', accessor: 'status' },
        { header: 'Duration', accessor: 'duration' },
        { header: 'Amount Paid', accessor: 'amount' },
        { header: 'Payment Method Used', accessor: 'paymentMethod' },
        { header: 'Date Of Purchase', accessor: 'purchasedDate' },
        { header: 'Date Of Expired', accessor: 'ExpireDate' },
      ];
    
      const data = [
        {
          plan: 'Pro Plan',
          status: <span className="px-2 py-1 text-xs text-[#17C653] bg-[#17C6531A] rounded-full">Active</span>,
          duration: '1 Month',
          amount: '$19.99',
          paymentMethod: 'Credit Card',
          purchasedDate:"10-03-2025",
          ExpireDate:"10-03-2026",
        },
        {
          plan: 'Pro Plan',
          status: <span className="px-2 py-1 text-xs text-[#707070] bg-[#70707026] rounded-full">Expired</span>,
          duration: '1 Year',
          amount: '$49.99',
          paymentMethod: 'PayPal',
          purchasedDate:"10-03-2025",
          ExpireDate:"10-03-2026",
        },
        {
          plan: 'Unlimited Plan',
          status: <span className="px-2 py-1 text-xs text-[#FF6B6B] bg-[#FF6B6B1A] rounded-full">Canceled</span>,
          duration: '1 Year',
          amount: '$99.99',
          paymentMethod: 'Bank Transfer',
          purchasedDate:"10-03-2025",
          ExpireDate:"10-03-2026",
        },
      ];
    
    return (
        <>
            <div className={`col-span-2 rounded-3xl py-10 px-12 bg-white shad     `}>
                <h1 className='font-semibold capitalize md:text-2xl text-3d3'>subscription settings</h1>
                <div className='flex justify-between py-4 gap-6 border-b border-dcd '>
                    <div className='flex-1'>
                        <h1 className='text-525 md:text-xl capitalize font-medium flex items-center gap-2'>
                            <RepeatArrowIcon height={32} width={32} color={"#525252"} />
                            automatically subscribe
                        </h1>
                        <h4 className='text-989 text-xs md:text-sm capitalize'>
                            Easily manage your subscription renewal. Turn on auto-renewal to keep your access uninterrupted,
                            or disable it to renew manually before your plan expires.
                        </h4>
                    </div>
                    {/* Toggle button */}
                    <div
                        className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-200 ${isAutoSubscribe ? 'bg-green justify-end' : 'bg-dcd justify-start'
                            }`}
                        onClick={toggleAutoSubscribe}
                    >
                        <div className='h-4 w-4 rounded-full bg-white shadow-sm'></div>
                    </div>
                </div>

                <div className='mt-4 max-w-[805px]'>
                    <h1 className='text-525 md:text-xl  capitalize font-medium flex items-center gap-2'>
                        subscription history
                    </h1>
                    <h4 className='text-989 text-xs md:text-sm capitalize'>
                        View a record of your past purchases, including subscription start and end dates, payment details, and plan changes. Stay informed about your billing history at a glance.
                    </h4>
                </div>


                <DynamicTable columns={columns} data={data} />


            </div>

        </>
    )
}

export default SubscriptionSettingPage
