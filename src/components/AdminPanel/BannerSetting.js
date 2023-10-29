import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import AdminMenu from './AdminMenu';


const BannerSetting = () => {
    const navigate = useNavigate();
    const [banner, setBanner] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/banner`
        fetch(url)
            .then(res => res.json())
            .then(data => setBanner(data));
    }, []);


    const handleBanner = event => {
        event.preventDefault();
        const bannerHeading = event.target.bannerHeading.value;
        const bannerSubHeading = event.target.bannerSubHeading.value;
        const bannerImg = event.target.bannerSubHeading.value;
        const banner = { bannerHeading, bannerSubHeading, bannerImg }
        const url = `http://localhost:5000/banner`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(banner)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/settings');

            })
    }
    return (
        <div className='container mt-5'>
            <AdminMenu></AdminMenu>
            {
                banner.length === 1 &&
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Banner Heading</th>
                        <th>Banner Sub Heading</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        banner.map(banner =>
                            <tr>
                                <td>{banner.bannerHeading}</td>
                                <td>{banner.bannerSubHeading}</td>
                                <td><Link to={`/admin/setting/banner/${banner._id}`}>Update Banner</Link></td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
            }
            
            {
                banner.length === 0 &&

                <form onSubmit={handleBanner}>
                    <input type="text" name="bannerHeading" id="" placeholder='Heading' />
                    <input type="text" name="bannerSubHeading" id="" placeholder='Sub Heading' />
                    <input type="text" name="bannerImg" id="" placeholder='Banner Image URL' />
                    <input type="submit" value="Save" />
                </form>
            }

        </div>
    );
};

export default BannerSetting;