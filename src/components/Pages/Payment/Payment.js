import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L0iFOHYRbzBoepBIatnCVtApveRFaTmhw8Ijm5W6NFlFDvruSWcOFr50PLLcwz5U3UeEaMrTOhDMT6Jq8ZYxAIl00wfMhOesc');

const Payment = () => {
    const {orderId} = useParams();
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/myorder/${orderId}`
        fetch(url)
            .then(res => res.json())
            .then(data => setOrder(data));

    }, [])

    


    return (
        <div className='container'> 
            <h5>Service: {order.servicename}</h5>
            <h5>Amount: ${order.serviceprice} USD</h5>
            <Button><i class="fa-brands fa-paypal"></i> Make Payment Using PayPal</Button>
            <Button><i class="fa-solid fa-credit-card"></i> Make Payment Using Credit Card</Button>
            <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "1.99",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />
        </PayPalScriptProvider>

        <Elements stripe={stripePromise}>
    <CheckoutForm order={order} />
  </Elements>
        </div>
    );
};

export default Payment;