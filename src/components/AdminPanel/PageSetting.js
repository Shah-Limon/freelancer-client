import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import './PageSetting.css';
import Breadcum from '../Shared/Breadcum';
import BreadcumArea from '../Shared/BreadcumArea';

const PageSetting = () => {
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
                            <Link className='btn btn-danger mx-1' to={'/admin/page-setting/contact'}>Contact Us Page</Link>
                            <Link className='btn btn-success mx-1' to={'/admin/page-setting/about'}>About Us Page</Link>
                            <Link className='btn btn-warning mx-1' to={'/admin/page-setting/footer'}>Footer Text</Link>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='setting-contact-card p-3 my-2 shadow bg-body rounded-3'>
                                <h1><Link className='text-white' to={'/admin/page-setting/contact'}>Contact Us Page</Link></h1>
                            </div>

                            <div className='setting-about-card p-3 my-2 shadow bg-body rounded-3'>
                                <h1><Link className='text-white' to={'/admin/page-setting/about'}>About Us Page</Link></h1>
                            </div>

                            <div className='setting-footer-card p-3 my-2 shadow bg-body rounded-3'>
                                <h1><Link className='text-white' to={'/admin/page-setting/footer'}>Footer Text</Link></h1>
                            </div>

                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default PageSetting;