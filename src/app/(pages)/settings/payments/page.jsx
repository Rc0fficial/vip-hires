import BankIcon from '@/components/Icons/BankIcon.svg'
import CardIcon from '@/components/Icons/CardIcon.svg'
import PaypalIcon from '@/components/Icons/PaypalIcon.svg'
import React from 'react'
import PaymentMethods from './PaymentMethods'
import ProtectedRoute from '@/components/ProtectedRoute'

const Payment = () => {
  return (
    <ProtectedRoute>
     <div className={`col-span-2 rounded-3xl py-10 px-4 md:px-12 bg-white shad   overflow-y-auto   `}>

     <h1 className='font-semibold capitalize md:text-2xl text-3d3'>payment settings</h1>
     <PaymentMethods/>
     </div>
      
    </ProtectedRoute>
  )
}

export default Payment
