import React, { useEffect, useState } from 'react';
import ContactBanner from './ContactBanner';
import BreadcumArea from '../../Shared/BreadcumArea';

const Contact = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/contact`
        fetch(url)
            .then(res => res.json())
            .then(data => setContacts(data));
    }, []);

    return (
        <div>
        
            <ContactBanner></ContactBanner>
            <div className='container'>
                {
                    contacts.map(c =>
                        <>
                            <p className='text-white shadow p-3 mx-5 bg-body rounded-5 contact-text'>{c.contactText}</p>
                            <div className='d-flex justify-content-center'>
                                <div className='shadow p-5 mx-5 bg-body rounded-5 contact-email'>
                                    <h3 className='text-white'>Support Email</h3>
                                    <h5 className='text-white'>{c.contactEmail}</h5>
                                </div>
                                <div className='shadow p-5 mx-5 bg-body rounded-5 contact-address'>
                                    <h3 className='text-white'>Address</h3>
                                    <h5 className='text-white'>{c.contactAddress}</h5>
                                </div>
                            </div>
                        </>

                    )
                }

            </div>
        </div>
    );
};

export default Contact;