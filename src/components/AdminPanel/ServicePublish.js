import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import BreadcumArea from '../Shared/BreadcumArea';

const ServicePublish = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [service, setService] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [service])



    const publish = event => {
        event.preventDefault();
        const status = event.target.publishStatus.value;

        const publishStatus = { status }

        const url = `http://localhost:5000/service/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(publishStatus)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/admin/services');

            })
    };
    const handlePublish = event => {
        event.preventDefault();
        const status = event.target.publishStatus.value;

        const publishStatus = { status }

        const url = `http://localhost:5000/service/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(publishStatus)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/admin/services');

            })
    };

    return (
        <>
           
            <div className='container'>
                {
                    admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                    <>
                        <AdminMenu></AdminMenu>
                        {
                            service.publishStatus === "Published" && <h5>Already Published</h5>
                        }
                        {
                            service.publishStatus === "Unpublished" &&
                            <form onSubmit={publish}>
                                <input hidden value='Published' type="text" name="publishStatus" id="" />
                                <input className='btn btn-danger' type="submit" value="Publish Now" />
                            </form>
                        }
                        {
                            service.publishStatus === "Pending" &&
                            <form onSubmit={handlePublish}>
                                <input hidden value='Published' type="text" name="publishStatus" id="" />
                                <input className='btn btn-danger' type="submit" value="Publish Now" />
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

            </div>

        </>
    );
};

export default ServicePublish;