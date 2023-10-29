import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../../../firebase.init';

const AddFundstoBalance = () => {
    const { id } = useParams();
    const [orderReceived, setorderReceived] = useState([]);
    const [providers, setProviders] = useState([]);
    const [user] = useAuthState(auth)
    const navigate = useNavigate()



    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${user.email}`)
            .then(res => res.json())
            .then(review => setProviders(review))
    }, [user]);

    useEffect(() => {
        const url = `http://localhost:5000/order/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setorderReceived(data));
    }, [orderReceived]);

    const handleBalance = event => {
        event.preventDefault();
        const currentBalance = event.target.currentBalance.value;
        const freelancerBalance = { currentBalance };
        const url = `http://localhost:5000/provider/${orderReceived.providerId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(freelancerBalance)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure?');
                navigate('/dashboard')
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

                <form onSubmit={handleBalance}>
                    
                    {
                        providers.map(provider =>
                            <input value={parseFloat(provider.currentBalance) + parseFloat(orderReceived.releaseAmount - parseFloat(orderReceived.releaseAmount * 10 / 100))} type="text" name="currentBalance" />
                        )
                    }
                    <input type="submit" value="Add Funds to Your Balance" />
                </form>
            </div>

        </div>
    );
};

export default AddFundstoBalance;