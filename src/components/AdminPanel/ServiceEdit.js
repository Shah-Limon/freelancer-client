import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';
import BreadcumArea from '../Shared/BreadcumArea';

const ServiceEdit = () => {
    const { id } = useParams();
    const [service, setService] = useState([]);
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
        fetch(`http://localhost:5000/service/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [service])

    const handleService = event => {
        event.preventDefault();
        const title = event.target.title.value;
        const price = event.target.price.value;
        const img = event.target.img.value;
        const details = event.target.details.value;
        const serviceUpdate = { title, img, details, price }
        const url = `http://localhost:5000/service-edit/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(serviceUpdate)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/admin/services');

            })
    }

    return (
        <>
       
         <div className='container'>
            {
                admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                <>
                    <AdminMenu></AdminMenu>
                    <h5>{service.title}</h5>
                    <form onSubmit={handleService}>
                        <input defaultValue={service.title} type="text" name="title" id="" />
                        <input defaultValue={service.price} type="text" name="price" id="" />
                        <input defaultValue={service.img} type="text" name="img" id="" />
                        <textarea defaultValue={service.details} name="details" id="" cols="30" rows="10"></textarea>
                        <input type="submit" value="Update Service" />
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

export default ServiceEdit;