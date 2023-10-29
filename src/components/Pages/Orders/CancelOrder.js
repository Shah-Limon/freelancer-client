import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcumArea from '../../Shared/BreadcumArea';

const CancelOrder = () => {
    const { id } = useParams();
    const [cancel, setCancel] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:5000/myorder/${id}`)
            .then(res => res.json())
            .then(result => setCancel(result))
    }, [])

    const handleCancel = event => {
        event.preventDefault();
        const status = event.target.status.value;
        const cancelledBy = event.target.cancelledBy.value;
        const refundStatus = event.target.refundStatus.value;
        const updateStatus = { status, cancelledBy, refundStatus };
        const url = `http://localhost:5000/myorder/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure You Want to Cancel?');
                navigate('/dashboard');
            })
    };

    return (
       <>
     
        <div>
            {cancel.status === 'pending' && <div>
                <h2>You are Cancelling This Service: {cancel.servicename}</h2>
                <form onSubmit={handleCancel}>
                    <input hidden value='cancelled' type="text" name="status" id="" />
                    <input hidden value='pending' type="text" name="refundStatus" id="" />
                    <input hidden value='client' type="text" name="cancelledBy" id="" />
                    <input type="submit" value="Cancell Now" />
                </form>
            </div>}
            {cancel.status === 'approved' && cancel.status === 'rejected' && 
            <div>
               <h2>Sorry. You can not take any action!</h2>
            </div>}

        </div>
       </>
    );
};

export default CancelOrder;