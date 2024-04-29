'use client'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutForm from './_components/CkeckoutForm';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const Checkout = () => {
    const searchParma = useSearchParams();
    console.log(searchParma.get('amount'));
    const options = {
        mode: 'payment',
        currency: 'usd',
        amount: searchParma.get('amount') *100
    }
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount = {searchParma.get('amount')} />
    </Elements>
  )
}

export default Checkout