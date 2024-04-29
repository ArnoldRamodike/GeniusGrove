import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = ({amount}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleError = (error) => {
        setLoading(true);
        setErrorMessage(error.message);
    }
  
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      //Triger
      const {error: submitError}  = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return
        }
  
      const res = await fetch('/api/create-intent', {
        method: 'POST',
        body: JSON.stringify({
            amount: amount
        })
      })
      const clientSecret = await res.json();
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        clientSecret: clientSecret,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-confirm",
        },
      });
  
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
  return (
    <form onSubmit={handleSubmit}>
        <div className="px-15 md:mx-[250px] mt-12">
            <PaymentElement />
            <button disabled={!stripe} className='bg-primary p-2 text-white rounded-md w-full mt-6 hover:bg-blue-700'>Submit</button>
        </div>
    </form>
  );
};

export default CheckoutForm;