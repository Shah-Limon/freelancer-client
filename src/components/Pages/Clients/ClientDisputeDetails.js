import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ClientDisputeDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


    useEffect(() => {
        fetch(`http://localhost:5000/myorder/${id}`)
            .then(res => res.json())
            .then(result => setOrder(result))
    }, [order])

    const handleClientDispute = event => {
        event.preventDefault();
        const disputeStatus = event.target.disputeStatus.value;
        const disputedCreated = event.target.disputedCreated.value;
        const clientMessage = event.target.clientMessage.value;
        const clientName = event.target.clientName.value;
        const disputeCreatedDate = event.target.disputeCreatedDate.value;
        const dispute = { disputeStatus, disputedCreated, clientMessage, clientName, disputeCreatedDate };
        const url = `http://localhost:5000/myorderdispute/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dispute)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');
            })
    };


    const handleClientDisputeReply = event => {
        event.preventDefault();
       
        const clientMessage = event.target.providerMessage.value;
        const clientDisputeReply = { clientMessage };
        const url = `http://localhost:5000/clientdisputereply/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(clientDisputeReply)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');
            })
    };


    return (
        <div className='container mt-5'>
            <h5>Service Name: {order.servicename}</h5>
            <h5>Total Amount: ${order.serviceprice} USD</h5>
            {
                order.disputeStatus === "Started" &&
                <div>
                    <h5>{order.clientName} Says</h5>
                    <p>{order.clientMessage}</p>
                </div>
            }
            {<div>
                <h5>{order.providerName} Says </h5>
               <p>{order.providerMessage}</p>
            </div>
            }
            
            {
                order.disputedCreated === 'none' &&
                <form onSubmit={handleClientDispute}>
                    <input hidden value={date} type="text" name="disputeCreatedDate" id="" />
                    <input hidden value="Started" type="text" name="disputeStatus" id="" />
                    <input hidden value="Client" type="text" name="disputedCreated" id="" />
                    <input hidden value={order.clientName} type="text" name="clientName" id="" />
                    <textarea type="text" name="clientMessage" id="" placeholder='Explane, Why should you want to dispute?' />
                    <input type="submit" value="Create Dispute" />
                </form>
            }
            {
                order.disputedCreated === 'Client' &&
                <>
                </>
            }
            {
                order.disputedCreated === 'Provider' &&
                <form onSubmit={handleClientDisputeReply}>
                    <textarea type="text" name="clientMessage" id="" placeholder='Explane, Why should you want to dispute?' />
                    <input type="submit" value="Reply" />
                </form>
            }
            
        </div>
    );
};

export default ClientDisputeDetails;