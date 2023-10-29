import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Breadcum from '../Shared/Breadcum';
import BreadcumArea from '../Shared/BreadcumArea';


const ContactPageSetting = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/contact`
        fetch(url)
            .then(res => res.json())
            .then(data => setContacts(data));
    }, []);


    const handleContactPage = event => {
        event.preventDefault();
        const contactBanner = event.target.contactBanner.value;
        const contactText = event.target.contactText.value;
        const contactEmail = event.target.contactEmail.value;
        const contactAddress = event.target.contactAddress.value;
        const contactPageUpdate = { contactBanner, contactText, contactEmail, contactAddress }
        const url = `http://localhost:5000/contact`;
        fetch(url, {
            method: 'POST',
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

                {
                    contacts.length === 1 &&

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Contact Email</th>
                                <th>Contact Address</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        {
                            contacts.map(c =>
                                <tbody>
                                    <tr>
                                        <td>{c.contactEmail}</td>
                                        <td>{c.contactAddress}</td>
                                        <td><Link to={`/admin/page-setting/contact/${c._id}`}>Edit</Link></td>
                                    </tr>
                                </tbody>
                            )
                        }

                    </Table>
                }

                {
                    contacts.length === 0 &&

                    <form onSubmit={handleContactPage}>
                        <input type="text" name="contactBanner" id="" placeholder='Banner Text' />
                        <input type="text" name="contactText" id="" placeholder='Text' />
                        <input type="email" name="contactEmail" id="" placeholder='Contact Email' />
                        <input type="text" name="contactAddress" id="" placeholder='Contact Address' />
                        <input type="submit" value="Save Now" />
                    </form>
                }



            </div></>
    );
};

export default ContactPageSetting;