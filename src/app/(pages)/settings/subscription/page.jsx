'use client'
import RepeatArrowIcon from '@/components/Icons/RepeatArrowIcon.svg'
import ProtectedRoute from '@/components/ProtectedRoute';
import DynamicTable from '@/components/Table';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const SubscriptionSettingPage = () => {
    const [isAutoSubscribe, setIsAutoSubscribe] = useState(true);
    const { user, isAuthenticated, userProfile } = useSelector((state) => state.auth);
    const [filters, setFilters] = useState({});

    const toggleAutoSubscribe = () => {
        setIsAutoSubscribe(!isAutoSubscribe);
    };

    const handleFilterChange = (column, value) => {
        setFilters(prev => ({ ...prev, [column]: value }));
    };

    const columns = [
        { 
            header: 'Subscription Plan', 
            accessor: 'plan',
            filter: true,
            render: (row) => row.plan
        },
        { 
            header: 'Status', 
            accessor: 'status',
            filter: true,
            render: (row) => (
                <span className={`px-2 py-1 text-xs rounded-full ${
                    userProfile?.isPremium 
                        ? "text-[#17C653] bg-[#17C6531A]" 
                        : "text-[#707070] bg-[#70707026]"
                }`}>
                    {userProfile?.isPremium ? 'Active' : 'Expired'}
                </span>
            )
        },
        { 
            header: 'Duration', 
            accessor: 'duration',
            filter: true
        },
        { 
            header: 'Amount Paid', 
            accessor: 'amount',
            filter: false
        },
        { 
            header: 'Payment Method Used', 
            accessor: 'paymentMethod',
            filter: true
        },
        { 
            header: 'Date Of Purchase', 
            accessor: 'purchasedDate',
            filter: true
        },
        { 
            header: 'Date Of Expired', 
            accessor: 'ExpireDate',
            filter: true
        },
    ];

    const formatData = (plans) => {
        if (!plans) return [];
        
        return plans.map((plan) => ({
            plan: plan?.name || 'N/A',
            status: userProfile?.isPremium ? 'Active' : 'Expired',
            duration: plan?.billing_period || 'N/A',
            amount: `$${plan?.price || '0.00'}`,
            paymentMethod: plan?.payment_method || 'Credit Card',
            purchasedDate: plan?.createdAt 
                ? new Date(plan.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }) 
                : 'N/A',
            ExpireDate: userProfile?.premiumExpiresAt 
                ? new Date(userProfile.premiumExpiresAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })
                : 'N/A'
        }));
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        if (userProfile?.plans) {
            setData(formatData(userProfile.plans));
        }
    }, [userProfile]);

    return (
        <ProtectedRoute>

        
        <div className={`col-span-2 rounded-3xl py-10 px-4 md:px-12 bg-white shad`}>
            <h1 className='font-semibold capitalize md:text-2xl text-3d3'>subscription settings</h1>
            <div className='flex justify-between py-4 gap-6 border-b border-dcd '>
                <div className='flex-1'>
                    <h1 className='text-525 md:text-xl capitalize font-medium flex items-center gap-2'>
                        <RepeatArrowIcon height={32} width={32} color={"#525252"} />
                        automatically subscribe
                    </h1>
                    <h4 className='text-989 text-xs md:text-sm capitalize'>
                        Easily manage your subscription renewal.
                    </h4>
                </div>
                <div
                    className={`w-10 h-5 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-200 ${
                        isAutoSubscribe ? 'bg-green justify-end' : 'bg-dcd justify-start'
                    }`}
                    onClick={toggleAutoSubscribe}
                >
                    <div className='h-4 w-4 rounded-full bg-white shadow-sm'></div>
                </div>
            </div>

            <div className='mt-4 max-w-[805px]'>
                <h1 className='text-525 md:text-xl capitalize font-medium flex items-center gap-2'>
                    subscription history
                </h1>
                <h4 className='text-989 text-xs md:text-sm capitalize'>
                    View your subscription records and payment history.
                </h4>
            </div>

            <DynamicTable 
                columns={columns} 
                data={data} 
                filters={filters}
                onFilterChange={handleFilterChange}
                dropdownFilters={true}
            />
        </div>
        </ProtectedRoute>
    )
}

export default SubscriptionSettingPage