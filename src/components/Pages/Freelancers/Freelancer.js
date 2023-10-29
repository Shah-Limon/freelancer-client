import React from 'react';
import './Freelancer.css'

const Freelancer = ({freelancer}) => {
    return (
        <div className='freelancer'>
            <img src={freelancer.img} alt="" />
            <p>{freelancer.name}</p>
        </div>
    );
};

export default Freelancer;