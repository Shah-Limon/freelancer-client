import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import './Settings.css';
import Breadcum from '../Shared/Breadcum';
import BreadcumArea from '../Shared/BreadcumArea';

const Settings = () => {
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));

    }, []);
    return (
      <>
    
      
      <div className='container'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <AdminMenu></AdminMenu>
                    <div className='my-2'>
                        <Link className='btn btn-danger mx-1' to={'/admin/setting/account'}>Account Setting</Link>
                        <Link className='btn btn-success mx-1' to={'/admin/setting/payment'}>Payment Setting</Link>
                        <Link className='btn btn-warning mx-1' to={'/admin/setting/contact'}>Contact Us Page</Link>
                    </div>
                    <div className='setting'>
                        <div className='setting-account-card p-3 my-2 shadow bg-body rounded-3'>
                            <h1><Link className='text-white' to={'/admin/setting/account'}>Account Setting</Link></h1>
                        </div>

                        <div className='setting-payment-card p-3 my-2 shadow bg-body rounded-3'>
                            <h1><Link className='text-white' to={'/admin/setting/payment'}>Payment Setting</Link></h1>
                        </div>

                        <div className='setting-logo-card p-3 my-2 shadow bg-body rounded-3'>
                            <h1><Link className='text-white' to={'/admin/setting/logo'}>Logo</Link></h1>
                        </div>
                        <div className='setting-banner-card p-3 my-2 shadow bg-body rounded-3'>
                            <h1><Link className='text-white' to={'/admin/setting/banner'}>Banner</Link></h1>
                        </div>
                        <div className='setting-footer-card p-3 my-2 shadow bg-body rounded-3'>
                            <h1><Link className='text-white' to={'/admin/setting/footer'}>Footer</Link></h1>
                        </div>

                    </div>
                </>
            }
        </div>
      </>
    );
};

export default Settings;