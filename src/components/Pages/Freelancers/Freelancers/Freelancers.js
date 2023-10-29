import React, { useEffect, useState } from 'react';
import Freelancer from './Freelancer';
import './Freelancers.css';

const Freelancers = () => {
    const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/freelancers')
            .then(res => res.json())
            .then(data => setFreelancers(data))
    }, [])


    return (
        <div className='container'>

            <div className='freelancers'>
                {
                    freelancers.map(freelancer =>
                        <>{freelancer.status === 'Approved' && <Freelancer
                            key={freelancer._id}
                            freelancer={freelancer}>
                        </Freelancer>}</>

                    )
                }
            </div>

        </div>
    );
};

export default Freelancers;