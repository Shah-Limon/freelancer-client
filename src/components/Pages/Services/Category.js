import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Service from './Service';

const Category = () => {
    const {slug} = useParams();
    const [services, setServices] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/service`
        fetch(url)
            .then(res => res.json())
            .then(data => setServices(data));
    }, []);
    return (
        <div className='services container'>
            {
                services.map(service => <>
                    {service.slug === slug && <>
                    {service.publishStatus === 'Published'  && <Service
                        key={service._id}
                        service={service}
                    ></Service>}
                    </>}
                </>)
            }
        </div>
    );
};

export default Category;