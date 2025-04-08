'use client'
import CardLogoIcon from '@/components/Icons/CardLogoIcon.svg'
import React from 'react'

const CreditCard = ({ holderName, cvv, exp, cardNumber, bgColor = 'bg-green-500', textColor = 'text-white' }) => {
    return (
        <div className={`rounded-3xl pt-6 shad w-full max-w-[350px] flex flex-col justify-between h-[225px] ${bgColor}`}>
            <div className='flex justify-between px-[26px]'>
                <div>
                    <h3 className={`text-xs uppercase ${textColor}`}>card holder</h3>
                    <h1 className={`capitalize font-semibold ${textColor}`}>{holderName}</h1>
                </div>
                <img src="/assets/chip-card.png" alt="chip" className='h-[35px] w-[35px]' />
            </div>

            <div className='flex justify-between pl-[26px] pr-[60px]'>
                <div>
                    <h3 className={`text-xs uppercase ${textColor}`}>CVV Number</h3>
                    <h1 className={`capitalize font-semibold ${textColor}`}>{cvv}</h1>
                </div>
                <div>
                    <h3 className={`text-xs uppercase ${textColor}`}>VALID THRU</h3>
                    <h1 className={`capitalize font-semibold ${textColor}`}>{exp}</h1>
                </div>
            </div>

            <div className='bg-white/40 rounded-b-3xl flex justify-between items-center w-full h-[70px] px-[26px]'>
                <h1 className={`font-semibold ${textColor} text-[22px]`}>{cardNumber}</h1>
                <CardLogoIcon color1="#ffffff" color2="#ffffff" height={30} width={44} />
            </div>
        </div>
    )
}

export default CreditCard
