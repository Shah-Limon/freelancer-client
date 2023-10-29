import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import BreadcumArea from '../Shared/BreadcumArea';

const AboutPageUpdate = () => {
    const {id} = useParams()
        const navigate = useNavigate();
        const [about, setAbout] = useState([]);

        useEffect(() => {
            const url = `http://localhost:5000/about/${id}`
            fetch(url)
                .then(res => res.json())
                .then(data => setAbout(data));
        }, []);
    

    const handleAbout = event => {      
        event.preventDefault();
        const aboutBannerImg = event.target.aboutBannerImg.value;
        const aboutBannerText = event.target.aboutBannerText.value;
        const aboutContent = event.target.aboutContent.value;
        const aboutUpdate = { aboutBannerImg, aboutBannerText, aboutContent }
        const url = `http://localhost:5000/about/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(aboutUpdate)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/page-settings');

            })
    }
    return (
      <>
     
      <div className='container'>
            <AdminMenu></AdminMenu>
            <form onSubmit={handleAbout}>
                    <input defaultValue={about.aboutBannerImg} type="text" name="aboutBannerImg" id="" placeholder='About Page Header Banner Image URL' />
                    <input defaultValue={about.aboutBannerText} type="text" name="aboutBannerText" id="" placeholder='about Page Banner Title' />
                    <textarea defaultValue={about.aboutContent} type="text" name="aboutContent" id="" placeholder='About Page Content' />
                    <input type="submit" value="Update Now" />
                </form>
        </div>
      </>
    );
};

export default AboutPageUpdate;