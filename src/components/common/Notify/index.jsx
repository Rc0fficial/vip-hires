import React from 'react'

const Notify = ({className}) => {
    return (
        <div className={`${className} bg-green p-4 mr-auto rounded-xl w-full max-w-[380px] flex justify-between items-center`}>
            <div className='flex items-center gap-2'>
                <img src="/assets/profile.png" alt="profile" className='w-10 h-10 rounded-full' />
                <div>
                    <h1 className='text-white font-bold'>Sarah Amr</h1>
                    <h1 className='text-xs text-white'>Sarah Amr</h1>

                </div>

            </div>
            <div className='h-8 w-8 rounded-full text-green bg-white flex justify-center items-center'>2</div>

        </div>
    )
}

export default Notify
