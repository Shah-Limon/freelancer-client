import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProviderDisputeDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


    useEffect(() => {
        fetch(`http://localhost:5000/myserviceorder/${id}`)
            .then(res => res.json())
            .then(result => setOrder(result))
    }, [order])

    const handleClientDispute = event => {
        event.preventDefault();
        const disputeStatus = event.target.disputeStatus.value;
        const disputedCreated = event.target.disputedCreated.value;
        const providerMessage = event.target.providerMessage.value;
        const providerName = event.target.providerName.value;
        const disputeCreatedDate = event.target.disputeCreatedDate.value;
        const dispute = { disputeStatus, disputedCreated, providerMessage, providerName, disputeCreatedDate };
        const url = `http://localhost:5000/myserviceorderdispute/${id}`;
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


    const handleproviderDisputeReply = event => {
        event.preventDefault();
       
        const providerMessage = event.target.providerMessage.value;
        const providerDisputeReply = { providerMessage };
        const url = `http://localhost:5000/providerdisputereply/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(providerDisputeReply)
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
                    <input hidden value="Provider" type="text" name="disputedCreated" id="" />
                    <input hidden value={order.providerName} type="text" name="providerName" id="" />
                    <textarea type="text" name="providerMessage" id="" placeholder='Explane, Why should you want to dispute?' />
                    <input type="submit" value="Create Dispute" />
                </form>
            }
            {
                order.disputedCreated === 'Provider' &&
                <>
                </>
            }
            {
                order.disputedCreated === 'Client' &&
                <form onSubmit={handleproviderDisputeReply}>
                    <textarea type="text" name="providerMessage" id="" placeholder='Explane, Why should you want to dispute?' />
                    <input type="submit" value="Reply" />
                </form>
            }
            
        </div>
    );
};

export default ProviderDisputeDetails;