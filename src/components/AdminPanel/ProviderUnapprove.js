import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import BreadcumArea from '../Shared/BreadcumArea';

const ProviderUnapprove = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [provider, setProvider] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/freelancer/${id}`)
            .then(res => res.json())
            .then(data => setProvider(data))
    }, [provider])



    const approve = event => {
        event.preventDefault();
        const status = event.target.status.value;

        const freelancer = { status }

        const url = `http://localhost:5000/freelancer/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(freelancer)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/admin/providers');

            })
    }

    return (
       <>
        
        <div className='container'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                <AdminMenu></AdminMenu>
            {
                provider.status === "Unapproved" && <h5>Already Unapproved</h5>
            }
            {
                provider.status === "Approved" &&
                <form onSubmit={approve}>
                    <input hidden value='Unapproved' type="text" name="status" id="" />
                    <input className='btn btn-danger' type="submit" value="Unapprove Now" />
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

export default ProviderUnapprove;