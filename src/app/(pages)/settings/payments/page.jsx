import BankIcon from '@/components/Icons/BankIcon.svg'
import CardIcon from '@/components/Icons/CardIcon.svg'
import PaypalIcon from '@/components/Icons/PaypalIcon.svg'
import React from 'react'

const Payment = () => {
  return (
    <>
     <div className={`col-span-2 rounded-3xl py-10 px-12 bg-white shad     `}>

     <h1 className='font-semibold capitalize text-2xl text-3d3'>payment settings</h1>
     <h1 className='text-5d5 mt-6 mb-3'>Payment methods</h1>
                                <div className='grid grid-cols-3 gap-3'>
                                    <div className='py-4 px-5 border rounded-xl border-[#BDBDBD]'>
                                        <CardIcon height={24} width={24} color={"#525252"} />
                                        <h1 className='text-xl text-525 mt-3'>Credit Card</h1>
                                    </div>
                                    <div className='py-4 px-5 border rounded-xl border-[#BDBDBD]'>
                                        <BankIcon height={24} width={24} color={"#525252"} />
                                        <h1 className='text-xl text-525 mt-3'>Bank Transfer</h1>
                                    </div>
                                    <div className='py-4 px-5 border rounded-xl border-[#BDBDBD]'>
                                        <PaypalIcon height={24} width={24} color={"#525252"} />
                                        <h1 className='text-xl text-525 mt-3'>Paypal</h1>
                                    </div>
                                    
                                </div>
     </div>
      
    </>
  )
}

export default Payment
