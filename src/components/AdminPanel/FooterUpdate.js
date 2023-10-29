import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const FooterUpdate = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [footer, setFooter] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/footer/${id}`)
            .then(res => res.json())
            .then(data => setFooter(data))
    }, [footer])


    const handleFooterUpdate = event => {
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
        const footerUpdate = { footerLogo, footerText, footerEmail, footerAddress, facebookURL, twitterURL, youtubeURL, liniedInURL, copyRight }
        const url = `http://localhost:5000/footer/${id}`;
        fetch(url, {
            method: 'PUT',
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
        <div className='container my-5'>
            <AdminMenu></AdminMenu>
            <form onSubmit={handleFooterUpdate}>
                    <input defaultValue={footer.footerLogo} type="text" name="footerLogo" id="" placeholder='Footer URL' />
                    <textarea defaultValue={footer.footerText} type="text" name="footerText" id="" placeholder='Text' />
                    <input defaultValue={footer.footerEmail} type="email" name="footerEmail" id="" placeholder='Contact Email' />
                    <input defaultValue={footer.footerAddress} type="text" name="footerAddress" id="" placeholder='Contact Address' />                   
                    <input defaultValue={footer.facebookURL} type="text" name="facebookURL" id="" placeholder='FB Page URL' />
                    <input defaultValue={footer.twitterURL} type="text" name="twitterURL" id="" placeholder='Twitter Page URL' />
                    <input defaultValue={footer.youtubeURL} type="text" name="youtubeURL" id="" placeholder='YouTube Channel  URL' />
                    <input defaultValue={footer.liniedInURL} type="text" name="liniedInURL" id="" placeholder='LinkedIn Profile URL' />
                    <input defaultValue={footer.copyRight} type="text" name="copyRight" id="" placeholder='Copyright Text' />
                    <input type="submit" value="Update Now" />
                </form>
            
        </div>
    );
};

export default FooterUpdate;