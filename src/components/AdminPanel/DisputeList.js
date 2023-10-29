import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Breadcum from '../Shared/Breadcum';
import BreadcumArea from '../Shared/BreadcumArea';

const DisputeList = () => {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:5000/orders`)
            .then(res => res.json())
            .then(result => setOrders(result))
    }, [])
    return (
        <>
        
            <div className='container'>
                <AdminMenu></AdminMenu>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Dispute Created By</th>
                            <th>Provider</th>
                            <th>Client</th>
                            <th>Dispute Status</th>
                            <th>Winner</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(dispute => dispute.disputeStatus === 'Started' | dispute.disputeStatus === 'Solved' &&
                                <tr>
                                    <td>{dispute.servicename}</td>
                                    <td>{dispute.disputedCreated}</td>
                                    <td>{dispute.providerName}</td>
                                    <td>{dispute.clientName}</td>
                                    <td>{dispute.disputeStatus}</td>
                                    <td>{dispute.winner}</td>
                                    <td>
                                        {dispute.disputeStatus === 'Started' &&
                                            <Link className='btn btn-danger' to={`/admin/dispute/${dispute._id}`}>Take an Action</Link>
                                        }
                                        {dispute.disputeStatus === 'Solved' &&
                                            <Link className='btn' to={'#'}>Already Solved</Link>
                                        }

                                    </td>
                                </tr>
                            ).reverse()
                        }

                    </tbody>
                </Table>

            </div></>
    );
};

export default DisputeList;