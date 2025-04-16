import React from 'react'

const OurFamily = () => {
    const stats = [

        {
            title: "4.5k+",
            detail: "Daily register from new users"
        },
        {
            title: "1.5k+",
            detail: "hired every month"
        },
        {
            title: "1000+",
            detail: "job opportunity for you"
        },
    ]
    return (
        <div className='pt-[86px] pb-[107px]  md:px-10  relative overflow-hidden bg-bggreen'>
            <div className=' mx-auto px-6 flex justify-between items-center z-10 flex-col  gap-6 '>
                <h1 className='text-2xl md:text-5xl lg:text-[72px] font-bold rale text-center'>Be A Part Of Our Family</h1>
                <p className='max-w-[683px] mx-auto md:text-[22px] rale text-center'>Land your dream job effortlessly – we apply, update, and keep you ahead in your career</p>
                <div className='mapbg bg-center h-[651px]  w-full grid grid-cols-1 xl:grid-cols-2 gap-10 justify-center items-center '>
                    <div className='w-full h-fit max-w-[598px] mx-auto bg-white/70 rounded-[60px] py-[36px] px-12 md:px-[81px] relative'>
                        <p className='mont text-525 md:leading-[42px]  text-sm md:text-[16px] leading-[30px] indent-10'>  I landed my dream job in just 3 weeks thanks to ApplyPro! The LinkedIn posts were a game-changer</p>
                        <h1 className='text-525 font-semibold text-sm md:text-[16px] mont -ml-7 '>Ahmed, Marketing Manager</h1>
                        <img src="/assets/comma.png" alt="comma" className='absolute top-6 left-6' />
                        <img src="/assets/comma.png" alt="comma" className='absolute rotate-180 right-6 bottom-6' />

                    </div>
                    <div className='w-full mx-auto h-fit max-w-[556px] relative'>
                        <img src="/assets/familyCircle.png" alt="circle" />
                        <div className='absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20'>


                            <div className='py-4 px-6 bg-white rounded-[24px] w-full max-w-[270px]   gap-3 flex flex-col'>
                                <div className='flex items-center  gap-3'>
                                    <img src="/assets/m2.png" alt="male" />
                                    <div>
                                        <h1 className='md:text-lg dm capitalize font-medium'>ahmed galal</h1>
                                        <p className='text-757 text-xs md:text-sm '>senior developer</p>
                                    </div>



                                </div>
                                <h1 className='text-757 text-xs md:text-sm flex items-center justify-center pl-6 gap-1'>hired by: <img src="/assets/ball.png" alt="ball" /> dribble</h1>

                            </div>
                            <div className='flex justify-between flex-col md:flex-row items-center overflow-visible gap-6'>


                                <div className='py-4 px-6 bg-white rounded-[24px] w-full min-w-[270px]   gap-3 flex flex-col'>
                                    <div className='flex items-center  gap-3'>
                                        <img src="/assets/m3.png" alt="male" />
                                        <div>
                                            <h1 className='md:text-lg dm capitalize font-medium'>adam ebrahim</h1>
                                            <p className='text-757 text-xs md:text-sm '>project manger</p>
                                        </div>



                                    </div>
                                    <h1 className='text-757 text-xs md:text-sm flex items-center justify-center pl-14 gap-1 '>hired by: <img src="/assets/voda.png" alt="ball" /> vodafone</h1>

                                </div>
                                <div className='py-4 px-6 bg-white rounded-[24px] w-full min-w-[270px]   gap-3 flex flex-col'>
                                    <div className='flex items-center  gap-3'>
                                        <img src="/assets/g1.png" alt="male" />
                                        <div>
                                            <h1 className='md:text-lg dm capitalize font-medium'>salma samy </h1>
                                            <p className='text-757 text-xs md:text-sm '>UI/UX designer</p>
                                        </div>



                                    </div>
                                    <h1 className='text-757 text-xs md:text-sm flex items-center gap-1 justify-center pl-14 '>hired by: <img src="/assets/voda.png" alt="ball" /> vodafone</h1>

                                </div>
                            </div>
                            <div className='py-4 px-6 bg-white rounded-[24px]  w-full max-w-[270px]  gap-3 flex flex-col'>
                                <div className='flex items-center  gap-3'>
                                    <img src="/assets/g2.png" alt="male" />
                                    <div>
                                        <h1 className='md:text-lg dm capitalize font-medium'>salma samy </h1>
                                        <p className='text-757 text-xs md:text-sm '>UI/UX designer</p>
                                    </div>



                                </div>
                                <h1 className='text-[#07A287] text-xs md:text-sm text-center gap-1 pl-12'>open for recruitment</h1>

                            </div>
                        </div>
                        <img src="/assets/g1.png" alt="g" className='absolute top-6 left-1/2 -translate-x-1/2' />
                        <img src="/assets/m1.png" alt="g" className='absolute top-20 right-0' />
                        <img src="/assets/m4.png" alt="g" className='absolute bottom-20 right-0' />
                    </div>
                </div>

                <div className='flex flex-wrap w-full  lg:flex-nowrap justify-between gap-5 md:gap-10 mt-80 md:mt-20   xl:mt-6'>
                    {stats?.map((stats, i) => (
                        <div key={i} className='max-w-[260px] mx-auto lg:mx-0'>
                            <h1 className='man text-2xl md:text-[65px] leading-[60px] md:leading-[100px] text-center lg:text-start  lg:text-[80px] font-bold'>{stats.title}</h1>
                            <p className='rale text-[16px] md:text-[22px] mt-2 max-w-[206px] text-center lg:text-start '>{stats?.detail}</p>
                        </div>
                    ))}

                </div>

            </div>
            {/* <img src="/assets/map.png" alt="map" className='absolute z-0 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2' /> */}
        </div>
    )
}

export default OurFamily
