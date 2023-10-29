import React, { useEffect, useState } from 'react';
import Freelancer from './Freelancer';
import './Freelancers.css';

const Freelancers = () => {
    const [freelancers, setFreelancers] = useState([]);

    useEffect( () =>{
        fetch('freelancer.json')
        .then(res=>res.json())
        .then(data=>setFreelancers(data))
    },[])

    return (
        <div className='container'>
            <h2>Total we Have {freelancers.length}</h2>
            <div className='freelancers'>
            
            {
                freelancers.map(freelancer => <Freelancer
                key={freelancer.key}
                freelancer={freelancer}
                ></Freelancer>)
            }
        </div>
        </div>

        
    );
};

export default Freelancers;