import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadcumArea from '../Shared/BreadcumArea';

const WithdrawAcceptOrCancel = () => {
    const { id } = useParams();
    const [withdrawal, setWithdrawal] = useState([]);



    useEffect(() => {
        fetch(`http://localhost:5000/withdraw/${id}`)
            .then(res => res.json())
            .then(data => setWithdrawal(data))
    }, [])


    const handleAcceptWithdraw = event => {
        event.preventDefault();
        const status = event.target.status.value;
        const withdrawnAmount = event.target.withdrawnAmount.value;
        const withdrawStatus = { status, withdrawnAmount };
        const url = `http://localhost:5000/withdraw/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(withdrawStatus)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure?');

            })
    };

    return (
      <>
      
      <div className='container'>
            <h2>You are accepting {withdrawal._id}</h2>
            <h2>Withdraw Amount {withdrawal.amount}</h2>
            <h2>User Name {withdrawal.name}</h2>
            <h2>User PayPal {withdrawal.method}</h2>
            <form onSubmit={handleAcceptWithdraw}>
                <input value={withdrawal.amount} type="number" name="withdrawnAmount" id="" />
                <select name="status" id="">
                    <option value="accepted">Accept</option>
                    <option value="cancelled">Cancel</option>
                    <option value="pending">Pending</option>
                </select>
                <input type="submit" value="Update Now" />
            </form>
        </div>
      </>
    );
};

export default WithdrawAcceptOrCancel;