'use client';
import React from 'react';
import { FaRegFileAlt } from "react-icons/fa"; // Job Applications
import { FaLinkedin } from "react-icons/fa"; // LinkedIn Posts
import { FaChartLine } from "react-icons/fa6"; // Job Market Insights
import { MdOutlineSubscriptions } from "react-icons/md"; // Subscription Plans
import ListIcon from '../Icons/ListIcon.svg';
import LinkedinIcon from '../Icons/LinkedinIcon.svg';
import BellIcon from '../Icons/BellIcon.svg';
import CheckIcon from '../Icons/CheckIcon.svg';
// import CheckIcon from '../Icons/checkIcon.svg';
const features = [
    {
        icon: <ListIcon />,
        title: "Hands-Free Job Applications",
        description: "We apply to jobs for you.",
        color: "border-blue-600 text-blue-600 bg-[#1E21E9]",
        checkColor: "#1E21E9",
        iconbg:"bg-[#1E21E950]"
        
    },
    {
        icon: <LinkedinIcon color={"#ffffff"} height={24} width={24} />,
        title: "Personalized LinkedIn Posts",
        description: "Stay active & grow your network.",
        color: "border-purple-600 text-purple-600 bg-[#7950FF]",
        checkColor: "#7950FF",
        iconbg:"bg-[#7950FF50]"
    },
    {
        icon: <BellIcon width={21} height={24} stroke={"#ffffff"}/>,
        title: "Exclusive Job Market Insights",
        description: "Get notified about hidden opportunities.",
        color: "border-green-600 text-green-600 bg-[#098709]",
        checkColor: "#098709",
        iconbg:"bg-[#09870950]"
    },
    {
        icon: <BellIcon width={21} height={24} stroke={"#ffffff"}/>,
        title: "Flexible Subscription Plans",
        description: "Choose what suits you best.",
        color: "border-orange-600 text-orange-600 bg-[#F2994A]",
        checkColor: "#F2994A",
        iconbg:"bg-[#F2994A50]"
    }
];
const Whychoosing = () => {
    return (
        <div className='pb-[86px] pt-[107px] px-6 md:px-10 relative overflow-hidden bg-white'>
            <div className=' mx-auto px-6 flex justify-between items-center z-10 flex-col  gap-10 '>
                <h1 className='text-6xl lg:text-[72px] mont text-525 font-semibold flex flex-wrap mx-auto gap-3 text-center'>Why Choosing <span className='flex items-center gap-3'>Apply <span className='text-green'>Pro</span> <img src="/assets/logoArrow.png" alt="logo Arrow" /></span></h1>

                <div className="flex flex-col space-y-8 max-w-md mx-auto mt-10">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            {/* Vertical Line */}
                            <div className='flex flex-col items-center relative'>


                                {/* Icon Container */}
                                <div className="flex flex-col items-center relative">
                                    <div className={`w-10 h-10 flex justify-center items-center rounded-full ${feature.color}`}>{feature?.icon}</div>
                                </div>
                                <div className={`border h-[96px] blur-xs shad rounded-full ${feature.color}`} />
                                <div className={`border h-[96px] absolute top-10 shad rounded-full ${feature.color}`} />
                            </div>
                            

                            {/* Text Content */}
                            <div className='flex flex-col gap-[42px]'>
                                <h3 className="text-[32px] leading-none text-wrap md:text-nowrap  font-medium text-cad">{feature.title}</h3>
                                <div className={` text-cad mt-1 flex items-center gap-4`}>
                                    <div className={`${feature.iconbg} w-[25px] h-[25px] rounded-full flex justify-center items-center `}>

                                    <CheckIcon color={feature?.checkColor}/> 
                                    </div>
                                    {feature.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <img src="/assets/whylinesleft.png" alt="" className='absolute left-0 bottom-0' />
            <img src="/assets/whylinesright.png" alt="" className='absolute right-0 bottom-0' />
            <img src="/assets/whystarsright.png" alt="" className='absolute right-0 bottom-0' />
            <img src="/assets/whystarsleft.png" alt="" className='absolute left-0 top-0' />
        </div>
    )
}

export default Whychoosing
