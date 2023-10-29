import React, { useEffect, useState } from 'react';
import './AddService.css';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import useFreelancer from '../../../hooks/useFreelancer';

const CreateService = () => {

    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();
    const [myDatas] = useFreelancer();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const {slug} = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/category?slug=${slug}`
        fetch(url)
            .then(res => res.json())
            .then(data => setCategories(data));

    }, []);

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
            <h1>Create SEO Service</h1>
            {myDatas.length === 1 &&
                <div>
                    <form className='add-service' onSubmit={handleSubmit(onSubmit)}>
                        <input value={user.email} type="hidden" {...register("email")} />
                        {
                            categories.map(category => <><input value={category.categoryName}  {...register("category")} /></>)
                        }
                        {
                            categories.map(category => <><input value={category.slug} hidden {...register("slug")} /></>)
                        }
                       
                        <input value='Pending' hidden {...register("publishStatus")} />
                        {
                            myDatas.map(myData => <><input value={myData.name} hidden {...register("providerName")} /></>)
                        }
                        {
                            myDatas.map(myData => <><input value={myData._id} hidden {...register("providerId")} /></>)
                        }
                        {
                            myDatas.map(myData => <><input value={myData.profile} hidden {...register("profileIMG")} /></>)
                        }
                        
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

export default CreateService;