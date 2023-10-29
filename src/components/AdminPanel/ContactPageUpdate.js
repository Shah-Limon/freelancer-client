import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcumArea from '../Shared/BreadcumArea';

const ContactPageUpdate = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/contact/${id}`)
            .then(res => res.json())
            .then(data => setContact(data))
    }, [contact])


    const handleContactUpdate = event => {
        event.preventDefault();
        const contactBanner = event.target.contactBanner.value;
        const contactText = event.target.contactText.value;
        const contactEmail = event.target.contactEmail.value;
        const contactAddress = event.target.contactAddress.value;
        const contactPageUpdate = { contactBanner, contactText, contactEmail, contactAddress }
        const url = `http://localhost:5000/contact/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(contactPageUpdate)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/page-settings');

            })
    }
    return (
       <>
      
       
       <div className='container my-5'>
            <form onSubmit={handleContactUpdate}>
                    <input defaultValue={contact.contactBanner} type="text" name="contactBanner" id="" placeholder='Banner Text' />
                    <textarea defaultValue={contact.contactText} type="text" name="contactText" id="" placeholder='Text' />
                    <input defaultValue={contact.contactEmail} type="email" name="contactEmail" id="" placeholder='Contact Email' />
                    <input defaultValue={contact.contactAddress} type="text" name="contactAddress" id="" placeholder='Contact Address' />
                    <input type="submit" value="Update Now" />
                </form>
            
        </div>
    );
       </>
    );
};

export default ContactPageUpdate;