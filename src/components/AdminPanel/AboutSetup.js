import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import BreadcumArea from '../Shared/BreadcumArea';

const AboutSetup = () => {
    const navigate = useNavigate();
    const [about, setAbout] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/about`
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
        const url = `http://localhost:5000/about`;
        fetch(url, {
            method: 'POST',
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
      
       <div className='container mt-5'>
            <AdminMenu></AdminMenu>
            {
                about.length === 1 &&
                <>


                    {
                        about.map(a =>
                            <div>
                                <h5>About Us Page</h5>
                                <h5><Link to={`/admin/page-setting/about/${a._id}`}>Edit The Page Now</Link></h5>
                            </div>
                        )
                    }
                </>
            }
            {
                about.length === 0 &&
                <form onSubmit={handleAbout}>
                    <input type="text" name="aboutBannerImg" id="" placeholder='About Page Header Banner Image URL' />
                    <input type="text" name="aboutBannerText" id="" placeholder='about Page Banner Title' />
                    <textarea type="text" name="aboutContent" id="" placeholder='About Page Content' />
                    <input type="submit" value="Save Now" />
                </form>
            }

        </div></>
    );
};

export default AboutSetup;