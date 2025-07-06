'use client'
import React, { useEffect, useState } from 'react'
import CheckIcon from '../Icons/CheckIcon.svg';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const Plan = ({ bgImg }) => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/plans?populate=*`);
                // Transform Strapi data to match your component's expected format
                const formattedPlans = response.data.data.map(plan => ({
                    documentId: plan.documentId,
                    name: plan.name,
                    price: plan.price,
                    description: plan.billing_period,
                    isPopular: plan.isPopular,
                    buttonText: plan.buttonText || "Choose Plan",
                    features: [
                        plan.fast_genaration,
                        plan.relaxed_generation,
                        plan.commercial_terms,
                        plan.member_gallery_access ? "Access to member gallery" : "",
                        plan.credit_top_ups ? "Optional credit top ups" : "",
                        `${plan.concurrent_fast_jobs} concurrent fast jobs`
                    ].filter(Boolean) // Remove empty strings
                }));
                
                // Sort plans to ensure popular plan is in the middle
                const sortedPlans = [...formattedPlans].sort((a, b) => {
                    if (a.isPopular) return 1;
                    if (b.isPopular) return -1;
                    return 0;
                });
                
                setPlans(sortedPlans);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching plans:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    if (loading) return <div className="text-center py-20">Loading plans...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

    return (
        <div className='pt-[86px] pb-[107px] md:px-10 relative overflow-hidden bg-white'>
            <div className='mx-auto px-6 flex justify-between items-center z-10 flex-col gap-6'>
                <h1 className='text-2xl md:text-5xl lg:text-[56px] font-extrabold robo text-center text-0f1 capitalize'>
                    a <span className='relative'>plan <img src="/assets/underline2.png" alt="underline" className='absolute -bottom-2 right-2 w-[127px] h-3 md:h-5' /></span> made just for you
                </h1>
                <p className='mx-auto md:text-[22px] robo text-0f1 text-center'>
                    Choose a plan that fits your career goals from job applications to LinkedIn growth, we've got you covered
                </p>

                <div className={`w-full min-h-[640px] flex justify-center ${pathname?.startsWith("/subscription") ? "items-center" : "items-end"} h-full z-20 relative ${bgImg} rounded-4xl bg-cover bg-no-repeat`}>
                    <div className={`flex justify-center flex-col lg:flex-row gap-9 items-center h-full p-4 md w-full`}>
                        {plans?.map((plan, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-[30px] inter max-w-[300px] lg:max-w-[400px] w-full lg:min-w-[300px] min-h-[450px] md:min-h-[526px] shad transition-transform transform hover:scale-105 text-start flex flex-col ${plan.isPopular ? `bg-green text-white lg:order-2 lg:-mt-14` : index === 0 ? "lg:order-1 bg-white text-1d2 lg:-mb-4" : "lg:order-3 bg-white text-1d2 lg:-mb-4"}`}
                            >
                                <div className='flex justify-between items-center'>
                                    <h2 className="font-semibold">{plan.name}</h2>
                                    {plan.isPopular && (
                                        <span className="bg-white inter text-green text-xs md:text-sm font-semibold px-2 py-1 rounded-xl mb-3 inline-block">
                                            Most Popular
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className='flex gap-2 items-center pb-8'>
                                        <p className="text-2xl md:text-4xl font-extrabold mt-2">${plan.price}</p>
                                        <p className="text-xs md:text-sm mt-1 max-w-[120px] inter text-b9b">{plan.description}</p>
                                    </div>

                                    <ul className="mt-4 space-y-2">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-xs md:text-sm justify-start space-x-2">
                                                <span className={`w-4 h-4 flex justify-center items-center rounded-full ${plan.isPopular ? "bg-0ab" : "bg-[#EBEFF0]"}`}>
                                                    <CheckIcon color={plan.isPopular ? "#ffffff" : "#B9BEC1"} />
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Link href={`/subscription/${plan.documentId}`} className='mt-auto'>
                                    <button
                                        className={`mt-auto w-full py-2 cursor-pointer self-end rounded-lg md:text-lg font-semibold ${plan.isPopular ? "bg-0ab text-white" : "bg-f1e text-green"}`}
                                    >
                                        {plan.buttonText}
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <img src="/assets/planbgleft.png" alt="plan" className='absolute left-0 bottom-20 z-0' />
            <img src="/assets/planbgright.png" alt="plan" className='absolute right-0 bottom-20 z-0' />
        </div>
    );
}

export default Plan;