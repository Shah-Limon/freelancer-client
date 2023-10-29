import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './LogoSetting.css';

const LogoSetting = () => {
    const navigate = useNavigate();
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/logo`
        fetch(url)
            .then(res => res.json())
            .then(data => setLogo(data));
    }, []);


    const handleLogo = event => {
        event.preventDefault();
        const logoImg = event.target.logoImg.value;
        const logo = { logoImg }
        const url = `http://localhost:5000/logo`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(logo)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/settings');

            })
    }
    return (
       <>
       </>
    );
};

export default LogoSetting;