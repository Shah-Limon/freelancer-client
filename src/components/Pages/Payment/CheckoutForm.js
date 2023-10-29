import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useEffect } from 'react';

const CheckoutForm = ({order}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError]  = useState('');
    const [success, setSuccess]  = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const {serviceprice, clientName} = order


    useEffect( () => {

        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })

        .then(res => res.json())
            .then(data => {
               if(data?.clientSecret){
                setClientSecret(data.clientSecret);
               }
            })
        

    }, [serviceprice])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
          }

          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
          });
      
          if (error) {
            setCardError(error?.message || '');
          } else {
            console.log('[paymentMethod]', paymentMethod);
          }

          const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: clientName,
                },
              },
            },
          );

          if(intentError){
            setCardError(intentError?.message || '');
            success('');
          }
          else{
            setCardError('');
            console.log(paymentIntent);
            setSuccess('Your Payment is Completed')
          }
    }
    
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
        {
            cardError && <p className="text-danger">{cardError}</p>
        }
        {
            success && <p className="text-green">{success}</p>
        }
        </div>
        
    );
};

export default CheckoutForm;