import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import BreadcumArea from '../Shared/BreadcumArea';

const CancelledOrder = () => {
    const [orders, setOrders] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));

    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/orders`)
            .then(res => res.json())
            .then(result => setOrders(result))
    }, [])
    return (
        <>
        
        <div className='container'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <AdminMenu></AdminMenu>
                    <h5>Total Cancelled: {orders.filter(order => order.status === 'cancelled').length} Orders</h5>
                    <div className='my-2'>
                        <Link className='btn btn-secondary mx-1 btn-sm' to={'/admin/orders/'}>All Orders</Link>
                        <Link className='btn btn-danger mx-1' to={'/admin/orders/pending'}>Pending Orders</Link>
                        <Link className='btn btn-success mx-1' to={'/admin/orders/accepted'}>Accepted Orders</Link>
                        <Link className='btn btn-primary mx-1' to={'/admin/orders/cancelled'}>Cancelled Orders</Link>
                        <Link className='btn btn-warning mx-1' to={'/admin/orders/running'}>Running Orders</Link>
                        <Link className='btn btn-dark mx-1' to={'/admin/orders/completed'}>Completed Orders</Link>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Service Name</th>
                                <th>Client</th>
                                <th>Provider</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Running Or Completed</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                orders.map(order => order.status === 'cancelled' &&
                                    <tr>
                                        <td>1</td>
                                        <td>{order._id}</td>
                                        <td><Link to={`/service/${order.serviceId}`}>{order.servicename}</Link></td>
                                        <td><Link to={`/client/${order.clientId}`}>{order.clientName}</Link></td>
                                        <td><Link to={`/freelancer/${order.providerId}`}>{order.providerName}</Link></td>
                                        <td>{order.serviceprice} USD</td>
                                        <td>{order.status} <br />
                                            <Link className='mt-1 btn btn-primary btn-sm' to={`/admin/order/update/${order._id}`}>Update Order</Link>
                                        </td>
                                        <td><Button disabled >{order.runningOrCompleted}</Button> <br />

                                        </td>
                                    </tr>

                                ).reverse()
                            }

                        </tbody>
                    </Table>
                </>
            }
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 0 &&
                <>
                    <h5>You dont have permission to access Admin Panel</h5>
                </>
            }

        </div>
        </>
        
    );
};

export default CancelledOrder;