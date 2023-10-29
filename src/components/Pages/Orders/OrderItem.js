import React from 'react';
import useOrderItem from '../../hooks/useOrderItem';
import Table from 'react-bootstrap/Table';
import './OrderItem.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const OrderItem = () => {
    const [user] = useAuthState(auth);
    const [service] = useOrderItem();
    const navigate = useNavigate();
    const [iamClient, setIamClient] = useState([]);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;




    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user.email}`)
            .then(res => res.json())
            .then(data => setIamClient(data))
    }, [user])

    const handleOrder = event => {
        event.preventDefault();
        const status = event.target.status.value;
        const serviceId = service._id;
        const providerName = service.providerName;
        const providerId = service.providerId;
        const customeremail = user.email;
        const provideremail = service.email;
        const servicename = service.title;
        const serviceprice = service.price;
        const providerReviewStatus = event.target.providerReviewStatus.value;
        const reviewStatus = event.target.reviewStatus.value;
        const releaseAmount = event.target.releaseamount.value;
        const clientName = event.target.clientName.value;
        const clientId = event.target.clientId.value;
        const requirement = event.target.requirement.value;
        const reqUpdated = event.target.reqUpdated.value;
        const depositStatus = event.target.depositStatus.value;
        const orderDate = event.target.orderDate.value;
        const disputeStatus = event.target.disputeStatus.value;
        const disputedCreated = event.target.disputedCreated.value;
        const order = { customeremail, servicename, serviceprice, provideremail, serviceId, status, reviewStatus, releaseAmount, providerReviewStatus, clientName, clientId, providerName, providerId, requirement,reqUpdated, depositStatus, orderDate, disputeStatus, disputedCreated };

        const url = `http://localhost:5000/orders/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/cart');
            })

    };

    return (
       <>
       
        <div className='container mt-5'>
            {iamClient.length === 1 && <>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Service Image</th>
                            <th>Service Name</th>
                            <th>Service Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td><img className='order-item-image' src={service.img} alt="" /></td>
                            <td>{service.title}</td>
                            <td>${service.price}usd/ Mo</td>
                        </tr>
                    </tbody>
                </Table>
                <form onSubmit={handleOrder}>

                    <input hidden value="pending" type="text" name="status" id="" />
                    {
                        iamClient.map(client => <div key={client._id}><input hidden value={client.clientName} type="text" name="clientName" id="" /></div>)
                    }
                    {
                        iamClient.map(client => <div key={client._id}><input hidden value={client._id} type="text" name="clientId" id="" /></div>)
                    }
                    <input hidden value={date} type="text" name="orderDate" id="" />
                    <input hidden value="none" type="text" name="providerReviewStatus" id="" />
                    <input hidden value="0" type="number" name="releaseamount" id="" />
                    <input hidden value="none" type="text" name="reviewStatus" id="" />
                    <input hidden value="requpdated" type="text" name="reqUpdated" id="" />
                    <input hidden value="notDeposit" type="text" name="depositStatus" id="" />
                    <input hidden value="none" type="text" name="disputeStatus" id="" />
                    <input hidden value="none" type="text" name="disputedCreated" id="" />
                    <textarea name="requirement" id="" cols="30" rows="10" placeholder='Your Requirement' required></textarea>
                    <input className='btn btn-primary' type="submit" value="Place Order" />
                </form>
            </>}
            {iamClient.length === 0 && <Link className='btn btn-primary text-white' to={'/updateclient'}>Update As a Client</Link>}
        </div>
       
       </>
    );
};

export default OrderItem;