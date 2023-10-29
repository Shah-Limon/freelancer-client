import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcumArea from '../Shared/BreadcumArea';

const DisputeSolution = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/myorder/${id}`)
            .then(res => res.json())
            .then(result => setOrder(result))
    }, [order])

    const handleClientDisputeSolution = event => {
        event.preventDefault();
        const disputeStatus = event.target.disputeStatus.value;
        const winner = event.target.winner.value;
        const adminNote = event.target.adminNote.value;
        const status = event.target.status.value;
        const refundStatus = event.target.refundStatus.value;
        const disputeSolution = { disputeStatus, winner, adminNote, status, refundStatus };
        const url = `http://localhost:5000/disputesolution/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(disputeSolution)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/dispute');
            })
    };
    const handleProviderDisputeSolution = event => {
        event.preventDefault();
        const disputeStatus = event.target.disputeStatus.value;
        const winner = event.target.winner.value;
        const adminNote = event.target.adminNote.value;
        const releaseStatus = event.target.releaseStatus.value;
        const releaseAmount = event.target.releaseAmount.value;
        const paymentAccepted = event.target.paymentAccepted.value;
        const disputeSolution = { disputeStatus, winner, adminNote, releaseStatus, releaseAmount, paymentAccepted };
        const url = `http://localhost:5000/disputesolutionforprovider/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(disputeSolution)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/dispute');
            })
    };
    return (
        <>
           
            <div className='container'>
                {
                    order.disputeStatus === 'Started' &&
                    <form onSubmit={handleClientDisputeSolution}>
                        <input value="Client" type="text" name="winner" id="" />
                        <input value="rejectedByAdmin" type="text" name="status" id="" />
                        <input value="pending" type="text" name="refundStatus" id="" />
                        <select name="disputeStatus" id="" >
                            <option value="Solved">Solved</option>
                            <option value="none">Cancelled</option>
                        </select>
                        <textarea type="text" name="adminNote" id="" placeholder='Admin Note' />
                        <input type="submit" value="Solve and mark Client as Winner" />
                    </form>
                }
                {
                    order.disputeStatus === 'Started' &&
                    <form onSubmit={handleProviderDisputeSolution}>
                        <input value="Provider" type="text" name="winner" id="" />
                        <select name="disputeStatus" id="" >
                            <option value="Solved">Solved</option>
                            <option value="none">Cancelled</option>
                        </select>
                        <textarea type="text" name="adminNote" id="" placeholder='Admin Note' />
                        <input value="released" type="text" name="releaseStatus" id="" />
                        <input value="none" type="text" name="paymentAccepted" id="" />
                        <input value={order.serviceprice} type="number" name="releaseAmount" id="" />
                        <input type="submit" value="Solve and mark Provider as Winner" />
                    </form>
                }

            </div></>
    );
};

export default DisputeSolution;