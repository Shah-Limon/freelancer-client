import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';

const CancelledWithdraws = () => {
    const [withdraws, setWithdraws] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));

    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/withdraws')
            .then(res => res.json())
            .then(data => setWithdraws(data))
    }, [])
    return (
        <div className='container'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <AdminMenu></AdminMenu>
                    <h5>Total Cancelled Withdrawal: {withdraws.filter(withdraw => withdraw.status === 'cancelled').length}</h5>
                    <div className='my-2'>
                        <Link className='btn btn-secondary mx-1 btn-sm' to={'/admin/withdraws/'}>All Withdraws</Link>
                        <Link className='btn btn-danger mx-1' to={'/admin/withdraws/pending'}>Pending Withdraws</Link>
                        <Link className='btn btn-success mx-1' to={'/admin/withdraws/accepted'}>Accepted Withdraws</Link>
                        <Link className='btn btn-warning mx-1' to={'/admin/withdraws/cancelled'}>Cancelled Withdraws</Link>
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>User Email</th>
                                <th>User Name</th>
                                <th>Amount</th>
                                <th>PayPal Email</th>
                                <th>Status</th>
                                <th>Take Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                withdraws.map(withdraw => withdraw.status === 'cancelled' &&
                                    <tr>
                                        <td>{withdraw.date}</td>
                                        <td>{withdraw.email}</td>
                                        <td><Link to={`/freelancer/${withdraw.userId}`}>{withdraw.name}</Link></td>
                                        <td>{withdraw.amount}</td>
                                        <td>{withdraw.method}</td>
                                        <td><Button className="btn btn-sm">{withdraw.status}</Button></td>
                                        <td>
                                            {withdraw.status === 'accepted' && <Button className='btn btn-sm'>Already Accepted</Button>}
                                            {withdraw.status === 'cancelled' && <Button className='btn btn-danger btn-sm'>Already Cancelled</Button>}
                                            {withdraw.status === 'pending' && <Link className='btn btn-sm btn-success' to={`/admin/withdraw/update/${withdraw._id}`}>Accept/Cancel</Link>}

                                        </td>
                                    </tr>).reverse()
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
    );
};

export default CancelledWithdraws;