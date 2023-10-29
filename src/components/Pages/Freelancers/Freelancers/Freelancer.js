import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Freelancer.css';


const Freelancer = ({ freelancer }) => {
    const { _id, name, profile, about } = freelancer;
    const navigate = useNavigate();

    const navigateToProfile = id => {
        navigate(`/freelancer/${id}`)
    }

    return (
        <div className='container profilecard'>
            <div onClick={() => navigateToProfile(_id)}>
                <div className='d-flex justify-content-between'>
                    
                    <div className='freelancer col-lg-10 mx-5'>
                        <div className='profile-name'>
                            <div className='col-lg-3'><img src={profile} alt="" /></div>
                            <div className='col-lg-9'>
                                <h2>{name}</h2>
                                <p>{about}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Freelancer;