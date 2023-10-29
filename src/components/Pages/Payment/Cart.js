import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import BreadcumArea from '../../Shared/BreadcumArea';

const Cart = () => {
    const [user] = useAuthState(auth);
    const [myOrders, setmyOrders] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/myorder?email=${user?.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setmyOrders(data));

    }, [user])

    return (
        <>
        
       
        
        <div className='container'>
            {
                myOrders.filter(order => order.customeremail === user?.email & order.depositStatus === 'notDeposit').length > 0 && 
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Payment</th>
                        <th>Amount</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        myOrders.map(order => order.depositStatus === 'notDeposit' &&
                        <tr>
                            <th>{order.servicename}</th>
                            <th><Link to={`/payment/${order._id}`}>Pay Now</Link></th>
                            <th>{order.serviceprice}  USD</th>
                            
                    </tr>)
                    }
                    
                </tbody>
            </Table>
            }
            
        </div></>
    );
};

export default Cart;