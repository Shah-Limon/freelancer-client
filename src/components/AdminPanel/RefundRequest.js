import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcum from '../Shared/Breadcum';

const RefundRequest = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/orders`
        fetch(url)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [])
    return (
        <>
          
            <div className='container'>
                <div className='my-service-list shadow p-3 mb-5 bg-body rounded-5'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Status</th>
                                <th>Refund Status</th>
                                <th>Refunded to</th>
                                <th>Note</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => order.status === 'cancelled' | order.status === 'rejected' | order.status === 'rejectedByAdmin' &&
                                    <tr>
                                        <td>{order.servicename}</td>
                                        <td>{order.status}</td>
                                        <td>{order.refundStatus}</td>
                                        <td>{order.refundedTo}</td>
                                        <td>{order.refundNote}</td>
                                        <td>
                                            {
                                                order.refundStatus === "pending" &&
                                                <Link className='btn' to={`/admin/refund/${order._id}`}>Process Refund</Link>
                                            }
                                            {
                                                order.refundStatus === "refunded" &&
                                                <Link className='btn' to={'#'}>Already Refunded</Link>
                                            }
                                        </td>
                                    </tr>

                                )
                            }

                        </tbody>
                    </Table>
                </div>
            </div></>
    );
};

export default RefundRequest;