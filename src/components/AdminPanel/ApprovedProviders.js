import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import BreadcumArea from '../Shared/BreadcumArea';

const ApprovedProviders = () => {
    const [providers, setProviders] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/freelancers`)
            .then(res => res.json())
            .then(data => setProviders(data))
    }, []);
    return (
        <>
        
        <div className='container'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <AdminMenu></AdminMenu>
                    <h5>Total Approved: {providers.filter(provider => provider.status === 'Approved').length} Providers</h5>
                    <div className='my-2'>
                        <Link className='btn btn-secondary mx-1 btn-sm' to={'/admin/providers/'}>All Providers</Link>
                        <Link className='btn btn-success mx-1' to={'/admin/providers/Approved'}>Approved Providers</Link>
                        <Link className='btn btn-danger mx-1' to={'/admin/providers/Unapproved'}>Unapproved Providers</Link>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Verified Status</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                providers.map(provider => provider.status === 'Approved' &&
                                    <tr>
                                        <td>-</td>
                                        <td>{provider.name} <Link className='btn btn-success btn-sm' to={`/freelancer/${provider._id}`}><i class="fa-solid fa-user"></i></Link></td>
                                        <td>{provider.email}</td>
                                        <td><Button disabled className='btn btn-sm'>{provider.status}</Button> <br />
                                            <Link className='btn btn-success btn-sm mt-1' to={`/admin/provider/approve/${provider._id}`}>Approve Now</Link> <br />
                                            <Link className='btn btn-danger btn-sm mt-1' to={`/admin/provider/unapprove/${provider._id}`}>Unapprove Now</Link>
                                        </td>
                                        <td>{provider.verifiedStatus} <br />
                                            <Link className='mt-1 btn btn-success btn-sm' to={`/admin/provider/verify/${provider._id}`}>Verify Now</Link> <br />
                                            <Link className='mt-1 btn btn-danger btn-sm' to={`/admin/provider/unverify/${provider._id}`}>Unverify Now</Link>
                                        </td>
                                        <td><Link to={`/admin/provider/${provider._id}`}><i class="fa-solid fa-pen-to-square"></i></Link></td>
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

        </div></>
    );
};

export default ApprovedProviders;