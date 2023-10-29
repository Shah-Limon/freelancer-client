import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUserBalanceAfterWithdraw = () => {
    const { id } = useParams();
    const [withdrawal, setWithdrawal] = useState([]);
    const [provider, setProvider] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/withdraw/${id}`)
            .then(res => res.json())
            .then(data => setWithdrawal(data))
    }, [withdrawal])

    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${withdrawal.email}`)
            .then(res => res.json())
            .then(data => setProvider(data))
    }, [provider])

    const updateUserBalance = event => {
        event.preventDefault();
        const currentBalance = event.target.currentBalance.value;
        const balance = { currentBalance };
        const url = `http://localhost:5000/userbalance/${withdrawal.userId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(balance)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure?');
                navigate('/admin/withdraws')
            })
    };

    return (
        <div className='container mt-5'>
            <h5>Debit ${withdrawal.withdrawnAmount} USD from User {withdrawal.name}</h5>
            <form onSubmit={updateUserBalance}>
                {
                    provider.map(p =>
                        <input value={(p.currentBalance - withdrawal.withdrawnAmount)} type="number" name="currentBalance" id="" />
                    )
                }
                <input type="submit" value="Debit Withdrawal Amount From User" />

            </form>
        </div>
    );
};

export default UpdateUserBalanceAfterWithdraw;