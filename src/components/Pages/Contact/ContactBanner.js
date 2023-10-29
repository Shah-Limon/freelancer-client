import React, { useEffect, useState } from 'react';
import './Contact.css';

const ContactBanner = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/contact`
        fetch(url)
            .then(res => res.json())
            .then(data => setContacts(data));
    }, []);
    return (
        <div className='contact-banner py-5'>
            <div>
                {
                    contacts.map(c =>
                        <div>
                            <h1 className='text-white'>{c.contactBanner}</h1>
                        </div>
                    )
                }

            </div>
            <div className='col-lg-5 banner-img'>
            </div>
        </div>

    );
};

export default ContactBanner;