import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RefundedProcess = () => {
    const {id} = useParams();
    const[order, setOrder] = useState([]);
    const navigate =useNavigate();
    useEffect(() => {
        fetch(`http://localhost:5000/order/${id}`)
            .then(res => res.json())
            .then(result => setOrder(result))
    }, [order])

    const handleRefund = event => {
        event.preventDefault();
        const refundStatus = event.target.refundStatus.value;
        const refundedTo = event.target.refundedTo.value;
        const refundNote = event.target.refundNote.value;
        const updateStatus = { refundStatus, refundedTo, refundNote };
        const url = `http://localhost:5000/refunded/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/refund');
            })
    };

    return (
        <div className='container'>
            <form onSubmit={handleRefund}>
                <input value="refunded" type="text" name="refundStatus" id="" />
                <input type="text" name="refundedTo" id="" placeholder='PayPal Email' />
                <input type="text" name="refundNote" id="" placeholder='Refund Note' />
                <input type="submit" value="Process Refunded" />
            </form>
        </div>
    );
};

export default RefundedProcess;