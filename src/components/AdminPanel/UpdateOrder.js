import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import BreadcumArea from '../Shared/BreadcumArea';

const UpdateOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/myorder/${id}`)
            .then(res => res.json())
            .then(result => setOrder(result))
    }, [order])

    const handleApprove = event => {
        event.preventDefault();
        const status = event.target.status.value;
        const runningOrFinished = event.target.runningorfinished.value;
        const release = event.target.release.value;
        const releaseStatus = event.target.releaseStatus.value;
        const updateStatus = { status, runningOrFinished, release, releaseStatus };
        const url = `http://localhost:5000/order/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/orders');
            })
    };


    const handleReject = event => {
        event.preventDefault();
        const status = event.target.status.value;
        const runningorfinished = event.target.runningorfinished.value;
        const updateStatus = { status, runningorfinished };
        const url = `http://localhost:5000/order/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/orders');
            })
    };
    const handlePendingCancel = event => {
        event.preventDefault();
        const status = event.target.status.value;
        const updateStatus = { status };
        const url = `http://localhost:5000/order/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/orders');
            })
    };

    return (
        <>
        
        <div className='container'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <AdminMenu></AdminMenu>
                    <h5><Link to={`/service/${order.serviceId}`}>{order.servicename}</Link></h5>
                    {
                        order.status === "pending" &&
                        <form onSubmit={handleApprove}>
                            <input hidden value="accepted" type="text" name="status" id="" />
                            <input hidden value='running' type="text" name="runningorfinished" id="" />
                            <input hidden value='none' type="text" name="release" id="" />
                            <input hidden value='none' type="text" name="releaseStatus" id="" />
                            <input type="submit" value="Approve Now" />
                        </form>
                    }


                    {
                        order.status === "pending" &&
                        <form onSubmit={handlePendingCancel}>
                            <input hidden value="cancelled" type="text" name="status" id="" />
                            <input type="submit" value="Cancell Now" />
                        </form>
                    }
                    {
                        order.status === "cancelled" &&
                        <form onSubmit={handleApprove}>
                            <input hidden value="accepted" type="text" name="status" id="" />
                            <input hidden value='running' type="text" name="runningorfinished" id="" />
                            <input hidden value='none' type="text" name="release" id="" />
                            <input type="submit" value="Approve Now" />
                        </form>
                    }
                    {
                        order.status === "accepted" &&
                        <form onSubmit={handleReject}>
                            <input hidden value="cancelled" type="text" name="status" id="" />
                            <input hidden value="notrunning" type="text" name="runningorfinished" id="" />
                            <input type="submit" value="Cancel Now" />
                        </form>
                    }
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

export default UpdateOrder;