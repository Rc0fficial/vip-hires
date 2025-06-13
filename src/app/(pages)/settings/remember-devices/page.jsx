'use client'
import TrashIcon from '@/components/Icons/TrashIcon.svg'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAuthHeaders } from '@/app/utils/authHeader'
import { checkUserStatus } from '@/app/Store/ReduxSlice/authSlice'

const RememberDevices = () => {
    const { user, token } = useSelector((state) => state.auth)
    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.devices) {
            // Filter only remembered devices
            const rememberedDevices = user.devices.filter(device => device.isRemembered)
            setDevices(rememberedDevices)
        }
        setLoading(false)
    }, [user])

    const handleRemoveDevice = async (deviceId) => {
        try {
            // Update the device to set isRemembered to false instead of deleting
            await axios.put(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/devices/${deviceId}`,
                { data: { isRemembered: false } },
                getAuthHeaders()
            )

            // Remove the device from local state
            setDevices(devices.filter(device => device.id !== deviceId))
dispatch(checkUserStatus())
        } catch (error) {
            console.error("Failed to remove device:", error)
            alert("Failed to remove device. Please try again.")
        }
    }

    const getDeviceImage = (deviceType, os) => {
        if (deviceType === 'Mobile') {
            return os === 'iOS' ? "/assets/iphone.png" : "/assets/android.png"
        }
        return "/assets/window.png"
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

   

    if (loading) {
        return <div className="col-span-2 rounded-3xl py-10 px-12 bg-white shad">Loading devices...</div>
    }

    return (
        <div className="col-span-2 rounded-3xl py-10 px-12 bg-white shad">
            <h1 className="font-semibold capitalize md:text-2xl text-3d3">Devices that remember your password</h1>
            <h4 className="text-989 mb-6 mt-3 text-xs md:text-[16px]">
                Manage the devices that have saved your password for quick and easy access.
            </h4>

            <div className='flex flex-col'>
                {devices.length === 0 ? (
                    <p className='text-989'>No active devices found</p>
                ) : (
                    // First filter unique documentIds, then map
                    devices
                        .filter((device, index, self) =>
                            index === self.findIndex((d) => d.documentId === device.documentId)
                        )
                        .map((device) => {
                            // Truncate device name to 10 words
                            const truncatedName = device.deviceName
                                .split(' ')
                                .slice(0, 2)
                                .join(' ');
                            const showEllipsis = device.deviceName.split(' ').length > 2;

                            return (
                                <div key={device.id} className='flex justify-between items-center pb-6 border-b border-dcd mb-6 last:border-b-0'>
                                    <div className='flex gap-3'>
                                        <img
                                            src={getDeviceImage(device.deviceType, device.os)}
                                            alt={device.deviceType}
                                            className='md:h-[96px] md:w-[96px] h-[80px] w-[80px] rounded-full'
                                        />
                                        <div>
                                            <h1 className='md:text-2xl text-525 font-semibold mb-2 capitalize'>
                                                {device.os} ({device.browser})
                                            </h1>
                                            <p className='text-989 text-xs md:text-[16px]'>{device.location}</p>
                                            <p className='text-989 text-xs md:text-[16px]'>
                                                Last active {formatDate(device.lastActive)}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleRemoveDevice(device.documentId)}
                                        className="text-ff6 md:text-lg font-medium flex justify-center items-center gap-3 px-8 py-1.5 rounded-full border border-ff6 hover:bg-ff6 hover:text-white transition-colors"
                                    >
                                        <TrashIcon height={24} width={24} color={'#FF6161'} />
                                        Remove
                                    </button>
                                </div>
                            );
                        })
                )}
            </div>
        </div>
    )
}

export default RememberDevices