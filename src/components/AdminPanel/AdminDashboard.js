import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import BreadcumArea from '../Shared/BreadcumArea';

const AdminDashboard = () => {
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const [providers, setProviders] = useState([]);
    const [services, setServices] = useState([]);
    const [clients, setClients] = useState([]);
    const [withdraws, setWithdraws] = useState([]);

    let revenue = 0;
    let sales = 0;

    for (const o of orders) {
        revenue = revenue + parseFloat(o.releaseAmount * 10/ 100);
    }
    
    for (const sale of orders) {
        sales = sales + parseFloat(sale.releaseAmount);
    }
    revenue = revenue;
    sales = sales;

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

    useEffect(() => {
        fetch(`http://localhost:5000/freelancers`)
            .then(res => res.json())
            .then(data => setProviders(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/service`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/clients`)
            .then(res => res.json())
            .then(data => setClients(data))
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/withdraws')
            .then(res => res.json())
            .then(data => setWithdraws(data))
    }, [])

    return (
       <>
        
        <div className='admin-dashboard'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <AdminMenu></AdminMenu>
                    <h2>Welcome to Dashboard</h2>
                    <div className='container d-flex justify-content-between'>
                        <div className='col-lg-3'>
                            <div className='shadow p-3 mb-5 bg-body'>
                                <h5>Recent Orders</h5>
                                {
                                    orders.slice(0, 5).map(order =>
                                        <div className='d-flex justify-content-between'>
                                            <p className='orders-list'>{order.servicename}</p>
                                            <p className='orders-list'>{order.serviceprice} USD</p>
                                        </div>
                                    )
                                }
                                <h5 className='mt-3'>Recent Providers</h5>
                                {
                                    providers.slice(0, 5).map(provider =>
                                        <div className='d-flex justify-content-between'>
                                            <p className='orders-list'>{provider.name}</p>
                                            <p className='orders-list'>{provider.email}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='col-lg-9 d-flex justify-content-center'>
                            <div className='col-lg-4 mx-2'>
                                <div className='dashboard-provider-card p-3 my-2 shadow bg-body rounded-3'>
                                    <h5 className='text-white'>Total Providers: </h5>
                                    <h1><Link className='text-white' to={'/admin/providers'}>{providers.length}</Link></h1>
                                </div>
                                <div className='dashboard-service-card p-3 my-2 shadow bg-body rounded-3'>
                                    <h5 className='text-white'>Total Services: </h5>
                                    <h1><Link className='text-white' to={'/admin/services'}>{services.length}</Link></h1>
                                </div>
                                <div className='dashboard-sale-card p-3 my-2 shadow bg-body rounded-3'>
                                    <h5 className='text-white'>Total Orders:</h5>
                                    <h1><Link className='text-white' to={'/admin/orders'}>{orders.length}</Link></h1>
                                </div>
                            </div>

                            <div className='col-lg-4 mx-2'>
                                <div className='dashboard-client-card p-3 my-2 shadow bg-body rounded-3'>
                                    <h5 className='text-white'>Total Clients:</h5>
                                    <h1><Link className='text-white' to={'/admin/clients'}>{clients.length}</Link></h1>
                                </div>
                                <div className='dashboard-revenue-card p-3 my-2 shadow bg-body rounded-3'>
                                    <h5 className='text-white'>Total Commissions:</h5>
                                    <h1><Link className='text-white' to={'#'}>${parseInt(revenue)} USD</Link></h1>
                                </div>
                                <div className='dashboard-transaction-card p-3 my-2 shadow bg-body rounded-3'>
                                    <h5 className='text-white'>Total Withdrawals:</h5>
                                    <h1><Link className='text-white' to={'#'}>{withdraws.length}</Link></h1>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default AdminDashboard;