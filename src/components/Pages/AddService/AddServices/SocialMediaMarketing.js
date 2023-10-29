import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import useFreelancer from '../../../hooks/useFreelancer';
import './AddService.css';

const SocialMediaMarketing = () => {

    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();
    const [myDatas] = useFreelancer();
    const navigate = useNavigate();

    const onSubmit = data => {
        const url = `http://localhost:5000/service/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');
            })
    }

    return (
        <div className='container'>
            <h1>Create Social Media Marketing Service</h1>
            {myDatas.length === 1 &&
                <div>
                    <form className='add-service' onSubmit={handleSubmit(onSubmit)}>
                        <input value={user.email} type="hidden" {...register("email")} />
                        <input value='pending' hidden {...register("publishStatus")} />
                        {
                            myDatas.map(myData => <><input value={myData.name} hidden {...register("providerName")} /></>)
                        }
                        {
                            myDatas.map(myData => <><input value={myData._id} hidden {...register("providerId")} /></>)
                        }
                        {
                            myDatas.map(myData => <><input value={myData.profile} hidden {...register("profileIMG")} /></>)
                        }
                        <input required value='Social' {...register("catagory")} placeholder='Your Service Title' />
                        <input required {...register("title")} placeholder='Your Service Title' />
                        <input required type="number" {...register("price")} placeholder='Monthly Charge' />
                        <input required {...register("img")} placeholder='Image URL' />
                        <textarea required {...register("details")} />
                        <input className='btn btn-primary' type="submit" />
                    </form>
                </div>
            }


            {myDatas.length === 0 &&
                <div>
                    <Button><Link className='text-white' to={'/update'}>Please Update Your Provider Account</Link></Button>
                </div>
            }

        </div >
    );
};

export default SocialMediaMarketing;