import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../../firebase.init';

const EditService = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const {id} = useParams();
    const [service, setService] = useState([]);
    const [myServices, setMyServices] = useState([])
    useEffect(() => {
        const url = `http://localhost:5000/myservice?email=${user?.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setMyServices(data));
    }, [user])

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
                navigate('/dashboard');

            })
    }

    return (
        <div className='container'>
            {
                myServices.filter(myService => myService.email === user?.email).length === 1 &&

                <div>
                    <h5>{service.title}</h5>
                    <form onSubmit={handleService}>
                        <input defaultValue={service.title} type="text" name="title" id="" />
                        <input defaultValue={service.price} type="text" name="price" id="" />
                        <input defaultValue={service.img} type="text" name="img" id="" />
                        <textarea defaultValue={service.details} name="details" id="" cols="30" rows="10"></textarea>
                        <input type="submit" value="Update Service" />
                    </form>
                </div>
            }

        </div>
    );
};

export default EditService;