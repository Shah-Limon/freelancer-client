import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';

const WithdrawalUpdate = () => {
    const { id } = useParams();
    const [withdrawal, setWithdrawal] = useState([]);
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));
    }, []);


    useEffect(() => {
        fetch(`http://localhost:5000/withdraw/${id}`)
            .then(res => res.json())
            .then(data => setWithdrawal(data))
    }, [])


    const handleAcceptWithdraw = event => {
        event.preventDefault();
        const status = event.target.status.value;
        const withdrawnAmount = event.target.withdrawnAmount.value;
        const note = event.target.note.value;
        const transactionId = event.target.transactionId.value;
        const processDate = event.target.processDate.value;
        const withdrawStatus = { status, withdrawnAmount, note, transactionId, processDate };
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
                navigate(`/admin/withdraw/updatebalance/${withdrawal._id}`)
            })
    };
    const handleCancelWithdraw = event => {
        event.preventDefault();
        const status = event.target.status.value;
        const withdrawnAmount = event.target.withdrawnAmount.value;
        const processDate = event.target.processDate.value;
        const note = event.target.note.value;
        const withdrawStatus = { status, withdrawnAmount, note, processDate };
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
                navigate('/admin/withdraws')
            })
    };

    return (
        <div className='container'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <h2>You are accepting {withdrawal._id}</h2>
                    <h2>Withdraw Amount {withdrawal.amount}</h2>
                    <h2>User Name {withdrawal.name}</h2>
                    <h2>User PayPal {withdrawal.method}</h2>
                    <form onSubmit={handleAcceptWithdraw}>
                        <input hidden value={date} type="text" name="processDate" id="" />
                        <input value={withdrawal.amount} type="number" name="withdrawnAmount" id="" />
                        <input type="text" name="note" id="" placeholder='Note' />
                        <input type="text" name="transactionId" id="" placeholder='Transaction ID' />
                        <input value="accepted" type="text" name="status" id="" />
                        <input type="submit" value="Accept Withdrawal Now" />
                    </form>
                    <h5>Or</h5>
                    <form onSubmit={handleCancelWithdraw}>
                        <input hidden value={date} type="text" name="processDate" id="" />
                        <input value="0" type="number" name="withdrawnAmount" id="" />
                        <input type="text" name="note" id="" placeholder='Note' />
                        <input value="cancelled" type="text" name="status" id="" />
                        <input type="submit" value="Cancel Withdrawl Now" />
                    </form>
                </>
            }
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 0 &&
                <>
                    <h5>You dont have permission to access Admin Panel</h5>
                </>
            }

        </div>
    );
};

export default WithdrawalUpdate;