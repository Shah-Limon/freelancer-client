import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcumArea from '../Shared/BreadcumArea';

const UpdateBanner = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [banner, setBanner] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/banner/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setBanner(data));
    }, [banner]);

    const handleBanner = event => {
        event.preventDefault();
        const bannerHeading = event.target.bannerHeading.value;
        const bannerSubHeading = event.target.bannerSubHeading.value;
        const bannerImg = event.target.bannerImg.value;
        const banner = { bannerHeading, bannerSubHeading, bannerImg }
        const url = `http://localhost:5000/banner/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(banner)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/setting/banner');

            })
    }
    return (
        <>
    
        <div className='container mt-5'>

<form onSubmit={handleBanner}>
    <input defaultValue={banner.bannerHeading} type="text" name="bannerHeading" id="" placeholder='Heading' />
    <input defaultValue={banner.bannerSubHeading} type="text" name="bannerSubHeading" id="" placeholder='Sub Heading' />
    <input defaultValue={banner.bannerImg} type="text" name="bannerImg" id="" placeholder='Banner Img URL' />
    <input type="submit" value="Update Banner" />
</form>
</div></>
    );
};

export default UpdateBanner;