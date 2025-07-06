'use client'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CheckoutForm = ({ plan, user }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
const router = useRouter()

    const handleSubmit = async (e) => {
        console.log('Form submission started');
        e.preventDefault();
        // console.log('Default prevented:', e.defaultPrevented);
        setLoading(true)
        setError('')

        if (!stripe || !elements) {
            setError('Stripe failed to initialize')
            setLoading(false)
            return
        }

        try {
            // 1. Create payment intent directly with Stripe API
            const response = await fetch('https://api.stripe.com/v1/payment_intents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
                },
                body: new URLSearchParams({
                    amount: Math.round(plan.price * 100),
                    currency: 'usd'
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to create payment intent')
            }

            // 2. Confirm the payment with Stripe.js
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                    },
                }
            })

            if (stripeError) throw stripeError

            // 3. Save to Strapi
            if (paymentIntent.status === 'succeeded') {
                await savePaymentToStrapi(paymentIntent)
                // window.location.href = '/payment-success'
            }
        } catch (err) {
            setError(err.message)
            console.error('Payment error:', err)
        } finally {
            setLoading(false)
        }
    }

    const savePaymentToStrapi = async (paymentIntent) => {
        try {
            const token = localStorage.getItem("token")
            await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments`, {
                data: {
                    profile: user.documentId,
                    plan: plan.documentId,
                    amount: plan.price,
                    stripe_payment_id: paymentIntent.id,
                    payment_status: 'completed',
                    payment_method: 'card',
                    date: new Date(Date.now())
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/profiles/${user.documentId}`, {
                data: {
                    isPremium: true,
                    plans: {
                        connect:[plan.documentId]},
                    premiumExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            router.push('/settings/subscription')
        } catch (err) {
            console.error('Failed to save payment:', err)
            throw new Error('Payment succeeded but failed to save record')
        }
    }

    const isAlreadySubscribed = () => {
        // 1. Basic validation
        if (!plan || !user) {
            console.log('Missing plan or user data');
            return false;
        }
        if (!user.plans || !Array.isArray(user.plans)) {
            console.log('Invalid user.plans format');
            return false;
        }

        // 2. Find matching plan with debug info
        const matchingPlan = user.plans.find(p => p.name === plan.name);
        console.log('Matching plan details:', matchingPlan);

        if (!matchingPlan) {
            console.log('No plan with matching name found');
            return false;
        }

        // 3. Check premium status
        console.log('User premium status:', user.isPremium);
        if (user.isPremium !== true) {
            console.log('User is not premium');
            return false;
        }

        // 4. Check expiration with timezone awareness
        const now = new Date();
        const expirationDate = new Date(user.premiumExpiresAt);

        //   console.log('Current time:', now.toISOString());
        console.log('Expiration time:', expirationDate);



        const isNotExpired = expirationDate > now;
        console.log('Is not expired:', isNotExpired);

        // Final decision
        const result = isNotExpired;
        console.log('Final result:', result);
        return result;
    };
    const subscriptionStatus = isAlreadySubscribed();
    console.log('Subscription status:', subscriptionStatus);
    return (
        <form >
            <div className="p-2 border border-green rounded-md mb-4 mx-auto w-full max-w-s">

                <CardElement

                    options={{
                        style: {

                            base: {
                                fontSize: '16px',

                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',

                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            <div className='flex items-center flex-col sm:flex-row gap-4 mt-8'>
                <Link href={'/'}>
                    <button className='px-12 order-2 sm:order-1 py-2 h-[56px] w-full max-w-[200px] bg-[#EBFEF5] rounded-md'>Cancel</button>
                </Link>
                <button  onClick={handleSubmit} disabled={!stripe || loading || subscriptionStatus} className='px-12 order-1 sm:order-2 py-2 h-[56px] flex-1 bg-green rounded-md text-white'>{loading ? 'Processing...' : `Subscribe `}</button>
            </div>
            {error && <div className="error mt-4">{error}</div>}
            {subscriptionStatus && <div className="error mt-4">You already subscribe this plan. Check your plan details <Link href={'/settings/subscription'}><span className='text-green cursor-pointer'>here</span></Link></div>}
        </form>
    )
}

export default function StripeCheckout({ plan, user }) {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm plan={plan} user={user} />
        </Elements>
    )
}