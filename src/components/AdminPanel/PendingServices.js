import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import BreadcumArea from '../Shared/BreadcumArea';

const PendingServices = () => {
    const [services, setServices] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/service`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, []);

    return (
      <>
       
        <div className='container'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <AdminMenu></AdminMenu>
                    <h5>Total Pending: {services.filter(service => service.publishStatus === 'pending').length} Services</h5>
                    <div className='my-2'>
                        <Link className='btn btn-secondary mx-1 btn-sm' to={'/admin/services/'}>All Services</Link>
                        <Link className='btn btn-danger mx-1' to={'/admin/services/pending'}>Pending Services</Link>
                        <Link className='btn btn-success mx-1' to={'/admin/services/Published'}>Published Services</Link>
                        <Link className='btn btn-warning mx-1' to={'/admin/services/unpublished'}>Unpublished Services</Link>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Service Name</th>
                                <th>Provider Name</th>
                                <th>Catagory</th>
                                <th>Status</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                services.map(service => service.publishStatus === 'pending' &&
                                    <tr>
                                        <td>-</td>
                                        <td><Link to={`/service/${service._id}`}>{service.title}</Link></td>
                                        <td><Link to={`/freelancer/${service.providerId}`}>{service.providerName}</Link></td>
                                        <td>{service.catagory}</td>
                                        <td><Button disabled className='btn btn-sm'>{service.publishStatus}</Button> <br />
                                            <Link className='btn btn-success btn-sm mt-1' to={`/admin/service/publish/${service._id}`}>Publish Now</Link> <br />
                                            <Link className='btn btn-danger btn-sm mt-1' to={`/admin/service/unpublish/${service._id}`}>Unpublish Now</Link>
                                        </td>
                                        <td><Link to={`/admin/service/${service._id}`}><i class="fa-solid fa-pen-to-square"></i></Link></td>
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

export default PendingServices;