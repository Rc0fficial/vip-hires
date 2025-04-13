'use client'

import BankIcon from '@/components/Icons/BankIcon.svg'
import CardIcon from '@/components/Icons/CardIcon.svg'
import PaypalIcon from '@/components/Icons/PaypalIcon.svg'
import React, { useState } from 'react'
import CreditCard from './CreditCard'
import AddIcon from '@/components/Icons/AddIcon.svg'
import CreditCardForm from './CreditCardForm'

const PaymentMethods = () => {
    // Payment method selection state
    const [selectedMethod, setSelectedMethod] = useState('');
    
    // Card selection and management state
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([
        {
            id: 1,
            holderName: "Mohamed Ali Ahmed",
            cvv: "***",
            exp: "12/22",
            cardNumber: "3778 **** **** 1234",
            bgColor: "green-card",
            textColor: "text-white"
        },
        {
            id: 2,
            holderName: "Mohamed Ali Ahmed",
            cvv: "***",
            exp: "12/22",
            cardNumber: "3778 **** **** 1234",
            bgColor: "gray-card",
            textColor: "text-525"
        }
    ]);

    // Form state
    const [formData, setFormData] = useState({
        holderName: '',
        cardNumber: '',
        exp: '',
        cvv: ''
    });

    const [isAddingNewCard, setIsAddingNewCard] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = () => {
        if (selectedCard) {
            setCards(cards.filter(card => card.id !== selectedCard));
            setSelectedCard(null);
            setIsAddingNewCard(false);
        }
        setFormData({
            holderName: '',
            cardNumber: '',
            exp: '',
            cvv: ''
        });
    };

    const handleSaveCard = () => {
        if (isAddingNewCard) {
            // Add new card
            const newCard = {
                id: Date.now(),
                holderName: formData.holderName,
                cvv: "***",
                exp: formData.exp,
                cardNumber: formData.cardNumber.replace(/\d(?=\d{4})/g, "*"),
                bgColor: "green-card",
                textColor: "text-white"
            };
            setCards([...cards, newCard]);
            setSelectedCard(newCard.id);
        } else if (selectedCard) {
            // Update existing card
            setCards(cards.map(card => 
                card.id === selectedCard 
                    ? { 
                        ...card, 
                        holderName: formData.holderName,
                        exp: formData.exp,
                        cardNumber: formData.cardNumber.replace(/\d(?=\d{4})/g, "*")
                    } 
                    : card
            ));
        }
        
        setIsAddingNewCard(false);
        setFormData({
            holderName: '',
            cardNumber: '',
            exp: '',
            cvv: ''
        });
    };

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
        setIsAddingNewCard(false);
        const card = cards.find(c => c.id === cardId);
        if (card) {
            setFormData({
                holderName: card.holderName,
                cardNumber: card.cardNumber,
                exp: card.exp,
                cvv: ''
            });
        }
    };

    const handleAddCardClick = () => {
        setIsAddingNewCard(true);
        setSelectedCard(null);
        setFormData({
            holderName: '',
            cardNumber: '',
            exp: '',
            cvv: ''
        });
    };
    const getIconColor = (method) =>
        selectedMethod === method ? '#FFFFFF' : '#525252';
    const getMethodClass = (method) => 
        selectedMethod === method 
            ? 'border-green bg-green text-white' 
            : 'border-[#BDBDBD] text-525';

    return (
        <>
            <h1 className='text-5d5 text-xs md:text-[16px] mt-6 mb-3'>Payment methods</h1>
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
                    <div className='flex items-center flex-wrap lg:flex-nowrap gap-4 mb-6'>
                        {cards.map(card => (
                            <div 
                                key={card.id} 
                                onClick={() => handleCardClick(card.id)}
                                className={selectedCard === card.id ? 'ring-2 ring-green rounded-3xl' : ''}
                            >
                                <CreditCard {...card} />
                            </div>
                        ))}

                        <div 
                            className='green-card rounded-3xl flex flex-col items-center py-6 h-[225px] px-[19px] cursor-pointer'
                            onClick={handleAddCardClick}
                        >
                            <div className='mb-8 flex flex-col items-center'>
                                <h1 className='text-white'>CARD</h1>
                                <img src="/assets/chip-card.png" alt="chip" className='h-[35px] w-[35px]' />
                            </div>
                            <AddIcon height={24} width={24} color={"#ffffff"} />
                        </div>
                    </div>

                    {(selectedCard || isAddingNewCard) && (
                        <CreditCardForm
                            formData={formData}
                            onChange={handleChange}
                            onDelete={selectedCard ? handleDelete : null}
                            onSave={handleSaveCard}
                            isNewCard={isAddingNewCard}
                        />
                    )}
                </>
            )}

            {selectedMethod === 'bank-transfer' && (
                <div className='p-6 bg-gray-100 rounded-xl'>
                    <h2 className='text-xl text-525 mb-4'>Bank Transfer Information</h2>
                    <p>Your bank transfer details will be shown here.</p>
                </div>
            )}

            {selectedMethod === 'paypal' && (
                <div className='p-6 bg-gray-100 rounded-xl'>
                    <h2 className='text-xl text-525 mb-4'>PayPal Information</h2>
                    <p>Your PayPal account details will be shown here.</p>
                </div>
            )}
        </>
    )
}

export default PaymentMethods