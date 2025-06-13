'use client'
import InputField from '@/components/common/InputField';
import BankIcon from '@/components/Icons/BankIcon.svg';
import CardIcon from '@/components/Icons/CardIcon.svg';
import LeftArrowIcon from '@/components/Icons/LeftArrowIcon';
import PaypalIcon from '@/components/Icons/PaypalIcon.svg';
import { useParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import axios from 'axios';
import StripePayment from '@/components/CheckoutForm';
import { useSelector } from 'react-redux';
import { usePlanSubscribe } from './usePlanSubscribe';

const PlanSubscribe = () => {
    const {
        plan,
        loading,

        error,
        selectedMethod,
        user,
        setSelectedMethod,
        isAuthenticated,
        userProfile

    } = usePlanSubscribe()

    if (loading) return <div className="text-center py-20">Loading plan details...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    if (!plan) return <div className="text-center text-red-500">Plan not found!</div>;
    const getIconColor = (method) =>
        selectedMethod === method ? '#FFFFFF' : '#525252';
    const getMethodClass = (method) =>
        selectedMethod === method
            ? 'border-green bg-green text-white'
            : 'border-[#BDBDBD] text-525';

    return (
        <Suspense fallback={"Loading..."}>
            <div className='pt-[86px] pb-[107px] md:px-10 relative overflow-hidden bg-white'>
                <div className='mx-auto px-6 flex justify-between items-center z-10 flex-col gap-6'>
                    <h1 className='text-2xl md:text-5xl lg:text-[56px] font-extrabold robo text-center text-0f1 capitalize'>
                        a <span className='relative'>plan <img src="/assets/underline2.png" alt="underline" className='absolute w-[55px] h-[9px] -bottom-2 right-2' /></span> made just for you
                    </h1>
                    <p className='mx-auto md:text-[22px] text-center robo text-0f1 mb-16'>
                        Choose a plan that fits your career goals from job applications to LinkedIn growth, we've got you covered
                    </p>

                    <div className='grid grid-cols-3 gap-8 z-30'>
                        <div className='col-span-3 lg:col-span-2 bg-white/80 shad p-4 md:p-8 rounded-3xl'>
                            <h1 className='text-5d5 mt-6 mb-3'>Payment Method</h1>

                            <div className='flex gap-2'>
                                <LeftArrowIcon height={48} width={48} color={"#009969"} />
                                <div className='mb-8'>
                                    <h1 className='mont md:text-[32px] font-bold text-3d3'>Upgrade to {plan.name}</h1>
                                    <p className='text-sm md:text-lg text-989'>For candidates actively applying and wanting more control.</p>
                                </div>
                            </div>
                            <form action="">
                                <InputField
                                    label="Billed To"
                                    placeholder="Muhammad Ali"
                                    type="text"
                                    name="name"
                                />
                                <h1 className='text-5d5 mt-6 mb-3'>Payment Details</h1>
                                <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-6'>
                                    <div
                                        className={`py-4 px-5 border rounded-xl cursor-pointer ${getMethodClass('credit-card')}`}
                                        onClick={() => setSelectedMethod('credit-card')}
                                    >
                                        <CardIcon height={24} width={24} color={getIconColor('credit-card')} />
                                        <h1 className='md:text-xl  mt-3'>Credit Card</h1>
                                    </div>
                                    <div
                                        className={`py-4 px-5 border rounded-xl cursor-pointer ${getMethodClass('bank-transfer')}`}
                                        onClick={() => setSelectedMethod('bank-transfer')}
                                    >
                                        <BankIcon height={24} width={24} color={getIconColor('bank-transfer')} />
                                        <h1 className='md:text-xl  mt-3'>Bank Transfer</h1>
                                    </div>
                                    <div
                                        className={`py-4 px-5 border rounded-xl cursor-pointer ${getMethodClass('paypal')}`}
                                        onClick={() => setSelectedMethod('paypal')}
                                    >
                                        <PaypalIcon height={24} width={24} color={getIconColor('paypal')} />
                                        <h1 className='md:text-xl  mt-3'>Paypal</h1>
                                    </div>
                                </div>

                                {selectedMethod === 'credit-card' && (
                                    <>
                                        {plan && user && (


                                            <StripePayment plan={plan} user={userProfile} />

                                        )}
                                    </>
                                )}

                                {/* <div className='flex items-center flex-col sm:flex-row gap-4 mt-8'>
                                    <button className='px-12 order-2 sm:order-1 py-2 h-[56px] w-full max-w-[200px] bg-[#EBFEF5] rounded-md'>Cancel</button>
                                    <button className='px-12 order-1 sm:order-2 py-2 h-[56px] flex-1 bg-green rounded-md text-white'>Subscribe</button>
                                </div> */}

                                <p className='mt-8 text-[#707F8F] text-sm md:text-[16px]'>
                                    By providing your card information, you allow us to charge your card for future payment in accordance with their terms.
                                </p>
                            </form>
                        </div>

                        <div className='col-span-3 lg:col-span-1 bg-white/80 shad p-4 md:p-8 rounded-3xl'>
                            <div
                                className={`p-6 mx-auto lg:mx-0 rounded-[30px] inter max-w-[300px] border-4 border-[#B6B2FF80] lg:max-w-[400px] w-full lg:min-w-[300px] min-h-[526px] shad transition-transform transform hover:scale-105 text-start flex flex-col 
                                    ${plan.isPopular ? `bg-green text-white` : "bg-white text-1d2"}`}
                            >
                                <div className='flex justify-between items-center'>
                                    <h2 className="font-semibold">{plan.name}</h2>
                                    {plan.isPopular && (
                                        <span className="bg-white inter text-green text-sm font-semibold px-2 py-1 rounded-xl mb-3 inline-block">
                                            Most Popular
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className='flex gap-2 items-center pb-8'>
                                        <p className="text-4xl font-extrabold mt-2">${plan.price}</p>
                                        <p className={`text-sm mt-1 max-w-[120px] inter ${plan.isPopular ? "text-white" : "text-989"}`}>
                                            {plan.description}
                                        </p>
                                    </div>
                                    <ul className="mt-4 space-y-2">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-xs md:text-sm justify-start space-x-2">
                                                <span className={`w-4 h-4 flex justify-center items-center rounded-full 
                                                    ${plan.isPopular ? "bg-0ab" : "bg-[#EBEFF0]"}`}>
                                                    ✅
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    className={`mt-auto w-full py-2 self-end rounded-lg md:text-lg font-semibold 
                                        ${plan.isPopular ? "bg-0ab text-white" : "bg-f1e text-green"}`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <img src="/assets/planbgleft.png" alt="plan" className='absolute left-0 bottom-20 z-0' />
                <img src="/assets/planbgright.png" alt="plan" className='absolute right-0 bottom-20 z-0' />
            </div>
        </Suspense>
    )
}

export default PlanSubscribe