import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import Notify from '../common/Notify';
const FAQs = () => {
    const faqData = [
        { id: 1, question: 'How does ApplyPro work?' },
        { id: 2, question: 'Is my personal information and CV secure?', ml: "ml-[70px] -mr-[70px]" },
        { id: 3, question: 'How do you create LinkedIn posts for me?', ml: "ml-[166px] -mr-[166px]" },
        { id: 4, question: 'Can I track the jobs applied for on my behalf?', ml: "ml-[70px] -mr-[70px]" },
        { id: 5, question: 'What if I want to reapply for a job?' },
    ];
    return (
        <div className='pt-[86px]  px-6 md:px-10  relative overflow-hidden bg-bggreen'>
            <div className=' mx-auto px-6 flex justify-between items-center z-10 flex-col  gap-6 '>
                <h1 className='text-5xl lg:text-[56px] font-extrabold robo text-center text-0f1 capitalize'>Got Questions? We’ve Got  <span className='relative'>Answers <img src="/assets/underline3.png" alt="underline" className='absolute -bottom-2 right-2 ' /></span> </h1>

                <div className='flex items-center h-full mt-20 z-10'>
                    <div className=' rounded-full h-[595px] w-[595px] overflow-visible   relative '>
                        <img src="/assets/faqimg.png" alt="faq" className=' absolute z-10 -top-10' />
                        <img src="/assets/faqimgcircle.png" alt="faq" className='z-0 absolute -top-0 scale-105' />
                    </div>
                    <div className="mt-8 flex flex-col justify-between  gap-4 h-[600px]">
                        {faqData.map((faq) => (
                            <details key={faq.id} className={`${faq.ml} bg-[#FFFFFF80] text-3d3 flex flex-col items-center px-6 robo rounded-lg py-3 shad min-h-[75px] cursor-pointer`}>
                                <summary className=" text-2xl flex justify-between items-center gap-3">
                                    <span className='h-10 w-10 bgshad rounded-full bg-[#D9D9D9] text-black flex justify-center items-center'>{faq.id}</span>
                                    {faq.question}
                                    <RiArrowDropDownLine />
                                </summary>
                                <p className="mt-2 text-gray-600">
                                    This is the answer to the question. Add dynamic content here.
                                </p>
                            </details>
                        ))}
                    </div>

                </div>
                <Notify/>
            </div>

            <img src="/assets/faqbgright.png" alt="faq" className='absolute right-0 top-40 z-0' />
            <img src="/assets/faqcircleright.png" alt="faq" className='absolute right-0 top-28 z-0' />
            <img src="/assets/faqstar.png" alt="faq" className='absolute left-0 top-0' />
        </div>
    )
}

export default FAQs
