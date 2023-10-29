import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import './AdminSetup.css';
import Breadcum from '../Shared/Breadcum';
import BreadcumArea from '../Shared/BreadcumArea';

const AdminSetup = () => {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));

    }, []);

    const handleAdmin = event => {
        event.preventDefault();
        const adminName = event.target.adminName.value;
        const adminEmail = event.target.adminEmail.value;
        const adminDetails = { adminName, adminEmail }

        const url = `http://localhost:5000/admin`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminDetails)
        })
            .then(res => res.json())
            .then(result => {

                navigate('/admin/dashboard');

            })
    }

    return (
       <>
       
        <div className='container mt-5'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <AdminMenu></AdminMenu>
                    <form onSubmit={handleAdmin}>
                        <input type="text" name="adminName" id="" placeholder='Admin Full Name' />
                        <input type="email" name="adminEmail" id="" placeholder='Admin Email' />
                        <input type="submit" value="Add Admin" />
                    </form>
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

export default AdminSetup;