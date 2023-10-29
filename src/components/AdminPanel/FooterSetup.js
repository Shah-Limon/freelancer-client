import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import BreadcumArea from '../Shared/BreadcumArea';


const FooterSetup = () => {
    const navigate = useNavigate();
    const [footers, setFooters] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/footer`
        fetch(url)
            .then(res => res.json())
            .then(data => setFooters(data));
    }, []);


    const handleFooter = event => {
        event.preventDefault();
        const footerLogo = event.target.footerLogo.value;
        const footerText = event.target.footerText.value;
        const footerEmail = event.target.footerEmail.value;
        const footerAddress = event.target.footerAddress.value;
        const facebookURL = event.target.facebookURL.value;
        const twitterURL = event.target.twitterURL.value;
        const youtubeURL = event.target.youtubeURL.value;
        const liniedInURL = event.target.liniedInURL.value;
        const copyRight = event.target.copyRight.value;
        const footerUpdate = { footerLogo, footerText, footerEmail, footerAddress, liniedInURL, youtubeURL, twitterURL, facebookURL, copyRight }
        const url = `http://localhost:5000/footer`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(footerUpdate)
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
    footers.length === 1 &&

    <Table striped bordered hover>
        <thead>
            <tr>
                <th>Logo</th>
                <th>About</th>
                <th>Email</th>
                <th>Address</th>
                <th>Edit</th>
            </tr>
        </thead>
        {
            footers.map(f =>
                <tbody>
                    <tr>
                        <td>{f.footerLogo}</td>
                        <td>{f.footerText}</td>
                        <td>{f.footerEmail}</td>
                        <td>{f.footerAddress}</td>
                        <td><Link to={`/admin/page-setting/footer/${f._id}`}>Edit</Link></td>
                    </tr>
                </tbody>
            )
        }

    </Table>
}

{
    footers.length === 0 &&

    <form onSubmit={handleFooter}>
        <input type="text" name="footerLogo" id="" placeholder='Logo URL' />
        <input type="text" name="footerText" id="" placeholder='Text' />
        <input type="email" name="footerEmail" id="" placeholder='Contact Email' />
        <input type="text" name="footerAddress" id="" placeholder='Contact Address' />
        <input type="text" name="facebookURL" id="" placeholder='FB Page URL' />
        <input type="text" name="twitterURL" id="" placeholder='Twitter Page URL' />
        <input type="text" name="youtubeURL" id="" placeholder='YouTube Channel  URL' />
        <input type="text" name="liniedInURL" id="" placeholder='LinkedIn Profile URL' />
        <input type="text" name="copyRight" id="" placeholder='Copyright Text' />
        <input type="submit" value="Save Now" />
    </form>
}



</div></>
    );
};

export default FooterSetup;