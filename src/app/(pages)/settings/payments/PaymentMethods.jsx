'use client'

import BankIcon from '@/components/Icons/BankIcon.svg'
import CardIcon from '@/components/Icons/CardIcon.svg'
import PaypalIcon from '@/components/Icons/PaypalIcon.svg'
import React, { useState } from 'react'
import CreditCard from './CreditCard'
import AddIcon from '@/components/Icons/AddIcon.svg'
import CreditCardForm from './CreditCardForm'

const PaymentMethods = () => {
    const cardData = {
        holderName: "Mohamed Ali Ahmed",
        cvv: "***",
        exp: "12/22",
        cardNumber: "3778 **** **** 1234",
        bgColor: "green-card",
        textColor: "text-white"
    }
    const cardData2 = {
        holderName: "Mohamed Ali Ahmed",
        cvv: "***",
        exp: "12/22",
        cardNumber: "3778 **** **** 1234",
        bgColor: "gray-card",
        textColor: "text-525"
    }

    const [formData, setFormData] = useState({
        holderName: '',
        cardNumber: '',
        exp: '',
        cvv: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleDelete = () => {
        console.log('Deleted');
        setFormData({
          holderName: '',
          cardNumber: '',
          exp: '',
          cvv: ''
        });
      };
    
    return (
        <>
            <h1 className='text-5d5 mt-6 mb-3'>Payment methods</h1>
            <div className='grid grid-cols-3 gap-3 mb-6'>
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

            {/* Passing card data with custom bg and text color */}
            <div className='flex items-center gap-4'>

            <CreditCard {...cardData} />
            <CreditCard {...cardData2} />

            <div className='green-card rounded-3xl flex flex-col items-center py-6 h-[225px] px-[19px]'>
                <div className='mb-8 flex flex-col items-center'>
                    <h1 className='text-white'>CARD</h1>
                    <img src="/assets/chip-card.png" alt="chip" className='h-[35px] w-[35px]' />
                </div>

                <AddIcon height={24} width={24} color={"#ffffff"} />


            </div>
            </div>

            <CreditCardForm
        formData={formData}
        onChange={handleChange}
        onDelete={handleDelete}
      />
        </>
    )
}

export default PaymentMethods
