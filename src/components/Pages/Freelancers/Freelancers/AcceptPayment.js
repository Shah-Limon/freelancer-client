import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AcceptPayment = () => {
    const { id } = useParams();
    const [orderReceived, setorderReceived] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const url = `http://localhost:5000/order/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setorderReceived(data));
    }, [orderReceived]);

    const handleAcceptFunds = event => {
        event.preventDefault();
        const paymentAccepted = event.target.paymentAccepted.value;
        const payment = { paymentAccepted };
        const url = `http://localhost:5000/acceptpaymentfromorder/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payment)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure?');
                navigate(`/addfundstobalance/${orderReceived._id}`)
            })
    };

    return (
        <div className='container'>
            <div className='my-5 shadow p-3 mb-5 bg-body rounded-5'>
                <h5>Order ID - {orderReceived._id}</h5>
                <h5>Service Name - {orderReceived.servicename}</h5>
                <h5>Service Price - {orderReceived.serviceprice} USD</h5>
                <h5>Released Amount - {orderReceived.releaseAmount} USD</h5>
                <h5>Client Name - {orderReceived.clientName} </h5>
                {orderReceived.paymentAccepted === 'none' &&
                <form onSubmit={handleAcceptFunds}>
                <input value= 'done' type="text" name="paymentAccepted" id="" />
                <input type="submit" value="Accept And Next" />
            </form>
                }
                
            </div>

        </div>
    );
};

export default AcceptPayment;