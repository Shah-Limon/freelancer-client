import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadcumArea from '../Shared/BreadcumArea';

const ConfirmPublishOrCancel = () => {
    const { serviceId } = useParams();
    const [providerService, setproviderService] = useState([]);



    useEffect(() => {
        fetch(`http://localhost:5000/service/${serviceId}`)
            .then(res => res.json())
            .then(data => setproviderService(data))
    }, [])


    const handlePublish = event => {
        event.preventDefault();
        const status = event.target.publishStatus.value;
        const publishStatus = { status };
        const url = `http://localhost:5000/service/${serviceId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(publishStatus)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure?');

            })
    };
    return (
       <>
   
        <div>
            <h2>Accept</h2>
            {providerService.servicename}
            <form onSubmit={handlePublish}>
                <input value='published' type="text" name="publishStatus" id="" />
                <input type="submit" value="Publish Now" />
            </form>
        </div>
       </>
    );
};

export default ConfirmPublishOrCancel;