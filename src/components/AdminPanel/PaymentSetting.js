import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import Table from 'react-bootstrap/Table';
import BreadcumArea from '../Shared/BreadcumArea';

const PaymentSetting = () => {
    const [admins, setAdmins] = useState([]);
    const [paymentSettings, setPaymentSettings] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `http://localhost:5000/payment-setting`
        fetch(url)
            .then(res => res.json())
            .then(data => setPaymentSettings(data));
    }, []);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));

    }, []);

    const handlePaymentSetting = event => {
        event.preventDefault();
        const paypalEmail = event.target.paypalEmail.value;
        const commission = event.target.commission.value;
        const paymentSettingUpdate = { paypalEmail, commission }
        const url = `http://localhost:5000/payment-setting`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(paymentSettingUpdate)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/settings');

            })
    }

    return (
        <>
            <BreadcumArea>
            </BreadcumArea>
            <div className='container'>
                {
                    admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                    <>
                        <AdminMenu></AdminMenu>
                        {
                            paymentSettings.length === 1 &&

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>PayPal Email</th>
                                        <th>Commission</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                {
                                    paymentSettings.map(p =>
                                        <tbody>
                                            <tr>
                                                <td>{p.paypalEmail}</td>
                                                <td>{p.commission}%</td>
                                                <td><Link to={`/admin/setting/payment-update/${p._id}`}>Edit</Link></td>
                                            </tr>
                                        </tbody>
                                    )
                                }

                            </Table>
                        }

                        {
                            paymentSettings.length === 0 &&
                            <form onSubmit={handlePaymentSetting}>
                                <input type="email" name="paypalEmail" id="" placeholder='PayPal Email' />
                                <input defaultValue="10" type="number" name="commission" id="" placeholder='Commission Percentage' />
                                <input type="submit" value="Update" />
                            </form>
                        }


                    </>
                }
            </div></>
    );
};

export default PaymentSetting;