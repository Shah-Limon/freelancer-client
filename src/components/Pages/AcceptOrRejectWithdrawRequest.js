import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const AcceptOrRejectWithdrawRequest = () => {
    const [allWithdraws, setAllWithdraws] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/withdraws')
            .then(res => res.json())
            .then(data => setAllWithdraws(data))
    }, [])
    return (
        <div className='container'>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User Email</th>
                        <th>User Name</th>
                        <th>Amount</th>
                        <th>PayPal Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allWithdraws.map(withdraw =>
                            <tr>
                                <td>-</td>
                                <td>{withdraw.email}</td>
                                <td>{withdraw.name}</td>
                                <td>{withdraw.amount}</td>
                                <td>{withdraw.method}</td>
                                <td>
                                    {withdraw.status === 'accepted' && <Link to={`/withdrawacceptorcancel/${withdraw._id}`}>Accepted Already</Link>}
                                    {withdraw.status === 'pending' && <Link to={`/withdrawacceptorcancel/${withdraw._id}`}>Accept or Cancel</Link>}
                                    {withdraw.status === 'cancelled' && <Link to={`/withdrawacceptorcancel/${withdraw._id}`}>Allready Cancelled</Link>}                                    
                                </td>
                            </tr>)
                    }

                </tbody>
            </Table>


        </div>
    );
};

export default AcceptOrRejectWithdrawRequest;