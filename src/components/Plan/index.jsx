import React from 'react'
import CheckIcon from '../Icons/CheckIcon.svg';

const Plan = () => {
    const plans = [
        {
            name: "Basic Plan",
            price: "$0",
            description: "per editor/month billed monthly",
            features: [
                "30h Fast generations",
                "Unlimited Relaxed generations",
                "General commercial terms",
                "Access to member gallery",
                "Optional credit top ups",
                "3 concurrent fast jobs",
                "12 concurrent fast jobs",
                "Access to member gallery",
                "Optional credit top ups",
            ],
            buttonText: "Current Plan",
            isPopular: false,
        },
        {
            name: "Stander Plan",
            price: "$30",
            description: "per editor/month billed monthly",
            features: [
                "15h Fast generations",
                "Unlimited Relaxed generations",
                "General commercial terms",
                "Access to member gallery",
                "Optional credit top ups",
                "3 concurrent fast jobs",
                "Access to member gallery",
                "Optional credit top ups",
            ],
            buttonText: "Choose Plan",
            isPopular: true,
        },
        {
            name: "Unlimited Plan",
            price: "$120",
            description: "per editor/month billed monthly",
            features: [
                "60h Fast generations",
                "Unlimited Relaxed generations",
                "General commercial terms",
                "Access to member gallery",
                "Optional credit top ups",
                "3 concurrent fast jobs",
                "12 concurrent fast jobs",
            ],
            buttonText: "Choose Plan",
            isPopular: false,
        },
    ];
    return (
        <div className='pt-[86px] pb-[107px] px-6 md:px-10 lg:px-32 relative overflow-hidden bg-white'>
            <div className='container mx-auto px-6 flex justify-between items-center z-10 flex-col  gap-6 '>
                <h1 className='text-5xl lg:text-[56px] font-extrabold robo text-center text-0f1 capitalize'>a <span className='relative'>plan <img src="/assets/underline2.png" alt="underline" className='absolute  -bottom-2 right-2' /></span> made just for you</h1>
                <p className=' mx-auto text-[22px] robo text-0f1'>Choose a plan that fits your career goals  from job applications to LinkedIn growth, we’ve got you covered</p>

                <div className='w-full min-h-[640px] flex justify-center  items-end h-full z-20 relative desk rounded-4xl  bg-cover bg-no-repeat '>
                    {/* <img src="/assets/desktop.png" alt="" className='mx-auto' /> */}
                    <div className=' flex justify-center gap-9 items-center h-full   w-full'>

                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-[30px] inter max-w-[300px] lg:max-w-max lg:min-w-[300px] min-h-[526px] shadow-lg transition-transform transform hover:scale-105 text-start flex flex-col  ${plan.isPopular ? "bg-green text-white -mt-14" : "bg-white text-1d2  -mb-4"
                                    }`}

                            >
                                <div className='flex justify-between items-center'>
                                    <h2 className=" font-semibold ">{plan.name}</h2>

                                    {plan.isPopular && (
                                        <span className="bg-white inter text-green text-sm font-semibold px-2 py-1 rounded-xl mb-3 inline-block">
                                            Most Popular
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className='flex gap-2 items-center pb-8'>
                                        <p className="text-4xl font-extrabold mt-2 text-">{plan.price}</p>

                                        <p className="text-sm mt-1 max-w-[120px] inter text-b9b">{plan.description}</p>
                                    </div>


                                    <ul className="mt-4 space-y-2">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-sm justify-start space-x-2">
                                                <span className={`w-4 h-4 flex justify-center items-center rounded-full ${plan.isPopular ? "bg-0ab" : "bg-[#EBEFF0]"
                                                    } `}><CheckIcon color={plan.isPopular ? "#ffffff" : "#B9BEC1"} /></span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    className={`mt-auto w-full py-2 self-end rounded-lg text-lg font-semibold ${plan.isPopular ? "bg-0ab text-white" : "bg-f1e text-green"
                                        }`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <img src="/assets/planbgleft.png" alt="plan" className='absolute left-0 bottom-20 z-0' />
            <img src="/assets/planbgright.png" alt="plan" className='absolute right-0 bottom-20 z-0' />
        </div>
    )
}

export default Plan
