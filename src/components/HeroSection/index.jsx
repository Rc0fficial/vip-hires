import React from 'react'
import FlashIcon from '../Icons/Flash.svg'
import BriefcaseIcon from '../Icons/BriefcaseIcon.svg'

const Hero = () => {
  return (
    <div className='py-[86px] px-6 md:px-10 lg:px-32 relative overflow-hidden'>
        <div className='container mx-auto flex justify-between items-center z-10 flex-col lg:flex-row gap-10 '>
            <div className='w-full max-w-[556px] z-10'>
                <h1 className='text-5xl font-bold max-w-[504px] text-[#3D3D3D] mont mb-6'>Land Your Dream Job Effortlessly</h1>
                <p className="text-[#989898] text-xl mb-10 leading-[40px]  dm tracking-[2px] capitalize">
  We apply for jobs on your behalf, craft your LinkedIn posts, and keep you updated—so you stay ahead in your career
</p>
 <button className='h-[72px] w-[280px] text-center text-xl font-semibold flex justify-center items-center rounded-md text-white bg-green'>Start Now</button>  
            </div>
            <div className='w-full max-w-[632px] flex items-center relative'>
                <div className='w-[156px] h-[140px] flex items-center gap-2 bg-white absolute top-0 left-1/5 z-20 rounded-2xl shadow-xl flex-col p-4'>
                    <FlashIcon/>
                    <p className='font-medium text-333'>It only takes a few seconds</p>

                </div>
                <div className='w-[145px] h-[148px] flex items-center gap-2 bg-white absolute bottom-0 left-0 z-20 rounded-2xl shadow-xl flex-col p-4'>
                    <BriefcaseIcon/>
                    <h1 className='text-4f4 font-semibold text-[25px]'>10.5k</h1>

                    <p className='font-medium text-333'>Job Vocancy</p>
                </div>
                <img src="/assets/heroimgbg.png" alt="hero" className='absolute top-0 left-0 z-0 scale-110' />
                <img src="/assets/heroimg.png" alt="heroimg" className='mx-auto z-10 w-[493px] h-auto' />
            </div>


        </div>
      <img src="/assets/herostar.png" className='absolute left-0 bottom-0 z-0' alt="" />
      <img src="/assets/hero1.png" className='absolute left-0 top-0 z-0' alt="" />
      <img src="/assets/hero2.png" className='absolute right-0 bottom-0 z-0' alt="" />
    </div>
  )
}

export default Hero
